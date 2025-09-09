import Hero from "../components/Hero";
import PopularBooks from "../components/recommendation/PopularBooks";

const Home = () => {
  return (
    <div className="homepage">
      <div className="wrapper">
        {/* Hero Section */}
        <Hero />
        {/* Popular books Section */}
        <PopularBooks />
      </div>
    </div>
  );
};

export default Home;
