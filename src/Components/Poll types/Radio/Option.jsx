export default function Option({content, onClick}) {
    return (
        <div className="option" onClick={onClick}>
            <div id="custom-checkbox" style={{"pointerEvents": "none"}}>
                <div id="outer-circle" style={{"pointerEvents": "none"}}>
                    <div id="inner-circle" style={{"pointerEvents": "none"}}></div>
                </div>
            </div>
            <p style={{"pointerEvents": "none"}}>{content}</p>
        </div>
    );
}