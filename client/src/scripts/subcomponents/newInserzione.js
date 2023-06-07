import React, { useState, useEffect } from "react";
import {AddAnnuncio} from "./annuncio.js";
import Evento from "./evento";
import axios from "axios";

// Component NewInserzione
function NewInserzione({typeIns}) {
    if(typeIns === 'annuncio'){ return(<AddAnnuncio />); }
    else if(typeIns === 'evento'){return(<div>{typeIns}</div>);}
    else{return(<div>Errore</div>);}
}
export default NewInserzione;