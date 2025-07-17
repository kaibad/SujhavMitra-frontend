import { useState } from "react";
import axios from "axios";
import type { Book } from "../types";

const BookRecommender = () => {
  const [title, setTitle] = useState("");
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/recommend/book", {
        params: { title },
      });
      setBooks(response.data.recommendations || response.data.popular_books);
    } catch (error) {
      console.error("Failed to fetch books", error);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Book Recommender</h2>
      <input
        type="text"
        placeholder="Enter book title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-3 py-2 w-full mb-2"
      />
      <button
        onClick={fetchBooks}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Recommend
      </button>

      <div className="mt-4 space-y-3">
        {books.map((book, idx) => (
          <div key={idx} className="border p-3 rounded shadow">
            <p className="font-semibold">{book.title}</p>
            <p>{book.author}</p>
            <img
              src={book.imageurl}
              alt={book.title}
              className="h-40 object-cover mt-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookRecommender;
