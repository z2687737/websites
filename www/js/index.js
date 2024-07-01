//www/js/index.js

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    document.getElementById('getGPS').addEventListener('click', getLocation);
    document.getElementById('takePhoto').addEventListener('click', takePhoto);
}

//VOLUNTEER PROFILE CSV FILE

//TRACK MAINTENANCE REPORT CSV FILE
function reportIssue() {
    const checkIn = document.getElementById('ChkInDTS').value;
    const checkOut = document.getElementById('ChkOutDTS').value;
    const issueType = document.getElementById('issueType').value;
    const description = document.getElementById('issueDescription').value;

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const hoursWorked = (checkOutDate - checkInDate) / 1000 / 3600;
    alert('Hours worked: ' + hoursWorked);

    // Get GPS Location
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    function onSuccess(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const data = {
            checkIn,
            checkOut,
            hoursWorked,
        };

        const issueData = {
            issueType,
            description,
            latitude,
            longitude
        };
    
        const issueCsvData = Object.values(issueData).join(",") + "\n";
        localStorage.setItem('issueReport', issueCsvData);
        alert('Issue reported successfully');
    }

    function onError(error) {
        console.error('Error getting location: ' + error.message);
    }
    
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }
        
        function showPosition(position) {
            alert("Latitude: " + position.coords.latitude + "\nLongitude: " + position.coords.longitude);
        }
        
        function showError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    alert("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    alert("An unknown error occurred.");
                    break;
            }
        }

// CAMERA FUNCTIONALITY

function takePhoto() {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
    });
}

function onPhotoDataSuccess(imageURI) {
    const image = document.getElementById('image');
    image.style.display = 'block';
    image.src = imageURI;
}

function onFail(message) {
    alert('Failed because: ' + message);
}

        //DATA BASE CSV FILES

        const volunteerCsvData = Object.values(volunteerData).join(",") + "\n";
        localStorage.setItem('volunteerReport', volunteerCsvData);      
        alert('Volunteer Profile CSV Updated successfully');

        const issueCsvData = Object.values(issueData).join(",") + "\n";
        localStorage.setItem('issueReport', issueCsvData);
        alert('Issue reported successfully');
        
    }

    function onError(error) {
        console.error('Error getting location: ' + error.message);
    }
}


//CAMERA FUNCTIONALITY

function takePhoto() {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
    });
}

function onPhotoDataSuccess(imageURI) {
    const image = document.getElementById('image');
    image.style.display = 'block';
    image.src = imageURI;
}

function onFail(message) {
    alert('Failed because: ' + message);
}

document.getElementById('takePhoto').addEventListener('click', takePhoto);

