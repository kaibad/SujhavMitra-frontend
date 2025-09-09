import { useNavigate } from "react-router-dom";

const RecommendationCard = ({ item }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navigate using ISBN, ID, or encoded title as fallback
    if (item.isbn) {
      navigate(`/book/${item.isbn}`);
    } else if (item.id) {
      navigate(`/book/${item.id}`);
    } else {
      const encodedTitle = encodeURIComponent(
        item.title.replace(/\s+/g, "-").toLowerCase()
      );
      navigate(`/book/${encodedTitle}`);
    }
  };

  return (
    <div
      className="recommendationcard bg-white shadow-md rounded-lg overflow-hidden w-64 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-200"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      {/* Image */}
      {item.imageurl && (
        <img
          src={item.imageurl}
          alt={item.title}
          className="h-80 w-full object-cover"
        />
      )}

      {/* Content */}
      <div className="recommendationcard-content p-4">
        <h4 className="text-lg font-semibold">{item.title}</h4>
        {item.author && <p className="text-gray-700">Author: {item.author}</p>}
        {item.genres && (
          <p className="text-gray-600 text-sm">
            Genres: {item.genres.join(", ")}
          </p>
        )}
      </div>
    </div>
  );
};

export default RecommendationCard;
