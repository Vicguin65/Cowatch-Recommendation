import React from "react";
import VideoComponent from "../components/VideoComponent";
import Header from "../components/Header";
import fetchVideos from "../services/fetchVideos";

const PanelPage = () => {

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
          {fetchVideos().map((video) => {
            return (
              <VideoComponent
                key={video.id}
                title={video.title}
                description={video.description}
                channel={video.channel}
                views={video.views}
                uploadDate={video.uploadDate}
                thumbnail={video.thumbnail}
              />
            );
          })}
        </main>
      </body>
    </div>
  );
};

export default PanelPage;
