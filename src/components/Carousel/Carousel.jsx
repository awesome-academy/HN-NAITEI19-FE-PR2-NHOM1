import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    'src/assets/images/carousel/1.jpg',
    'src/assets/images/carousel/2.jpg',
    'src/assets/images/carousel/3.jpg',
    'src/assets/images/carousel/4.jpg',
    'src/assets/images/carousel/5.jpg',
    'src/assets/images/carousel/6.png',
  ];

  const totalSlides = slides.length;
  let intervalId;

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    intervalId = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      id="default-carousel"
      className="relative w-full"
      data-carousel="slide"
    >
      <div className="relative">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`${
              index === currentSlide ? 'block' : 'hidden'
            } duration-700 ease-in-out`}
            data-carousel-item
          >
            <img src={slide} className="relative block w-full" alt="" />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-9 cursor-pointer group focus:outline-none"
        data-carousel-prev
        onClick={prevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-9 cursor-pointer group focus:outline-none"
        data-carousel-next
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>

      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-4 h-4 rounded-full ${
              index === currentSlide
                ? 'bg-gray-800 dark:bg-white'
                : 'bg-transparent'
            }`}
            style={{
              border: index === currentSlide ? 'none' : '2px solid #c9cdce',
              backgroundColor:
                index === currentSlide ? '#c9cdce' : 'transparent',
            }}
            aria-current={index === currentSlide ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
