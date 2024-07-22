import React, { useState } from 'react'
import DraggableItem from './DraggableItem'
import './Playlist.css'

const Playlist = ({ onVideoSelect, currentVideo, playlist, onAddToPlaylist, onRemoveFromPlaylist, isVisible }) => {
  const [newVideoUrl, setNewVideoUrl] = useState('')
  
  const handleNewVideoInputChange = (e) => {
    setNewVideoUrl(e.target.value)
  }
  
  const handleAddToPlaylist = () => {
    onAddToPlaylist(newVideoUrl)
    setNewVideoUrl('')
  }
  
  const handleRemoveFromPlaylist = (index) => {
    onRemoveFromPlaylist(index)
  }
  
  const handlePlaylistItemClick = (url) => {
    const urlParams = new URLSearchParams(new URL(url).search)
    const id = urlParams.get('v')
    if (id) {
      onVideoSelect(id)
    }
  }
  
  const moveItem = (fromIndex, toIndex) => {
    const updatedPlaylist = [...playlist]
    const [movedItem] = updatedPlaylist.splice(fromIndex, 1)
    updatedPlaylist.splice(toIndex, 0, movedItem)
    onAddToPlaylist(updatedPlaylist)
  }
  
  return (
    <div className={`playlist-container ${isVisible ? 'visible' : ''}`}>
      {playlist.map((url, index) => (
        <DraggableItem
          key={index}
          id={url}
          index={index}
          url={url}
          moveItem={moveItem}
          handleRemove={handleRemoveFromPlaylist}
          handleDoubleClick={handlePlaylistItemClick}
          isPlaying={currentVideo === url}
        />
      ))}
      <div className='add-video-container'>
        <input
          type='text'
          value={newVideoUrl}
          onChange={handleNewVideoInputChange}
          placeholder='Add new video URL'
        />
        <button onClick={handleAddToPlaylist}>Add to Playlist</button>
      </div>
    </div>
  )
}

export default Playlist
