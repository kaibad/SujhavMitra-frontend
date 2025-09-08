const RecommendationCard = ({ item }) => {
  return (
    <div className="recommendationcard bg-white shadow-md rounded-lg overflow-hidden w-64">
      {/* Image */}
      {item.imageurl && (
        <img
          src={item.imageurl}
          alt={item.title}
          className="h-80 w-full object-cover"
        />
      )}

      {/* Content */}
      <div className="recommendationcard-content">
        <h4>{item.title}</h4>
        {item.author && <p>Author: {item.author}</p>}

        {/* For movies */}
        {item.genres && (
          <p className="text-gray-700">Genres: {item.genres.join(", ")}</p>
        )}
      </div>
    </div>
  );
};

export default RecommendationCard;
