const express = require("express");
const router = express.Router();

const filterWords = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "for",
  "with",
  "in",
  "on",
  "to",
  "of",
  "by",
  "is",
  "are",
  "as",
  "at",
  "from",
  "this",
  "that",
  "be",
  "we",
  "you",
  "looking",
  "I",
  "i",
  "skills"
]);

router.post("/score", (req, res) => {
  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res
      .status(400)
      .json({ error: "Missing resumeText or jobDescription" });
  }

  const jdWords = jobDescription
    .toLowerCase()
    .match(/\w+/g)
    .filter((word) => !filterWords.has(word));
  const resumeWords = resumeText
    .toLowerCase()
    .match(/\w+/g)
    .filter((word) => !filterWords.has(word));

  const jdSet = new Set(jdWords);

  const matched = [];
  const missing = [];

  jdSet.forEach((word) => {
    if (resumeWords.includes(word)) {
      matched.push(word);
    } else {
      missing.push(word);
    }
  });

  const atsScore = Math.round((matched.length / jdSet.size) * 100);

  res.json({
    atsScore,
    matchedSkills: matched.slice(0, 10),
    missingSkills: missing.slice(0, 10),
    suggestions: [
      "Mention missing keywords if they match your experience",
      "Quantify your achievements using numbers",
      "Use action verbs like 'led', 'built', 'achieved'"
    ]
  });
});

module.exports = router;
