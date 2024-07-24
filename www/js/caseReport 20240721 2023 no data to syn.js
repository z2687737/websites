console.log('  loaded websites/btf/www/js/caseReport.js ');

/*The DOMContentLoaded event listener 
ensures the script executes when the DOM is fully loaded.*/
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('caseReport');

/*
The submit event listener on the caseReport form 
prevents the default form submission behavior 
and collects all form data into a FormData object.
*/
    form.addEventListener('submit', function (event) {
        event.preventDefault();

/*
Data Handling: 
The form data is serialized into 
a JavaScript object (data) and 
sent to the server 
using fetch() in JSON format.
*/

        const formData = new FormData(form);
        const data = {
            IDlogin: formData.get('IDlogin'),
            reporterName: formData.get('reporterName'),
            reporterContact: formData.get('reporterContact'),
            reporterEmailAddress: formData.get('reporterEmailAddress'),
            dateTimePicker: formData.get('dateTimePicker'),
            decDist: formData.get('decDist'),
            campsite: formData.get('campsite'),
            issueType: formData.get('issueType'),
            issuetypeoptions: formData.get('issuetypeoptions'),
            problem: formData.get('problem'),
            severity: formData.get('severity'),
            frequency: formData.get('frequency'),
            emailDEC: formData.get('emailDEC'),
            issueDescription: formData.get('issueDescription'),
            latitude: formData.get('latitude'),
            longitude: formData.get('longitude'),
            photo: formData.get('photo'),
            video: formData.get('video'),
            created_at: formData.get('created_at')
        };

/* caseReport.js fetch user input from caseReport.html 
to POST to serverRouteCaseReport.js 
for inserting into database via serverRoute.js */

        fetch('/api/caseReport', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            alert('Case Report - Submitted successfully');
            window.location.href = '../index.html';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Case Report submission failed!');
        });
/*
Email Selection Logic: 
When emailDEC is set to "yes", 
the script retrieves the selected decDist value from the form. 
It then uses an object (emailAddresses) 
to map decDist values to corresponding email addresses.
*/
        if (formData.get('emailDEC') === 'yes') {
            const decDistrict = formData.get('decDist');
            const emailAddresses = {
                albany: 'albany@AlbanyDECDist.com',
                blackwood: 'blackwood@BlackwoodDECDist.com',
                dManjimup: 'dManjimup@DonnellyManjimupDECDist.com',
                dPemberton: 'dPemberton@DonnellyPembertonDECDist.com',
                frankland: 'frankland@FranklandDECDist.com',
                perthHillsDwellingup: 'perthHillsDwellingup@Perth HillsDwellingupDECDist.com',
                perthHillsMundaring: 'perthHillsMundaring@Perth HillsMundaringDECDist.com',
                wellington: 'wellington@WellingtonDECDist.com'
            };
/*
Email Sending: 
The selected email address (to) is dynamically set 
based on the decDist value selected by the user.
*/
            const emailData = {
                from: formData.get('reporterEmailAddress'),
                to: emailAddresses[decDistrict],
                subject: 'Case Report Form Submission',
                text: `Name: ${formData.get('decDist')}\nEmail: ${formData.get('reporterEmailAddress')}\nSubject: Case Report\nMessage: ${formData.get('issueDescription')}`
            };

            fetch('/api/emailCaseReport', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emailData)
            })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                alert('Case Report - Email DEC District sent successfully');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Case Report email failed!');
            });
        }
    });
});


  //120 ============================ 
// Function to save caseReport data to localStorage

document.getElementById('offlineSaveButton').addEventListener('click', function(event) {
  saveReportOffline();



if (offlineSaveButton) {
  offlineSaveButton.addEventListener('click', function(event) {
    saveReportOffline();
  });
} else {
  console.error('Element with ID "offlineSaveButton" not found.');
}
});

function saveReportOffline() {
  console.log('saveReportOffline function called');
  const formData = new FormData(document.getElementById('caseReport'));
  const data = {};

  formData.forEach((value, key) => {
      data[key] = value;
  });

  console.log('Data:', data);
  localStorage.setItem('caseReportData', JSON.stringify(data));
  alert('Form data saved locally!');
}


/* line 126 saveReportOffline()
Offline Storage: 
saveReportOffline() saves form data to localStorage as a JSON string.
 */

function saveReportOffline() {
  console.log('caseReport.js line 127 saveReportOffline function called');
    const formData = new FormData(document.getElementById('caseReport'));
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    localStorage.setItem('caseReportData', JSON.stringify(data));
    alert('Form data saved locally!');
}
//===============================  
/* caseReport.js line 139 Call saveReportOffline() on form submit
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    saveReportOffline();
  });
  */
  /* function to Save GPS Data offline */
  // Save GPS data to localStorage

  function saveGPSData(position) {
    const gpsData = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    localStorage.setItem('gpsData', JSON.stringify(gpsData));
  }
  
  navigator.geolocation.getCurrentPosition(saveGPSData);
  
  /* function to Save Camera Video Data offline */
