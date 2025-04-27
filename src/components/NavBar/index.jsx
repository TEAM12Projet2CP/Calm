import { Link , useNavigate} from "react-router-dom";
import logo from "../../assets/Group16.png"
import "./style.css";
const NavBar = () => {
    // we need to be redirected to signup / login forms or profile on click
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    }

    const handleSignUpClick = () => {
        navigate('/register');
    }
    
    return ( 
        
        <nav className="navbar-container">
            <div className="website-logo"><img alt="calM logo" src={logo} ></img></div>
            <ul>
                <li><Link to="/">Home</Link><span className="circle"></span></li>
                <li><Link to="/ide">Emulate</Link><span className="circle"></span></li>
                <li><Link to="/learn">Learn</Link><span className="circle"></span></li>
            </ul>
            <button className="login" onClick={handleLoginClick}>Login</button>
            <button className="signup" onClick={handleSignUpClick}>Sign Up</button>
        </nav>
    );
    }

export default NavBar;