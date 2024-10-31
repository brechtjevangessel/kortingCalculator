function validatePrice(price, container) {
    const userInput = container.querySelector('.priceInput').value;

    if (userInput.includes(",")) {
        container.querySelector('.priceError').innerHTML = 'Vervang "." door ","';
        console.log('Price not valid: comma notation');
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

function validateDiscountPercentage(discountPercentage, discountType, container) {


    if (discountType === 'percentage') {
        if (discountPercentage < 0) {
            container.querySelector('.discountPercentageError').innerHTML = 'Vul positief getal in.';
            console.log('Discount percentage not valid: negative number');
            return false;
        } else if (discountPercentage > 100) {
            container.querySelector('.discountPercentageError').innerHTML = 'Kortingspercentage kan niet hoger zijn dan 100%';
            console.log('Discount percentage not valid: >100');
            return false;
        } else {
            container.querySelector('.discountPercentageError').innerHTML = '';
            console.log('Discount percentage valid');
            return true;
        }
    } else if (discountType === '1plus1free') {
        const freeItem = Number(container.querySelector('.onePlusOneFreeItem').value);
        const payedItem = Number(container.querySelector('.onePlusOnePayedItem').value);
        if (freeItem <= 0 || payedItem <= 0) {
            container.querySelector('.discountPercentageError').innerHTML = 'Vul positief getal in.';
            console.log('Discount percentage not valid: negative number');
            return false;
        } else if (!isInteger(freeItem) || !isInteger(payedItem)) {
            container.querySelector('.discountPercentageError').innerHTML = 'Vul een heel getal in.';
            console.log('Discount percentage not valid: not integer');
            return false;
        } else {
            container.querySelector('.discountPercentageError').innerHTML = '';
            console.log('Discount percentage valid');
            return true;
        }
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
    } else if (discountType === 'percentage') {
        discountPercentage = Number(container.querySelector('.discountInput').value);
    }   


    let inputIsValid = true;

    if (!validatePrice(price, container)) {
        inputIsValid = false;
    }
    if (!validateDiscountPercentage(discountPercentage, discountType, container)) {
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
        <input type="text" class="discountInput" name="discountPercentage" placeholder="bijv. 50"></input>
        `;
    } else if (discountType === '1plus1free') {
        container.querySelector('.discountContainer').innerHTML = `
        <div class="onePlusOne">
            <input type="number" class="onePlusOnePayedItem" value="1"> 
            <div>+</div> 
            <input type="number" class="onePlusOneFreeItem" value="1">
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
      } else {
        actualFreeItems = ((quantity - restAmount) / (optimalAmount)) * freeItems;
      }
    return (actualFreeItems / quantity * 100);
}
