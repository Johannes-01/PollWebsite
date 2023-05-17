import { useNavigate } from "react-router-dom";
import { Button, TextField } from "../Components/components";
import "../style/login.css"
import PasswordField from "../Components/Input/PasswordField";
import axios from "axios";
import { useState } from "react";

export default function Login() {
    const navigate = useNavigate();

    //#region states 
    const [UsernameValue, setUsernameValue] = useState("");

    function handleUsernameChange(newValue) {
        setUsernameValue(newValue);
    }

    const[PasswordValue, setPasswordValue] = useState("");

    function handlePasswordChange(newValue){
        setPasswordValue(newValue);
    }
    //#endregion

    const login = async () => {
        // request body
        const loginData = {
            username: UsernameValue,
            password: PasswordValue,
        }        

        //TO DO: Only show login if not signed in (cookie credentials)
        //To DO: Handle UI if Login was unsuccessful [status 401]
        try {
            // http request to validate credentials
            const response = await axios.post('https://localhost:7085/login', loginData)   
           if(response.data==="successful"){
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
            }
        } catch (error) {
            console.error('this error'+error)
        }
    };

    const takepoll = () => {
        navigate("/takepoll");
    };

    const createpoll = () => {
        navigate("/createpoll");
    };

    return (
        <div id="login-root">
            <div id="dialogue">
                <div id="dialogue-padding">
                    <div id="dialogue-login">
                        <h2>Login</h2>
                        <div id="middle">
                            <TextField title={"E-Mail"} onInputChange={handleUsernameChange}></TextField>
                            <PasswordField title={"Password"} onInputChange={handlePasswordChange}></PasswordField>
                        </div>
                        <Button text={"login"} onclick={login}></Button>
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