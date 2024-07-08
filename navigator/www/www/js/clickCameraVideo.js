document.addEventListener("DOMContentLoaded", function() {
    // Get the button element by its ID
    const takePhotoButton = document.getElementById('takePhoto');
    const recordVideoButton = document.getElementById('recordVideo');

    // Attach the takePhoto function to the button's click event
    takePhotoButton.addEventListener('click', takePicture);

    // Attach the recordVideo function to the video button's click event
    recordVideoButton.addEventListener('click', recordVideo);

});

function takePicture() {
    // Check if the device supports camera access
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Request access to the camera
        navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
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

// Add the image to the image container
document.getElementById('imageContainer').appendChild(img);

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

function recordVideo() {
    // Check if the device supports camera access
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Request access to the camera with audio
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function (stream) {
            // Create a video element to capture the stream
            let video = document.createElement('video');
            video.srcObject = stream;
            video.controls = true;
            video.play();

            // Display the video element
            document.getElementById('videoPlayback').style.display = 'block';
            document.getElementById('videoPlayback').srcObject = stream;

            // Initialize MediaRecorder
            let mediaRecorder = new MediaRecorder(stream);
            let chunks = [];

            // Start recording
            mediaRecorder.start();

            // Collect data as it comes in
            mediaRecorder.ondataavailable = function(event) {
                chunks.push(event.data);
            };

            // When the recording stops
            mediaRecorder.onstop = function() {
                // Stop all tracks to release the camera
                stream.getTracks().forEach(track => track.stop());

                // Create a blob from the recorded data
                let blob = new Blob(chunks, { type: 'video/webm' });
                let videoURL = URL.createObjectURL(blob);
                document.getElementById('videoPlayback').src = videoURL;

                // Save the video locally
                saveVideoLocally(blob);
            };

            // Stop recording after 5 seconds (example duration)
            setTimeout(function() {
                mediaRecorder.stop();
            }, 5000); // 5 seconds
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

// This function saves the video data locally
function saveVideoLocally(videoBlob) {
    // Generate a unique file name using the current timestamp
    let fileName = 'video_' + new Date().getTime() + '.webm';

    // Use the FileSystem API to save the file locally
    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
        fileSystem.root.getDirectory('www/video/clickCamera', { create: true }, function (dirEntry) {
            dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
                fileEntry.createWriter(function (fileWriter) {
                    fileWriter.write(videoBlob);
                    console.log('Video saved locally as: ' + fileName);
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

 // Convert the Blob to a Data URL
 let reader = new FileReader();
 reader.readAsDataURL(videoBlob);
 reader.onloadend = function() {
     let videoData = reader.result;

     // Send the video data to the server
     fetch('save_video.php', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({ videoData: videoData })
     }).then(response => response.text())
       .then(data => console.log(data))
       .catch(error => console.error('Error:', error));
 };

}

function uploadPhoto(imageData) {
    const formData = new FormData();
    formData.append('photo', imageData);
  
    fetch('http://localhost:3001/upload-photo', {
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
  