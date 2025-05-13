import ProfileNav from "../../components/profileNav"
import "./stats.css"
import solveProblem from "../../assets/SolveProblem.svg"
import Gradients from "../../components/gradient";
import empty from "../../assets/empty-folder.png"
import {
    CircularProgressbar,
    buildStyles
        } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import pic from '../Profile/Unknown Picture Profile.jpg'
import { useState } from "react";

function Stats() {
    const user = localStorage.getItem('user')
    const data = JSON.parse(user)

    const [solvedQuizzes, setSolvedQuizzes] = useState(data.data.data.data.solvedQuizzes.length)
    const [readLectures, setReadLectures] = useState( data.data.data.data.readLectures.length)
    
    const value = 65
    return(
        <div className="stats-container">
            <ProfileNav />
            <div className="statistics-container">
                <div className="personal-info">
                    
                    <div className="profile-info-container">
                        <img src = {pic}></img>
                        <p>calM ID: {data.data.data.data.username}</p>
                    </div>

                    <div className="personal-records-container">
                        <Gradients />

                        <div className="single-stat-container">
                            <p>Quizzes</p>
                            <CircularProgressbar    value={data.data.counts.quizCount === 0 ? 0 : (solvedQuizzes / data.data.counts.quizCount) * 100}
                                                    text={`${data.data.counts.quizCount === 0 ? 0 : (solvedQuizzes / data.data.counts.quizCount) * 100}%`}
                                                    styles={buildStyles({
                                                    trailColor: 'rgba(0, 0, 0, 0.2)', 
                                                    pathColor: 'url(#gradientColors1)', 
                                                    textColor: 'black',
                                                    strokeLinecap: 'round',
                                                })} className="progress-bar"/>
                        </div>

                        <div className="single-stat-container">
                            <p>Courses</p>
                            <CircularProgressbar    value={data.data.counts.lectureCount === 0 ? 0 : (readLectures / data.data.counts.lectureCount) * 100}
                                                    text={`${data.data.counts.lectureCount === 0 ? 0 : (readLectures / data.data.counts.lectureCount) * 100}%`}
                                                    styles={buildStyles({
                                                    trailColor: 'rgba(0, 0, 0, 0.2)', 
                                                    pathColor: 'url(#gradientColors2)', 
                                                    textColor: 'black',
                                                    strokeLinecap: 'round',
                                                })} className="progress-bar"/>
                        </div>

                        <div className="single-stat-container">
                            <p>Programs</p>
                            <CircularProgressbar    value={value -25}
                                                    text={`${value - 25}`}
                                                    styles={buildStyles({
                                                    trailColor: 'rgba(0, 0, 0, 0.2)', 
                                                    pathColor: 'url(#gradientColors3)', 
                                                    textColor: 'black',
                                                    strokeLinecap: 'round',
                                                })} className="progress-bar"/>
                        </div>

                    </div>
                </div>

                <div className="solved-quizzes">
                    {/*here we shall first verify if we have a list, otherwise, put the icon with a link toq quizzes */}
                    <div className="solve-problems">
                        <img src={solveProblem || ""} alt="solve problems icon" />
                        <div className="invite-to-solve">
                            <h3 style={{ margin: "0% 0 2% 0"}}>No problems are solved yet</h3>
                            <h4 style={{ margin: "3% 0 2% 0"}}>Let's solve problems</h4>
                        </div>
                    </div>
                    
                </div>
                <div className="saved-notes">
                    <div className="empty-folder">
                        
                        <img src={empty || ""} ></img>
                        <h1>EMPTY</h1>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default Stats