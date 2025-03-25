const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Fetch the contents of a folder 

export const fetchContents = async (folder = "") => {
  try {
    const response = await fetch(`${API_BASE_URL}/get-contents${folder ? `?folder=${folder}` : ""}`);
    return response.json();
  } catch (error) {
    console.error("Error fetching contents:", error);
    return { folders: [], files: [] };
  }
};
 
// Open a file
export const openFile = async (filePath) => {
  try {
    const response = await fetch(`${API_BASE_URL}/open-file`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filePath }),
    });
    const data = await response.json(); // Ensure we parse JSON

    return data; // Return parsed JSON
  } catch (error) {
    console.error("Error opening file:", error);
    return { message: "Error opening file" }; 
  }
};

// Batch run files
export const batchRun = async (files, project) => {
  try {
    const response = await fetch(`${API_BASE_URL}/batch-run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ files, project }), 
    });
    return response.json(); // Parse and return the response
  } catch (error) {
    console.error("Error in batch run:", error);
    return { error: "Batch run failed" };
  }
};


