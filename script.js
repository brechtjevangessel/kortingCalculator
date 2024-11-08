// MAIN FUNCTION
// Starts calculation progress, runs when calculation button is pressed

function calculateDiscount(button) {
    // makes sure that the function uses the input from the calculator the button is in
    // this is only relevant if there is more than one calculator on screen
    const container = button.closest('.calculatorContainer');

    // GET ALL NESCESSARY DATA FROM USER INPUT

    // data from inputs that stay the same
    const price = container.querySelector('.priceInput').value * 100;
    const quantity = Number(container.querySelector('.quantityInput').value);
    const discountType = container.querySelector('.discountType').value;
    
    // data from inputs that may differ depending on which menu-options are selected
    let discountPercentage = 0;
    let shippingCost = 0;
    
    // changes shipping cost only if an input is detected, otherwise it stays 0
    if (container.querySelector('.shippingCostInput') !== null) {
        shippingCost = container.querySelector('.shippingCostInput').value * 100;
    }

    // calculates discounts based on which type is selected
    if (discountType === '1plus1free') {
        discountPercentage = calculateOnePlusOneDiscountPercentage(quantity, container);
    } else if (discountType === 'percentage') {
        discountPercentage = Number(container.querySelector('.discountInput').value);
    }   

    // DATA VALIDATION
    let inputIsValid = true;

    // price validation
    if (!validatePrice(price, container)) {
        inputIsValid = false;
    }

    // discount percentage validation
    if (!validateDiscountPercentage(discountPercentage, discountType, container)) {
        inputIsValid = false;
    }

    // quantity validation
    if (!validateQuantity(quantity, container)) {
        inputIsValid = false;
    }

    // shipping cost validation
    if (!validateShippingCost(shippingCost, container)) {
        inputIsValid = false;
    }

    // if any inputs are invalid, fuction returns
    if (!inputIsValid) {
        return;
    }

    // DATA IS PROCESSED
    // all prices are in cents, unless variable name ends in "output"

    // calculation variables
    const oldPriceTotal = price * quantity;
    const oldPriceTotalPlusShipping = oldPriceTotal + shippingCost;
    const moneySaved = oldPriceTotal * discountPercentage / 100;
    const discountedPriceTotal = oldPriceTotalPlusShipping - moneySaved;
    const discountedPricePerItem = discountedPriceTotal / quantity;

    //output variables
    const oldPriceTotalOutput = (oldPriceTotal / 100).toFixed(2);
    const moneySavedOutput = (moneySaved / 100).toFixed(2);
    const discountedPriceTotalOutput = (discountedPriceTotal / 100).toFixed(2);
    const discountedPricePerItemOutput = (discountedPricePerItem / 100).toFixed(2);
    const priceOutput = (price / 100).toFixed(2);

    // print output
    container.querySelector('.calculationMessage').innerHTML= `
        Totale prijs: <s>€${oldPriceTotalOutput}</s> <em>€${discountedPriceTotalOutput}</em> <br> 
        Prijs per stuk: <s>€${priceOutput}</s> <em>€${discountedPricePerItemOutput}</em> <br><br>
        Je bespaart: <em>€${moneySavedOutput}</em>`;
}

// FUNCTIONS THAT CHANGE THE LAYOUT OF THE CALCULATOR

