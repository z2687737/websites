document.getElementById('testSave').addEventListener('submit', function(e) {
    e.preventDefault();

    const number = document.getElementById('number').value;
    const text = document.getElementById('text').value;

    // Handle form submission for testSave
    console.log('Number:', number);
    console.log('Text:', text);
});
