import { useState } from "react";
import { useReducer } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Radio, Text, Slider } from "../Components/components";
import "../style/take.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react";
import { setCookie } from "./Login";
import { Poll } from "./Browse";

function Answer({question, answers}) {
    return (
        <div style={{
            "display": "flex", 
            "flexDirection": "column",
            "padding": "3px",
            "margin": "5px",
            "border": "1px solid var(--grey4)",
            "background": "#333639",
            "borderRadius": "3px",
            "boxSizing": "border-box",
            }}>
            <div>
                {question}
            </div>
            <div style={{
                "width": "80%",
                "height": "2px",
                "borderRadius": "10px",
                "background": "var(--grey3)",
                "margin": "4px 0",
            }}></div>
            <div style={{"display": "flex", "flexDirection": "column"}}>
                {answers.map(answer => {
                    return (<p style={{"margin": "2px"}}>{answer}</p>);
                })}
            </div>
        </div>
    );
}

export default function View() {
    const endpoint = "185.84.80.172:7085"
    const navigate = useNavigate();
    const [polls, setPolls] = useState([]);
    const [answers, setAnswers] = useState([]);
    const {id} = useParams()
    let hasId = id !== undefined;
    
    const logout = async () => {
        try {
            await fetch("https://" + endpoint + "/logout", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                    "accept": "*/*",
                },
                credentials: "include",
            });
        } catch (error) {
            console.error(error);
            return;
        }
        setCookie("isLoggedIn", false, 1);
        navigate("/");
    };
    
    const queryAnswers = async () => {
        let resp = null;
        try {
            resp = await fetch("https://" + endpoint + "/polls/" + id + "/questions", {
                method: "get",
                headers: {
                    "content-type": "application/json",
                    "accept": "*/*",
                },
                credentials: "include",
            });
        } catch (error) {
            console.error(error);
            return;
        }
        resp = await resp.json();
        console.log(resp);

        for (let i = 0; i < resp.length; i++) {
            const element = resp[i];
            // query all answers for a given question
            let resp2 = null;
            try {
                resp2 = await fetch("https://" + endpoint + "/question/" + element.questionID + "/getAnswers", {
                    method: "get",
                    headers: {
                        "content-type": "application/json",
                        "accept": "*/*",
                    },
                    credentials: "include",
                });
            } catch (error) {
                console.error(error);
                return;
            }
            resp2 = await resp2.json();
            let answers = resp2.map(answer => answer.value);
            setAnswers(oldAnswers => [...oldAnswers, <Answer question={element.heading} answers={answers}></Answer>])
        }
    }

    const queryPolls = async () => {
        let resp = null;

        // get the user id
        try {
            resp = await fetch("https://" + endpoint + "/users/self", {
                method: "get",
                headers: {
                    "content-type": "application/json",
                    "accept": "*/*",
                },
                credentials: "include",
            });
        } catch (error) {
            console.error(error);
            return;
        }
        resp = await resp.json()
        let userId = resp.userID;
        
        // get all polls from that user
        try {
            resp = await fetch("https://" + endpoint + "/user/" + userId + "/polls", {
                method: "get",
                headers: {
                    "content-type": "application/json",
                    "accept": "*/*",
                },
                credentials: "include",
            });
        } catch (error) {
            console.error(error);
            return;
        }
        resp = await resp.json();
        for (let i = 0; i < resp.length; i++) {
            const element = resp[i];
            const viewPoll = () => {
                console.log("view poll " + element.pollID)
                navigate("/view/" + element.pollID)
                return;
            };
            setPolls(oldPolls => [...oldPolls, <Poll title={element.title} description={element.description} username={"You"} pollId={element.pollID} navigate={navigate} onClick={viewPoll}></Poll>])
        }
    }
    useEffect(() => {
        if (hasId) {
            queryAnswers();
        } else {
            queryPolls();
        }
    }, [hasId]);

    const goBack = () => {
        setAnswers(Array.from([]));
        setPolls(Array.from([]));
        if (hasId) {
            navigate("/view");
        } else {
            navigate("/");
        }
    };

    return (
        <div id="poll-root">
            <div style={{ "height": "100%", "flex": "0.5 1" }}>
                <div style={{ "padding": "15px", "display": "flex", "justifyContent": "start" }}>
                    <FontAwesomeIcon icon={faArrowLeft} style={{ "width": "30px", "height": "30px", "cursor": "pointer", "color": "rgb(104, 111, 119)" }} onClick={goBack} />
                </div>
            </div>
            <div id="poll-wrapper">
                <div id="backbutton"></div>
                <div id="poll-inner" style={{"marginTop": "30px"}}>
                    {hasId ? answers : polls}
                </div>
            </div>
            <div style={{"height": "100%", "flex": "0.5 1"}}>
                <div style={{"padding": "20px", "display": "flex", "justifyContent": "end"}}>
                    <div style={{"cursor": "pointer", "display": "flex", "alignItems": "center"}}>
                        <span style={{"marginRight": "3px", "fontWeight": "bold", "color": "rgb(104, 111, 119)"}} onClick={logout}>Logout</span>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} style={{"width": "30px", "height": "20px", "color": "#686f77"}} />
                    </div>
                </div>
            </div>
        </div>
        
    );
};