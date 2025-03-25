const express = require("express");
const router = express.Router();
const { getContents } = require("../controllers/contentController");
const { openFile } = require("../controllers/contentController");
const { batchRunPythonFiles } = require("../controllers/contentController");
// routes for fetching contents, opening file and batch run
router.get("/get-contents", getContents);
router.post("/open-file", openFile);
router.post("/batch-run",  batchRunPythonFiles );

module.exports = router;
