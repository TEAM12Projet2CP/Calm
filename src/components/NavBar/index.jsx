import { Link , useNavigate} from "react-router-dom";
import logo from "../../assets/Group16.png"
import pic from "../../pages/Profile/sample.jpg"
import "./style.css";
const NavBar = (props) => {
    // we need to be redirected to signup / login forms or profile on click
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    }

    const handleSignUpClick = () => {
        navigate('/register');
    }

    const handleProfile = () => {
        navigate("/profile")
    }
    if(!props.isLoggedIn){
        return ( 
        
            <nav className="navbar-container">
                <div className="website-logo"><img alt="calM logo" src={logo} ></img></div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/ide">Emulate</Link></li>
                    <li><Link to="/learn">Learn</Link></li>
                </ul>
                <button className="login" onClick={handleLoginClick}>Login</button>
                <button className="signup" onClick={handleSignUpClick}>Sign Up</button>
            </nav>
        )
    } else {
        return ( 
        
            <nav className="navbar-container">
                <div className="website-logo"><img alt="calM logo" src={logo} ></img></div>
                <ul>
                    <li><Link to="/">Home</Link><span className="circle"></span></li>
                    <li><Link to="/ide">Emulate</Link><span className="circle"></span></li>
                    <li><Link to="/learn">Learn</Link><span className="circle"></span></li>
                </ul>
                <div className="profile-icon" onClick={handleProfile}><img src={pic}></img><p id="profile-pTag">Profile</p></div>
            </nav>
        )
    }

    }

export default NavBar;