import React, { useState , useEffect} from "react";
import LearnTitle from "../../assets/images/logos/LearnTitle.png"
import starImage from "../../assets/images/calm/exerciceImages/1-star.png"
import star2Image from "../../assets/images/calm/exerciceImages/2-stars.png"
import star3Image from "../../assets/images/calm/exerciceImages/3-stars.png"
import star4Image from "../../assets/images/calm/exerciceImages/4-stars.png"


// import components
import { NavBar } from "../../components";
import {Learn, Footer} from "../../containers";
import "./style.css";
import Bot from "../../components/ChatBot";
import { red } from "@mui/material/colors";
function ExercicesPage(props) {
    const publicURL = "https://calm-backend-b1v3.onrender.com";
    const getColor = (param) => {
        if( param === "easy" ) return "#50D98D"
        if( param === "medium" ) return "#DB8E2C"
        if( param === "hard" ) return "#DC2F1F"
    }

    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [listOfQuizzes, setQuizzes] = useState([])
    const [loadQuiz, setLoadQuiz] = useState(false)
    const [quiz, setQuiz] = useState({})


    const getQuizzes = async () => {
        const res = await fetch(publicURL+"/quizzes/list")
        console.log(res)
        if(!res.ok){
            return []
        } else {
            return await res.json()
        }
    }


    const handleOptionChange = (option) => {
        if (Array.isArray(quiz.answers) && quiz.answers.length > 1) {
          // Toggle option for multi-select
          setSelectedAnswers((prev) =>
            prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
          );
        } else {
          setSelectedAnswers([option]); // Single select
        }
      };
      
      const verifyAnswer = async () => {
        const correct = quiz.answers.sort().join(',') === selectedAnswers.sort().join(',');
        alert(correct ? '✅ Correct!' : '❌ Incorrect!');
      
        const storedUser = localStorage.getItem('user');
        if (!storedUser) return;
      
        const userData = JSON.parse(storedUser);
        const user = userData.data.data.data;
        //console.log(user)
        // Update solved quizzes if not already solved
        if (!user.solvedQuizzes.includes(quiz.id)) {

          user.solvedQuizzes.push(quiz.id);
      
          // Add points based on quiz level
          if (quiz.level === "easy") user.points += 1;
          else if (quiz.level === "medium") user.points += 2;
          else if (quiz.level === "hard") user.points += 3;
          // Send update to server
          try {
            console.log("about to update")
            const res = await fetch(publicURL+"/update", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${userData.token}`, // Only if auth middleware is used
                },
                body: JSON.stringify({

                  id: user.id,
                  points: user.points,
                  solvedQuizzes: user.solvedQuizzes,
                  achievements: user.achievements || [],

                }),
              });
            console.log("updated user")
            const result = await res.json();
            if (result.success) {
              // Update localStorage with new user data
              userData.data.data.data = result.data;
              localStorage.setItem("user", JSON.stringify(userData));
            } else {
              console.error("Update failed:", result.error);
            }
          } catch (error) {
            console.error("Error updating user:", error);
          }
        }
        
      };
      
      const handleClose = () => {
        setLoadQuiz(false);
        setSelectedAnswers([]);
      };
    let output = []
    useEffect(() => {
        const getQuizzes = async () => {
            try {
                const res = await fetch(publicURL+"/quizzes/list");
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                setQuizzes(data.data);
                
            } catch (err) {
                alert("Something went wrong while loading quizzes");
                console.error(err);
            }
        };

        getQuizzes()
    }, [])
    
    
    if(listOfQuizzes.length > 0){
     output = listOfQuizzes.map(quiz => {
        

        return (<div className="quiz-title" onClick = {async () => {
                    console.log(quiz.id)

                     try{
                        const res = await fetch(`http://localhost:5000/quizzes/unique?id=${quiz.id}`)
                        if(!res.ok) alert("Something went wrong while loading the quiz")
                        const data = await res.json()
                        setQuiz(data.data)
                        console.log(data.data)
                        setLoadQuiz(true)
                     } catch(err){
                        alert("Something went wrong while loading the quiz")

                     }

                                                              }}>
                    <p style={{margin: "auto 20px"}}> {quiz.id} </p>
                    <p style={{fontWeight: "semibold", fontSize: "1.1rem", marginLeft: "2%"}}> {quiz.title} </p>
                    <p style={{margin: "auto 30px", fontSize: "0.8rem", overflow: "hidden"}}>{quiz.description}</p>
                    <p style={{margin: "auto 1.5% auto auto" , color: getColor(quiz.level) , fontSize: "1.1rem", fontWeight: "600"}}> {quiz.level}</p>   
                </div> )
    }) }
    return (
        <>
            <NavBar />
            <div className="list-of-quizzes">

                {output} 
            </div>
            <Bot/>
            {loadQuiz && (
                            <div
                                className="quizPopUp"
                                style={{
                                position: 'absolute',
                                color: 'black',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                height: 'auto',
                                width: '600px',
                                zIndex: '100',
                                backgroundColor: 'white',
                                padding: '30px',
                                borderRadius: '12px',
                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                                }}
                            >
                                <div>
                                <p style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: 'bold', color: getColor(quiz.level) }}>
                                    {quiz.title}
                                </p>
                                <p style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: '600' }}>
                                    {quiz.question}
                                </p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '0 40px' }}>
                                {quiz.options.map((option, index) => (
                                    <label key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem' }}>
                                    <input
                                        type={quiz.answers.length > 1 ? 'checkbox' : 'radio'}
                                        name="quizOption"
                                        value={option}
                                        checked={selectedAnswers.includes(option)}
                                        onChange={() => handleOptionChange(option)}
                                    />
                                    {option}
                                    </label>
                                ))}
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                                <button onClick={handleClose} style={{ padding: '10px 20px', borderRadius: '8px', background: '#ccc' , border: "1px solid black", cursor: 'pointer'}}>
                                    Close
                                </button>
                                <button onClick={verifyAnswer} style={{ padding: '10px 20px', borderRadius: '8px', background: '#4CAF50', color: 'white' , border: "1px solid black", cursor: 'pointer'}}>
                                    Submit
                                </button>
                                </div>
                            </div>
                            )}
            <Footer></Footer>
        </>
    );
}

export default ExercicesPage;