// src/DraggableItem.js
// this makes the videos in the playlist able for dragging

import React from 'react'
import { useDrag, useDrop } from 'react-dnd'

const ItemType = {
  VIDEO: 'video'
}

const DraggableItem = ({ id, index, moveItem, url, handleRemove, handleDoubleClick, isPlaying }) => {
  const ref = React.useRef(null)
  const [, drop] = useDrop({
    accept: ItemType.VIDEO,
    hover( item) {
      if (item.index !== index) {
        moveItem( item.index, index)
        item.index = index
      }
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.VIDEO,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  drag(drop(ref))

  return (
    <div
      ref={ref}
      className={`playlist-item ${isPlaying ? 'playing' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onDoubleClick={() => handleDoubleClick(url)}
    >
      {url}
      <button className='remove-button' onClick={() => handleRemove(index)}>Remove</button>
    </div>
  )
}

export default DraggableItem
