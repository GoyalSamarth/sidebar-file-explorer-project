import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const [currentPath, setCurrentPath] = useState("C:/Graphics/Projects");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track sidebar state

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      <div className="flex flex-col h-screen">
        {/* Render only the Login page when not authenticated */}
        {!isAuthenticated ? (
          <div className="flex justify-center items-center h-screen bg-transparent">
            <Login onLogin={() => setIsAuthenticated(true)} />
          </div>
        ) : (
          <>
            <div className="flex flex-1">
              {/* Sidebar */}
              <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

              {/* Main content, conditionally apply margin-left for sidebar */}
              <div className={`flex flex-col flex-1 ${isSidebarOpen ? "ml-64" : "ml-0"}`}>
                {/* Header */}
                <Header currentPath={currentPath} setCurrentPath={setCurrentPath} />

                {/* Main Content */}
                <div className="p-6 flex-grow overflow-auto">
                  <Routes>
                    <Route
                      path="/dashboard"
                      element={
                        isAuthenticated ? (
                          <Dashboard currentPath={currentPath} setCurrentPath={setCurrentPath} />
                        ) : (
                          <Navigate to="/login" />
                        )
                      }
                    />
                    <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
                    <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
                  </Routes>
                </div>
              </div>
            </div>

            {/* Footer */}
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
