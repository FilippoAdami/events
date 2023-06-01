
const reqConstants = { 
    reqURLbase : "https://api.opencagedata.com/geocode/v1/json?q=URI-ENCODED-PLACENAME&key=05cff32b8c434e58b51d595380624f74&limit=1", 
    substringToReplace : "URI-ENCODED-PLACENAME"
};

const mapSetter = async function (place) 
{

    // Set di parametri per la richiesta

    //const place = "Trento , Italy";
    const encodedPlace = encodeURI(place);
    //console.log(encodedPlace);
    const reqURL = reqConstants.reqURLbase.replace(reqConstants.substringToReplace,encodedPlace);

    const position = {zoom : 13};

    // Richiesta
    
    const dataDMS = await fetchCall(reqURL);

    // Conversione dei dati da DMS a decimali

    const decimalLat = await ConvertDMSToDEG(dataDMS.lat);
    const decimalLng = await ConvertDMSToDEG(dataDMS.lng);

    position.lat = decimalLat;
    position.lng = decimalLng;

    console.log("position.lat : " + position.lat +" position lng : " + position.lng );

    return await(position) ;

    // Creazione zona mappa e filling cone le tiles LATO FRONTEND
    
    //const map = L.map('map').setView([position.lat,position.lng], position.zoom);
    //        
    //L.tileLayer(tileURL, {
    //            maxZoom: 19,
    //            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    //            }).addTo(map);
    //        
    //        var marker = L.marker([position.lat, position.lng]).addTo(map);
    //        marker.bindPopup(popup.quote).openPopup();

}


async function ConvertDMSToDEG(dms) {  
    //console.log("dms "+ dms);
    const dms_Array = dms.split(/[^\d\w\.]+/); 
    const degrees = dms_Array[0];
    const minutes = dms_Array[1];
    const seconds = dms_Array[2];
    const direction = dms_Array[3];

    var deg = (Number(degrees) + Number(minutes)/60 + Number(seconds)/3600).toFixed(6);


   // console.log("deg :" + deg);

    if (direction == "S" || direction == "W") {
        deg = deg * -1;
    } // Don't do anything for N or E
    
    return deg;

}

async function fetchCall(reqURL) {

    const data = await fetch(reqURL);

    const response = await data.json();

    //console.log(response);

    const {lat,lng} = response.results[0].annotations.DMS;

   // console.log(response.results[0].annotations.DMS);

    const positionDMS = {lat : lat, lng : lng};

    return positionDMS;
    
}


//mapSetter("Trento, Italy");

module.exports = mapSetter;