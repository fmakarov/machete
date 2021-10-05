import React from "react";

export default function ProductImages({
  images,
  selectedImage,
  setSelectedImage,
}) {
  return (
    <>
      <div className="flex">
        <img
          src={process.env.GATSBY_STRAPI_URL + images[selectedImage].url}
          alt="knife"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, i) => {
          return (
            <div key={image.url} className="border">
              <button type="button" onClick={() => setSelectedImage(i)}>
                <img
                  src={process.env.GATSBY_STRAPI_URL + image.url}
                  alt={`product_small${i}`}
                  className="w-24"
                />
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
