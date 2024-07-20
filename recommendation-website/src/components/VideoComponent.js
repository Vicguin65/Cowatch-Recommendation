import React from "react";
import "./VideoComponent.css";

const VideoComponent = ({
  title,
  description,
  channel,
  views,
  uploadDate,
  thumbnail,
}) => {
  return (
    <div className="video-component">
      {thumbnail && (
        <a href="#">
          <img
            src={thumbnail}
            alt="Video thumbnail"
            className="video-thumbnail"
          />
        </a>
      )}
      <div className="video-info">
        <h3 className="video-title">{title}</h3>
        <h5 className="video-description">{description}</h5>
        <p className="video-details">
          {channel} - {views} views - {uploadDate}
        </p>
      </div>
    </div>
  );
};

export default VideoComponent;
