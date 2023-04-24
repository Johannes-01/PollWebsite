export default function Option({content, onClick}) {
    return (
        <div id="spinner-option" onClick={onClick}>{content}</div>
    );
}