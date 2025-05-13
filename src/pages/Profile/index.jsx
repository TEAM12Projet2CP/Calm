import "./profile.css"
import ProfileNav from "../../components/profileNav/index.jsx"
import pic from "./Unknown Picture Profile.jpg"
import { useState , useRef } from "react"
import { useNavigate } from "react-router-dom"
import { color } from "framer-motion"
import { red } from "@mui/material/colors"
function Profile(){
    const user = localStorage.getItem('user')
    const data = JSON.parse(user)

    const token = data.data.token;
    const [hoveredOverConfirm,setHoveredOverConfirm] = useState(false)
    const [hoveredOverCancel,setHoveredOverCancel] = useState(false)
    const Hover = (e) => {
        if(e === 1){
            setHoveredOverConfirm(true)
        } else {
            setHoveredOverCancel(true)
        }

    }
    const unhover = (e) => {
        if(e === 1){
            setHoveredOverConfirm(false)
        } else {
            setHoveredOverCancel(false)
        }
    }
    const Navigate = useNavigate();
    const [pfpUrl, setPfpUrl] = useState( data.data.data.data.pfpUrl || "")
    const [selectedImage, setSelectedImage] = useState(null);
    const [updateProfile, setUpdateProfile] = useState(false)
    const [name, setName] = useState(data.data.data.data.name || "")
    const [username, setUsername] = useState(data.data.data.data.username || "")
    const [age, setAge] = useState( data.data.data.data.age || 0)
    const [email, setEmail] = useState( data.data.data.data.email || "")
    const [lastName, setLastName] = useState(data.data.data.data.lastName || "")
    const [gender, setGender] = useState(data.data.data.data.gender || "unknown")
    const [university, setUniversity] = useState(data.data.data.data.university || "unknown")
    const [yearOfStudy, setYearOfStudy] = useState( data.data.data.data.yearOfStudy || "unknown")
    const [popUp, setPopUp] = useState(false)
    const [attribute, setAttribute] = useState("")
    const [type, setType] = useState("text")

    const editName = () => {
        setAttribute("Name")
        setType("text")
        setPopUp(true)

    }

    const editLastName = () => {
        setAttribute("last name")
        setType("text")
        setPopUp(true)
    }

    const editAge = () => {
        setAttribute("age")
        setType("number")

        setPopUp(true)  
    }

    const editEmail = () => {
        setAttribute("email")
        setType("email")
        setPopUp(true)
        // then verify!!  

    }

    const editUniversity = () => {
        setAttribute("university")
        setType("text")
        setPopUp(true)  
    }

    const editUsername = () => {
        setAttribute("university")
        setType("text")
        setPopUp(true) 
        //requires verifying uniqueness   
    }

    const editYearOfStudy = () => {
        setAttribute("university")
        setType("text")
        setPopUp(true)   
    }
    const Done = () => {
        // save changes then close
        // it is supposed to send a request to the backend to update the user
        setPopUp(false)
        if(updateProfile){
            setUpdateProfile(false)
        }
    }
    const Cancel = () => {
        setPopUp(false)
        if(updateProfile){
            setUpdateProfile(false)
        }
    }
    const Logout = async () => {
            localStorage.removeItem('user')
            localStorage.removeItem('loginState')
        Navigate('/');
        // handle logout here
    }

    const updatePfp = async () => {
            // not working yet
    }

    return(
        <div className="container-profile">
            <ProfileNav className="navbar" home = "/"/>
            <div className="personal-information">
            <div className="profile-picture" >
                <div className="profile-picture-container" onClick={updatePfp}>
                    
                    <img alt="profile picture" src={pic} style={{maxWidth: "239px", maxHeight: "239px"}}></img>
                    <p className="edit-text" >upload a new picture</p>
                </div>


                <div className="personal-title">                
                    <h2>{`${name} ${lastName}` || "Full name"}</h2>
                    <h4>calM-ID:  { ` ${username}` || " "}</h4>
                </div>
                <button id="logout-button" onClick={ Logout }>Logout</button>
            </div>

                <div className="basic-info">
                    <h1>Basic information</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td>Name:</td>
                                <td><p className="information">{`${name }`}</p></td>
                                <td><button className="edit" onClick={editName}>Edit</button></td>
                            </tr>
                            <tr>
                                <td>LastName:</td>
                                <td><p className="information">{`${lastName}`}</p></td>
                                <td><button className="edit" onClick={editLastName}>Edit</button></td>
                            </tr>
                            <tr>
                                <td>Username:</td>
                                <td><p className="information" >{username}</p></td>
                                <td><button className="edit" onClick={editUsername}>Edit</button></td>
                            </tr>
                            <tr>
                                <td>Gender:</td>
                                <td><p className="information"  >{gender}</p></td>
                            </tr>
                            <tr>
                                <td>Age:</td>
                                <td><p className="information"  >{age}</p></td>
                                <td><button className="edit" onClick={editAge}>Edit</button></td> 
                            </tr>
                            <tr>
                                <td>University:</td>
                                <td><p className="information"  >{university}</p></td>
                                <td><button className="edit" onClick={editUniversity}>Edit</button></td>
                            </tr>
                            <tr>
                                <td>Year of Study: </td>
                                <td><p className="information" >{yearOfStudy}</p></td>
                                <td><button className="edit" onClick={editYearOfStudy}>Edit</button></td>
                            </tr>
                            <tr>
                                <td>Email: </td>
                                <td><p className="information">{email}</p></td>
                                <td><button className="edit" onClick={ editEmail }>Edit</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            { popUp &&( 
                <div className="edit-popUp" id="popup">
                    <label>Enter your new {attribute}:</label>
                    <input type={type} min={ type === "number" ? 10:""}></input>
                    <div className="confirm-buttons">
                        <button onClick={Cancel} style={{backgroundColor: hoveredOverCancel ? "darkred":"red"}} onMouseEnter={() => Hover(0)} onMouseLeave={() => unhover(0)}>Cancel</button>
                        <button onClick={Done} style={{backgroundColor:hoveredOverConfirm ? "darkgreen":"#12b264"}} onMouseEnter={() => Hover(1)} onMouseLeave={() => unhover(1)}>Save changes</button>
                    </div>
                </div>
            )}
            {updateProfile && (
                <div style={{
                                    position: "absolute",
                                    height: "60%",
                                    width: "60%",
                                    backgroundColor: "white",
                                    borderRadius: "20px",
                                    boxShadow: "0 0px 50px 2px rgba(0, 0, 0, 0.5)",
                                    zIndex: "100",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "20px"}}>
                <label style={{ fontSize: "1.2rem", marginBottom: "10px" }}>Upload a new profile picture:</label>

                {/* Image preview */}
                {selectedImage && (
                    <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Preview"
                    style={{
                                width: "150px",
                                height: "150px",
                                objectFit: "cover",
                                borderRadius: "50%",
                                marginBottom: "15px", }}/>)}
                <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedImage(e.target.files[0])}
                        style={{ marginBottom: "15px" }}
                        />

                    <div className="confirm-buttons">
                    <button
                                onClick={Cancel}
                                style={{ backgroundColor: hoveredOverCancel ? "darkred" : "red" }}
                                onMouseEnter={() => Hover(0)}
                                onMouseLeave={() => unhover(0)}>Cancel</button>

                    <button
                                onClick={updatePfp}
                                style={{ backgroundColor: hoveredOverConfirm ? "darkgreen" : "#12b264" }}
                                onMouseEnter={() => Hover(1)}
                                onMouseLeave={() => unhover(1)}>Upload</button>
                    </div>
                </div>)}
        </div>

    )
}

export default Profile  