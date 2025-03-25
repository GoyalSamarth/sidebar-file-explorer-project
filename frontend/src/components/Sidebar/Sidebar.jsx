import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  // State to store if sidebar is open
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar on small screens
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Toggle Button for small screens */}
      <button
        className="lg:hidden fixed top-4 left-4 py-2 px-4 bg-teal-600 text-white rounded text-lg font-semibold z-20"
        onClick={toggleSidebar}
      >
        Menu
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-blue-600 text-white p-4 overflow-auto transition-all duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:flex`}
      >
        {/* Close Button for small screens */}
        <button
          className="lg:hidden p-2 text-white absolute top-4 right-4"
          onClick={toggleSidebar}
        >
          <i className="fas fa-times text-2xl"></i> 
        </button>

        
        <div className="mt-16 lg:mt-20">
          <h2 className="text-2xl font-bold mb-6">SFREQS</h2>
          <ul className="space-y-4">
            <li>
              <Link to="#" className="hover:text-gray-300">
                Announcements
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-300">
                User Guide
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-300">
                Training Notes
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-300">
                Run SAS Program
              </Link>
            </li>
            <li>
              <a
                href="https://www.google.com" // Replace with actual HelpDesk URL
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                HelpDesk Ticket
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
