"use client";
import { useState } from "react";
import { useQuery } from "graphql-hooks";

const IMAGES_QUERY = `
  query {
    allImages(first: 100, skip: 0) {
      title
      image {
        url
      }
    }
  }
`;

export default function Home() {
  const [displayedImages, setDisplayedImages] = useState(30); // Number of initially displayed images
  const { loading, error, data } = useQuery(IMAGES_QUERY);
  const [selectedImage, setSelectedImage] = useState(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const allImages = data?.allImages || [];
  const visibleImages = allImages.slice(0, displayedImages);

  const loadMoreImages = () => {
    setDisplayedImages(displayedImages + 10); // Increase the number of displayed images by 10
  };

  const enlargeImage = (index) => {
    setSelectedImage(index);
  };

  const closeEnlarged = () => {
    setSelectedImage(null);
  };

  return (
    <div className="p-4 flex flex-col gap-4 p-6">
      {selectedImage !== null && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-90 flex justify-center items-center z-50" onClick={closeEnlarged}>
          <div className="max-w-full max-h-full overflow-auto">
            <img
              src={visibleImages[selectedImage].image.url}
              alt={visibleImages[selectedImage].title}
              className="max-w-full max-h-full cursor-pointer h-screen"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 py-8">
        {/* Display the rest of the images */}
        {visibleImages.map((imageData, index) => (
          <div key={index} className="w-full h-80" onClick={() => enlargeImage(index)}>
            <img
              src={imageData.image.url}
              alt={imageData.title}
              className="w-full h-full object-contain cursor-pointer"
            />
          </div>
        ))}
      </div>
      {displayedImages < allImages.length && (
        <button onClick={loadMoreImages} className="bg-pink-500 text-white px-4 py-2">
          Load More
        </button>
      )}
    </div>
  );
}
