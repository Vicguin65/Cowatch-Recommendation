import React, { useEffect, useState } from 'react'

const APIKEY = '' 
const channelIds = ['UChIs72whgZI9w6d6FhwGGHA', 'UCdqp0KK_Io7TwK5cJMBvB0Q', 'UCrwObTfqv8u1KO7Fgk-FXHQ']
const MaxResults = 3

export const YTAPI = () => {
  const [allVideos, setAllVideos] = useState([])

  useEffect(() => {
    const fetchVideos = async () => {
      const allChannelVideos = await Promise.all(
        channelIds.map(async (channelId) => {
          const targetUrl = `https://www.googleapis.com/youtube/v3/search?key=${APIKEY}&channelId=${channelId}&part=snippet&order=date&maxResults=${MaxResults}`

          try {
            const response = await fetch(targetUrl)
            const resJson = await response.json()

            const channelVideos = resJson.items.map((doc) => ({
              ...doc,
              channelId,
              VideoLink: doc.id?.videoId
                ? 'https://www.youtube.com/embed/' + doc.id.videoId
                : '',
            }))
            return channelVideos
          } catch (error) {
            console.error('Error fetching data for channel:', channelId, error)
            return []
          }
        })
      )

      setAllVideos(allChannelVideos.flat())
    }

    fetchVideos()
    
  }, [])

  return (
    <div>
      {allVideos.map((item) => {
        if (item.VideoLink) {
          return (
            <div key={item.id.videoId}>
              <iframe
                width='560'
                height='315'
                src={item.VideoLink}
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture web-share'
                allowFullScreen
              ></iframe>
              <p>Channel ID: {item.channelId}</p> {/* Display channel ID */}
            </div>
          )
        }
        return null
      })}
    </div>
  )
}
