import { useEffect, useState } from "react";
import axios from "axios";
import RecommendationCard from "../RecommendationCard";
import "../../index.css";
import SectionHeader from "../SectionHeader";

const PopularBooks = () => {
  const [popularBooks, setPopularBooks] = useState([]);

  useEffect(() => {
    const fetchPopularBooks = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE}/recommend/book`
        );
        setPopularBooks(res.data.popular_books);
      } catch (err) {
        console.error("Error fetching popular books:", err);
      }
    };
    fetchPopularBooks();
  }, []);

  return (
    <div className="PopularBooks">
      <div className="wrapper">
        {/* Popular Books */}
        <div className="px-8 py-12">
          <SectionHeader
            subtitle="Popular Books "
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
