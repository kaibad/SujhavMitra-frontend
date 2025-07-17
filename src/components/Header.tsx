import { Link, useLocation } from "react-router";
import { assets } from "../assets/assets";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
  { name: "Books", path: "/books" },
  { name: "Movies", path: "/movies" },
];

const Header = () => {
  const { pathname } = useLocation();
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-around items-center px-4">
        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} alt="logo" className="h-8" />
        </Link>
        {/* Navigation */}
        <div className="max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t right-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`hover:text-cyan-600 text-black ${
                pathname === item.path ? "font-bold " : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
