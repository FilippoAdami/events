import React from "react"
import ReactDOM from "react-dom/client" 
import getCoordinates from "../src/scripts/subcomponents/map.js"


const mapElement = (<p>
                <h1>component test</h1>
                <MapC lat="lat" lng="14"/>
                </p>)


const testElement = <h1>TEST</h1> ;
console.log(document.getElementById("mapTestPageRoot"));
const root = ReactDOM.createRoot("mapTestPageRoot");
root.render(testElement);