import React from "react";
import FileExplorer from "../../components/Content/FileExplorer";

const Dashboard = ({ currentPath, setCurrentPath }) => {
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.reload(); // Refresh to go back to login
  };

  return (
    <div className="flex flex-col items-center justify-center sm:p-4  h-full ">
      <h1 className="text-3xl font-bold mb-4 text-center">Welcome to the Dashboard 🎉</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
      <h1 className="text-xl font-bold p-4">File Explorer</h1>
      <FileExplorer currentPath={currentPath} setCurrentPath={setCurrentPath} />
    </div>
  );
};

export default Dashboard;
