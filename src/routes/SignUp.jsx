import { json, useNavigate } from "react-router-dom";
import { Button, TextField } from "../Components/components";
import "../style/signup.css"
import PasswordField from "../Components/Input/PasswordField";
import axios, { HttpStatusCode } from "axios";
import { useState } from "react";
import { createRef } from "react";
import { useRef } from "react";

export default function SignUp() {
    const endpoint = "185.84.80.172:7085"

    const [nameValue, setNameValue] = useState("");
    const [surnameValue, setSurnameValue] = useState("");
    const [usernameValue, setUsernameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const handleNameChange = (value) => {setNameValue(value)}
    const handleSurnameChange = (value) => {setSurnameValue(value)}
    const handleUsernameChange = (value) => {setUsernameValue(value)}
    const handleEmailChange = (value) => {setEmailValue(value)}
    const handlePasswordChange = (value) => {setPasswordValue(value)}

    const signup = async () => {
        let form = {
            "email": emailValue,
            "firstname": nameValue,
            "lastname": surnameValue,
            "birthDate": "2023-06-16T12:07:01.508Z",
            "role": "admin",
            "username": usernameValue,
            "password": passwordValue,
        };
        console.log(form);
        let response = await fetch("https://" + endpoint + "/users", {
            method: "post",
            headers: {
                "content-type": "application/json",
                "accept": "*/*",
            },
            body: JSON.stringify(form),
            credentials: "include",
        });
        console.log(response)
    };

    return (
        <div id="login-root">
        <div id="dialogue-signup">
            <div id="dialogue-padding">
                <div id="dialogue-login">
                    <h2>Sign Up</h2>
                    <div id="middle">
                        <TextField title={"Name"} onInputChange={handleNameChange}></TextField>
                        <TextField title={"Surname"} onInputChange={handleSurnameChange}></TextField>
                        <TextField title={"Username"} onInputChange={handleUsernameChange}></TextField>
                        <TextField title={"Email"} onInputChange={handleEmailChange}></TextField>
                        <PasswordField title={"Password"} onInputChange={handlePasswordChange}></PasswordField>
                    </div>
                    <Button text={"Sign Up"} onclick={signup}></Button>
                    <p style={{"display": "none"}}>Wrong username or password</p>
                </div>
            </div>
        </div>
    </div>
    );
}