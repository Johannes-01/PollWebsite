import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "../Components/components";
import "../style/login.css"

export default function Login() {
    const navigate = useNavigate();

    const login = () => {
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

    return (
        <div id="login-root">
            <div id="dialogue">
                <div id="dialogue-padding">
                    <div id="dialogue-login">
                        <h2>Login</h2>
                        <div id="middle">
                            <TextField title={"E-Mail"}></TextField>
                            <TextField title={"Password"}></TextField>
                        </div>
                        <Button text={"submit"} onclick={login}></Button>
                    </div>
                    <div id="dialogue-choice">
                        <Button text={"Create poll"}></Button>
                        <Button text={"Take poll"} onclick={takepoll}></Button>
                    </div>
                </div>
            </div>
        </div>
    );
};