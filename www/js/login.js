/**
 * Created by andermanci on 21/4/17.
 */


(function(window){


    $('#submitButton').click(function(){
        var form = $("#loginForm");
        $("#login",form).attr("disabled","disabled");
        var user = $("#username", form).val();
        var password = $("#password", form).val();
        if(user != '' && password!= '') {
            var SHA1 = require("crypto-js/sha1");
            var pg= require('pg');
            var connectionURI="    postgres://ofwsfkgedzztju:fbd2eab314bba2b3c81cd727730947c9ef5445f01bb2542821a124b2c99b4f98@ec2-79-125-125-97.eu-west-1.compute.amazonaws.com:5432/d32n963hbr8ngb";
            var database= new pg.client(connectionURI);
            database.connect();
            var password_crypted=SHA1(password);
            var query= database.query("SELECT id from User where username="+user+"and password="+password_crypted);
            if(query._size > 0){
                window.localStorage["username"]=user;
                window.localStorage["password"]=password_crypted;
                navigator.notification.alert("Osondo", function() {});
            } else {
                navigator.notification.alert("Your login failed", function() {});
            }
            $("#submitButton").removeAttr("disabled");

        } else {
            navigator.notification.alert("You must enter a username and password", function() {});
            $("#submitButton").removeAttr("disabled");
        }
    });

})(window);
