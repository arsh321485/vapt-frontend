import pandas as pd
import requests
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import torch
import json
import re
import time
from typing import Dict, List, Tuple, Optional
import logging
from datetime import datetime
import matplotlib.pyplot as plt
import seaborn as sns
from collections import Counter
import warnings
warnings.filterwarnings('ignore')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('fashion_extraction.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class FashionAttributeExtractor:
    def __init__(self, model_name: str = "Salesforce/blip-image-captioning-base"):
        """Initialize the fashion attribute extractor with BLIP model"""
        logger.info("Loading BLIP model...")
        self.processor = BlipProcessor.from_pretrained(model_name)
        self.model = BlipForConditionalGeneration.from_pretrained(model_name)
        
        # Comprehensive fashion attribute mappings
        self.attribute_mappings = {
            "neckline": {
                "sweetheart": "Sweetheart",
                "v-neck": "V-neck",
                "v neck": "V-neck",
                "v neckline": "V-neck",
                "deep v": "V-neck",
                "scoop": "Scoop",
                "scoop neck": "Scoop",
                "crew": "Crew",
                "crew neck": "Crew",
                "round neck": "Crew",
                "rounded neck": "Crew",
                "boat neck": "Boat",
                "bateau": "Boat",
                "boatneck": "Boat",
                "halter": "Halter",
                "halter neck": "Halter",
                "halter top": "Halter",
                "off shoulder": "Off-shoulder",
                "off-shoulder": "Off-shoulder",
                "off the shoulder": "Off-shoulder",
                "one shoulder": "One-shoulder",
                "one-shoulder": "One-shoulder",
                "single shoulder": "One-shoulder",
                "strapless": "Strapless",
                "bandeau": "Strapless",
                "tube top": "Strapless",
                "square": "Square",
                "square neck": "Square",
                "square neckline": "Square",
                "high neck": "High neck",
                "high neckline": "High neck",
                "mock neck": "Mock neck",
                "mock turtle": "Mock neck",
                "cowl": "Cowl",
                "cowl neck": "Cowl",
                "draped neck": "Cowl",
                "keyhole": "Keyhole",
                "keyhole neck": "Keyhole",
                "cut out": "Keyhole",
                "turtleneck": "High neck",
                "turtle neck": "High neck",
                "jewel neck": "Crew",
                "portrait": "Portrait",
                "portrait collar": "Portrait"
            },
            "silhouette": {
                "a-line": "A-line",
                "a line": "A-line",
                "a-line dress": "A-line",
                "flowy": "A-line",
                "flowing": "A-line",
                "fit and flare": "A-line",
                "fitted bodice": "A-line",
                "mermaid": "Mermaid",
                "mermaid style": "Mermaid",
                "trumpet": "Mermaid",
                "fishtail": "Mermaid",
                "sheath": "Sheath",
                "sheath dress": "Sheath",
                "column": "Sheath",
                "column dress": "Sheath",
                "straight": "Sheath",
                "straight dress": "Sheath",
                "slim": "Sheath",
                "slim fit": "Sheath",
                "bodycon": "Sheath",
                "body con": "Sheath",
                "fitted": "Sheath",
                "tight fitting": "Sheath",
                "ball gown": "Ball gown",
                "ballgown": "Ball gown",
                "ball gown style": "Ball gown",
                "princess": "Ball gown",
                "princess style": "Ball gown",
                "full skirt": "Ball gown",
                "voluminous": "Ball gown",
                "empire": "Empire",
                "empire waist": "Empire",
                "empire style": "Empire",
                "shift": "Shift",
                "shift dress": "Shift",
                "straight shift": "Shift",
                "wrap": "Wrap",
                "wrap dress": "Wrap",
                "wrap style": "Wrap",
                "asymmetric": "Asymmetric",
                "asymmetrical": "Asymmetric",
                "uneven hem": "Asymmetric",
                "high-low": "High-low",
                "hi-lo": "High-low",
                "high low": "High-low",
                "mullet hem": "High-low",
                "tea length": "A-line",
                "midi": "A-line",
                "maxi": "A-line",
                "floor length": "A-line",
                "gown": "A-line",
                "evening gown": "A-line",
                "formal dress": "A-line",
                "cocktail dress": "Sheath",
                "pant suit": "Straight",
                "pantsuit": "Straight",
                "suit": "Straight"
            },
            "waistline": {
                "empire": "Empire",
                "natural": "Natural",
                "high waist": "Natural",
                "drop waist": "Drop waist",
                "dropped waist": "Drop waist",
                "low waist": "Drop waist",
                "basque": "Basque",
                "princess": "Princess",
                "no waist": "No waist",
                "undefined": "No waist"
            },
            "sleeves": {
                "sleeveless": "Sleeveless",
                "no sleeves": "Sleeveless",
                "without sleeves": "Sleeveless",
                "strapless": "Sleeveless",
                "tank": "Sleeveless",
                "tank top": "Sleeveless",
                "spaghetti strap": "Sleeveless",
                "spaghetti straps": "Sleeveless",
                "thin straps": "Sleeveless",
                "long sleeve": "Long sleeves",
                "long-sleeve": "Long sleeves",
                "long sleeved": "Long sleeves",
                "full sleeve": "Long sleeves",
                "full length sleeve": "Long sleeves",
                "short sleeve": "Short sleeves",
                "short-sleeve": "Short sleeves",
                "short sleeved": "Short sleeves",
                "cap sleeve": "Cap sleeves",
                "cap-sleeve": "Cap sleeves",
                "cap sleeved": "Cap sleeves",
                "three quarter": "3/4 sleeves",
                "3/4 sleeve": "3/4 sleeves",
                "three-quarter": "3/4 sleeves",
                "elbow": "3/4 sleeves",
                "elbow length": "3/4 sleeves",
                "puff sleeve": "Puff sleeves",
                "puff sleeved": "Puff sleeves",
                "puffed": "Puff sleeves",
                "puffy sleeves": "Puff sleeves",
                "balloon": "Puff sleeves",
                "balloon sleeves": "Puff sleeves",
                "bell sleeve": "Bell sleeves",
                "bell sleeves": "Bell sleeves",
                "flare": "Bell sleeves",
                "flared sleeves": "Bell sleeves",
                "bishop": "Bishop sleeves",
                "bishop sleeves": "Bishop sleeves",
                "flutter": "Flutter sleeves",
                "flutter sleeves": "Flutter sleeves",
                "kimono": "Kimono sleeves",
                "kimono sleeves": "Kimono sleeves",
                "dolman": "Dolman sleeves",
                "dolman sleeves": "Dolman sleeves",
                "raglan": "Raglan sleeves",
                "raglan sleeves": "Raglan sleeves",
                "off shoulder sleeves": "Off-shoulder sleeves",
                "cold shoulder": "Cold shoulder",
                "split sleeves": "Split sleeves"
            }
        }
        
        self.stats = {
            "processed": 0,
            "successful": 0,
            "failed": 0,
            "invalid_urls": 0,
            "start_time": None
        }
    
    def validate_url(self, url: str, timeout: int = 10) -> bool:
        """Validate if image URL is accessible and returns an image"""
        if not url or pd.isna(url):
            return False
        
        try:
            # Clean URL
            url = url.strip()
            if not url.startswith(('http://', 'https://')):
                return False
            
            response = requests.head(url, timeout=timeout, allow_redirects=True)
            
            # Check status code
            if response.status_code != 200:
                return False
            
            # Check content type
            content_type = response.headers.get('content-type', '').lower()
            if not any(img_type in content_type for img_type in ['image/', 'jpeg', 'jpg', 'png', 'gif', 'webp']):
                return False
            
            return True
            
        except Exception as e:
            logger.debug(f"URL validation failed for {url}: {e}")
            return False
    
    def extract_attributes_from_caption(self, caption: str) -> Dict[str, str]:
        """Extract fashion attributes from image caption using comprehensive mapping"""
        caption_lower = caption.lower()
        attributes = {
            "neckline": "Unknown",
            "silhouette": "Unknown", 
            "waistline": "Unknown",
            "sleeves": "Unknown"
        }
        
        # Enhanced extraction with more context clues
        # Extract each attribute type with priority scoring
        for attr_type, mappings in self.attribute_mappings.items():
            best_match = None
            best_score = 0
            
            for keyword, standard_term in mappings.items():
                if keyword in caption_lower:
                    # Score based on keyword specificity (longer keywords get higher scores)
                    # Also give higher priority to exact matches
                    score = len(keyword.split())
                    if keyword == standard_term.lower():  # Exact match bonus
                        score += 2
                    if score > best_score:
                        best_match = standard_term
                        best_score = score
            
            if best_match:
                attributes[attr_type] = best_match
        
        # Additional inference rules based on common dress descriptions
        self._apply_inference_rules(caption_lower, attributes)
        
        return attributes
    
    def _apply_inference_rules(self, caption_lower: str, attributes: Dict[str, str]):
        """Apply inference rules to improve attribute detection"""
        
        # Gown/dress type inference
        if "gown" in caption_lower and attributes["silhouette"] == "Unknown":
            if "ball" in caption_lower or "princess" in caption_lower:
                attributes["silhouette"] = "Ball gown"
            elif "mermaid" in caption_lower:
                attributes["silhouette"] = "Mermaid"  # Override for mermaid gowns
            elif "evening" in caption_lower or "formal" in caption_lower:
                attributes["silhouette"] = "A-line"  # Common for evening gowns
        
        # Pant suit handling
        if "pant suit" in caption_lower or "pantsuit" in caption_lower:
            attributes["silhouette"] = "Straight"  # Pant suits are typically straight
            attributes["sleeves"] = "Long sleeves"  # Most pant suits have long sleeves
        
        # Formal dress inference
        if "formal" in caption_lower and attributes["silhouette"] == "Unknown":
            attributes["silhouette"] = "A-line"  # Most formal dresses are A-line
        
        # Wedding/bridal inference
        if any(word in caption_lower for word in ["wedding", "bridal", "bride"]):
            if attributes["silhouette"] == "Unknown":
                attributes["silhouette"] = "A-line"
            if attributes["sleeves"] == "Unknown":
                attributes["sleeves"] = "Sleeveless"  # Many bridal dresses are sleeveless
        
        # Mother of the bride inference
        if "mother of the bride" in caption_lower:
            if attributes["sleeves"] == "Unknown":
                attributes["sleeves"] = "3/4 sleeves"  # Common for mother of bride dresses
            if attributes["neckline"] == "Unknown":
                attributes["neckline"] = "Scoop"  # Conservative neckline
        
        # Color and fabric clues
        if "sequin" in caption_lower or "beaded" in caption_lower:
            if attributes["silhouette"] == "Unknown":
                attributes["silhouette"] = "Sheath"  # Sequined dresses often fitted
        
        # Length clues for silhouette
        if "floor length" in caption_lower or "long dress" in caption_lower:
            if attributes["silhouette"] == "Unknown":
                attributes["silhouette"] = "A-line"
        
        # Sleeve inference from dress type
        if attributes["sleeves"] == "Unknown":
            if "tank" in caption_lower or "spaghetti" in caption_lower:
                attributes["sleeves"] = "Sleeveless"
            elif "jacket" in caption_lower or "blazer" in caption_lower:
                attributes["sleeves"] = "Long sleeves"
    
    def analyze_image(self, url: str, max_retries: int = 3) -> Dict[str, str]:
        """Analyze single image and extract fashion attributes"""
        for attempt in range(max_retries):
            try:
                # Download image
                response = requests.get(url, stream=True, timeout=15)
                response.raise_for_status()
                
                # Process image
                image = Image.open(response.raw).convert("RGB")
                
                # Generate multiple captions with different approaches for better coverage
                inputs = self.processor(image, return_tensors="pt")
                
                # Generate detailed caption
                with torch.no_grad():
                    output = self.model.generate(
                        **inputs, 
                        max_length=150,  # Longer captions for more details
                        num_beams=8,     # More beams for better quality
                        early_stopping=True,
                        do_sample=True,   # Add some randomness
                        temperature=0.7,  # Control randomness
                        num_return_sequences=1
                    )
                
                caption = self.processor.decode(output[0], skip_special_tokens=True)
                
                # Try to generate a second caption with different parameters for more coverage
                try:
                    with torch.no_grad():
                        output2 = self.model.generate(
                            **inputs,
                            max_length=120,
                            num_beams=5,
                            do_sample=True,
                            temperature=0.9,
                            num_return_sequences=1
                        )
                    caption2 = self.processor.decode(output2[0], skip_special_tokens=True)
                    # Combine captions for richer description
                    combined_caption = f"{caption}. {caption2}"
                    caption = combined_caption
                except:
                    # If second caption fails, use the first one
                    pass
                logger.debug(f"   AI Generated caption: {caption}")
                
                # Extract attributes
                attributes = self.extract_attributes_from_caption(caption)
                attributes["caption"] = caption
                
                logger.debug(f"   Attribute extraction completed")
                return attributes
                
            except Exception as e:
                logger.warning(f"Attempt {attempt + 1} failed for {url}: {e}")
                if attempt == max_retries - 1:
                    logger.error(f"Failed to process {url} after {max_retries} attempts")
                    return {
                        "neckline": "Error",
                        "silhouette": "Error", 
                        "waistline": "Error",
                        "sleeves": "Error",
                        "caption": f"Error: {str(e)}"
                    }
                time.sleep(1)  # Wait before retry
    
    def clean_and_standardize_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """Clean and standardize the extracted data"""
        logger.info("Cleaning and standardizing data...")
        
        # Remove duplicates based on image URL
        initial_count = len(df)
        df = df.drop_duplicates(subset=['Image URL'], keep='first')
        logger.info(f"Removed {initial_count - len(df)} duplicate URLs")
        
        # Clean attribute values
        attribute_columns = ['Neckline', 'Silhouette', 'Waistline', 'Sleeves']
        
        for col in attribute_columns:
            if col in df.columns:
                # Replace empty strings and None with "Unknown"
                df[col] = df[col].fillna("Unknown")
                df[col] = df[col].replace("", "Unknown")
                
                # Standardize case
                df[col] = df[col].str.title()
        
        # Add confidence score based on number of "Unknown" attributes
        df['Confidence_Score'] = df[attribute_columns].apply(
            lambda row: (4 - (row == 'Unknown').sum()) / 4 * 100, axis=1
        )
        
        return df
    
    def process_dataset(self, input_file: str, output_prefix: str = "fashion_data_processed") -> Tuple[pd.DataFrame, Dict]:
        """Process entire dataset and extract fashion attributes"""
        logger.info(f"Starting processing of {input_file}")
        self.stats["start_time"] = time.time()
        
        # Load data
        try:
            df = pd.read_excel(input_file)
            logger.info(f"Loaded {len(df)} records from {input_file}")
        except Exception as e:
            logger.error(f"Failed to load {input_file}: {e}")
            raise
        
        # Ensure required columns exist
        required_columns = ['Neckline', 'Silhouette', 'Waistline', 'Sleeves', 'Caption']
        for col in required_columns:
            if col not in df.columns:
                df[col] = ""
        
        # Process each row
        for idx, row in df.iterrows():
            self.stats["processed"] += 1
            url = row.get("Image URL", "")
            
            logger.info(f"[PROCESSING] {idx + 1}/{len(df)}")
            logger.info(f"   URL: {url}")
            
            # Validate URL
            if not self.validate_url(url):
                logger.warning(f"[INVALID URL] Row {idx}")
                logger.warning(f"   URL: {url}")
                logger.warning(f"   Skipping this row")
                logger.warning("-" * 80)
                self.stats["invalid_urls"] += 1
                continue
            
            # Analyze image
            try:
                attributes = self.analyze_image(url)
                
                # Update DataFrame
                df.at[idx, 'Neckline'] = attributes['neckline']
                df.at[idx, 'Silhouette'] = attributes['silhouette']
                df.at[idx, 'Waistline'] = attributes['waistline']
                df.at[idx, 'Sleeves'] = attributes['sleeves']
                df.at[idx, 'Caption'] = attributes['caption']
                
                self.stats["successful"] += 1
                
                # Log detailed extraction results
                logger.info(f"[SUCCESS] Row {idx} COMPLETED - Extracted attributes:")
                logger.info(f"   Caption: {attributes['caption']}")
                logger.info(f"   Neckline: {attributes['neckline']}")
                logger.info(f"   Silhouette: {attributes['silhouette']}")
                logger.info(f"   Waistline: {attributes['waistline']}")
                logger.info(f"   Sleeves: {attributes['sleeves']}")
                
                # Calculate and log confidence for this row
                extracted_attrs = [attributes['neckline'], attributes['silhouette'], 
                                 attributes['waistline'], attributes['sleeves']]
                unknown_count = sum(1 for attr in extracted_attrs if attr in ['Unknown', 'Error'])
                confidence = ((4 - unknown_count) / 4) * 100
                logger.info(f"   Confidence: {confidence:.1f}% ({4-unknown_count}/4 attributes identified)")
                logger.info("-" * 80)
                
            except Exception as e:
                logger.error(f"[FAILED] Row {idx} processing failed: {e}")
                logger.error(f"   URL: {url}")
                logger.error("-" * 80)
                self.stats["failed"] += 1
            
            # Add small delay to avoid overwhelming servers
            time.sleep(0.5)
            
            # Log progress summary every 10 rows
            if (idx + 1) % 10 == 0:
                elapsed_time = time.time() - self.stats["start_time"]
                avg_time_per_image = elapsed_time / (idx + 1)
                remaining_images = len(df) - (idx + 1)
                estimated_remaining_time = remaining_images * avg_time_per_image
                
                logger.info("=" * 80)
                logger.info(f"[PROGRESS SUMMARY] - Processed {idx + 1}/{len(df)} images")
                logger.info(f"   Successful: {self.stats['successful']}")
                logger.info(f"   Failed: {self.stats['failed']}")
                logger.info(f"   Invalid URLs: {self.stats['invalid_urls']}")
                logger.info(f"   Elapsed time: {elapsed_time/60:.1f} minutes")
                logger.info(f"   Average time per image: {avg_time_per_image:.1f} seconds")
                logger.info(f"   Estimated remaining time: {estimated_remaining_time/60:.1f} minutes")
                success_rate = (self.stats['successful'] / max(self.stats['processed'], 1)) * 100
                logger.info(f"   Success rate: {success_rate:.1f}%")
                logger.info("=" * 80)
        
        # Clean and standardize data
        df = self.clean_and_standardize_data(df)
        
        # Calculate processing time
        processing_time = time.time() - self.stats["start_time"]
        self.stats["processing_time"] = processing_time
        
        # Save outputs
        self.save_outputs(df, output_prefix)
        
        return df, self.stats
    
    def save_outputs(self, df: pd.DataFrame, output_prefix: str):
        """Save processed data in multiple formats"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        # Save Excel
        excel_file = f"{output_prefix}_{timestamp}.xlsx"
        df.to_excel(excel_file, index=False)
        logger.info(f"Saved Excel file: {excel_file}")
        
        # Save CSV
        csv_file = f"{output_prefix}_{timestamp}.csv"
        df.to_csv(csv_file, index=False)
        logger.info(f"Saved CSV file: {csv_file}")
        
        # Save JSON
        json_file = f"{output_prefix}_{timestamp}.json"
        df.to_json(json_file, orient='records', indent=2)
        logger.info(f"Saved JSON file: {json_file}")
        
        # Generate summary
        self.generate_summary_report(df, f"summary_report_{timestamp}")
    
    def generate_summary_report(self, df: pd.DataFrame, output_prefix: str):
        """Generate summary insights and visualizations"""
        logger.info("Generating summary report and visualizations...")
        
        # Create summary statistics
        summary = {
            "total_records": len(df),
            "processing_stats": self.stats,
            "attribute_distributions": {},
            "data_quality": {}
        }
        
        attribute_columns = ['Neckline', 'Silhouette', 'Waistline', 'Sleeves']
        
        # Calculate distributions for each attribute
        for col in attribute_columns:
            if col in df.columns:
                value_counts = df[col].value_counts()
                summary["attribute_distributions"][col] = value_counts.to_dict()
                
                # Data quality metrics
                unknown_count = (df[col] == 'Unknown').sum()
                error_count = (df[col] == 'Error').sum()
                valid_count = len(df) - unknown_count - error_count
                
                summary["data_quality"][col] = {
                    "valid_extractions": valid_count,
                    "unknown_values": unknown_count,
                    "error_values": error_count,
                    "accuracy_rate": (valid_count / len(df)) * 100
                }
        
        # Save summary as JSON
        summary_file = f"{output_prefix}.json"
        with open(summary_file, 'w') as f:
            json.dump(summary, f, indent=2, default=str)
        logger.info(f"Saved summary report: {summary_file}")
        
        # Create visualizations
        self.create_visualizations(df, output_prefix)
        
        return summary
    
    def create_visualizations(self, df: pd.DataFrame, output_prefix: str):
        """Create visualizations of attribute distributions"""
        try:
            plt.style.use('seaborn-v0_8')
            attribute_columns = ['Neckline', 'Silhouette', 'Waistline', 'Sleeves']
            
            # Create subplots
            fig, axes = plt.subplots(2, 2, figsize=(16, 12))
            fig.suptitle('Fashion Attribute Distributions', fontsize=16, fontweight='bold')
            
            for idx, col in enumerate(attribute_columns):
                if col in df.columns:
                    row, col_idx = idx // 2, idx % 2
                    ax = axes[row, col_idx]
                    
                    # Get value counts and filter out errors/unknown for better visualization
                    value_counts = df[col].value_counts()
                    
                    # Plot top 10 values
                    top_values = value_counts.head(10)
                    
                    bars = ax.bar(range(len(top_values)), top_values.values, 
                                 color=plt.cm.Set3(range(len(top_values))))
                    
                    ax.set_title(f'{col} Distribution', fontweight='bold')
                    ax.set_xlabel('Attributes')
                    ax.set_ylabel('Count')
                    ax.set_xticks(range(len(top_values)))
                    ax.set_xticklabels(top_values.index, rotation=45, ha='right')
                    
                    # Add value labels on bars
                    for bar, value in zip(bars, top_values.values):
                        ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.5,
                               str(value), ha='center', va='bottom', fontsize=9)
            
            plt.tight_layout()
            
            # Save visualization
            viz_file = f"{output_prefix}_distributions.png"
            plt.savefig(viz_file, dpi=300, bbox_inches='tight')
            logger.info(f"Saved visualizations: {viz_file}")
            plt.close()
            
            # Create confidence score distribution
            if 'Confidence_Score' in df.columns:
                plt.figure(figsize=(10, 6))
                plt.hist(df['Confidence_Score'], bins=20, color='skyblue', alpha=0.7, edgecolor='black')
                plt.title('Confidence Score Distribution', fontweight='bold')
                plt.xlabel('Confidence Score (%)')
                plt.ylabel('Number of Records')
                plt.grid(True, alpha=0.3)
                
                confidence_file = f"{output_prefix}_confidence.png"
                plt.savefig(confidence_file, dpi=300, bbox_inches='tight')
                logger.info(f"Saved confidence distribution: {confidence_file}")
                plt.close()
                
        except Exception as e:
            logger.error(f"Failed to create visualizations: {e}")


def main():
    """Main execution function"""
    # Configuration
    input_file = "Best_Seller_Tags.xlsx"  # Update with your file path
    output_prefix = "fashion_data_processed"
    
    # Initialize extractor
    extractor = FashionAttributeExtractor()
    
    try:
        # Process dataset
        df, stats = extractor.process_dataset(input_file, output_prefix)
        
        # Print final statistics
        print("\n" + "="*50)
        print("PROCESSING COMPLETED")
        print("="*50)
        print(f"Total records processed: {stats['processed']}")
        print(f"Successful extractions: {stats['successful']}")
        print(f"Failed extractions: {stats['failed']}")
        print(f"Invalid URLs: {stats['invalid_urls']}")
        print(f"Processing time: {stats['processing_time']:.2f} seconds")
        print(f"Average time per image: {stats['processing_time']/max(stats['processed'], 1):.2f} seconds")
        
        if 'Confidence_Score' in df.columns:
            avg_confidence = df['Confidence_Score'].mean()
            print(f"Average confidence score: {avg_confidence:.1f}%")
        
        print("\nFiles generated:")
        print("- Excel, CSV, and JSON output files")
        print("- Summary report with statistics")
        print("- Visualization charts")
        print("- Processing log file")
        
    except Exception as e:
        logger.error(f"Processing failed: {e}")
        raise


if __name__ == "__main__":
    main()