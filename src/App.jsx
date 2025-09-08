import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
