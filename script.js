let price = 0;
let discountPercentage = 0;
let quantity = 0;

function validatePrice() {
    const userInput = document.querySelector('.priceInput').value;
    price = document.querySelector('.priceInput').value * 100;

    if (userInput.includes(",")) {
        document.querySelector('.priceError').innerHTML = 'Gebruik Engelse notering, dus: een punt (.) i.p.v. een comma (,)';
        console.log('Price not valid: comma notation')
        return false;
    } else if (price <= 0 || !Number.isInteger(price)) {
        console.log('Price not valid');
        document.querySelector('.priceError').innerHTML = 'Ongeldige prijs';
        return false;
    } else {
        document.querySelector('.priceError').innerHTML = '';
        console.log('Price valid');
        return true;
    }
}

function validateDiscountPercentage() {
    discountPercentage = Number(document.querySelector('.discountInput').value);

    if (discountPercentage < 0 || discountPercentage > 100 || !Number.isInteger(discountPercentage)) {
        document.querySelector('.discountPercentageError').innerHTML = 'Geen geldig kortingspercentage. Vul een heel getal in tussen de 0 en 100.';
        console.log('Discount percentage not valid: not between 0 and 100');
        return false;
    } else {
        document.querySelector('.discountPercentageError').innerHTML = '';
        console.log('Discount percentage valid');
        return true;
    }
}

function validateQuantity() {
    const userInput = document.querySelector('.quantityInput').value;
    quantity = Number(document.querySelector('.quantityInput').value);
    if (!Number.isInteger(quantity) || userInput.includes(",") || quantity <= 0) {
        document.querySelector('.quantityError').innerHTML = 'Ongeldig aantal: gebruik een positief heel getal';
        console.log('Quantity not valid');
        return false;
    } else {
        document.querySelector('.quantityError').innerHTML = '';
        console.log('Quantity valid');
        return true;
    }
}

function calculateDiscount() {

    if (!validatePrice() || !validateDiscountPercentage() || !validateQuantity()) {
        document.querySelector('.calculationMessage').innerHTML= `Je betaalt ${discountedPriceTotalOutput} euro (${ discountedPricePerItemOutput} euro per stuk). \n Je bespaart ${moneySavedOutput} euro.`;
    }

    // all prices are in cents, unless variable name ends in "output"
    const oldPriceTotal = price * quantity;
    const moneySaved = oldPriceTotal * discountPercentage / 100;
    const discountedPriceTotal = oldPriceTotal - moneySaved;
    const discountedPricePerItem = discountedPriceTotal / quantity;

    //output variables


    const oldPriceTotalOutput = (oldPriceTotal / 100).toFixed(2);
    const moneySavedOutput = (moneySaved / 100).toFixed(2);
    const discountedPriceTotalOutput = (discountedPriceTotal / 100).toFixed(2);
    const discountedPricePerItemOutput = (discountedPricePerItem / 100).toFixed(2);
    const priceOutput = (price / 100).toFixed(2);

    document.querySelector('.calculationMessage').innerHTML= `
        Totale prijs: <s>€${oldPriceTotalOutput}</s> €${discountedPriceTotalOutput} <br> 
        Prijs per stuk: <s>€${priceOutput}</s> €${discountedPricePerItemOutput} <br><br>
        Je bespaart: €${moneySavedOutput}`;
}


