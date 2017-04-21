/**
 * Created by andermanci on 21/4/17.
 */

function init(){
    documen.addEventListener("deviceready", deviceready, true);
    delete init;
}


function handleLogin() {
    var form = $("#loginForm");
    //disable the button so we can't resubmit while we wait
    $("#submitButton",form).attr("disabled","disabled");
    var user = $("#username", form).val();
    var password = $("#password", form).val();
    if(user != '' && password!= '') {
        $.post("http://www.coldfusionjedi.com/demos/2011/nov/10/service.cfc?method=login&returnformat=json", {username:u,password:p}, function(res) {
            if(res == true) {
                //store
                window.localStorage["username"] = user;
                window.localStorage["password"] = password;
                $.mobile.changePage("some.html");
            } else {
                navigator.notification.alert("Your login failed", function() {});
            }
            $("#submitButton").removeAttr("disabled");
        },"json");
    } else {
        //Thanks Igor!
        navigator.notification.alert("You must enter a username and password", function() {});
        $("#submitButton").removeAttr("disabled");
    }
    return false;
}