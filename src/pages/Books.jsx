import React, { useState, useEffect, useCallback } from "react";
import BookSlider from "../components/BookSlider";
import RecommendationCard from "../components/RecommendationCard";
import Loading from "../components/Loading";
import { fetchPopularBooks, fetchBookRecommendations } from "../services/api";
import "../index.css";

export default function Books() {
  const [popularBooks, setPopularBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch popular books once
  useEffect(() => {
    const loadPopularBooks = async () => {
      const books = await fetchPopularBooks();
      setPopularBooks(books);
    };
    loadPopularBooks();
  }, []);

  const clearResults = useCallback(() => {
    setQuery("");
    setRecommendations([]);
    setError(null);
  }, []);

  const handleSearch = useCallback(
    async (e) => {
      if (e) e.preventDefault();

      const trimmedQuery = (query || "").trim();
      if (!trimmedQuery) {
        setError("Please enter a book title to search.");
        return;
      }

      setError(null);
      setRecommendations([]);
      setLoading(true);

      try {
        const recs = await fetchBookRecommendations(trimmedQuery);

        if (recs.error) {
          setError(recs.error);
          setRecommendations([]);
          return;
        }

        setRecommendations(recs);

        if (recs.length === 0) {
          setError(
            "No recommendations found for this title. Try a different search term."
          );
        }
      } catch (err) {
        const errorMessage = err.message || String(err);
        setError(`Search failed: ${errorMessage}`);
        console.error("Book search error:", err);
      } finally {
        setLoading(false);
      }
    },
    [query]
  );

  const handleInputChange = useCallback(
    (e) => {
      setQuery(e.target.value);
      if (error) setError(null);
    },
    [error]
  );

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && !loading && query.trim()) {
        handleSearch();
      }
    },
    [query, loading, handleSearch]
  );

  return (
    <div className="Bookpage">
      <BookSlider books={popularBooks.slice(0, 15)} />

      <div className="wrapper">
        <div className="p-6 max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">
            Search Book Recommendations
          </h1>
          <p className="text-sm mb-6 text-gray-600 mt-2">
            Type a book title and click Search to get recommended books from the
            backend.
          </p>

          <div className="flex gap-2 mb-6">
            <input
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Enter book title (e.g. 'The Great Gatsby')"
              value={query}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <button
              type="button"
              className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={loading || !query.trim()}
              onClick={handleSearch}
            >
              {loading ? "Searching…" : "Search"}
            </button>
            <button
              type="button"
              className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={clearResults}
              disabled={loading}
            >
              Clear
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-red-800 font-medium">Error</div>
              <div className="text-red-700 text-sm mt-1">{error}</div>
            </div>
          )}

          {loading && <Loading />}

          <section className="mb-8">
            {recommendations && recommendations.length > 0 && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Recommendations ({recommendations.length})
                  </h2>
                </div>
                <div className="flex flex-wrap gap-6 justify-center">
                  {recommendations.map((book, index) => (
                    <RecommendationCard
                      key={book.isbn || `book-${index}`}
                      item={book}
                    />
                  ))}
                </div>
              </>
            )}

            {!loading && recommendations.length === 0 && !error && (
              <div className="text-center py-12">
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No recommendations yet
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try searching for a book title above.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
