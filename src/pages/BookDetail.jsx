import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookById, fetchBookRecommendations } from "../services/api";
import RecommendationCard from "../components/RecommendationCard";
import Loading from "../components/Loading";

const BookDetails = () => {
  const { isbn } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [error, setError] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (!isbn) return;

    const getBook = async () => {
      try {
        setLoading(true);
        const data = await fetchBookById(isbn);
        setBook(data);

        // Load wishlist status from localStorage
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setIsWishlisted(wishlist.some((b) => b.isbn === data?.isbn));

        // Fetch related books based on this book's title
        if (data?.title) {
          setLoadingRelated(true);
          const recs = await fetchBookRecommendations(data.title);
          setRelatedBooks(recs || []);
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch book details");
      } finally {
        setLoading(false);
        setLoadingRelated(false);
      }
    };

    getBook();
  }, [isbn]);

  const handleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    if (isWishlisted) {
      // Remove from wishlist
      const updated = wishlist.filter((b) => b.isbn !== book.isbn);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      setIsWishlisted(false);
    } else {
      // Add to wishlist
      wishlist.push(book);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setIsWishlisted(true);
    }
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!book) return <p className="text-center mt-10">Book not found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        &larr; Back
      </button>

      {/* Book Info */}
      {book.imageurl && (
        <img
          src={book.imageurl}
          alt={book.title}
          className="w-full max-h-96 object-cover rounded-md mb-5"
        />
      )}
      <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
      {book.author && <p className="text-lg mb-1">Author: {book.author}</p>}
      {book.isbn && <p className="text-gray-600 mb-1">ISBN: {book.isbn}</p>}
      {book.publisher && (
        <p className="text-gray-600 mb-1">Publisher: {book.publisher}</p>
      )}
      {book.publishdate && (
        <p className="text-gray-600 mb-1">Published: {book.publishdate}</p>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className={`mt-4 px-6 py-2 rounded-lg font-medium transition-colors ${
          isWishlisted
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      </button>

      {/* Related Books */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Related Books</h2>
        {loadingRelated ? (
          <Loading />
        ) : relatedBooks.length > 0 ? (
          <div className="flex flex-wrap gap-6 justify-center">
            {relatedBooks.map((b, index) => (
              <RecommendationCard key={b.isbn || `rec-${index}`} item={b} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No related books found.</p>
        )}
      </section>
    </div>
  );
};

export default BookDetails;
