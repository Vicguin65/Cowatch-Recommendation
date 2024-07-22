import { useNavigate } from 'react-router-dom'
import backIcon from '../assets/images/back_icon.png'
import './CreateRoomPage.css' // Import the CSS file
import { useContext, React } from 'react'
import { UserContext } from '../UserContext'

const CreateRoom = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const handleIconClick = () => {
    navigate('/room')
  }

  const handleRoomClick = () => {
    navigate('/panel')
  }

  return (
    <div className='create-room'>
      <div className='header'>
        <div className='back-button'>
          <img src={backIcon} alt='Back' onClick={handleIconClick} />
        </div>
        <div className='guest-info'>You are signed in as {user.name}</div>
      </div>
      <div className='content'>
        <h1>Settings:</h1>
        <div className='settings'>
          <label>
            <input type='checkbox' />
            Anyone can add videos
          </label>
          <label>
            <input type='checkbox' />
            Anyone can suggest videos
          </label>
        </div>
        <button onClick={handleRoomClick}>Create Room</button>
      </div>
    </div>
  )
}

export default CreateRoom
