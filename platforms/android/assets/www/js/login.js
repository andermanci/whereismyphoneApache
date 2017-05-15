/**
 * Created by urtzi on 30/04/2017.
 */


/**Keep this login information for your records:
    Client ID: 2350577
Login email: whereismyphonesgta@gmail.com */

$('#login').click(function(){
    var user = $("#username").val();
    var password = $("#password").val();
    if(user != '' && password!= '') {
        //var pass=$.sha1(password);
        var dataString="email="+user+"&pass="+password;
        navigator.notification.alert(dataString, function() {});
        $.support.cors = true;
        $.ajax({
            type:"GET",
            url:"https://whereismyphoneservices.herokuapp.com/login.php",
            data: dataString,
            crossDomain: true,
            cache: false,
            success: function(result){
                if(result!="error")
                {
                    var storage = window.localStorage;

                    storage.setItem("user", user) ;
                    storage.setItem("password", password) ;
                    storage.setItem("id", result) ;

                    window.location="syncronize.html";
                    navigator.notification.alert("ONGI LOGEATU ZARA!!", function() {});

                }
                else if(result=="error")
                {
                    navigator.notification.alert("User not found!!", function() {});
                }
            }
        });


    } else {
        navigator.notification.alert("You must enter a username and password", function() {});
    }
});