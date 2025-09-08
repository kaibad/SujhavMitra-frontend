import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import "./index.css";
import Header from "./components/Header";
import Books from "./pages/Books";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/books" element={<Books />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
