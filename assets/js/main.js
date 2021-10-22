// MAIN JS

let validateEmail = function (email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function checkPasswordComplexity(pwd) {
    var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,8}$/;
    var valid = regex.test(pwd);
    return valid;
}

// REGISTER AN EVENT LISTENER ON FORM SUBMIT
$(".registerform").on("submit", function (event) {

    // WE ARE STOPPING DEFAULT SUBMIT EVENT USING PREVENT DEFAULT
    event.preventDefault();

    // INITIALISING FORM FIELDS
    let name = event.target.name.value;
    let email = event.target.email.value;
    let phone = event.target.phone.value;
    let password = event.target.password.value;
    let confirmpassword = event.target.confirmpassword.value;

    // CHECK IF NAME IS EMPTY OR NOT

    if (name.length == 0)
        shownamealert('Name cannot be empty');
    else
        shownamealert('');
    if (!validateEmail(email))
        showemailalert('You must enter a valid email');
    else
        showemailalert('');
    if (phone.length == 0 || phone.length < 10 || phone.length > 10)
        showphonealert('You must enter a valid phone number');
    else
        showphonealert('');
    if (password.length == 0)
        showpassordalert('Please enter a valid password');
    else if (!checkPasswordComplexity(password))
        showpassordalert('Password must contain combination of a-z, A-Z, 0-9 and @#$%^&*');
    else
        showpassordalert('');
    if (confirmpassword.length == 0)
        showconfirmpassorderror('Please enter both passwords');
    else if (password !== confirmpassword)
        showconfirmpassorderror('Both passwords do not match');
    else
        showconfirmpassorderror('');

});


let shownamealert = function (message) {
    $('.nameerror').text(message);
}
let showemailalert = function (message) {
    $('.emailerror').text(message);
}
let showphonealert = function (message) {
    $('.phoneerror').text(message);
}
let showpassordalert = function (message) {
    $('.passworderror').text(message);
}
let showconfirmpassorderror = function (message) {
    $('.confirmpassworderror').text(message);
}