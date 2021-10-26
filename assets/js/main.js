// MAIN JS
const burgericon = document.querySelector('.navbar-toggler');
let menuopen = false;
burgericon.addEventListener('click', () => {
    if (!menuopen) {
        burgericon.classList.add('open');
        menuopen = true;
    }
    else {
        burgericon.classList.remove('open');
        menuopen = false;
    }
});

let validateEmail = function (email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function checkPasswordComplexity(pwd) {
    var letter = /[a-zA-Z]/; 
    var number = /[0-9]/;
    var valid = number.test(pwd) && letter.test(pwd); //match a letter _and_ a number
    return valid;
}

// REGISTER AN EVENT LISTENER ON FORM SUBMIT
$(".registerform").on("submit", function (event) {

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
        showpassordalert('Password must contain combination of a-z, A-Z and 0-9');
    else
        showpassordalert('');
    if (confirmpassword.length == 0)
        showconfirmpassorderror('Please enter both passwords');
    else if (password !== confirmpassword)
        showconfirmpassorderror('Both passwords do not match');
    else
        showconfirmpassorderror('');

    if(name.length == 0 || !validateEmail(email) || (phone.length == 0 || phone.length < 10 || phone.length > 10) || password.length == 0 || !checkPasswordComplexity(password) || confirmpassword.length == 0 || password !== confirmpassword){
        // do nothing
        console.log("Validation failed!");
           // WE ARE STOPPING DEFAULT SUBMIT EVENT USING PREVENT DEFAULT
        event.preventDefault();
    }
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

$(".loginform").on("submit", function (event) {

    // INITIALISING FORM FIELDS
    let email = event.target.email.value;
    let password = event.target.password.value;

    if (!validateEmail(email))
        showemailalert('You must enter a valid email');
    else
        showemailalert('');
    if (password.length == 0)
        showpassordalert('Please enter a valid password');
    else if (!checkPasswordComplexity(password))
        showpassordalert('Password must contain combination of a-z, A-Z and 0-9');
    else
        showpassordalert('');

    if(!validateEmail(email) || password.length == 0 || !checkPasswordComplexity(password)){
        // do nothing
        console.log("Validation failed!");
           // WE ARE STOPPING DEFAULT SUBMIT EVENT USING PREVENT DEFAULT
        event.preventDefault();
    }
});

// DATATABLE INIT

$(document).ready(function() {
    $('#example').DataTable( {
        "ajax": "dashboard/data"
    } );
} );

// CREATE MEETING CALL AND TASK HANDELLER
$('.createtask').on('click', function(event){
    window.location.href = "/dashboard/createtask";
});
$('.createmeeting').on('click', function(event){
    window.location.href = "/dashboard/createmeeting";
});
$('.createcall').on('click', function(event){
    window.location.href = "/dashboard/createcall";
});