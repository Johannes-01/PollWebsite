import { useNavigate } from "react-router-dom";
import { Button, TextField } from "../Components/components";
import "../style/login.css"
import PasswordField from "../Components/Input/PasswordField";
import { useState } from "react";
import { isLoggedIn } from "..";
import React from "react";

export function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

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

    React.useEffect(() => {
        if (isLoggedIn()) {
            //loginAnimation();
            let dialogue_login = document.getElementById("dialogue-login");
            dialogue_login.style.transition = "all 0s";
            dialogue_login.style.height = "0px";
            dialogue_login.style.opacity = "0";

            let dialogue_choice = document.getElementById("dialogue-choice");
            dialogue_choice.style.display = "flex";

            let dialogue = document.getElementById("dialogue");
            dialogue.style.height = "fit-content"; // padding: 45px 30px;
            dialogue.style.width = "450px";
        }
    }, []);

    const loginAnimation = () => {
        // reshape animation for the login div
        let dialogue = document.getElementById("dialogue");
        dialogue.classList.add("reshape-dialogue-class");

        // fade out for the login ui components
        let dialogue_login = document.getElementById("dialogue-login");
        //dialogue_login.classList.add("fadeout");
        //dialogue_login.classList.add("heightzero");
        dialogue_login.style.height = "0px";
        dialogue_login.style.opacity = "0";

        // fade in for the choice ui components
        let dialogue_choice = document.getElementById("dialogue-choice");
        dialogue_choice.style.display = "flex";
        let dialogue_browse = document.getElementById("dialouge-browse");
        dialogue_browse.style.display = "flex";
    };

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
            setCookie("isLoggedIn", true, 1);
            loginAnimation();
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

    const browsePolls = () => {
        navigate("/browse");
    };
    
    const takepoll = () => {
        let pollId = window.prompt("enter poll id");
        if (pollId === null) return;
        navigate("/takepoll", {state: {pollId: pollId}});
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
                        <h2 style={{ "marginBottom": "40px" }}>Login</h2>
                        <div id="middle">
                            <TextField title={"Username"} onInputChange={handleUsernameChange} style={username_input_style} tabIndex={"1"}></TextField>
                            <PasswordField title={"Password"} onInputChange={handlePasswordChange} style={password_input_style} tabIndex={"2"}></PasswordField>
                        </div>
                        <Button text={"login"} onclick={login} loading={loginLoading} style={{ "marginTop": "60px" }} tabIndex={"3"}></Button>
                        <div style={{ "color": "var(--white)", "textDecorationLine": "underline", "cursor": "pointer", "marginTop": "3px", "fontSize": "13px" }}
                            onClick={signUp} tabIndex={"4"}>
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
            <div id ="dialouge-browse">
                <span onClick={browsePolls}>Browse polls</span>
            </div>
        </div>
    );
};