Simple paypal SDK with pay and approve order.

```
import PayPal from 'w-paypal';

const options = {
    clientID: 'App ID', 
    secret: 'App secret',
    brand_name: 'Shop name',
};
const paypal = new PayPal(options);
```

Available methods:

Send payment:
```
const paymentData = {
    email_address: 'Payer email', 
    payersName: 'Payer name', 
    currency_code: 'currency', // Default - USD
    amount: 'price', // Default - 1
};
paypal.sendPayment(paymentData)
    .then(data => {
        const approveHref = data.approveHref // approve link
        const id = data.id // transaction id
    })   
```

Capture order:
```
paypal.captureOrder(orderID) - Returns order data or error 
```
