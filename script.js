let price = 0;
let discountPercentage = 0;
let quantity = 0;

function validatePrice() {
    const userInput = document.getElementById('priceInput').value;
    price = document.getElementById('priceInput').value * 100;

    if (userInput.includes(",")) {
        document.getElementById('priceError').innerHTML = 'Gebruik Engelse notering, dus: een punt (.) i.p.v. een comma (,)';
        console.log('Price not valid: comma notation')
        return false;
    } else if (price <= 0 || !Number.isInteger(price)) {
        console.log('Price not valid');
        document.getElementById('priceError').innerHTML = 'Ongeldige prijs';
        return false;
    } else {
        document.getElementById('priceError').innerHTML = '';
        console.log('Price valid');
        return true;
    }
}

function validateDiscountPercentage() {
    discountPercentage = Number(document.getElementById('discountInput').value);

    if (discountPercentage < 0 || discountPercentage > 100 || !Number.isInteger(discountPercentage)) {
        document.getElementById('discountPercentageError').innerHTML = 'Geen geldig kortingspercentage. Vul een heel getal in tussen de 0 en 100.';
        console.log('Discount percentage not valid: not between 0 and 100');
        return false;
    } else {
        document.getElementById('discountPercentageError').innerHTML = '';
        console.log('Discount percentage valid');
        return true;
    }
}

function validateQuantity() {
    const userInput = document.getElementById('quantityInput').value;
    quantity = Number(document.getElementById('quantityInput').value);
    if (!Number.isInteger(quantity) || userInput.includes(",") || quantity <= 0) {
        document.getElementById('quantityError').innerHTML = 'Ongeldig aantal: gebruik een positief heel getal';
        console.log('Quantity not valid');
        return false;
    } else {
        document.getElementById('quantityError').innerHTML = '';
        console.log('Quantity valid');
        return true;
    }
}

function calculateDiscount() {

    if (!validatePrice() || !validateDiscountPercentage() || !validateQuantity()) {
        document.getElementById('calculationMessage').innerHTML= `Je betaalt ${discountedPriceTotalOutput} euro (${ discountedPricePerItemOutput} euro per stuk). \n Je bespaart ${moneySavedOutput} euro.`;
    }

    // all prices are in cents, unless variable name ends in "output"
    const oldPriceTotal = price * quantity;
    const discountedPriceTotal = oldPriceTotal * discountPercentage / 100;
    const discountedPricePerItem = price * discountPercentage / 100;
    const moneySaved = oldPriceTotal - discountedPriceTotal;

    //output variables
    const discountedPriceTotalOutput = discountedPriceTotal / 100;
    const discountedPricePerItemOutput = discountedPricePerItem / 100;
    const moneySavedOutput = oldPriceTotal / 100;


    document.getElementById('calculationMessage').innerHTML= `Je betaalt ${discountedPriceTotalOutput} euro (${ discountedPricePerItemOutput} euro per stuk). \n Je bespaart ${moneySavedOutput} euro.`;
}


