document.addEventListener("DOMContentLoaded", function() {
    // Get the button element by its ID
    const clickVideoButton = document.getElementById('clickVideo');
   
    // Attach the recordVideo function to the button's click event
    clickVideoButton.addEventListener('click', recordVideo);
   
});
function recordVideo() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
            let video = document.createElement('video');
            video.style.display = 'none';
            video.srcObject = stream;
            document.body.appendChild(video);
            video.play();

            let chunks = []; // Store video chunks

            let mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = function(event) {
                chunks.push(event.data);
            };

            mediaRecorder.onstop = function() {
                let blob = new Blob(chunks, { type: 'video/mp4' });

                let videoURL = URL.createObjectURL(blob);

                let videoElement = document.createElement('video');
                videoElement.src = videoURL;
                videoElement.controls = true;
                videoElement.style.height = '300px';
                videoElement.style.width = '100%';

                let videoContainer = document.getElementById('videoContainer');
                // Append new video without clearing existing ones
                videoContainer.appendChild(videoElement);

                // Save and upload video
                saveVideoLocally(blob);
                uploadVideo(blob);
            };

            setTimeout(function() {
                mediaRecorder.stop();
            }, 10000); // Stop recording after 10 seconds
        }).catch(function (error) {
            console.log("Error accessing the camera: " + error);
        });
    } else {
        alert("Camera not supported on this device.");
    }
}

function saveVideoLocally(blob) {
    let fileName = 'video_' + new Date().getTime() + '.mp4';

    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
        fileSystem.root.getDirectory('www/videos', { create: true }, function (dirEntry) {
            dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
                fileEntry.createWriter(function (fileWriter) {
                    fileWriter.write(blob);
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
}

function uploadVideo(blob) {
    fetch('http://localhost:3001/upload-video', {
        method: 'POST',
        body: blob
    })
    .then(response => response.json())
    .then(data => {
        console.log('Video uploaded:', data);
    })
    .catch(error => {
        console.error('Error uploading video:', error);
    });
}