const express = require("express");
const router = express.Router();

const upload = require("../utils/multerConfig");
const { uploadResume, scoreResume } = require("../controllers/evaluator.controller");

router.post("/upload", upload.single("resume"), uploadResume);

router.post("/score", scoreResume);

module.exports = router;