// Capture and save camera image

function captureAndSaveImage() {
  const video = document.querySelector('video');
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  const imageData = canvas.toDataURL('image/png');
  localStorage.setItem('cameraImage', imageData);
}


// Capture and save video

function captureAndSaveVideo() {
    const videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
    const reader = new FileReader();
    reader.onloadend = function() {
      const base64data = reader.result;
      localStorage.setItem('videoData', base64data);
    };
    reader.readAsDataURL(videoBlob);
  }
  
  //205============================ 
// Function to sync data when online
/*
Syncing Data from Local Storage:
On application load, check for any data in localStorage.

If data exists, send it to the server and 
clear localStorage upon successful upload response (“data uploaded to MySQL databases”);.

If data does not exist, response (“no data to sync”);
*/

// Sync data to server
async function syncDataToServer() {
  console.log('syncDataToServer function called');
    const formData = JSON.parse(localStorage.getItem('formData'));
    const gpsData = JSON.parse(localStorage.getItem('gpsData'));
    const cameraImage = localStorage.getItem('cameraImage');
    const videoData = localStorage.getItem('videoData');
  
    if (formData || gpsData || cameraImage || videoData) {
      try {
        const response = await fetch('/sync-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            formData: formData,
            gpsData: gpsData,
            cameraImage: cameraImage,
            videoData: videoData,
          }),
        });
  
        if (response.ok) {
          // Clear local storage after successful sync
          localStorage.removeItem('formData');
          localStorage.removeItem('gpsData');
          localStorage.removeItem('cameraImage');
          localStorage.removeItem('videoData');
          console.log('Data synced successfully!');
        }
      } catch (error) {
        console.error('Error syncing data:', error);
      }
    } else {
        alert('No data to sync');
    }
}

//256 =========================== 
  // Call syncDataToServer() on application load
  window.addEventListener('load', syncDataToServer);

 
  
/*
 Data Sync: 
 syncDataOnline() retrieves form data from localStorage, 
 sends it to the server via fetch(), 
 and removes it from localStorage upon successful sync.
 */

function syncDataOnline() {
  console.log('caseReport.js line 246 syncDataOnline function called');
    const formData = JSON.parse(localStorage.getItem('formData'));

    if (formData) {
        const data = new FormData();
        data.append('photo', formData.photo);
        data.append('video', formData.video);
        // Append other fields to data as needed

        fetch('/saveReport', {
            method: 'POST',
            body: data
        })
        .then(response => response.json())
        .then(data => {
            alert('Report synced successfully');
            localStorage.removeItem('formData');
        })
        .catch(error => console.error('Error syncing data:', error));
    } else {
        alert('No report data found to sync');
    }
}

document.getElementById('syncData').addEventListener('click', syncDataOnline);

/*
Email Functionality: The email functionality checks if emailDEC is 'yes' and sends an email with relevant form data to a specified endpoint.
Event Listeners: syncDataOnline is attached to the syncData button for online synchronization.
*/

//  function to retrieve saved data
function retrieveSavedData() {
    let savedData = localStorage.getItem('formData');
    if (savedData) {
        let formData = JSON.parse(savedData);
        // Use formData as needed, e.g., send to server
    }
}

// Save GPS data to localStorage
function saveGPSData(position) {
  const gpsData = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
  };
  localStorage.setItem('gpsData', JSON.stringify(gpsData));
}
navigator.geolocation.getCurrentPosition(saveGPSData);

// Capture and save camera image
function captureAndSaveImage() {
  const video = document.querySelector('video');
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  const imageData = canvas.toDataURL('image/png');
  localStorage.setItem('cameraImage', imageData);
}

// Capture and save video
function captureAndSaveVideo() {
  const videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
  const reader = new FileReader();
  reader.onloadend = function() {
      const base64data = reader.result;
      localStorage.setItem('videoData', base64data);
  };
  reader.readAsDataURL(videoBlob);
}




// Fetch data from server and display in administration function page
async function fetchDataAndDisplay() {
    try {
      const response = await fetch('/fetch-data');
      const data = await response.json();
  
      const tableBody = document.getElementById('admin-table-body');
      data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.email}</td>
          <td>${item.latitude}</td>
          <td>${item.longitude}</td>
          <td><img src="${item.cameraImage}" alt="Camera Image" width="100"></td>
          <td><video src="${item.videoData}" width="100" controls></video></td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error('caseReport line 375 Error fetching data:', error);
    }
  }
  
  // Call fetchDataAndDisplay() on page load
  window.addEventListener('load', fetchDataAndDisplay);

  
  


