import { useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
import { useContext, React } from 'react'
import backIcon from '../assets/images/back_icon.png'
import logoInWhite from '../assets/images/CoWatchLogoInWhite.png'
import './AboutUsPage.css'

const AboutUsPage = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const handleIconClick = () => {
        navigate('/');
    }
    return (
        <div className='about-us'>
            <div className='header'>
                <div className='logo'>
                    <img src={logoInWhite}/>
                </div>
                <div className='back-button'>
                    <img src={backIcon} alt='back' onClick={handleIconClick}/>
                </div>
            </div>
            <div className='dev-team'>
                <div className='intro'>
                    <head2>Tyler Du</head2>
                    <head3>Product Owner</head3>
                    <body>
                        Tyler is a junior studying Computer Science at RPI graduating in May 2025. 
                        His skill set lies in working with databases and creating REST API for those databases. 
                        His past internships involved using the Django framework to create an API that reads and writes from a PostgreSQL database. 
                        As the project's founder, Tyler hopes to see his idea come to fruition.
                    </body>
                </div>
                <div className='intro'>
                    <head2>Fifi Hsieh</head2>
                    <head3>Developer</head3>
                    <body>
                        Fifi is an undergraduate junior majoring in Computer Science at RPI. 
                        Fifi brings previous programming experience from past courses and graphic design skills to the team. 
                        She also hopes to gain experience working with React, Database, and coding in team settings. 
                    </body>
                </div>
                <div className='intro'>
                    <head2>Mohammed Abbais</head2>
                    <head3>Developer</head3>
                    <body>
                        Mohammed is a rising senior working towards a Bachelors degree in Computer Science at RPI. 
                        Mohammed’s expertise is geared more towards front end development, as he has extensively worked with React and Javascript for the last 4 years. 
                        He is currently a software engineer intern during the summer, where he is working in an agile development environment. 
                        Mohammed hopes to learn more about backend technology and to effectively communicate with his team members as a result of working on Cowatch.
                    </body>
                </div>
                <div className='intro'>
                    <head2>William Shin</head2>
                    <head3>Developer</head3>
                    <body>
                        William is a rising junior majoring in Computer Science at RPI. 
                        He has built a full stack using the Django framework with MongoDB. 
                        He also has experience in penetration testing Android systems and hosting various types of servers locally and remotely. 
                        He hopes to gain more insight into the React framework.
                    </body>
                </div>
                <div className='intro'>
                    <head2>Jaswanth Duddu</head2>
                    <head3>Developer</head3>
                    <body>
                        Jaswanth is a junior majoring in Computer Science at RPI. 
                        He has built backend systems for many projects, like Munch and EditAI. 
                        He has worked with Python, C, C++, and Java for the past 3 years. 
                        Using his Scrum knowledge when he was an Intern at Triotos, he hopes to improve his skill set using React.
                    </body>
                </div>
                <div className='intro'>
                    <head2>Edwin Gu</head2>
                    <head3>Developer</head3>
                    <body>
                        Edwin is a junior undergraduate in Computer Science at RPI. 
                        He possesses previous programming experience from past courses and individual projects ranging from mathematical tools to individual websites. 
                        He is looking forward to utilizing his skills in program arrangement and logic in developing an application with sophisticated functions and having it launched.
                    </body>
                </div>
            </div>
        </div>
    )
}

export default AboutUsPage;