import isEmail from "validator/lib/isEmail"
import "./signup.css"
import NavBar from "../NavBar/index.jsx"
import { useState } from "react"
import { use } from "react"
function SignUpForm(){
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [gender, setGender] = useState("")


    const handleNameChange = (e) => setName(e.target.value)
    const handleLastNameChange = (e) => setLastName(e.target.value)
    const handleAgeChange = (e) => setAge(e.target.value)
    const handleEmailChange = (e) => setEmail(e.target.value)
    const handleUsernameChange = (e) => setUsername(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value)
    const handleGenderChange = (e) => setGender(e.target.value)

    const isEmail = (val) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(val);
    }

    const submitInfo = async (e) => {
        e.preventDefault()
        if(name === "" || lastName === "" || age === "" || email === "" || username === "" || password === "" || confirmPassword === ""){
            alert("Please fill in all fields")
            // I might probably highlight the fields that are empty in red
            return
        }

        if(!isEmail(email)){
            alert("Please enter a valid email address")
            return
        }

        if(password !== confirmPassword){
            alert("Passwords do not match")
            return
        }
        if(password.length < 8){
            alert("Password must be at least 8 characters long")
            return
        }


        const data = {
            name: name,
            lastName: lastName,
            age: Number(age),
            email: email,
            username: username,
            password: password,
            confirmPassword: confirmPassword,
        }

        console.log(data)

       const res = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if(!res.ok){
            alert("Error signing up")
            return
        }
        const genData = await res.json()

        genData.modified ??= false
    
        localStorage.setItem("user", JSON.stringify(genData))
        localStorage.setItem("loginState", JSON.stringify(true))
        // verify email

        //after verification is done, redirect to profile page
    }



    return (
        <>
            <NavBar isLoggedIn = {false} />
            <form id="signUpForm" onSubmit={submitInfo}>
                <h1>Sign Up</h1>
                <div className="inputs">
                <input type="text" placeholder="First name" value={name} onChange={handleNameChange}></input>
                <input type="number" placeholder="Age" value={age} min={10} onChange={handleAgeChange}></input>
                <input type="text" placeholder="Last name" value={lastName} onChange={handleLastNameChange}></input>
                <div className="gender">
                    <select id="gender" onChange={handleGenderChange} value={gender}>
                        <option value="" disabled selected>gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <input type="text" placeholder="Email" value={email} onChange={handleEmailChange}></input>
                <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange}></input>
                <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}></input>
                <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={handleConfirmPasswordChange}></input>
                </div>

                <button type="submit">Sign up</button>
            </form>
        </>
    )
}

export default SignUpForm