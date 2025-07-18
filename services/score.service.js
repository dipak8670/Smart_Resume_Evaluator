const filterwords = require("../utils/filterwords");

const normalizeText = (text) => {
    return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(word => word && !filterwords.includes(word));
};

exports.scoreResumeText = (resumeText, keywords = []) => {
    const normalizedResumeWords = normalizeText(resumeText);
    const resumeWordSet = new Set(normalizedResumeWords);

    let matched = [];

    keywords.forEach((keyword)=>{
        const normalizedKeyword = keyword.trim().toLowerCase();
        if(resumeWordSet.has(normalizedKeyword)){
            matched.push(normalizedKeyword);
        }
    });

    const scorePercent = Math.round((matched.length / keywords.length) * 100);

    return {
        score: scorePercent,
        matchedKeywords: matched,
        totalKeywords: keywords.length,
        textPreview: resumeText.substring(0, 500) + "..."
    };
};