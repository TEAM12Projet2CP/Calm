import NavBar from "../NavBar/index.jsx";
import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const publicURL = "https://calm-backend-b1v3.onrender.com"
    const login = async (email, password) => {
        try {
            // Send the request to the backend
            const res = await fetch(publicURL + "/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            // If the response is not okay, throw an error
            if (!res.ok) {
                const errorData = await res.json();
                return { error: errorData.error };
            }

            // If successful, return the response data (including token)
            const data = await res.json();
            return { success: true, data: data };
        } catch (error) {
            console.error("Login error:", error);
            return { error: "Server error during login" };
        }
    };

    const submitInfo = async (e) => {
        const emailField = document.getElementById("email");
        const passwordField = document.getElementById("password");
        e.preventDefault();

        // Validate email and password fields
        if (email === "" || password === "") {
            emailField.style.border = "1px solid red";
            passwordField.style.border = "1px solid red";
            alert("Please fill in all fields");
            return;
        } else {
            emailField.style.border = "1px solid black";
            passwordField.style.border = "1px solid black";
        }

        // Validate email format
        const isEmail = (val) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(val);
        };

        if (!isEmail(email)) {
            emailField.style.border = "1px solid red";
            alert("Please enter a valid email");
            return;
        }

        // Now, use the login function
        const data = await login(email, password);

        // Handle errors from the login function
        if (data.error) {
            emailField.style.border = "1px solid red";
            passwordField.style.border = "1px solid red";
            alert(data.error); // Display the error from login
            return;
        }

        // Store user data and token in localStorage
        localStorage.setItem("user", JSON.stringify({ data: data.data, isLoggedIn: true}));
        localStorage.setItem("loginState", JSON.stringify(true));

        // Navigate to the profile page after successful login
        navigate("/profile");
    };

    return (
        <>
            <NavBar isLoggedIn={false} />
            <form id="loginForm" onSubmit={submitInfo}>
                <h1>Login</h1>
                <div className="infoContainer">
                    <label>E-mail: </label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>
                <div className="infoContainer">
                    <label>Password: </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <br />
                <button id="login" type="submit">Login</button>
            </form>
        </>
    );
}

export default LoginForm;
