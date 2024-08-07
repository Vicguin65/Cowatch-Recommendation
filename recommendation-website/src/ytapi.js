import React, { useEffect, useState } from "react";

const APIKEY = "AIzaSyCHG4IRkAf0HGPiiRafWt-Am52JSjY5FJM"; //122112
// const APIKEY = "AIzaSyB4DQq2fgqXrN66myLe0gWHxeXW2T3ud1Q"; //1221
const channelIds = [
  "UChIs72whgZI9w6d6FhwGGHA",
  "UCdqp0KK_Io7TwK5cJMBvB0Q",
  "UCrwObTfqv8u1KO7Fgk-FXHQ",
  "UCoUluzWcoIO3eHa5F7SJnxg",
];
const MaxResults = 3;

export const YTAPI = () => {
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

  console.log(allVideos);

  return (
    <div className="p-10 w-screen grid grid-cols-3 gap-4">
      {allVideos.map((item) => {
        if (item.VideoLink) {
          return (
            <div key={item.id.videoId} className="flex flex-col items-center">
              <iframe
                width="560"
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
              </p>{" "}
              {/* Display channel ID */}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
