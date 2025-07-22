const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

async function extractPDF() {
  try {
    // Path to your PDF file (adjust if needed)
    const pdfPath = path.join(__dirname, '../research.pdf');
    
    // Check if file exists
    if (!fs.existsSync(pdfPath)) {
      console.log('❌ PDF file not found at:', pdfPath);
      console.log('📍 Please make sure research.pdf is in the correct location');
      return;
    }

    console.log('📄 Reading PDF file...');
    const dataBuffer = fs.readFileSync(pdfPath);
    
    console.log('🔍 Extracting text content...');
    const data = await pdf(dataBuffer);
    
    console.log('✅ Extraction complete!');
    console.log('📊 Total pages:', data.numpages);
    console.log('📝 Total text length:', data.text.length, 'characters');
    console.log('\n' + '='.repeat(80));
    console.log('📋 EXTRACTED CONTENT:');
    console.log('='.repeat(80));
    
    // Output the extracted text
    console.log(data.text);
    
    // Also save to a text file for easier handling
    const outputPath = path.join(__dirname, 'extracted-content.txt');
    fs.writeFileSync(outputPath, data.text);
    console.log('\n✅ Content also saved to:', outputPath);
    
  } catch (error) {
    console.error('❌ Error extracting PDF:', error.message);
    
    if (error.message.includes('Invalid PDF')) {
      console.log('💡 The file might be corrupted or not a valid PDF');
    } else if (error.message.includes('ENOENT')) {
      console.log('💡 File not found. Please check the path to your PDF');
    }
  }
}

extractPDF();
