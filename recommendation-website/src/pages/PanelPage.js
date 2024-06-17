import React from "react";
import VideoComponent from "../components/VideoComponent";
import Header from "../components/Header";

const PanelPage = () => {
  const componentCount = 3; // Define the number of times you want to render VideoComponent

  return (
    <div>
      <head>
        <title>Cowatch</title>
      </head>
      <body className="bg-gray-900">
        <Header />

        <main className="flex flex-col pt-4 px-4">
          <div className="flex justify-between items-center mb-4 gap-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            />
            <button className="px-3 py-2 text-white rounded-md bg-gray-700 hover:bg-gray-600">
              Search
            </button>
          </div>

          {Array.from({ length: componentCount }).map((_, index) => (
            <VideoComponent key={index} />
          ))}
        </main>
      </body>
    </div>
  );
};

export default PanelPage;
