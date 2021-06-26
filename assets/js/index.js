
var stripe = Stripe("pk_live_51J5gCBE6l9W8YrrlfPSKUM88YsrNfJM6jVSH8u8hSTqo8hKdtRvl0we9o2ZXKHGZbyvZ0Fu0ownaaUE7bnvg27bq00JbuE5L5x");
//var stripe = Stripe("pk_test_GhuLqvF7bjM8KDm0OdmqeZTp");
var backEndUrl = 'https://stripe.downloadpdf.org';
var domain = '<PRODUCT_LOWER>.downloadpdf.org'
//var domain = 'localhost:8080'
var priceID = '<PRICE_ID>'
//var priceID = 'price_1J4bTLIqc7Y0dKXeXwelWs83'

// When the form is submitted...
var submitBtn = document.querySelector('#submit');
submitBtn.addEventListener('click', function (evt) {
  var inputEl = document.getElementById('email');
  var email = String(inputEl.value);

  if (email === "" || !validateEmail(email)) {
    var x = document.getElementById("emailValidation");
    x.style.display = "block";
    return false;
  }
 
  // Create the checkout session. 
  fetch(backEndUrl+'/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: String(inputEl.value),  
      price: String(priceID),
      domain: String(domain),
    }),
  }).then(function (result) {
    return result.json();
  }).then(function (data) {
    // Redirect to Checkout. with the ID of the
    // CheckoutSession created on the server.
    stripe.redirectToCheckout({
      sessionId: data.sessionId,
    })
    .then(function(result) {
      // If redirection fails, display an error to the customer.
      if (result.error) {
        var displayError = document.getElementById('error-message');
        displayError.textContent = result.error.message;
      }
    });
  });
});

function validateEmail(email) {
  const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email_regex.test(String(email).toLowerCase());
}

function cleartext(){
  console.log("clearing")
  var x = document.getElementById("emailValidation");
  x.style.display = "none";
}
