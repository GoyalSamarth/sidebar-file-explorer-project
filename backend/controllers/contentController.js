const data = require("../data/mockData.json");
const { exec } = require("child_process"); // to run the shell commands
const path = require("path");

// function to fetch contents based on the folder
const getContents = (req, res) => {
  const { folder } = req.query;

  if (!folder) {
    // If no folder is specified, return only the project folders (root level)
    const projectFolders = data.folders.map(({ name, modified, owner }) => ({
      name,
      modified,
      owner
    }));
    return res.json({ folders: projectFolders, files: [] });
  }

  // Find the selected folder's files
  const selectedFolder = data.folders.find((f) => f.name === folder);
  if (!selectedFolder) {
    // if no folder found 
    return res.status(404).json({ error: "Folder not found" });
  }
// returns the files 
  res.json({ folders: [], files: selectedFolder.files });
};

//  openFile function
const openFile = (req, res) => {
  const { filePath } = req.body;


  if (!filePath) {
    return res.status(400).json({ error: "File path is required" });
  }

  res.json({ message: `File ${filePath} opened successfully` });
};

// funtion to handle batch run of python files
const batchRunPythonFiles = async (req, res) => {
  const { files, project } = req.body;
  
  
// Check if files or project name is missing and return an error
  if (!files || !project) {
    return res.status(400).json({ error: "Missing files or project name." });
  }

  let completed = 0;
  let results = [];

  files.forEach((file) => {
    const fileName = path.basename(file); // Extracts file name 
    const filePath = path.join(__dirname, "../data/scripts", project, fileName);

     // Execute the Python file using the exec function

    exec(`python "${filePath}"`, (error, stdout, stderr) => {
      completed++;

      if (error) {
        console.error(`Error executing ${filePath}:`, error.message);
        results.push({ file, status: "error", message: stderr || error.message });
      } else {
     
        results.push({ file, status: "success", output: stdout.trim() });
      }

      // Respond when all files are processed
      if (completed === files.length) {
       
        res.json({ results });
      }
    });
  });
};

module.exports = { getContents, openFile, batchRunPythonFiles };
