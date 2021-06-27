var urlParams = new URLSearchParams(window.location.search);
var sessionId = urlParams.get('session_id');
var email = urlParams.get('email');
var backEndUrl = 'https://stripe.downloadpdf.org';
var price = '<PRICE>'

var date = new Date();
var UNIX_timestamp = date.getTime();

if (UNIX_timestamp) {
   var currentDate = new Date(UNIX_timestamp).toLocaleDateString("en-US")
   document.getElementById("timeStamp").innerHTML = currentDate;
}

if (price) {
   document.getElementById("paid").innerHTML = price;
}


if (email){
   document.getElementById("update").innerHTML = email;
}