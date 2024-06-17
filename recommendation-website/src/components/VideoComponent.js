import React from "react";

const VideoComponent = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <div className="w-full rounded-lg bg-gray-700 shadow-md">
        <a href="#">
          <img
            src={require("./thumbnail1.jpg")}
            alt="Video thumbnail"
            className="aspect-w-16 aspect-h-9 object-cover rounded-t-lg"
          />
        </a>
        <div className="p-4">
          <h3 className="text-lg font-medium text-white hover:text-opacity-75">
            Video title 1
          </h3>
          <p className="text-gray-400 text-sm">
            Channel name 1 • Views • Upload date
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoComponent;