function changeDiscountInput(selector) {
    // makes sure that the function uses the input from the calculator the button is in
    // this is only relevant if there is more than 1 calculator on screen
    const container = selector.closest('.calculatorContainer');

    // which discount type is selected
    const discountType = container.querySelector('.discountType').value;

    // changes input layout for discount type "percentage"
    if (discountType === 'percentage') {
        container.querySelector('.discountContainer').innerHTML = `
        <input type="text" class="discountInput" name="discountPercentage" placeholder="bijv. 50"></input>
        `;
    // changes layout for discount type "1plus1free"
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

function addShippingCostInput(selector) {
    // makes sure that the function uses the input from the calculator the button is in
    // this is only relevant if there is more than 1 calculator on screen
    const container = selector.closest('.calculatorContainer');

    // checks what option is selected
    const hasShippingCost = container.querySelector('.hasShippingCost').value;

    // changes layout based on selection
    if (hasShippingCost === 'yes') {
        container.querySelector('.shippingInputContainer').innerHTML = '<input class="shippingCostInput" type="text" placeholder="punt i.p.v. comma">';
    } else if (hasShippingCost === 'no') {
        document.querySelector('.shippingInputContainer').innerHTML = '';
        container.querySelector('.shippingCostError').innerHTML = '';
    }

}

// FUNCTIONS THAT CALCULATE ALTERNATE DISCOUNT PERCENTAGES

function calculateOnePlusOneDiscountPercentage(quantity, container) {
    // For 1+1, the first 1 are the full price items and the second 1 are the free items
    const fullPriceItems = Number(container.querySelector('.onePlusOnePayedItem').value);
    const freeItems = Number(container.querySelector('.onePlusOneFreeItem').value);

    // optimalAmount is the smallest amount at which you have the maximum discount percentage
    const optimalAmount = fullPriceItems + freeItems;
    // restAmount is the amount of items that are bought at less than the maximum discount
    const restAmount = quantity % optimalAmount;

    // calculates how many items you actually get for free, even if you don't buy (a multiple of) the optimal amount
    // example: if the discount is 1+1 and you buy 2, you get 1 free item, the discount is 50%
    // example: if the discount is 1+1 and you buy 3, you get 1 free item, the discount is 33,3%
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

// DATA VALIDATION FUNCTIONS

function validatePrice(price, container) {
    // UserInput contains the actual string that the user typed in
    const userInput = container.querySelector('.priceInput').value;

    // checks if user used "," instead of "."
    if (userInput.includes(",")) {
        container.querySelector('.priceError').innerHTML = 'Vervang "." door ","';
        console.log('Price not valid: comma notation');
        return false;
    // checks if the user put in a negative number or a number with more than 2 decimals
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

function validateShippingCost(shippingCost, container) {
    // If there is no shipping cost input, it returns and stays 0 automatically
    if (container.querySelector('.shippingCostInput') === null) {
        return true;
    }
    
    // UserInput contains the actual string that the user typed in 
    const userInput = container.querySelector('.shippingCostInput').value;
    
    // checks if user used a correct notation with "." instead of ","
    if (userInput.includes(",")) {
        container.querySelector('.shippingCostError').innerHTML = 'Vervang "." door ","';
        console.log('shipping cost not valid: comma notation');
        return false;
    // checks if the user put in 0, a negative number or a number with more than 2 decimals
    } else if (shippingCost <= 0 || !Number.isInteger(shippingCost)) {
        console.log('shipping cost not valid');
        container.querySelector('.shippingCostError').innerHTML = 'Ongeldige verzendkosten';
        return false;
    } else {
        container.querySelector('.shippingCostError').innerHTML = '';
        console.log('shipping cost valid');
        return true;
    }
}

function validateDiscountPercentage(discountPercentage, discountType, container) {

    // checks user input if input type is 'percentage'
    if (discountType === 'percentage') {
        // checks that the discountpercentage is not a negative number
        if (discountPercentage < 0) {
            container.querySelector('.discountPercentageError').innerHTML = 'Vul positief getal in.';
            console.log('Discount percentage not valid: negative number');
            return false;
        // checks that the discount percentage is not more than 100
        } else if (discountPercentage > 100) {
            container.querySelector('.discountPercentageError').innerHTML = 'Ongeldig percentage: hoger dan 100%';
            console.log('Discount percentage not valid: >100');
            return false;
        } else {
            container.querySelector('.discountPercentageError').innerHTML = '';
            console.log('Discount percentage valid');
            return true;
        }
    // checks user input if input type is 1plus1free
    } else if (discountType === '1plus1free') {
        // in 1+1 free, he first 1 is the payed item and the second 1 is the free item
        const payedItem = Number(container.querySelector('.onePlusOnePayedItem').value);
        const freeItem = Number(container.querySelector('.onePlusOneFreeItem').value);
        
        // check that both items are positive numbers
        if (freeItem <= 0 || payedItem <= 0) {
            container.querySelector('.discountPercentageError').innerHTML = 'Vul positief getal in.';
            console.log('Discount percentage not valid: negative number');
            return false;
        // check that both items are integers
        } else if (!Number.isInteger(freeItem) || !Number.isInteger(payedItem)) {
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
    
    // UserInput contains the actual string that the user typed in
    const userInput = container.querySelector('.quantityInput').value;

    // checks that the number is an positive integer
    if (!Number.isInteger(quantity) || quantity <= 0) {
        container.querySelector('.quantityError').innerHTML = 'Ongeldig aantal';
        console.log('Quantity not valid');
        return false;
    } else {
        container.querySelector('.quantityError').innerHTML = '';
        console.log('Quantity valid');
        return true;
    }
}