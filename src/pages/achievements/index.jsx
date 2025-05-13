import ProfileNav from "../../components/profileNav"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { useState } from "react"
import Gradients from "../../components/gradient"
//import trophy from "../../assets/trophy.png"
import "./styles.css"

function Achievements() {
    const [progress] = useState(70) // Replace with real data later
    const publicURL = "https://calm-backend-b1v3.onrender.com"
    return (
                <div className="achievements-container">
                    <ProfileNav />
                    <div className="general-achievements">
                        <div className="user-info-card">
                            <h2>Username: Nejem</h2>
                            <p>Rank: Beginner</p>
                            <p>Level: 1</p>
                        </div>
        
                        <div className="achievements-list">
                            <h2>Achievements</h2>
                            <div className="badges-grid">
                                <div className="badge">You have no achievements yet</div>

                                {/* add more badges here */}
                            </div>
                        </div>
                    </div>
                </div>
           
    )
}

export default Achievements
