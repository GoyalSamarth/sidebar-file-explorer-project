import React, { useEffect, useState } from "react";
import { fetchContents, openFile, batchRun } from "../../services/api";

const FileExplorer = ({ currentPath, setCurrentPath }) => {
  //state to store folders, files and selected files
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  //fetch contents of the current path
  useEffect(() => {
    const loadContents = async () => {
      //if current path is root, set folder name to empty string
      const folderName = currentPath === "C:/Graphics/Projects" ? "" : currentPath.split("/").pop();
      try {
        const data = await fetchContents(folderName);
        setFolders(data.folders || []);
        setFiles(data.files || []);
      } catch (error) {
        console.error("Error fetching contents:", error);
        setFolders([]);
        setFiles([]);
      }
    };

    loadContents(); //call the function
  }, [currentPath]);

  //function to handle folder click
  const handleFolderClick = (folderName) => {
    setCurrentPath(`${currentPath}/${folderName}`);
  };


  //function to handle file click
  const handleFileClick = async (fileName) => {
    const filePath = `${currentPath}/${fileName}`;
    const response = await openFile(filePath);
    alert(response.message || "Something went wrong");
  };

  //function to toggle file selection
  const toggleFileSelection = (fileName) => {
    setSelectedFiles((prev) =>
      prev.includes(fileName) ? prev.filter((f) => f !== fileName) : [...prev, fileName]
    );
  };

  //  function to handle batch run
  const handleBatchRun = async () => {
    if (selectedFiles.length === 0) return;
  
    const filePaths = selectedFiles.map((file) => `${currentPath}/${file}`);
    const project = currentPath.split("/").pop();
  
    console.log("Sending batch run request with files:", filePaths);
  
    try {
      
      const response = await batchRun(filePaths, project);
      console.log("Batch Run Response:", response);
  
      if (response.results) {
        const outputMessage = response.results
          .map((r) => `${r.file}:\n${r.status} - ${r.output || r.message}`)
          .join("\n\n");
  
        alert(`Batch Run Completed:\n\n${outputMessage}`); //show the output message
      } else {
        alert(response.error || "Batch run failed"); //show error message
      }
    } catch (error) {
      console.error("Error during batch run:", error);
    }
  };

  return (
    <div className="p-2 sm:p-4">
      {/* display curernt folder path  */}
      <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-center">
        {currentPath === "C:/Graphics/Projects" ? "Welcome to the Dashboard" : currentPath.replace("C:/Graphics/", "")}
      </h2>

      {/* render folder List */}
      <div className="flex flex-wrap gap-2 sm:gap-4 border-b pb-2 justify-center">
        {folders.length > 0 ? (
          folders.map((folder) => (
            <button
              key={folder.name}
              className="px-2 py-1 sm:px-4 sm:py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm sm:text-base flex-1 min-w-[120px] sm:flex-none sm:min-w-0"
              onClick={() => handleFolderClick(folder.name)}
            >
              📁 {folder.name}
            </button>
          ))
        ) : (
          <p className="text-sm text-center"></p>
        )}
      </div>

      {/* render file List */}
      <ul className="mt-2 sm:mt-4 space-y-1 sm:space-y-2">
        {files.length > 0 ? (
          files.map((file) => (
            <li
              key={file.name}
              className="p-1 sm:p-2 border-b cursor-pointer hover:bg-gray-100 flex items-center justify-between text-xs sm:text-sm"
            >
              {file.type === "py" && (
                <input
                  type="checkbox"
                  className="mr-1 sm:mr-2 w-4 sm:w-5 h-4 sm:h-5"
                  checked={selectedFiles.includes(file.name)}
                  onChange={() => toggleFileSelection(file.name)}
                />
              )}
              <span onClick={() => handleFileClick(file.name)} className="flex-1 text-center sm:text-left">
                📄 {file.name} ({file.type}) - {file.owner} - {file.modified}
              </span>
            </li>
          ))
        ) : (
          <p className="text-sm text-center"></p>
        )}
      </ul>

      {/* Batch Run Button */}
      {selectedFiles.length > 0 && currentPath !== "C:/Graphics/Projects" && (
        <div className="mt-2 sm:mt-4 flex justify-center">
          <button
            className="px-4 py-1 sm:px-6 sm:py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base w-full sm:w-auto"
            onClick={handleBatchRun}
          >
            Run Selected Files
          </button>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;