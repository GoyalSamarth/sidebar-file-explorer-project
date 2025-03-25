import { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ currentPath, setCurrentPath }) => {
  //state to store if mobile navigation menu is open
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const breadcrumbs = currentPath.replace("C:/", "").split("/");

  //function to handle breadcrumb click
  const handleBreadcrumbClick = (index) => {
    const newPath = `C:/${breadcrumbs.slice(0, index + 1).join("/")}`;
    setCurrentPath(newPath);
  };

  //function to handle home click
  const handleHomeClick = () => {
    setCurrentPath("C:/Graphics/Projects");
  };

  //function to toggle mobile navigation menu
  const toggleNavMenu = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
  };

  return (
    <header className="bg-teal-600 text-white p-2 sm:p-4 flex flex-col sm:flex-row items-center justify-between relative">
      {/*  SFREQS Home */}
      <div className="flex items-center justify-center sm:justify-between w-full sm:w-auto relative">
      <div className="bg-white text-teal-600 font-bold p-2 rounded mr-4 hidden sm:block">SFREQS</div>
        
        {/* SFREQS Home Link  */}
        <Link
          to="/dashboard"
          onClick={handleHomeClick}
          className="text-base sm:text-xl font-semibold hover:underline sm:ml-auto"
        >
          SFREQS Home
        </Link>

        {/* Right Hamburger Menu Button  */}
        <button
          onClick={toggleNavMenu}
          className="sm:hidden py-1 px-2 bg-teal-700 text-white rounded-md text-sm flex items-center gap-1 absolute right-0 top-1/2 transform -translate-y-1/2"
        >
          <i className="fas fa-bars"></i>
          other
        </button>
      </div>

      {/* Breadcrumbs */}
      <nav className="mt-2 sm:mt-0 w-full sm:flex-1 text-center overflow-x-auto">
        <div className="flex justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
          {breadcrumbs.map((folder, index) => (
            <span
              key={index}
              className="cursor-pointer hover:underline whitespace-nowrap"
              onClick={() => handleBreadcrumbClick(index)}
            >
              {index > 0 ? " / " : ""}
              {folder}
            </span>
          ))}
        </div>
      </nav>

      {/* Desktop Navigation Links */}
      <div className="hidden sm:flex space-x-2 sm:space-x-4 mt-2 sm:mt-0">
        <span
          className="cursor-pointer hover:underline text-sm sm:text-base"
          onClick={() => setCurrentPath("C:/Graphics/Projects")}
        >
          Projects
        </span>
        <Link to="#" className="hover:underline text-sm sm:text-base">
          Submission
        </Link>
        <Link to="#" className="hover:underline text-sm sm:text-base">
          Deliverable
        </Link>
      </div>

      {/* Right Hamburger Mobile Menu */}
      {isNavMenuOpen && (
        <div className="sm:hidden w-full bg-teal-700 p-2 mt-2">
          <ul className="space-y-2 text-white text-center text-sm">
            <li>
              <Link
                to="#"
                onClick={() => setCurrentPath("C:/Graphics/Projects")}
                className="block py-1"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link to="#" className="block py-1">
                Submission
              </Link>
            </li>
            <li>
              <Link to="#" className="block py-1">
                Deliverable
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
