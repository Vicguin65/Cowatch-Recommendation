import React from "react";
import VideoComponent from "../components/VideoComponent";
import Header from "../components/Header";
import fetchVideos from "../services/fetchVideos";
import { useNavigate } from "react-router-dom";
import "./PanelPage.css"; // 确保有相应的 CSS 文件

const PanelPage = () => {
  const navigate = useNavigate();

  const handlePlayerPageClick = () => {
    navigate("/player");
  };

  return (
    <div className="panel-page">
      <head>
        <title>Cowatch</title>
      </head>
      <body className="bg-gray-900">
        <div className="fixed-content">
          <Header />
          <button className="player-page-button" onClick={handlePlayerPageClick}>
            Go to Player Page
          </button>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search"
              className="search-input"
            />
            <button className="search-button">
              Search
            </button>
          </div>
        </div>
        <div className="video-list-container">
          <div className="video-grid">
            {fetchVideos().map((video) => (
              <VideoComponent
                key={video.id}
                title={video.title}
                description={video.description}
                channel={video.channel}
                views={video.views}
                uploadDate={video.uploadDate}
                thumbnail={video.thumbnail}
              />
            ))}
          </div>
        </div>
      </body>
    </div>
  );
};

export default PanelPage;
