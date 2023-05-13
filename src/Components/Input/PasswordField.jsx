import "./TextField.css"

export default function PasswordField({title}) {
    return (
        <div id="textfield-wrapper">
        <p>{title}</p>
        <input type="password"></input>
        </div>
    );
}