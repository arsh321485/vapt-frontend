#!/usr/bin/env python3
"""
Test script to demonstrate the enhanced logging functionality
"""

import pandas as pd
from fashion_attribute_extractor import FashionAttributeExtractor
import logging

# Configure logging to show DEBUG messages as well
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('test_logging.log'),
        logging.StreamHandler()
    ]
)

def test_enhanced_logging():
    """Test the enhanced logging with a small sample"""
    
    # Create sample data with a mix of valid and invalid URLs
    sample_data = {
        "Image URL": [
            "https://cdn.shopify.com/s/files/1/1109/3312/files/dylan-and-davids-long-sleeve-sequin-formal-beaded-dress-the-dress-outlet-12_d05f5465-76d2-4608-ac03-a8268725b85c.jpg?v=1752249843",
            "https://invalid-url-example.com/nonexistent.jpg",
            "https://cdn.shopify.com/s/files/1/1109/3312/files/randm-richards-358260-plus-size-long-mother-of-the-bride-dress-17.jpg?v=1742949333",
            "not-a-valid-url",
            "https://cdn.shopify.com/s/files/1/1109/3312/files/randm-richards-1993w-plus-size-mother-of-the-bride-pant-suit-47.jpg?v=1740420605"
        ]
    }
    
    # Create DataFrame
    df = pd.DataFrame(sample_data)
    
    # Save as Excel file for testing
    test_file = "test_sample.xlsx"
    df.to_excel(test_file, index=False)
    
    print("="*80)
    print("TESTING ENHANCED LOGGING FUNCTIONALITY")
    print("="*80)
    print(f"Created test file: {test_file}")
    print(f"Sample contains {len(df)} URLs (mix of valid/invalid)")
    print("="*80)
    
    # Initialize extractor
    extractor = FashionAttributeExtractor()
    
    # Process the test dataset
    try:
        df_result, stats = extractor.process_dataset(test_file, "test_output")
        
        print("\n" + "="*80)
        print("TEST COMPLETED")
        print("="*80)
        print(f"Check the logs above to see detailed extraction results for each row")
        print(f"Log file saved as: test_logging.log")
        
    except Exception as e:
        print(f"Error during testing: {e}")

if __name__ == "__main__":
    test_enhanced_logging()