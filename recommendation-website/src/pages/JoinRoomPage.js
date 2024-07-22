import { useNavigate } from 'react-router-dom'
import backIcon from '../assets/images/back_icon.png'
import './JoinRoomPage.css'
import { useContext, React } from 'react'
import { UserContext } from '../UserContext'

const JoinRoomPage = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const handleIconClick = () => {
    navigate('/room')
  }

  const handleRoomClick = () => {
    navigate('/panel')
  }

  return (
    <div className='enter-room'>
      <div className='header'>
        <div className='back-button'>
          <img src={backIcon} alt='Back' onClick={handleIconClick} />
        </div>
        <div className='guest-info'>You are signed in as {user.name}</div>
      </div>
      <div className='content'>
        <h1>ENTER ROOM CODE:</h1>
        <input type='text' placeholder='INSERT 5 DIGIT CODE' maxLength='5' />
        <button onClick={handleRoomClick}>Enter</button>
      </div>
    </div>
  )
}

export default JoinRoomPage
