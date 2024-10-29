function validatePrice(price, container) {
    const userInput = container.querySelector('.priceInput').value;

    if (userInput.includes(",")) {
        container.querySelector('.priceError').innerHTML = 'Gebruik Engelse notering, dus: een punt (.) i.p.v. een comma (,)';
        console.log('Price not valid: comma notation')
        return false;
    } else if (price <= 0 || !Number.isInteger(price)) {
        console.log('Price not valid');
        container.querySelector('.priceError').innerHTML = 'Ongeldige prijs';
        return false;
    } else {
        container.querySelector('.priceError').innerHTML = '';
        console.log('Price valid');
        return true;
    }
}

function validateDiscountPercentage(discountPercentage, container) {

    if (discountPercentage < 0 || discountPercentage > 100) {
        container.querySelector('.discountPercentageError').innerHTML = 'Geen geldig kortingspercentage.';
        console.log('Discount percentage not valid: not between 0 and 100');
        return false;
    } else {
        container.querySelector('.discountPercentageError').innerHTML = '';
        console.log('Discount percentage valid');
        return true;
    }
}

function validateQuantity(quantity, container) {
    const userInput = container.querySelector('.quantityInput').value;

    if (!Number.isInteger(quantity) || userInput.includes(",") || quantity <= 0) {
        container.querySelector('.quantityError').innerHTML = 'Ongeldig aantal: gebruik een positief heel getal';
        console.log('Quantity not valid');
        return false;
    } else {
        container.querySelector('.quantityError').innerHTML = '';
        console.log('Quantity valid');
        return true;
    }
}

function calculateDiscount(button) {
    
    const container = button.closest('.calculatorContainer');

    const price = container.querySelector('.priceInput').value * 100;
    const quantity = Number(container.querySelector('.quantityInput').value);
    let discountPercentage = 0;
    const discountType = container.querySelector('.discountType').value;

    if (discountType === '1plus1free') {
        discountPercentage = calculateOnePlusOneDiscountPercentage(quantity, container);
    }


    let inputIsValid = true;

    if (!validatePrice(price, container)) {
        inputIsValid = false;
    }
    if (!validateDiscountPercentage(discountPercentage, container)) {
        inputIsValid = false;
    }
    if (!validateQuantity(quantity, container)) {
        inputIsValid = false;
    }

    if (!inputIsValid) {
        return;
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

    container.querySelector('.calculationMessage').innerHTML= `
        Totale prijs: <s>€${oldPriceTotalOutput}</s> €${discountedPriceTotalOutput} <br> 
        Prijs per stuk: <s>€${priceOutput}</s> €${discountedPricePerItemOutput} <br><br>
        Je bespaart: €${moneySavedOutput}`;
}

function changeDiscountInput(selector) {
    const container = selector.closest('.calculatorContainer');

    const discountType = container.querySelector('.discountType').value;

    console.log(discountType);

    if (discountType === 'percentage') {
        container.querySelector('.discountContainer').innerHTML = `
        <label for="discountPercentage">Kortingspercentage:</label>
        <input type="text" class="discountInput" name="discountPercentage" placeholder="bijv. 50"></input>
        `;
    } else if (discountType === '1plus1free') {
        container.querySelector('.discountContainer').innerHTML = `
        <div class="onePlusOne">
            <input type="number" class="onePlusOnePayedItem"> 
            <div>+</div> 
            <input type="number" class="onePlusOneFreeItem">
            <div>gratis<div>
        <div>
        `;
    }
    
}


function calculateOnePlusOneDiscountPercentage(quantity, container) {
    const fullPriceItems = Number(container.querySelector('.onePlusOnePayedItem').value);
    const freeItems = Number(container.querySelector('.onePlusOneFreeItem').value);

    const optimalAmount = fullPriceItems + freeItems;
    const restAmount = quantity % optimalAmount;

    let actualFreeItems = 0;
    if (quantity < optimalAmount) {
        if (quantity > fullPriceItems) {
            actualFreeItems = quantity - fullPriceItems;
        }
        actualFreeItems = ((quantity - restAmount) / (optimalAmount)) * freeItems;
      }
    return (actualFreeItems / quantity * 100);
}
