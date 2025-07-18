const fs = require("fs");
const pdf = require("pdf-parse");

exports.extractTextFromPDF = async (pdfPath) => {
    try{
        const fileBuffer = fs.readFileSync(pdfPath);

        const data = await pdf(fileBuffer);

        return data.text;
    }catch(err){
        console.error("PDF parsing error:", err);
        throw new Error("Failed to extract text from resume");
    }
};