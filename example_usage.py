#!/usr/bin/env python3
"""
Example usage of the Fashion Attribute Extractor

This script demonstrates different ways to use the FashionAttributeExtractor class
for processing dress images and extracting fashion attributes.
"""

from fashion_attribute_extractor import FashionAttributeExtractor
import pandas as pd
import logging

# Configure logging for this example
logging.basicConfig(level=logging.INFO)

def example_1_basic_usage():
    """Example 1: Basic usage with default settings"""
    print("="*60)
    print("EXAMPLE 1: Basic Usage")
    print("="*60)
    
    # Initialize extractor
    extractor = FashionAttributeExtractor()
    
    # Process dataset (update with your actual file path)
    input_file = "Best_Seller_Tags.xlsx"  # Replace with your file
    
    try:
        df, stats = extractor.process_dataset(input_file)
        
        print(f"Processing completed!")
        print(f"Total processed: {stats['processed']}")
        print(f"Successful: {stats['successful']}")
        print(f"Failed: {stats['failed']}")
        
    except FileNotFoundError:
        print(f"File {input_file} not found. Please update the path.")
    except Exception as e:
        print(f"Error: {e}")

def example_2_single_image_analysis():
    """Example 2: Analyze a single image URL"""
    print("\n" + "="*60)
    print("EXAMPLE 2: Single Image Analysis")
    print("="*60)
    
    # Initialize extractor
    extractor = FashionAttributeExtractor()
    
    # Example image URL (replace with a real dress image URL)
    image_url = "https://example.com/dress.jpg"
    
    # Validate URL first
    if extractor.validate_url(image_url):
        print(f"Analyzing image: {image_url}")
        attributes = extractor.analyze_image(image_url)
        
        print("Extracted attributes:")
        for attr, value in attributes.items():
            print(f"  {attr.title()}: {value}")
    else:
        print(f"Invalid or inaccessible URL: {image_url}")

def example_3_custom_configuration():
    """Example 3: Custom configuration and batch processing"""
    print("\n" + "="*60)
    print("EXAMPLE 3: Custom Configuration")
    print("="*60)
    
    # Initialize with custom model (if available)
    extractor = FashionAttributeExtractor(
        model_name="Salesforce/blip-image-captioning-base"
    )
    
    # Create sample data
    sample_urls = [
        "https://example1.com/dress1.jpg",
        "https://example2.com/dress2.jpg",
        "https://example3.com/dress3.jpg"
    ]
    
    # Create DataFrame
    df = pd.DataFrame({"Image URL": sample_urls})
    
    print(f"Processing {len(df)} sample URLs...")
    
    # Process each URL
    for idx, row in df.iterrows():
        url = row["Image URL"]
        print(f"Processing URL {idx + 1}: {url}")
        
        if extractor.validate_url(url):
            attributes = extractor.analyze_image(url)
            print(f"  Results: {attributes}")
        else:
            print(f"  Invalid URL: {url}")

def example_4_data_analysis():
    """Example 4: Analyze processed results"""
    print("\n" + "="*60)
    print("EXAMPLE 4: Data Analysis")
    print("="*60)
    
    # Create sample processed data
    sample_data = {
        "Image URL": [
            "https://example1.com/dress1.jpg",
            "https://example2.com/dress2.jpg", 
            "https://example3.com/dress3.jpg",
            "https://example4.com/dress4.jpg"
        ],
        "Neckline": ["V-neck", "Sweetheart", "Crew", "Halter"],
        "Silhouette": ["A-line", "Mermaid", "Sheath", "Ball gown"],
        "Waistline": ["Natural", "Empire", "Natural", "Natural"],
        "Sleeves": ["Sleeveless", "Short sleeves", "Long sleeves", "Cap sleeves"]
    }
    
    df = pd.DataFrame(sample_data)
    
    # Initialize extractor for data cleaning
    extractor = FashionAttributeExtractor()
    
    # Clean and analyze data
    df_cleaned = extractor.clean_and_standardize_data(df)
    
    print("Sample data analysis:")
    print(f"Total records: {len(df_cleaned)}")
    
    # Show attribute distributions
    attribute_columns = ['Neckline', 'Silhouette', 'Waistline', 'Sleeves']
    for col in attribute_columns:
        if col in df_cleaned.columns:
            print(f"\n{col} distribution:")
            value_counts = df_cleaned[col].value_counts()
            for value, count in value_counts.items():
                print(f"  {value}: {count}")

def example_5_url_validation():
    """Example 5: URL validation testing"""
    print("\n" + "="*60)
    print("EXAMPLE 5: URL Validation")
    print("="*60)
    
    extractor = FashionAttributeExtractor()
    
    # Test various URL formats
    test_urls = [
        "https://www.example.com/dress.jpg",  # Valid format
        "http://example.com/image.png",       # Valid format
        "https://broken-link.com/dress.jpg",  # Likely broken
        "not-a-url",                          # Invalid format
        "",                                   # Empty string
        None                                  # None value
    ]
    
    print("Testing URL validation:")
    for url in test_urls:
        is_valid = extractor.validate_url(url)
        status = "✓ Valid" if is_valid else "✗ Invalid"
        print(f"  {status}: {url}")

def main():
    """Run all examples"""
    print("Fashion Attribute Extractor - Example Usage")
    print("="*60)
    
    # Run examples
    try:
        example_1_basic_usage()
        example_2_single_image_analysis()
        example_3_custom_configuration()
        example_4_data_analysis()
        example_5_url_validation()
        
        print("\n" + "="*60)
        print("All examples completed!")
        print("="*60)
        
    except Exception as e:
        print(f"Error running examples: {e}")

if __name__ == "__main__":
    main()