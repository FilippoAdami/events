import React, { useState, useEffect } from "react";
import axios from "axios";

class MapC extends React.Component
{
    constructor(props) {
    super(props);
    this.state = {
        id: props.id,
        lat : props.lat,
        lng : props.lng,
    };
    }

    render(){
    return(
        <div>
        <h1>MAP COMPONENTS</h1>
        <table>
            <tr>
                <th>LAT</th>
                <th>LNG</th>
            </tr>
            <tr>
                <td>{this.state.lat}</td>
                <td>{this.state.lng}</td>
            </tr>
        </table>
        </div>
    );
    }

};


function getCoordinates(id){ 
    axios
    .get(`http://localhost:5000/api/eventi/${id}/coordinate`)
    .then((response) => {console.log(response);})
    .catch((error) => {console.log(error);});
}


export {getCoordinates};
export default MapC; 