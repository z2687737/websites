console.log('loaded websites/btf/www/js/clickCamera.js ');

// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get the button element by its ID
    const clickCameraButton = document.getElementById('clickCamera');
   
    // Attach the takePhoto function to the button's click event
    clickCameraButton.addEventListener('click', takePhoto);
});

/*
"navigator.mediaDevices.getUserMedia"
 the "WebRTC API"
is a standard set of APIs supported by modern 
 web browsers on both desktop and mobile devices.
 */

// Function to take a photo using the device's camera
function takePhoto() {
    // Check if the device supports camera access
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Request access to the camera
        navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: { exact: "environment" }  } 
        }).then(function (stream) {
            // Create a video element to capture the stream
            let video = document.createElement('video');
            video.style.display = 'none'; // Hide the video element
            video.srcObject = stream;
            document.body.appendChild(video); // Append video to the body (but hidden)
            video.play();

            // Wait for the video to be ready
            video.onloadedmetadata = function (e) {
                // Create a canvas to take a snapshot
                let canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                let context = canvas.getContext('2d');

                // Draw the current frame from the video onto the canvas
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Get the image data from the canvas as a Data URL
                let imageData = canvas.toDataURL('image/png');

                // Stop the video stream
                stream.getTracks().forEach(track => track.stop());

                // Create a new image element
                let img = document.createElement('img');
                img.src = imageData;
                img.style.height = '300px';
                img.style.width = '100%';

                // Display the image in the image container
                let imageContainer = document.getElementById('imageContainer');
                /* imageContainer.innerHTML = ''; // Clear previous content  */
                // Append new image without clearing existing ones
                imageContainer.appendChild(img);

                // Save the image locally
                saveImageLocally(imageData);

                // Upload the photo to the server
                uploadPhoto(imageData);
            };
        }).catch(function (error) {
            console.log("Error accessing the camera: " + error);
        });
    } else {
        alert("Camera not supported on this device.");
    }
}

// Function to save the image data locally
function saveImageLocally(imageData) {
    // Generate a unique file name using the current timestamp
    let fileName = 'photo_' + new Date().getTime() + '.png';

    // Convert the Data URL to a Blob
    let byteString = atob(imageData.split(',')[1]);
    let mimeString = imageData.split(',')[0].split(':')[1].split(';')[0];
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    let blob = new Blob([ab], { type: mimeString });

    // Use the FileSystem API to save the file locally
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
        fileSystem.root.getDirectory('www/img/photo', { create: true }, function (dirEntry) {
            dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
                fileEntry.createWriter(function (fileWriter) {
                    fileWriter.write(blob);
                    console.log('Image saved locally as: ' + fileName);
                }, function (error) {
                    console.log('Error writing file: ' + error);
                });
            }, function (error) {
                console.log('Error creating file: ' + error);
            });
        }, function (error) {
            console.log('Error creating directory: ' + error);
        });
    }, function (error) {
        console.log('Error accessing file system: ' + error);
    });
}

// Function to upload the photo to the server
function uploadPhoto(imageData) {
    const formData = new FormData();
    formData.append('photo', dataURLtoBlob(imageData), 'photo.png');
  
    fetch('http://localhost:3002/upload-photo', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Photo uploaded:', data);
    })
    .catch(error => {
        console.error('Error uploading photo:', error);
    });
}


function dataURLtoBlob(dataURL) {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }