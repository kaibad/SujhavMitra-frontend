import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import "../index.css";
// import { useAuth } from "../context/useAuth";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
  { name: "Books", path: "/books" },
  { name: "Movies", path: "/movies" },
];

const Header = () => {
  const { pathname } = useLocation();
  //   const { user, logout } = useAuth();

  const dynamicNav = [...navItems];
  //   if (user) {
  //     if (user.role_id === 1 || user.role_id === 2) {
  //       dynamicNav.push({ name: "Dashboard", path: "/admin" });
  //     } else {
  //       dynamicNav.push({ name: "Wishlist", path: "/wishlist" });
  //     }
  //   }

  return (
    <header className="bg-white shadow-md py-4">
      <div className="wrapper">
        <div className=" mx-auto flex justify-between items-center px-4">
          {/* Logo */}
          <Link to="/">
            <img src={assets.logo} alt="logo" className="h-8" />
          </Link>

          {/* Navigation */}
          <div className="hidden sm:flex gap-8">
            {dynamicNav.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`hover:text-cyan-600 text-black ${
                  pathname === item.path ? "font-bold" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          {/* <div className="flex gap-4 items-center">
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
        </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
