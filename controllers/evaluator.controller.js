const fs = require("fs");

const { extractTextFromPDF } = require("../services/pdfParser.service");
const { scoreResumeText } = require("../services/score.service");

// Upload resume controller
exports.uploadResume = (req, res) => {
    try{
        if(!req.file){
            return res.status(400).json({ error: "No file uploaded."});
        }

        return res.status(200).json({
            message: "Resume uploaded successfully!",
            filename: req.file.filename,
            path: req.file.path
        });
    }catch(err){
        console.error("Upload error:", err);
        return res.status(500).json({ error: "Resume upload failed" });
    }
};

// Score Resume controller
exports.scoreResume = async(req, res) => {
    try{
        const { resumePath, keywords = [] } = req.body;

        if(!resumePath || !fs.existsSync(resumePath)){
            return res.status(400).json({ error: "Valid resumePath is required" });
        }

        const resumeText = await extractTextFromPDF(resumePath);

        const score = scoreResumeText(resumeText, keywords);

        return res.status(200).json({
            message: "Resume Scored Successfully",
            resumeScore: score.score,
            matchedKeywords: score.matchedKeywords,
            totalKeywords: score.totalKeywords,
            resumeText: score.textPreview
        });
    }catch(err){
        console.error("Score error:", err);
        return res.status(500).json({ error: "Resume scoring failed" });
    }
};