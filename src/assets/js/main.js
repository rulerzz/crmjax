$.when($.ready).then(function () {
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

        if (name.length == 0 || !validateEmail(email) || (phone.length == 0 || phone.length < 10 || phone.length > 10) || password.length == 0 || !checkPasswordComplexity(password) || confirmpassword.length == 0 || password !== confirmpassword) {
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

        if (!validateEmail(email) || password.length == 0 || !checkPasswordComplexity(password)) {
            // do nothing
            console.log("Validation failed!");
            // WE ARE STOPPING DEFAULT SUBMIT EVENT USING PREVENT DEFAULT
            event.preventDefault();
        }
    });

    // CREATE MEETING CALL AND TASK HANDELLER
    $('.createtask').on('click', function (event) {
        window.location.href = "/dashboard/createtask";
    });
    $('.createmeeting').on('click', function (event) {
        window.location.href = "/dashboard/createmeeting";
    });
    $('.createcall').on('click', function (event) {
        window.location.href = "/dashboard/createcall";
    });

    // DATATABLE INIT

    $('#example').DataTable({
        "ajax": "dashboard/data"
    });

    $(".callform").on("submit", function (event) {

        event.preventDefault();

        let subject = event.target.subject.value;
        if (subject.length == 0 || subject === "" || subject === null || subject === undefined) {
            showsubjectalert('You must enter a subject for the call');
        }
        else {
            var form = $(this);
            var url = form.attr('action');

            $.ajax({
                type: "POST",
                url: url,
                data: form.serialize(), // serializes the form's elements.
                success: function (data) {
                    showsubjectsuccess('Call created with call id : ' + data.callid);
                },
                error: function (error) {
                    showsubjectalert(error.responseJSON.message);
                }
            });
        }

    });

    $("input[type='radio'][name='call_detail']").on("click", function(event){
        if($(this).val() == 'COMPLETED_CALL'){
            $('.callduration').removeClass('hidden');
            $('.timebox').removeClass('hidden');
            $('.callduration input').removeAttr('disabled');
            $('input[type="date"][name="call_start_date"]').removeAttr('disabled');
            $('select[name="call_start_time"]').removeAttr('disabled');
        }else if($(this).val() == 'SCHEDULED_CALL'){
                $('.callduration').addClass('hidden');
                $('.timebox').removeClass('hidden');
                $('.callduration input').attr('disabled','disabled');
                $('input[type="date"][name="call_start_date"]').removeAttr('disabled');
                $('select[name="call_start_time"]').removeAttr('disabled');
        }else{
            $('.callduration').addClass('hidden');
            $('.timebox').addClass('hidden');
            $('.callduration input').attr('disabled','disabled');
            $('input[type="date"][name="call_start_date"]').attr('disabled','disabled');
            $('select[name="call_start_time"]').attr('disabled','disabled');
        }
        console.log($(this).val())
    });

    let showsubjectalert = function (message) {
        scrolltoelement('.formtop');
        $('.alert-danger').removeClass('hidden');
        $('.alert-danger').text(message);
        setTimeout(() => {
            $('.alert-danger').addClass('hidden');
        }, 5000);
    }

    let showsubjectsuccess = function (message) {
        scrolltoelement('.formtop');
        $('.alert-success').removeClass('hidden');
        $('.alert-success').text(message);
        setTimeout(() => {
            $('.alert-success').addClass('hidden');
        }, 5000);
    }

    let scrolltoelement = function(element){
        $('html, body').animate({
            scrollTop: $(element).offset().top
        }, 1000);
    }

});