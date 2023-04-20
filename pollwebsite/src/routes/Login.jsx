import { Link, useNavigate } from "react-router-dom";
import Button from "../Components/Input/Button";
import TextField from "../Components/Input/TextField";
import "../style/login.css"

export default function Login() {

    return (
        <div id="login-root">
            <div id="dialogue">
                <h2>Login</h2>
                <TextField title={"E-Mail"}></TextField>
                <TextField title={"Password"}></TextField>
                <Button text={"submit"}></Button>
            </div>
        </div>
    );
};