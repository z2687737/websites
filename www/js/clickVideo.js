console.log(' loaded websites/btf/www/js/clickVideo.js ');

document.addEventListener("DOMContentLoaded", function() {
    // Get the button element by its ID
    const clickVideoButton = document.getElementById('clickVideo');
    console.log('DOM fully loaded and parsed');
    console.log('clickVideoButton:', clickVideoButton);

    // Attach the recordVideo function to the button's click event
    clickVideoButton.addEventListener('click', recordVideo);
});

/*
"navigator.mediaDevices.getUserMedia"
 the "WebRTC API"
is a standard set of APIs supported by modern 
 web browsers on both desktop and mobile devices.
 */
function recordVideo() {
    console.log('recordVideo function called');
 
/*ERROR
clickVideo.js:78 clickVideo.js line 74 
Error accessing the camera: OverconstrainedError
  */
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ 
            video:  { facingMode: { exact: "environment" }  }  

           /*    navigator.mediaDevices.getUserMedia({ video: true */})
        .then(function (stream) {
            console.log('Access to camera granted');
            let video = document.createElement('video');
            video.style.display = 'none';
            video.srcObject = stream;
            document.body.appendChild(video);
            video.play();

            let chunks = []; // Store video chunks

            let mediaRecorder = new MediaRecorder(stream);
            console.log('MediaRecorder created:', mediaRecorder);

            mediaRecorder.ondataavailable = function(event) {
                console.log('Data available:', event.data);
                chunks.push(event.data);
            };

            mediaRecorder.onstop = function() {
                console.log('MediaRecorder stopped');
                let blob = new Blob(chunks, { type: 'video/mp4' });
                console.log('Blob created:', blob);

                let videoURL = URL.createObjectURL(blob);
                console.log('Video URL created:', videoURL);

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

            // line 74 Start recording
            mediaRecorder.start();
            console.log('MediaRecorder started');

            setTimeout(function() {
                console.log('clickVideo.js line 78 Stopping MediaRecorder after 10 seconds');
                mediaRecorder.stop();
            }, 10000); // Stop recording after 10 seconds
        }).catch(function (error) {
            console.error("clickVideo.js line 74 Error accessing the camera: " + error);
        });
    } else {
        alert("Camera not supported on this device.");
        console.error("Camera not supported on this device.");
    }
}

function saveVideoLocally(blob) {
    console.log('saveVideoLocally function called');
    let fileName = 'video_' + new Date().getTime() + '.mp4';
    console.log('Generated file name:', fileName);

    window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
        console.log('Accessed file system');
        fileSystem.root.getDirectory('www/videos', { create: true }, function (dirEntry) {
            console.log('Accessed directory:', dirEntry);
            dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
                console.log('Accessed file entry:', fileEntry);
                fileEntry.createWriter(function (fileWriter) {
                    console.log('FileWriter created');
                    fileWriter.write(blob);
                    console.log('Video saved locally as: ' + fileName);
                }, function (error) {
                    console.error('Error writing file: ' + error);
                });
            }, function (error) {
                console.error('Error creating file: ' + error);
            });
        }, function (error) {
            console.error('Error creating directory: ' + error);
        });
    }, function (error) {
        console.error('Error accessing file system: ' + error);
    });
}

function uploadVideo(blob) {
    console.log('uploadVideo function called');
    const formData = new FormData();
    formData.append('video', blob);

    fetch('http://localhost:3001/upload-video', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Video uploaded:', data);
    })
    .catch(error => {
        console.error('Error uploading video:', error);
    });
}
