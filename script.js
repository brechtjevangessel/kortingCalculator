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

function validateDiscountPercentage() {
    const discountPercentage = Number(document.getElementById('discountInput').value);

    if (discountPercentage < 0 || discountPercentage > 100 || !Number.isInteger(discountPercentage)) {
        document.getElementById('errorMessage').innerHTML = 'Geen geldig kortingspercentage. Vul een getal in tussen de 0 en 100.';
        console.log('Discount percentage not valid: not between 0 and 100');
        return false;
    } else {
        document.getElementById('errorMessage').innerHTML = '';
        console.log('Discount percentage valid');
        return true;
    }
}

function validateQuantity() {
    const quantity = Number(document.getElementById('quantityInput').value);
    if (!Number.isInteger(quantity)) {
        document.getElementById('errorMessage').innerHTML = 'Ongeldig aantal';
        console.log('Quantity not valid');
        return false;
    } else {
        document.getElementById('errorMessage').innerHTML = '';
        console.log('Quantity valid');
        return false;
    }
}


function calculateDiscount() {
    validatePrice();
    validateDiscountPercentage();
    validateQuantity();
}