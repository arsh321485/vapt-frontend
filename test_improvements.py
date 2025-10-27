#!/usr/bin/env python3
"""
Test script to verify the improved attribute extraction
"""

from fashion_attribute_extractor import FashionAttributeExtractor

def test_attribute_extraction():
    """Test the improved attribute extraction with sample captions"""
    
    extractor = FashionAttributeExtractor()
    
    # Test cases based on the actual captions we've seen
    test_cases = [
        {
            "caption": "a woman in a blue and silver gown",
            "expected_improvements": ["gown should trigger A-line silhouette"]
        },
        {
            "caption": "a woman wearing a grey pant suit", 
            "expected_improvements": ["pant suit should trigger Straight silhouette and Long sleeves"]
        },
        {
            "caption": "a woman in a long sleeve sequin formal beaded dress",
            "expected_improvements": ["long sleeve should be detected", "sequin should suggest Sheath", "formal should suggest A-line"]
        },
        {
            "caption": "mother of the bride formal dress with three quarter sleeves",
            "expected_improvements": ["mother of the bride inference", "three quarter sleeves", "formal dress"]
        },
        {
            "caption": "strapless ball gown wedding dress",
            "expected_improvements": ["strapless neckline", "ball gown silhouette", "wedding dress inference"]
        },
        {
            "caption": "v-neck mermaid evening gown with long sleeves",
            "expected_improvements": ["v-neck neckline", "mermaid silhouette", "long sleeves"]
        }
    ]
    
    print("Testing Improved Fashion Attribute Extraction")
    print("=" * 60)
    
    for i, test_case in enumerate(test_cases, 1):
        caption = test_case["caption"]
        print(f"\nTest {i}: {caption}")
        print("-" * 50)
        
        # Extract attributes
        attributes = extractor.extract_attributes_from_caption(caption)
        
        # Display results
        print(f"Neckline: {attributes['neckline']}")
        print(f"Silhouette: {attributes['silhouette']}")
        print(f"Waistline: {attributes['waistline']}")
        print(f"Sleeves: {attributes['sleeves']}")
        
        # Calculate confidence
        unknown_count = sum(1 for attr in attributes.values() if attr == 'Unknown')
        confidence = ((4 - unknown_count) / 4) * 100
        print(f"Confidence: {confidence:.1f}% ({4-unknown_count}/4 attributes identified)")
        
        print(f"Expected improvements: {', '.join(test_case['expected_improvements'])}")

if __name__ == "__main__":
    test_attribute_extraction()