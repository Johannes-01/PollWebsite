import { Link, useNavigate } from "react-router-dom";
import { Button, Radio, Text, Slider } from "../Components/components";
import "../style/take.css"

export default function Take() {

    return (
        <div id="poll-root">
            <div id="poll-wrapper">
                <h1>Heading</h1>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,</p>
                <div id="poll-inner">
                    <Text></Text>
                    <Radio options={["option 1", "option 2", "option 3"]}></Radio>
                    <Slider></Slider>
                </div>
                <div id="ending">
                    <Button text={"finish"}></Button>
                </div>
            </div>
        </div>
    );
};