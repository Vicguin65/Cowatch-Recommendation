import React, { useEffect, useState } from "react";

// const APIKEY = "AIzaSyCHG4IRkAf0HGPiiRafWt-Am52JSjY5FJM"; //122112
// const APIKEY = "AIzaSyB4DQq2fgqXrN66myLe0gWHxeXW2T3ud1Q"; //1221
// const APIKEY = "AIzaSyBpIuPdFsEcOIzGIsD-YpDA2zyRqqev76E";
const APIKEY = "AIzaSyAbhZ9upkApS0IIBU2ehVzi0U_lrOCUSoQ";
const MaxResults = 3;

export const YTAPI = ({ channelIds }) => {
  const [allVideos, setAllVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const allChannelVideos = await Promise.all(
        channelIds.map(async (channelId) => {
          const targetUrl = `https://www.googleapis.com/youtube/v3/search?key=${APIKEY}&channelId=${channelId}&part=snippet&order=date&maxResults=${MaxResults}`;

          try {
            const response = await fetch(targetUrl);
            const resJson = await response.json();

            const channelVideos = resJson.items.map((doc) => ({
              ...doc,
              channelId,
              VideoLink: doc.id?.videoId
                ? "https://www.youtube.com/embed/" + doc.id.videoId
                : "",
            }));
            return channelVideos;
          } catch (error) {
            console.error("Error fetching data for channel:", channelId, error);
            return [];
          }
        })
      );

      setAllVideos(allChannelVideos.flat());
    };

    fetchVideos();
  }, []);

  return (
    <div className="p-4 grid grid-cols-3 gap-4">
      {allVideos.map((item) => {
        if (item.VideoLink) {
          return (
            <div key={item.id.videoId} className="flex flex-col items-center">
              <iframe
                width="100%"
                height="315"
                src={item.VideoLink}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-56"
              ></iframe>
              <p className="mt-2 text-sm text-gray-600">
                Channel ID: {item.channelId}
              </p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
