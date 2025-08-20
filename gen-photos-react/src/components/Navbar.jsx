import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    isActive
      ? "text-indigo-600 font-semibold"
      : "text-gray-700 hover:text-indigo-600 transition font-medium";

  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold text-indigo-600">GEN</span>
        <span className="text-2xl font-bold text-gray-800">AI</span>
      </div>

      {/* Desktop nav links */}
      <div className="hidden md:flex items-center space-x-8">
        <NavLink to="/" className={linkClasses} end>
          Dashboard
        </NavLink>
        <NavLink to="/create" className={linkClasses}>
          Create
        </NavLink>
        <NavLink to="/features" className={linkClasses}>
          Features
        </NavLink>
      </div>

      {/* Desktop create button */}
      <div className="hidden md:block">
        <button
          onClick={() => navigate("/create")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full shadow-md transition"
        >
          Create
        </button>
      </div>

      {/* Mobile hamburger */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-6 md:hidden">
          <NavLink
            to="/"
            className={linkClasses}
            end
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/create"
            className={linkClasses}
            onClick={() => setIsOpen(false)}
          >
            Create
          </NavLink>
          <NavLink
            to="/features"
            className={linkClasses}
            onClick={() => setIsOpen(false)}
          >
            Features
          </NavLink>
          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/create");
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full shadow-md transition"
          >
            Create
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
