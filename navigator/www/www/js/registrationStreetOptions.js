console.log("loaded www/js/registrationStreetOptions.js"); 

// Function to show specific options based on the selected type
function showLocalityOptions() {
    const locality = document.getElementById("locality").value;
    document.getElementById("cityOptions").style.display = locality === "City" ? "block" : "none";
    document.getElementById("townOptions").style.display = locality === "Town" ? "block" : "none";
    document.getElementById("suburbOptions").style.display = locality === "Suburb" ? "block" : "none";  
}

// Ensure the function is available when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("locality").addEventListener("change",  showLocalityOptions);
});

// Function to show specific options based on the selected issue type
function showCityOptions() {
    const cityOptions = document.getElementById("cityOptions").value;
    document.getElementById("addYourStreet").style.display = cityOptions === "cityAlbany" ? "block" : "none";
    document.getElementById("addYourStreet").style.display = cityOptions === "cityBunbury" ? "block" : "none";
    document.getElementById("addYourStreet").style.display = cityOptions === "cityBusselton" ? "block" : "none";
    document.getElementById("addYourStreet").style.display = cityOptions === "cityGeraldton" ? "block" : "none";
    document.getElementById("addYourStreet").style.display = cityOptions === "cityKalgoorlie" ? "block" : "none";
    document.getElementById("addYourStreet").style.display = cityOptions === "cityKarratha" ? "block" : "none";   
}

// Ensure the function is available when the DOM is fully loaded
//document.addEventListener("DOMContentLoaded", () => {
//    document.getElementById("cityOptions").addEventListener("change",  showCityOptions);
//});
document.querySelectorAll('.cityOptions').forEach(element => {
    element.addEventListener('change', showCityOptions);
});


// Function to show specific options based on the selected issue type
function showTownOptions() {
    const townOptions = document.getElementById("townOptions").value;
    document.getElementById("addYourStreet").style.display = townOptions === "townBrookton" ? "block" : "none";
    document.getElementById("addYourStreet").style.display = townOptions === "townDonnellyRiver" ? "block" : "none";
    document.getElementById("addYourStreet").style.display = townOptions === "townDwellingup" ? "block" : "none";
    document.getElementById("addYourStreet").style.display = townOptions === "townFrankland" ? "block" : "none";
    document.getElementById("addYourStreet").style.display = townOptions === "townGairdner" ? "block" : "none";
    document.getElementById("addYourStreet").style.display = townOptions === "townYornaning" ? "block" : "none";
    document.getElementById("addYourStreet").style.display = townOptions === "townWilliams" ? "block" : "none";
    document.getElementById("addYourStreet").style.display = townOptions === "townAddMore" ? "block" : "none";
}


// Ensure the function is available when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("townOptions").addEventListener("change",  showTownOptions);
});

    
// Function to show specific options based on the selected suburb
function showSuburbOptions() {
    const suburb = document.getElementById("suburb").value;
    document.getElementById("cottesloeStreetOptions").style.display = suburb === "Cottesloe" ? "block" : "none";
    document.getElementById("fremantleStreetOptions").style.display = suburb === "Fremantle" ? "block" : "none";
    document.getElementById("helenaValleyStreetOptions").style.display = suburb === "Helena Valley" ? "block" : "none";
    document.getElementById("mariginiupStreetOptions").style.display = suburb === "Mariginiup" ? "block" : "none";
    document.getElementById("subiacoStreetOptions").style.display = suburb === "Subiaco" ? "block" : "none";
    document.getElementById("yangebupStreetOptions").style.display = suburb === "Yangebup" ? "block" : "none";
    document.getElementById("addYourStreet").style.display = suburb === "Add More Suburb" ? "block" : "none";
}

// Ensure the function is available when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("suburb").addEventListener("change", showSuburbOptions);
});

// Function to show specific options based on the selected issue type
function addYourStreet() {
    const yourStreet = document.getElementById("suburbOptions").value;
    document.getElementById("addYourStreet").style.display = suburbOptions === "suburbAddMore" ? "block" : "none";
}

// Ensure the function is available when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("suburbOptions").addEventListener("change",  addYourStreet);
});

