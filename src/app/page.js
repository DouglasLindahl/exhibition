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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const allImages = data?.allImages || [];
  const newestImages = allImages.slice(0, 5); // Newest 5 images
  const visibleImages = allImages.slice(0, displayedImages);

  const loadMoreImages = () => {
    setDisplayedImages(displayedImages + 10); // Increase the number of displayed images by 10
  };

  return (
    <div className="p-4 flex flex-col gap-4 p-6">


      <div className=" grid grid-cols-3 gap-4 py-8">
        {/* Display the rest of the images */}
        {visibleImages.map((imageData, index) => (
          <div key={index} className="w-full h-80">
            <img
              src={imageData.image.url}
              alt={imageData.title}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
      {displayedImages < allImages.length && (
        <button onClick={loadMoreImages} className="bg-blue-500 text-white px-4 py-2">
          Load More
        </button>
      )}
    </div>
  );
}
