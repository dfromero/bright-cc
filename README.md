# Credit Card Input

## Overview
Credit card input consists in 3 input fields
- holder name
- cc number: will validate on change using 'card-validator' lib
- cvv code: will validate if its a valid code for the card type entered using 'card-validator' lib

and a submit button that will be enabled when all the 3 fields are filled and valid
on submit click it will collect the valid data for usage.

## usage
```
    <CreditCardInput onSubmitForm="(data) => console.log(data)" />
```

## assumptions
- Holder name is valid

## next steps
- validate the entered values using some type of service to make sure it is valid