import React, { useState, useCallback } from "react";
import RecommendationCard from "../components/RecommendationCard";
import api from "../services/api";
import Loading from "../components/Loading";
import "../index.css";

export default function Books() {
  const [query, setQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        // Call the centralized api (axios client)
        const res = await api.fetchBookRecommendations(trimmedQuery);

        // Handle error responses
        if (res && res.error) {
          setError(res.error);
          setRecommendations([]);
          return;
        }

        // Extract recommendations
        const recs = res?.recommendations || (Array.isArray(res) ? res : []);
        setRecommendations(recs);

        // Show success message if no recommendations found
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
      // Clear error when user starts typing
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
      <div className="wrapper">
        <div className="p-6 max-w-5xl mx-auto">
          <h1 className=" text-3xl font-bold text-gray-900">
            Search Book Recommendations
          </h1>
          <p className="text-sm mb-6  text-gray-600 mt-2">
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

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-red-800 font-medium">Error</div>
              <div className="text-red-700 text-sm mt-1">{error}</div>
            </div>
          )}

          {/* Loading State */}
          {loading && <Loading />}

          {/* Recommendations Grid */}
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
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
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
