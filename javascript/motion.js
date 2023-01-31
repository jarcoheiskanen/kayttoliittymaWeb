
const API_URL = "https://api.thingspeak.com/channels/2015532/feeds.json?api_key=EZMMHTY2M7JXM5E5&results=" // API KEY Linkki
const API_URL_RES1 = "https://api.thingspeak.com/channels/2015532/feeds.json?api_key=EZMMHTY2M7JXM5E5&results=1" // API KEY Linkki, mutta hakee vain yhden

async function getMovement() { // Funktio, joka hakee JSON dataa API_URL muuttuja linkistä.
    const response = await fetch(API_URL); // Hakee vastausta API_URL muuttujasta.
    const responseData = await response.json(); // Muuttaa vastuksen JSON muotoon. "await" odottaa aina että vastaus on haettu.
    return responseData.feeds;
};

let responseData = getMovement(); // Aloittaa funktion, ja hakee sieltä response datan.

(async function() { // Async funktio, jotta voi taas käyttää "await".
    const data = await getMovement(); // Hakee datan getMovement() funktiosta.
    const latest = data[data.length-1]
    console.log("Uusin", latest); // Printtaa uusimman datan.
    document.getElementById("movement2").innerHTML = (latest.field1 == 1 && "LIIKETTÄ") || "EI LIIKETTÄ"
    document.getElementById("movement").style.backgroundColor = (latest.field1 == 1 && "red") || "green" // Vaihtaa "movement" id muuttujan HTML:ssä punaiseksi tai vihreäksi. Jos field1 on 1, se on punainen, jos 0, se on vihreä.
    data.map(function(dataMap){ // Mappaa datan parempaan muotoon.
        // console.log(`${dataMap.field1}`); // Printtaa kaikki field1 arvot.
    });
})();