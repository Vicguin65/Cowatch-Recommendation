import React from "react";
import VideoComponent from "../components/VideoComponent";
import Header from "../components/Header";
import fetchVideos from "../services/fetchVideos";
import { YTAPI } from "../ytapi";

const PanelPage = () => {
  const componentCount = 3; // Define the number of times you want to render VideoComponent

  return (
    <div>
      <head>
        <title>Cowatch</title>
      </head>
      <body className="h-fit bg-gray-900">
        <main className="flex flex-col pt-4 px-4">
          <YTAPI />
        </main>
      </body>
    </div>
  );
};

export default PanelPage;
