import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

// Fetch popular books
export const fetchPopularBooks = async () => {
  try {
    const res = await axios.get(`${API_BASE}/recommend/book`);
    return res.data.popular_books || [];
  } catch (err) {
    console.error("Error fetching popular books:", err);
    return [];
  }
};

// Fetch recommendations for a book title
export const fetchBookRecommendations = async (title) => {
  try {
    const res = await axios.get(
      `${API_BASE}/recommend/book?title=${encodeURIComponent(title)}`
    );
    return res.data.recommendations || [];
  } catch (err) {
    console.error("Error fetching book recommendations:", err);
    return { error: err.message || "Failed to fetch recommendations" };
  }
};
