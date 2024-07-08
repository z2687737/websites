const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

// Function to simulate user registration
async function registerUser(driver) {
    try {
        // Navigate to the registration page
        await driver.get('http://localhost:3000/html/registration.html'); // Replace with your actual URL

        // Wait until the registration form is loaded
        await driver.wait(until.elementLocated(By.id('registrationForm')), 10000);

        console.log("Registration form loaded");

        // Fill in the registration form
        await driver.findElement(By.id('loginUserName')).sendKeys('testUser');
        console.log("Username entered");
        await driver.findElement(By.id('loginPassword')).sendKeys('password123');
        console.log("Password entered");
        await driver.findElement(By.id('repeatPassword')).sendKeys('password123');
        console.log("Repeat password entered");
        await driver.findElement(By.id('fName')).sendKeys('John');
        console.log("First name entered");
        await driver.findElement(By.id('lname')).sendKeys('Doe');
        console.log("Last name entered");
        await driver.findElement(By.id('eMail')).sendKeys('test@example.com');
        console.log("Email entered");
        await driver.findElement(By.id('hPhone')).sendKeys('1234567890');
        console.log("Phone entered");
        await driver.findElement(By.id('role')).sendKeys('Admin');
        console.log("Role entered");
        await driver.findElement(By.id('rLocality')).sendKeys('Local');
        console.log("Locality entered");
        await driver.findElement(By.id('fAddress')).sendKeys('123 Street');
        console.log("Address entered");
        await driver.findElement(By.id('street_number')).sendKeys('123');
        console.log("Street number entered");
        await driver.findElement(By.id('suburb')).sendKeys('Suburb');
        console.log("Suburb entered");
        await driver.findElement(By.id('street')).sendKeys('Street');
        console.log("Street entered");
        await driver.findElement(By.id('address1')).sendKeys('Address 1');
        console.log("Address 1 entered");
        await driver.findElement(By.id('address2')).sendKeys('Address 2');
        console.log("Address 2 entered");
        await driver.findElement(By.id('city')).sendKeys('City');
        console.log("City entered");
        await driver.findElement(By.id('state')).sendKeys('State');
        console.log("State entered");
        await driver.findElement(By.id('zipcode')).sendKeys('12345');
        console.log("Zipcode entered");
        await driver.findElement(By.id('volCat')).sendKeys('Category');
        console.log("Volunteer category entered");
        await driver.findElement(By.id('tCert')).sendKeys('Certification');
        console.log("Certification entered");
        await driver.findElement(By.id('background')).sendKeys('Background');
        console.log("Background entered");

        // Pause for observation
        await driver.sleep(10000); // Pause for 10 seconds (adjust as needed)

        // Submit the form
        await driver.findElement(By.id('registrationForm')).submit();

        // Wait for registration success message
        await driver.wait(until.alertIsPresent(), 10000);
        let alert = await driver.switchTo().alert();
        let alertText = await alert.getText();
        await alert.accept();

        console.log('Registration successful:', alertText);
    } catch (error) {
        console.error('Error registering user:', error);
    }
}

// Main function to run the test
async function runTest() {
    let driver = await new Builder().forBrowser('chrome').build(); // Replace with your preferred browser

    try {
        await registerUser(driver);
    } finally {
        await driver.quit();
    }
}

// Execute the test
runTest();
