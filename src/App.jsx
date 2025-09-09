import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import "./index.css";
import Header from "./components/Header";
import Books from "./pages/Books";
import Footer from "./components/Footer";
import BookDetails from "./pages/BookDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/books" element={<Books />} />
        <Route path="/book/:isbn" element={<BookDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* fallback */}
        {/* <Route path="*" element={<p>Page not found</p>} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
