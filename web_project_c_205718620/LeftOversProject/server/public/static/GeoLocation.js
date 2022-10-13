var latitude;
var longitude;
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    document.getElementById("long").value = longitude;
    document.getElementById("lat").value = latitude;
    console.log("lat: " + latitude + " lng: " + longitude);
}

function showError(error) {
    if (error.code == error.PERMISSION_DENIED) {
        alert("If you want to Help the environment and search for leftovers.\nPlease Refresh the page and allow Location");
        console.log("Location request denied");
    }
}