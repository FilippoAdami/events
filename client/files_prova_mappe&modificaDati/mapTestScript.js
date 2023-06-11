    //6469d40788175e21c5bf230d
    //6469e719edbf5af71c5bf5fa
    const id = "6469d40788175e21c5bf230d";
    const geoCo = {key : "05cff32b8c434e58b51d595380624f74"};
    const position = {lat : 40.712728 ,lng : -74.006015, zoom :13};
    const tileURL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
    const popup = {quote : "placeholder"};
//
//    //console.log("check 1");
//    //http://localhost:3000/api/eventi/${id}/coordinate
//    //https://rickandmortyapi.com/api/character
//
//    fetch(`http://localhost:3000/api/eventi/${id}/coordinate`)
//    .then((response) => {
//      if (!response.ok) {
//        console.log("errore nell'operazione di fetch");
//      }
//      const responseJson = response.json();
//      return responseJson;
//
//    })
//    .then((dataJson)=>{
//      console.log(dataJson);
//      const {titolo,position} = dataJson;
//      popup.quote = titolo;
//      console.log(position);
//      document.getElementById("titolo").innerText = popup.quote;
//      //document.getElementById("lng").innerText= position.lng;
//      //document.getElementById("lat").innerText= position.lat;
//      //document.getElementById("zoom").innerText= position.zoom;
//
//      return position;
//    })
//    .then((position)=>{
//      //console.log("third"+ position.lat);
//      const map = L.map("map").setView([position.lat,position.lng], position.zoom);
//      console.log(map);        
//      L.tileLayer(tileURL, {
//        maxZoom: 19,
//        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//        }).addTo(map);
//        
//      var marker = L.marker([position.lat, position.lng]).addTo(map);
//      marker.bindPopup(popup.quote).openPopup();
//
//    })
//    .catch((error) => {
//    console.log(error);
//    });
//
//   
//    
