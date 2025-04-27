import Navbar from "../NavBar/index.jsx"
import "./login.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
function LoginForm(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const submitInfo = async (e) => {

        const emailField = document.getElementById("email")
        const passwordField = document.getElementById("password")
        e.preventDefault()
        // if one of the fields is empty, set the border to red and return
        if(email === "" || password === ""){

            emailField.style.border = "1px solid red"
            passwordField.style.border = "1px solid red"
            alert("Please fill in all fields")
            return

        } else {
            emailField.style.border = "1px solid black"
            passwordField.style.border = "1px solid black"
        }
        // now we can send the data to the server
        // first verify if we have a valid email
        const isEmail = (val) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(val);
        }
        if(!isEmail(email)){
            emailField.style.border = "1px solid red"
            alert("Please enter a valid email")
            return
        }
        // now we are ready to send the data to the server
        const res = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        if(!res.ok){
            const err = await res.json()
            alert(err.error)
            emailField.style.border = "1px solid red"
            passwordField.style.border = "1px solid red"
            return
        }
        // now we have a valid response, we shall parse it and navigate to profile
        const data = await res.json()
        console.log(data)
        // fetch here

        //get result, store token in local storage, then redirect to profile
        //then store in local storage
        data.modified ??= false
        localStorage.setItem("user", JSON.stringify(data))

        //navigate to profile page or wherever
        navigate("/profile")
    }

    
    return(
        <>
        <Navbar isLoggedIn = {false} />
        <form id="loginForm" onSubmit={submitInfo}>
            <h1>Login</h1>
            <div className="infoContainer">
                <label>E-mail: </label>
                <input type="text" id="email" value={email} onChange={ e => setEmail(e.target.value)}></input>
            </div>
            <div className="infoContainer">
                <label>Password: </label>
                <input type="password" id="password" value={password} onChange={ e=> setPassword(e.target.value)}></input>
            </div>
            <br></br>

            <button id="login" type="submit">Login</button>
        </form>
        </>
    )
}

export default LoginForm