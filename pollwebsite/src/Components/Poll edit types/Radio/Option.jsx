export default function Option({content, onClick}) {
    return (
        <div className="option" onClick={onClick}>
            <div id="custom-checkbox">
                <div id="outer-circle">
                    <div id="inner-circle"></div>
                </div>
            </div>
            <p>{content}</p>
        </div>
    );
}