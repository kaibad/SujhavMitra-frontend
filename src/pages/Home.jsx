import PopularBooks from "../components/recommendation/PopularBooks";

const Home = () => {
  return (
    <div className="homepage">
      <div className="wrapper">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to SujhavMitra</h1>
          <p className="text-lg text-gray-600">
            Your personal book & movie recommendation system
          </p>
        </div>
        <PopularBooks />
      </div>
    </div>
  );
};

export default Home;
