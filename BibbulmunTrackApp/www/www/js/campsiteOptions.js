//www/js/campsiteOptions.js

// Function to show specific options based on the selected issue type
function showCampsiteOptions() {
    const decDist = document.getElementById("decDist").value;
    document.getElementById("albanyCampsites").style.display = decDist === "albany" ? "block" : "none";
    document.getElementById("blackwoodyCampsites").style.display = decDist === "blackwood" ? "block" : "none";
    document.getElementById("dManjimupCampsites").style.display = decDist === "dManjimup" ? "block" : "none";
    document.getElementById("dPembertonCampsites").style.display = decDist === "dPemberton" ? "block" : "none";
    document.getElementById("franklandCampsites").style.display = decDist === "frankland" ? "block" : "none";
    document.getElementById("perthHillsDwellingupCampsites").style.display = decDist === "perthHillsDwellingup" ? "block" : "none";
    document.getElementById("perthHillsMundaringCampsites").style.display = decDist === "perthHillsMundaring" ? "block" : "none";
    document.getElementById("wellingtonCampsites").style.display = decDist === "wellington" ? "block" : "none";
    document.getElementById("campsites").style.display = decDist === "campsites" ? "block" : "none";
}


// Ensure the function is available when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("decDist").addEventListener("change",  showCampsiteOptions);
});
