import "./profileNav.css"
import logo from "../../assets/Group16.png"
import { Link } from "react-router-dom"
function ProfileNav(props){
    return(
        <div className="vertical-navbar">
        <div className="calM-logo">
          <Link to={props.home || "/"}>
            <img src={logo} alt="calM logo" />
          </Link>
        </div>
        <ul>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/stats">Stats</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/achievements">Achievements</Link></li>
          <li><Link to="/saves">Saves</Link></li>
          <li><Link to="/notes">Notes</Link></li>
        </ul>
      </div>
    )
}

export default ProfileNav