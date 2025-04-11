import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Home from "./Home.jsx";
import Admin from "./components/Admin";
import User from "./components/User";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const panelRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 200, y: 20 }); // initial top-right

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    if (token && userRole) {
      setIsLoggedIn(true);
      setRole(userRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setRole("");
    window.location.href = "/login";
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    panelRef.current.offset = {
      x: e.clientX - panelRef.current.getBoundingClientRect().left,
      y: e.clientY - panelRef.current.getBoundingClientRect().top,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - panelRef.current.offset.x;
    const newY = e.clientY - panelRef.current.offset.y;
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  return (
    <BrowserRouter>
      {/* Draggable Navbar */}
      <div
        ref={panelRef}
        onMouseDown={handleMouseDown}
        style={{
          position: "fixed",
          top: `${position.y}px`,
          left: `${position.x}px`,
          zIndex: 9999,
          cursor: "move",
          marginTop:"5rem"
        }}
        className="bg-white px-4 py-2 rounded shadow"
      >
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            {role === "admin" ? (
              <Link to="/admin" className="text-blue-600 hover:underline">
                Admin Dashboard
              </Link>
            ) : (
              <Link to="/user" className="text-blue-600 hover:underline">
                User Dashboard
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-blue-600 hover:underline">
              Home
            </Link>
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
            <Link to="/signup" className="text-blue-600 hover:underline">
              Signup
            </Link>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
