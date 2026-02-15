# Fashion Attribute Extraction from Dress Images

This project provides an AI-powered solution for extracting detailed fashion attributes from dress images using computer vision and natural language processing. The system analyzes dress images and automatically identifies key fashion attributes including neckline, silhouette, waistline, and sleeve types.

## 🎯 Features

- **AI-Powered Analysis**: Uses Hugging Face BLIP model for image captioning and attribute extraction
- **Comprehensive Attribute Mapping**: Supports 18+ neckline types, 15+ silhouette types, 8+ waistline types, and 12+ sleeve types
- **Robust URL Validation**: Validates image URLs and handles broken/inaccessible links
- **Data Cleaning & Standardization**: Removes duplicates and standardizes fashion terminology
- **Multiple Output Formats**: Saves results in Excel, CSV, and JSON formats
- **Progress Tracking**: Real-time logging and progress monitoring
- **Quality Metrics**: Calculates confidence scores and accuracy rates
- **Visualizations**: Generates distribution charts and summary reports

## 📋 Requirements

- Python 3.8+
- GPU recommended for faster processing (optional)

## 🚀 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fashion-attribute-extraction
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## 📊 Usage

### Basic Usage

1. Prepare your Excel file with dress image URLs in a column named "Image URL"
2. Update the `input_file` path in the script
3. Run the extraction:

```bash
python fashion_attribute_extractor.py
```

### Advanced Usage

```python
from fashion_attribute_extractor import FashionAttributeExtractor

# Initialize extractor
extractor = FashionAttributeExtractor()

# Process dataset
df, stats = extractor.process_dataset("your_file.xlsx", "output_prefix")

# Print results
print(f"Processed {stats['successful']} images successfully")
```

## 📁 Input Format

Your Excel file should contain at minimum:
- **Image URL**: Column with dress image URLs

Example:
```
| Image URL                           | Other Columns... |
|-------------------------------------|------------------|
| https://example.com/dress1.jpg      | ...              |
| https://example.com/dress2.jpg      | ...              |
```

## 📤 Output Files

The script generates several output files:

1. **fashion_data_processed_YYYYMMDD_HHMMSS.xlsx** - Main results in Excel format
2. **fashion_data_processed_YYYYMMDD_HHMMSS.csv** - Results in CSV format  
3. **fashion_data_processed_YYYYMMDD_HHMMSS.json** - Results in JSON format
4. **summary_report_YYYYMMDD_HHMMSS.json** - Statistical summary and quality metrics
5. **summary_report_YYYYMMDD_HHMMSS_distributions.png** - Attribute distribution charts
6. **summary_report_YYYYMMDD_HHMMSS_confidence.png** - Confidence score distribution
7. **fashion_extraction.log** - Processing log file

## 🏷️ Supported Fashion Attributes

### Necklines
- Sweetheart, V-neck, Scoop, Crew, Boat, Halter
- Off-shoulder, One-shoulder, Strapless, Square
- High neck, Mock neck, Cowl, Keyhole

### Silhouettes  
- A-line, Mermaid, Sheath, Ball gown, Empire
- Shift, Wrap, Asymmetric, High-low

### Waistlines
- Empire, Natural, Drop waist, Basque
- Princess, No waist

### Sleeves
- Sleeveless, Long sleeves, Short sleeves, Cap sleeves
- 3/4 sleeves, Puff sleeves, Bell sleeves, Bishop sleeves
- Flutter sleeves, Kimono sleeves, Dolman sleeves, Raglan sleeves

## 📈 Quality Metrics

The system provides several quality indicators:

- **Confidence Score**: Percentage based on successfully identified attributes (0-100%)
- **Accuracy Rate**: Percentage of valid extractions per attribute type
- **Processing Statistics**: Success/failure rates and processing times

## 🔧 Configuration

Key parameters you can adjust:

```python
# Model selection
model_name = "Salesforce/blip-image-captioning-base"

# URL validation timeout
timeout = 10

# Maximum retry attempts
max_retries = 3

# Processing delay between images
time.sleep(0.5)
```

## 📝 Logging

The system provides detailed logging at multiple levels:
- **INFO**: General progress and statistics
- **WARNING**: Non-critical issues (invalid URLs, retry attempts)
- **ERROR**: Critical failures
- **DEBUG**: Detailed processing information

## 🚨 Error Handling

The system gracefully handles:
- Invalid or broken image URLs
- Network timeouts and connection issues
- Image processing failures
- Missing or corrupted data
- API rate limiting

## 🎨 Visualizations

Automatically generated charts include:
- Attribute distribution bar charts for all four categories
- Confidence score histogram
- Data quality metrics visualization

## 💡 Tips for Best Results

1. **Image Quality**: Higher quality images yield better results
2. **URL Validation**: Ensure image URLs are accessible and point to actual images
3. **Batch Processing**: For large datasets, consider processing in smaller batches
4. **Manual Review**: Review results with low confidence scores manually
5. **Custom Mapping**: Extend attribute mappings for specialized terminology

## 🔍 Troubleshooting

**Common Issues:**

1. **CUDA/GPU Issues**: The script works on CPU by default
2. **Memory Issues**: Reduce batch size or process smaller datasets
3. **Network Issues**: Check internet connection and URL accessibility
4. **Model Download**: First run downloads the BLIP model (~2GB)

## 📊 Performance

Typical processing times:
- **Model Loading**: 30-60 seconds (first run)
- **Per Image**: 2-5 seconds depending on image size and network
- **1000 Images**: ~60-90 minutes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for:
- Additional fashion attribute categories
- Improved attribute mapping
- Performance optimizations
- Bug fixes

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Hugging Face for the BLIP model
- Salesforce for the pre-trained image captioning model
- Fashion industry terminology standards