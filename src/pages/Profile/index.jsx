import "./profile.css"
import ProfileNav from "../../components/profileNav/index.jsx"
import pic from "./sample.jpg"
import { useState } from "react"
import { color } from "framer-motion"
import { red } from "@mui/material/colors"
function Profile(){
    const user = localStorage.getItem('user')
    const {data} = JSON.parse(user)
    
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
    const [name, setName] = useState(data.name)
    const [username, setUsername] = useState(data.username)
    const [age, setAge] = useState(data.age)
    const [email, setEmail] = useState(data.email)
    const [lastName, setLastName] = useState(data.lastName)
    const [gender, setGender] = useState(data.gender)
    const [university, setUniversity] = useState("")
    const [yearOfStudy, setYearOfStudy] = useState("")
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
        setPopUp(false)
    }
    const Cancel = () => {
        setPopUp(false)
    }
    const Logout = async () => {
        // handle logout here
    }

    return(
        <div className="container-profile">
            <ProfileNav className="navbar" home = "/"/>
            <div className="personal-information">
            <div className="profile-picture" >
                <img alt="profile picture" src={pic}></img>
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
                                <td><p className="information">{`${name }` || "Lorem ipsum"}</p></td>
                                <td><button className="edit" onClick={editName}>Edit</button></td>
                            </tr>
                            <tr>
                                <td>LastName:</td>
                                <td><p className="information">{`${lastName}` || "Lorem ipsum"}</p></td>
                                <td><button className="edit" onClick={editLastName}>Edit</button></td>
                            </tr>
                            <tr>
                                <td>Username:</td>
                                <td><p className="information" >{username  || "Lorem ipsum"}</p></td>
                                <td><button className="edit" onClick={editUsername}>Edit</button></td>
                            </tr>
                            <tr>
                                <td>Gender:</td>
                                <td><p className="information"  >{gender || "Lorem ipsum"}</p></td>
                            </tr>
                            <tr>
                                <td>Age:</td>
                                <td><p className="information"  >{age || "Lorem ipsum"}</p></td>
                                <td><button className="edit" onClick={editAge}>Edit</button></td> 
                            </tr>
                            <tr>
                                <td>University:</td>
                                <td><p className="information"  >{university || "Lorem ipsum"}</p></td>
                                <td><button className="edit" onClick={editUniversity}>Edit</button></td>
                            </tr>
                            <tr>
                                <td>Year of Study: </td>
                                <td><p className="information" >{yearOfStudy || "Lorem ipsum"}</p></td>
                                <td><button className="edit" onClick={editYearOfStudy}>Edit</button></td>
                            </tr>
                            <tr>
                                <td>Email: </td>
                                <td><p className="information">{email || "Lorem ipsum"}</p></td>
                                <td><button className="edit" onClick={editEmail}>Edit</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            { popUp &&( 
                <div className="edit-popUp">
                    <label>Enter your new {attribute}:</label>
                    <input type={type} min={ type === "number" ? 10:""}></input>
                    <div className="confirm-buttons">
                        <button onClick={Cancel} style={{backgroundColor: hoveredOverCancel ? "darkred":"red"}} onMouseEnter={() => Hover(0)} onMouseLeave={() => unhover(0)}>Cancel</button>
                        <button onClick={Done} style={{backgroundColor:hoveredOverConfirm ? "darkgreen":"#12b264"}} onMouseEnter={() => Hover(1)} onMouseLeave={() => unhover(1)}>Save changes</button>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Profile  