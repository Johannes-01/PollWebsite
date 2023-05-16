import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "../Components/components";
import "../style/login.css"
import PasswordField from "../Components/Input/PasswordField";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();

    const login = async () => {

        const loginData = {
            username: 'admin',
            password: 'admin',
        }
        // here goes http request to validate credentials
        try {
            const response = await axios.post('https://localhost:7085/login', loginData)   
        } catch (error) {
            console.error(error)
        }
            
        // reshape animation if login did not work

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
                            <TextField title={"E-Mail"}></TextField>
                            <PasswordField title={"Password"}></PasswordField>
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