const textarea = document.querySelector("textarea");
var product_id = "<PRODUCT_LOWER>"
textarea.addEventListener("input", event => {
    const target = event.currentTarget;
    const maxLength = target.getAttribute("maxlength");
    const currentLength = target.value.length;

    if (currentLength >= maxLength) {
        return console.log("You have reached the maximum number of characters.");
    }

    document.getElementById("count_message").innerHTML = `${maxLength - currentLength - 1} chars left`;
    // console.log(`${maxLength - currentLength} chars left`);
});

function validateEmail(email) {
    const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email_regex.test(String(email).toLowerCase());
}

function cleartext() {
    console.log("clearing")
    var x = document.getElementById("emailValidation");
    x.style.display = "none";
}
//class="d-none" 

function onSubmit(token) {
    console.log("complain")
    
    var inputEl = document.getElementById('email');
    var email = String(inputEl.value);

    if (email === "" || !validateEmail(email)) {
      var x = document.getElementById("emailValidation");
      x.style.display = "block";
      return false;
    }


    var inputCom = document.getElementById('complain');
    var com = String(inputCom.value);

    if (com === "") {
      com = "No complains"
    }


    fetch("https://falcon.warrensbox.com/form", {
      method: 'POST',
      body: JSON.stringify({
        contact_email: email,
        contact_name: product_id,
        message_content: com,
        owner_email: "support@downloadpdf.org"
      }),
    }).then(function (result) {
      console.log(result.status); // Will show you the status
      if (!result.ok) {
          throw new Error("HTTP status " + response.status);
      }else{
        console.log("all good")
        var x = document.getElementById("refundForm");
        x.style.display = "none";

        var y = document.getElementById("refundFormSuccess");
        y.style.display = "block";
      }
      //return result.json();
    });
  
  
}