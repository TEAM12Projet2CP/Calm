import ProfileNav from "../../components/profileNav"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { useState, useEffect } from "react"
import Gradients from "../../components/gradient"
import "./dashboard.css"
import list from "../../assets/list.png"
import { Calendar } from "react-calendar"

function DashBoard() {
    const data = JSON.parse(localStorage.getItem("user"))

    const [value, setValue] = useState(new Date())
    const [solved, setSolved] = useState(data.data.data.data.solvedQuizzes.length)
    const [listOfUsers, setListOfUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/dashboard/dashboard", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${data.data.token}`,
                    },
                })
                const result = await response.json()
                console.log(result)
                setListOfUsers(result.list)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }
        fetchData()
        console.log("list of users", listOfUsers)
    }, [])


    return (
        <div className="dashboard-container">
            <ProfileNav />
            <div className="general-dashboard">
                <div className="personal-dashboard">
                    <div className="problems-solved">
                        <Gradients />
                        <CircularProgressbar
                            value={data.data.counts.quizCount === 0 ? 0 : (solved / data.data.counts.quizCount) * 100}
                            text={`${data.data.counts.quizCount === 0 ? 0 : Math.round((solved / data.data.counts.quizCount) * 100)}%`}
                            styles={buildStyles({
                                trailColor: 'rgba(0, 0, 0, 0.2)',
                                pathColor: 'url(#gradientColors1)',
                                textColor: 'black',
                                strokeLinecap: 'round',
                            })}
                            className="progress-bar-dashboard"
                        />
                        <p>Solved</p>
                    </div>
                    <div className="calendar-container">
                        <Calendar
                            onChange={setValue}
                            value={value}
                            tileClassName={({ date }) =>
                                date.toDateString() === new Date().toDateString() ? 'today-tile' : null
                            }
                        />
                    </div>
                </div>
                <div className="overall-scoreboard">
                    <h1>Scoreboard</h1>
                    <div className="table-of-users-containers">
                        <div className="empty-list-container">
                            {listOfUsers
                                .sort((a, b) => b.points - a.points)
                                .map((user, index) => (
                                    <div key={user.id || index} className="user-entry" style={{ display: "flex", justifyContent: "space-around" , minWidth: "90%",
                                        height: "50px", alignItems: "center", padding: "10px", backgroundColor: "rgb(255,255,255,0.5)", borderRadius: "10px", marginBottom: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", cursor: "pointer" }}>
                                        <p style={{ marginRight: "1%", fontSize: "1.1rem", fontWeight: "semibold"}}>{index + 1}</p>
                                        <p style={{ fontWeight: "bold", fontSize: "1.2rem"}}>{user.name}</p>
                                        <p style={{ fontSize: "1.1rem", fontWeight: "semibold"}}>{user.points}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoard
