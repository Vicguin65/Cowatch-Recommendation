import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './PlayerPage.css'
import Playlist from './Playlist'

const PlayerPage = () => {
  const navigate = useNavigate()
  const [videoUrl, setVideoUrl] = useState('')
  const [videoId, setVideoId] = useState('')
  const [currentVideo, setCurrentVideo] = useState('')
  const [playlist, setPlaylist] = useState([
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
    'https://www.youtube.com/watch?v=2Vv-BfVoq4g'
  ])
  const [showPopup, setShowPopup] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const videoRef = useRef(null)

  const handleBackClick = () => {
    navigate('/panel') // jump to PanelPage
  }

  const handleInputChange = (e) => {
    setVideoUrl(e.target.value)
  }

  const handlePlayClick = () => {
    try {
      const urlParams = new URLSearchParams(new URL(videoUrl).search)
      const id = urlParams.get('v')
      if (id) {
        setVideoId(id)
        setCurrentVideo(videoUrl)
      } else {
        alert('Please enter a valid YouTube URL')
      }
    } catch (error) {
      alert('Please enter a valid YouTube URL')
    }
  }

  const handleVideoSelect = (id) => {
    setVideoId(id)
    setCurrentVideo(`https://www.youtube.com/watch?v=${id}`) // ***TODO*** check the detection method
  }

  const handleVideoEnd = () => {
    setShowPopup(true)
    requestAnimationFrame(() => {
      setShowPopup(false)
    })

    const currentIndex = playlist.findIndex(video => video.includes(videoId))
    const nextIndex = currentIndex + 1
    if (nextIndex < playlist.length) {
      const nextVideoUrl = playlist[nextIndex]
      const urlParams = new URLSearchParams(new URL(nextVideoUrl).search)
      const id = urlParams.get('v')
      if (id) {
        handleVideoSelect(id)
      }
    }
  }

  const handleAddToPlaylist = (url) => {
    setPlaylist([...playlist, url])
  }

  const handleRemoveFromPlaylist = (index) => {
    const newPlaylist = playlist.filter((_, i) => i !== index)
    setPlaylist(newPlaylist)
  }

  const togglePlaylist = () => {
    setShowPlaylist(!showPlaylist)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='player-page'>
        <button className='back-button' onClick={handleBackClick}>Back to Video List</button>
        <div className='controls'>
          <input
            type='text'
            value={videoUrl}
            onChange={handleInputChange}
            placeholder='Enter YouTube URL'
          />
          <button onClick={handlePlayClick}>Play</button>
        </div>
        <button className='toggle-button' onClick={togglePlaylist}>
          {showPlaylist ? 'Hide Playlist' : 'Show Playlist'}
        </button>
        <div className='main-content'>
          <div className='video-container'>
            <iframe
              ref={videoRef}
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder='0'
              allow='accelerometer autoplay encrypted-media gyroscope picture-in-picture'
              allowFullScreen
              title='YouTube Video'
              onEnded={handleVideoEnd}
            />
          </div>
        </div>
        <Playlist
          onVideoSelect={handleVideoSelect}
          currentVideo={currentVideo}
          playlist={playlist}
          onAddToPlaylist={handleAddToPlaylist}
          onRemoveFromPlaylist={handleRemoveFromPlaylist}
          isVisible={showPlaylist} // visibility of the playlist
        />
        {showPopup && <div className='popup'>Video finished</div>}
      </div>
    </DndProvider>
  )
}

export default PlayerPage
