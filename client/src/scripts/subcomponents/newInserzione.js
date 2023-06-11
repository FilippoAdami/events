import React from "react";
import {AddAnnuncio} from "./annuncio.js";
import { PostEvento } from "./evento";

// Component NewInserzione
function NewInserzione({typeIns}) {
    if(typeIns === 'annuncio'){ return(<AddAnnuncio />); }
    else if(typeIns === 'evento'){return(<PostEvento/>);}
    else{return(<div>Errore</div>);}
}
export default NewInserzione;