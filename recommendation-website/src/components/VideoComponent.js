import React from "react";

const VideoComponent = ({
  title,
  description,
  channel,
  views,
  uploadDate,
  thumbnail,
}) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <div className="flex flex-col justify-center items-center w-full rounded-lg bg-gray-700 shadow-md m-5">
        {thumbnail && (
          <a href="#">
            <img
              src={thumbnail}
              alt="Video thumbnail"
              html
              className="aspect-w-16 aspect-h-9 object-cover rounded-t-lg m-5"
            />
          </a>
        )}
        <div className="p-4">
          <h3 className="text-lg font-light m-5 text-white hover:text-opacity-75">
            {title}
          </h3>
          <h5 className="text-md font-medium m-5 text-white hover:text-opacity-75">
            {description}
          </h5>
          <p className="text-gray-400 text-sm">
            {channel} - {views} views - {uploadDate}
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoComponent;
