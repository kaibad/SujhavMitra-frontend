import { useEffect, useState } from "react";
import RecommendationCard from "../RecommendationCard";
import SectionHeader from "../SectionHeader";
import { fetchPopularBooks } from "../../services/api";
import "../../index.css";

const PopularBooks = () => {
  const [popularBooks, setPopularBooks] = useState([]);

  useEffect(() => {
    const getPopularBooks = async () => {
      const books = await fetchPopularBooks();
      setPopularBooks(books);
    };
    getPopularBooks();
  }, []);

  return (
    <div className="PopularBooks">
      <div className="wrapper">
        <div className="px-8 py-12">
          <SectionHeader
            subtitle="Popular Books"
            title="Discover Your Next Read"
            description="Explore the books everyone is talking about! From gripping thrillers to heartwarming stories."
          />
          <div className="flex flex-wrap gap-6 justify-center">
            {popularBooks.slice(0, 8).map((book, idx) => (
              <RecommendationCard key={idx} item={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularBooks;
