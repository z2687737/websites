document.addEventListener("DOMContentLoaded", function() {
    // Get the button element by its ID
    const takePictureButton = document.getElementById('takePictureButton');
    
    // Attach the takePicture function to the button's click event
    takePictureButton.addEventListener('click', takePicture);
});

function takePicture() {
    // Check if the device supports camera access
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Request access to the camera
        navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
            // Create a video element to capture the stream
            let video = document.createElement('video');
            video.srcObject = stream;
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

                // Display the image in the img element
                document.getElementById('myImage').src = imageData;

                // Save the image locally
                saveImageLocally(imageData);
            };
        }).catch(function (error) {
            console.log("Error accessing the camera: " + error);
        });
    } else {
        alert("Camera not supported on this device.");
    }
}

// This function saves the image data locally
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
