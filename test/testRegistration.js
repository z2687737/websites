const { Builder, By, Key, until } = require('selenium-webdriver');

// Function to simulate user registration
async function registerUser(driver) {
    try {
        // Navigate to the registration page
        await driver.get('http://localhost:3000/index.html'); // Replace with your actual URL

        // Wait until the registration form is loaded
        await driver.wait(until.elementLocated(By.id('registrationForm')), 5000);

        // Fill in the registration form
        await driver.findElement(By.id('loginUserName')).sendKeys('testUser');
        await driver.findElement(By.id('loginPassword')).sendKeys('password123');
        await driver.findElement(By.id('repeatPassword')).sendKeys('password123');
        await driver.findElement(By.id('fName')).sendKeys('John');
        await driver.findElement(By.id('lname')).sendKeys('Doe');
        await driver.findElement(By.id('eMail')).sendKeys('test@example.com');
        await driver.findElement(By.id('hPhone')).sendKeys('1234567890');
        await driver.findElement(By.id('role')).sendKeys('Admin');
        await driver.findElement(By.id('rLocality')).sendKeys('Local');
        await driver.findElement(By.id('fAddress')).sendKeys('123 Street');
        await driver.findElement(By.id('street_number')).sendKeys('123');
        await driver.findElement(By.id('suburb')).sendKeys('Suburb');
        await driver.findElement(By.id('street')).sendKeys('Street');
        await driver.findElement(By.id('address1')).sendKeys('Address 1');
        await driver.findElement(By.id('address2')).sendKeys('Address 2');
        await driver.findElement(By.id('city')).sendKeys('City');
        await driver.findElement(By.id('state')).sendKeys('State');
        await driver.findElement(By.id('zipcode')).sendKeys('12345');
        await driver.findElement(By.id('volCat')).sendKeys('Category');
        await driver.findElement(By.id('tCert')).sendKeys('Certification');
        await driver.findElement(By.id('background')).sendKeys('Background');

        // Submit the form
        await driver.findElement(By.id('registrationForm')).submit();

        // Wait for registration success message
        await driver.wait(until.alertIsPresent(), 5000);
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

