import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BookSlider({ books }) {
  if (!books || books.length === 0) return null;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(3, books.length),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="mb-5">
      <Slider {...settings}>
        {books.map((book, index) => (
          <div key={index} className="">
            <img
              src={book.imageurl}
              alt={book.title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
            <h3>{book.title}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}
