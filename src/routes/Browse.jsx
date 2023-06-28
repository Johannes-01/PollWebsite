import { useState } from "react";
import { useReducer } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Radio, Text, Slider } from "../Components/components";
import "../style/take.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react";
import { setCookie } from "./Login";

function Poll({title, description, username, pollId, navigate}) {
    const takePoll = () => {
        navigate("/takepoll", {state: {pollId: pollId}})
    };
    return (
        <div onClick={takePoll} style={{
            "display": "flex",
            "flexDirection": "column",
            "padding": "3px",
            "margin": "5px",
            "border": "1px solid var(--grey4)",
            "background": "#333639",
            "borderRadius": "3px",
            "boxSizing": "border-box"
        }}>
            <div style={{"display": "flex", "justifyContent": "space-between"}}>
                <div>{title}</div>
                <div style={{
                    "maxWidth": "70%",
                    "overflow": "hidden",
                    "textOverflow": "ellipsis"
                }}>{description}</div>
            </div>
            <div style={{"display": "flex", "justifyContent": "end", "color": "#ffffff26", "marginTop": "3px"}}>
                by: {username}
            </div>
        </div>
    );
}

export default function Browse() {
    const endpoint = "185.84.80.172:7085"
    const navigate = useNavigate();
    const [polls, setPolls] = useState([]);
    
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
    
    const queryPolls = async () => {
        let resp = null;
        try {
            resp = await fetch("https://" + endpoint + "/polls", {
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
        resp.json().then(async v => {
            for (let i = 0; i < v.length; i++) {
                const element = v[i];

                // query the username
                let resp = null
                try {
                    resp = await fetch("https://" + endpoint + "/users/" + element.userID, {
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
                resp.json().then(v => {
                    setPolls(oldPolls => [...oldPolls, <Poll title={element.title} description={element.description} username={v.userName} pollId={element.pollID} navigate={navigate}></Poll>])
                })
            }
        });
    };

    useEffect(() => {
        queryPolls();
    }, []);

    const goBack = () => {
        navigate(-1);
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
                <div id="poll-inner">
                    {polls}
                </div>
            </div>
            <div style={{ "height": "100%", "flex": "0.5 1" }}></div>
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