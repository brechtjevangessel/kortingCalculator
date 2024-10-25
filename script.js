function validatePrice() {
    const userInput = document.getElementById('priceInput').value;
    const price = document.getElementById('priceInput').value * 100;

    if (userInput.includes(",")) {
        document.getElementById('errorMessage').innerHTML = 'Gebruik Engelse notering, dus: een punt (.) i.p.v. een comma (,)';
        console.log('Price not valid: comma notation')
        return false;
    } else if (price <= 0 || !Number.isInteger(price)) {
        console.log('Price not valid');
        document.getElementById('errorMessage').innerHTML = 'Ongeldige prijs';
        return false;
    } else {
        document.getElementById('errorMessage').innerHTML = '';
        console.log('Price valid');
        return true;
    }
}


function calculateDiscount() {
    validatePrice();
}