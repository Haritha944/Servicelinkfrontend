import React, { useState } from 'react';
import new1 from '../Images/carou2.jpeg'


const slides = [
  {
    id: 1,
    src: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(22).jpg',
    alt: 'First slide',
    caption: 'First slide label',
    text: 'Some representative placeholder content for the first slide.',
  },
  {
    id: 2,
    src: new1,
    alt: 'Second slide',
    caption: 'Second slide label',
    text: 'Some representative placeholder content for the second slide.',
    
  },
  {
    id: 3,
    src: 'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(23).jpg',
    alt: 'Third slide',
    caption: 'Third slide label',
    text: 'Some representative placeholder content for the third slide.',
  },
];

export default function CustomCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={slides[currentIndex].src}
        alt={slides[currentIndex].alt}
        className="object-cover w-full h-full" style={{ display: 'block' }}
        
      />
      <div className="absolute inset-0 flex items-center justify-center text-white text-center">
        <div>
          <h3 className="text-xl font-bold">{slides[currentIndex].caption}</h3>
          <p>{slides[currentIndex].text}</p>
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &gt;
      </button>
    </div>
  );
}
