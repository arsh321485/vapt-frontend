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
                "scoop": "Scoop",
                "crew": "Crew",
                "round neck": "Crew",
                "boat neck": "Boat",
                "bateau": "Boat",
                "halter": "Halter",
                "off shoulder": "Off-shoulder",
                "off-shoulder": "Off-shoulder",
                "one shoulder": "One-shoulder",
                "strapless": "Strapless",
                "square": "Square",
                "high neck": "High neck",
                "mock neck": "Mock neck",
                "cowl": "Cowl",
                "keyhole": "Keyhole"
            },
            "silhouette": {
                "a-line": "A-line",
                "a line": "A-line",
                "flowy": "A-line",
                "fit and flare": "A-line",
                "mermaid": "Mermaid",
                "trumpet": "Mermaid",
                "fishtail": "Mermaid",
                "sheath": "Sheath",
                "column": "Sheath",
                "straight": "Sheath",
                "slim": "Sheath",
                "bodycon": "Sheath",
                "ball gown": "Ball gown",
                "ballgown": "Ball gown",
                "princess": "Ball gown",
                "empire": "Empire",
                "shift": "Shift",
                "wrap": "Wrap",
                "asymmetric": "Asymmetric",
                "high-low": "High-low",
                "hi-lo": "High-low"
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
                "strapless": "Sleeveless",
                "tank": "Sleeveless",
                "long sleeve": "Long sleeves",
                "long-sleeve": "Long sleeves",
                "full sleeve": "Long sleeves",
                "short sleeve": "Short sleeves",
                "short-sleeve": "Short sleeves",
                "cap sleeve": "Cap sleeves",
                "cap-sleeve": "Cap sleeves",
                "three quarter": "3/4 sleeves",
                "3/4 sleeve": "3/4 sleeves",
                "elbow": "3/4 sleeves",
                "puff sleeve": "Puff sleeves",
                "puffed": "Puff sleeves",
                "balloon": "Puff sleeves",
                "bell sleeve": "Bell sleeves",
                "flare": "Bell sleeves",
                "bishop": "Bishop sleeves",
                "flutter": "Flutter sleeves",
                "kimono": "Kimono sleeves",
                "dolman": "Dolman sleeves",
                "raglan": "Raglan sleeves"
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
        
        # Extract each attribute type
        for attr_type, mappings in self.attribute_mappings.items():
            for keyword, standard_term in mappings.items():
                if keyword in caption_lower:
                    attributes[attr_type] = standard_term
                    break  # Use first match to avoid conflicts
        
        return attributes
    
    def analyze_image(self, url: str, max_retries: int = 3) -> Dict[str, str]:
        """Analyze single image and extract fashion attributes"""
        for attempt in range(max_retries):
            try:
                # Download image
                response = requests.get(url, stream=True, timeout=15)
                response.raise_for_status()
                
                # Process image
                image = Image.open(response.raw).convert("RGB")
                
                # Generate caption
                inputs = self.processor(image, return_tensors="pt")
                with torch.no_grad():
                    output = self.model.generate(
                        **inputs, 
                        max_length=100,
                        num_beams=5,
                        early_stopping=True
                    )
                
                caption = self.processor.decode(output[0], skip_special_tokens=True)
                logger.debug(f"Generated caption: {caption}")
                
                # Extract attributes
                attributes = self.extract_attributes_from_caption(caption)
                attributes["caption"] = caption
                
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
            
            logger.info(f"Processing {idx + 1}/{len(df)}: {url}")
            
            # Validate URL
            if not self.validate_url(url):
                logger.warning(f"Invalid URL at row {idx}: {url}")
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
                logger.info(f"Successfully processed row {idx}")
                
            except Exception as e:
                logger.error(f"Failed to process row {idx}: {e}")
                self.stats["failed"] += 1
            
            # Add small delay to avoid overwhelming servers
            time.sleep(0.5)
        
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