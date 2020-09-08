function login(){
    console.log("called")
    var form = $('#login_form');
    var formData = $(form).serialize();
    event.preventDefault();
    jQuery.ajax({
        type: 'POST',
        url: "/user/login",
        data: formData
    }).done(function(response) {
        console.log(response);
        if(response.Status===1){
            console.log(response)
            window.location = "/dashboard";
        }else{
            console.log(response);
            alert(response.Message);
            form[0].reset();
        }
    })
}

function signup(){
    console.log("called")
    var form = $('#signup_form');
    var formData = $(form).serialize();
    event.preventDefault();
    jQuery.ajax({
        type: 'POST',
        url: "/user/signup",
        data: formData
    }).done(function(response) {
        console.log(response);
        if(response.Status===1){
            console.log(response)
            window.location = "/";
        }else{
            console.log(response);
            alert(response.Message);
            form[0].reset();
        }
    })
}