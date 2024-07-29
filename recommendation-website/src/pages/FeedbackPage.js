import { useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
import { useContext, React } from 'react'
import './FeedbackPage.css'

const FeedbackPage = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const handleChange = (event) => {
        event.preventDefault()
        setText(event.target[0].value)
    }
    return (
        <div className='feedback'>
            <div className='header'>
                <h1>How is your viewing experience?</h1>
            </div>
            <div className fbForm>
                <input type='text' placeholder='Enter your feedback here!' maxLength='500' />
            </div>
        </div>
    )
}

export default FeedbackPage;