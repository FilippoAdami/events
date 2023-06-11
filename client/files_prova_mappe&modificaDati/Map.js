import React, {useEffect} from "react";

function Map()
{

    useEffect(() => {

        const head = document.querySelector("head");
        //const script = document.createElement("script");
        //const style = document.createElement("style");
        //const mapDiv = document.createElement("div");
        //const mapScript = document.createElement("script");
        

        // test script 
        const h1Elem = document.createElement("h1");
        h1Elem.setAttribute("id","testElem");
        const testScript = document.createElement("script");
        testScript.setAttribute("src","C:\\Users\\matte\\Desktop\\Matteo\\Corsi\\IngegneriaDelSoftware\\events\\events-2\\client\\src\\scripts\\pages\\testScript.js");


        //<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        //  integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        //  crossorigin=""/>

        //style.setAttribute("rel","stylesheet");
        //style.setAttribute("href","https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");
        //style.setAttribute("integrity","sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=");
        //style.setAttribute("crossorigin","");

        //<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        //integrity=
        //crossorigin="">
        //</script>

        //script.setAttribute("src","https://unpkg.com/leaflet@1.9.4/dist/leaflet.js");
        //script.setAttribute("integrity","sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=");
        //script.setAttribute("crossorigin","");
//
        //script.onload = () => {
        //    console.log("script loaded");
        //}
//
        //script.onerror = () => {
        //    console.log("error at loading");
        //}


        //mapDiv.setAttribute("id","map");
        //mapDiv.setAttribute("style","height: 500px ; width: 500px");


        //mapScript.setAttribute("src","./mapTestScript.js");

        //mapScript.onload = ()=> {
        //    console.log("mapScript loaded as well");
        //}


        //head.appendChild(script);
        //head.appendChild(style);
        //head.appendChild(mapScript);
        //document.body.appendChild(mapDiv);
        document.body.appendChild(testScript);


    
        return () => {
            //head.removeChild(style);
            //head.removeChild(script);
            //document.body.removeChild(mapDiv);
        };
    
        });
    
    return(
        <h1>MAPS</h1>
    )

}

export default Map;