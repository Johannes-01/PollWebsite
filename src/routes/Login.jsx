import { json, useNavigate } from "react-router-dom";
import { Button, TextField } from "../Components/components";
import "../style/login.css"
import PasswordField from "../Components/Input/PasswordField";
import axios, { HttpStatusCode } from "axios";
import { useState } from "react";
import { createRef } from "react";
import { useRef } from "react";

export default function Login() {
    const navigate = useNavigate();
    const endpoint = "185.84.80.172:7085"

    const [loginLoading, setLoginLoading] = useState(false);

    const [username_input_style, set_username_input_style] = useState({});
    const [password_input_style, set_password_input_style] = useState({});
    const [info_msg_style, set_info_msg_style] = useState({ display: "none", color: "red" });

    //#region states 
    const [UsernameValue, setUsernameValue] = useState("");

    function handleUsernameChange(newValue) {
        setUsernameValue(newValue);
    }

    const [PasswordValue, setPasswordValue] = useState("");

    function handlePasswordChange(newValue) {
        setPasswordValue(newValue);
    }
    //#endregion

    const login = async (e) => {
        // request body
        const loginData = {
            username: UsernameValue,
            password: PasswordValue,
        }

        //TO DO: Only show login if not signed in (cookie credentials)
        //To DO: Handle UI if Login was unsuccessful [status 401]
        // http request to validate credentials
        console.log("trying to log in ...");
        setLoginLoading(true);
        let response = null;
        try {
            response = await fetch('https://' + endpoint + '/login', {
                method: "post",
                headers: {
                    "content-type": "application/json",
                    "accept": "*/*",
                    "cookie": "",
                },
                body: JSON.stringify(loginData),
                credentials: "include",
            })
        } catch (error) {
            console.error('this error' + error);
        }
        setLoginLoading(false);
        console.log(response);
        console.log(response.headers['set-cookie'])
        if (response !== null && response.status === 200) {
            // reshape animation for the login div
            let dialogue = document.getElementById("dialogue");
            dialogue.classList.add("reshape-dialogue-class");

            // fade out for the login ui components
            let dialogue_login = document.getElementById("dialogue-login");
            dialogue_login.classList.add("fadeout");

            // fade in for the choice ui components
            let dialogue_choice = document.getElementById("dialogue-choice");
            dialogue_choice.style.display = "flex";
            dialogue_choice.classList.add("fadein");
        } else {
            // erstmal beide input felder auf rot setzen
            set_username_input_style({ borderWidth: "1px", borderColor: "red", borderStyle: "solid" });
            set_password_input_style({ borderWidth: "1px", borderColor: "red", borderStyle: "solid" });
            set_info_msg_style({ color: "red", display: "block" });

            let button = e.target;
            button.classList.add("button-shake");
            const listener = () => {
                button.classList.remove("button-shake");
                button.removeEventListener("animationiteration", listener);
            }
            button.addEventListener("animationiteration", listener);
        }
    };

    const takepoll = () => {
        navigate("/takepoll");
    };

    const createpoll = () => {
        navigate("/createpoll");
    };

    const signUp = () => {
        navigate("/signup");
    };

    return (
        <div id="login-root">
            <div id="dialogue">
                <div id="dialogue-padding">
                    <div id="dialogue-login">
                        <h2>Login</h2>
                        <div id="middle">
                            <TextField title={"Username"} onInputChange={handleUsernameChange} style={username_input_style} ></TextField>
                            <PasswordField title={"Password"} onInputChange={handlePasswordChange} style={password_input_style} ></PasswordField>
                        </div>
                        <Button text={"login"} onclick={login} loading={loginLoading}></Button>
                        <div style={{"color": "var(--white)","text-decoration-line": "underline", "cursor": "pointer", "marginTop": "3px", "fontSize": "13px"}}
                        onClick={signUp}>
                            <a>Sign up</a>
                        </div>
                        <p style={info_msg_style}>Wrong username or password</p>
                    </div>
                    <div id="dialogue-choice">
                        <Button text={"Create poll"} onclick={createpoll}></Button>
                        <Button text={"Take poll"} onclick={takepoll}></Button>
                    </div>
                </div>
            </div>
        </div>
    );
};