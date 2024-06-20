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

const streets = {
        "Subiaco": ["Hay Street", "Rokeby Road"],
        "Fremantle": ["South Terrace", "High Street"],
        "Cottesloe": ["Marine Parade", "Napier Street"]
        // Add more streets for each suburb as needed
    };

    function updateStreets() {

        const suburbSelect = document.getElementById('suburb');
console.log("The function is being called when you select a suburb.")
        
        const streetSelect = document.getElementById('street');
console.log("The streets object is correctly defined and accessible.")
        
        const selectedSuburb = suburbSelect.value;
console.log("Selected suburb:", selectedSuburb); // Check if suburb value is correct
        
        // Clear current street options
        streetSelect.innerHTML = '<option value="">Select a street</option>';

        if (streets[selectedSuburb]) {
            streets[selectedSuburb].forEach(street => {
                const option = document.createElement('option');
                option.value = street;
                option.textContent = street;
                streetSelect.appendChild(option);
console.log("The streetSelect dropdown is correctly identified and updated with options based on the selected suburb.")
                
            });
        }
    }

