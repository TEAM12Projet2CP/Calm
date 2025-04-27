import "./profileNav.css"
import logo from "../../assets/Group16.png"
import { Link } from "react-router-dom"
function ProfileNav(props){
    return(
        <>
        <div className="vertical-navbar">
            <div className="calM-logo"><Link to={props.home || ""}><img src={logo} alt="calM logo"></img></Link></div>
            <ul>
                <li><a href={props.profile || "#"}>Profile</a></li>
                <li><a href={props.stats || "#"}>Stats</a></li>
                <li><a href={props.dashboard || "#"}>Dashboard</a></li>
                <li><a href={props.achievements || "#"}>Achievements</a></li>
                <li><a href={props.saves || "#"}>Saves</a></li>
                <li><a href={props.notes || "#"}>Notes</a></li>
            </ul>
        </div>
        </>
    )
}

export default ProfileNav