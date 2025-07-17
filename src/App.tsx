import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookRecommender from "./pages/BookRecommender";
import MovieRecommender from "./pages/MovieRecommender";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/books" element={<BookRecommender />} />
        <Route path="/movies" element={<MovieRecommender />} />
      </Routes>
      <Footer />
    </>
  );
}
