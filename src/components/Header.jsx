// Header.jsx
import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react";
import "../index.css";
import { useAuth } from "../context/useAuth";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
  { name: "Books", path: "/books" },
  { name: "Movies", path: "/movies" },
];

const Header = () => {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeBtnRef = useRef(null);

  // Add conditional nav items
  const dynamicNav = [...navItems];
  if (user) {
    if (user.role_id === 1 || user.role_id === 2) {
      dynamicNav.push({ name: "Dashboard", path: "/dashboard" });
    } else {
      dynamicNav.push({ name: "Wishlist", path: "/profile" });
    }
  }

  // close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (menuOpen) {
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="bg-white shadow-md py-4">
      <div className="wrapper">
        <div className="mx-auto flex justify-between items-center px-4">
          {/* Logo */}
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img src={assets.logo} alt="logo" className="h-8" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex gap-8">
            {dynamicNav.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`hover:text-cyan-600 text-black transition-colors ${
                  pathname === item.path ? "font-bold text-cyan-600" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="flex gap-4 items-center">
            {user ? (
              <>
                <span className="text-gray-700 text-sm">Hi, {user.name}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-cyan-500 text-white px-3 py-1 rounded hover:bg-cyan-600 text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="border border-cyan-500 text-cyan-500 px-3 py-1 rounded hover:bg-cyan-50 text-sm"
                >
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            aria-label="Open menu"
            className=" text-gray-800"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Right Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        className={`fixed right-0 top-0 z-50 h-full w-80 max-w-[85%] bg-white shadow-2xl
        transform transition-transform duration-300
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-end p-4 border-b">
          <button
            ref={closeBtnRef}
            aria-label="Close menu"
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            onClick={() => setMenuOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="p-4">
          <ul className="space-y-2">
            {dynamicNav.map((item, i) => (
              <li
                key={item.name}
                className={`transform transition duration-300 ${
                  menuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-6 opacity-0"
                }`}
                style={{ transitionDelay: `${80 + i * 40}ms` }}
              >
                <Link
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-base
                    hover:bg-cyan-50 hover:text-cyan-700
                    ${
                      pathname === item.path
                        ? "bg-cyan-50 text-cyan-700 font-semibold"
                        : "text-gray-800"
                    }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </header>
  );
};

export default Header;
