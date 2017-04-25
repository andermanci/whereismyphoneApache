/**
 * Created by andermanci on 21/4/17.
 */


(function(window){


    $('#login').click(function(){
        var form = $("#loginForm");
        var user = $("#username", form).val();
        var password = $("#password", form).val();
        if(user != '' && password!= '') {
            navigator.notification.alert(user, function() {});
            navigator.notification.alert(password, function() {});
            var SHA1 = require("crypto-js/sha1");
            navigator.notification.alert("pasahitza enkriptatua", function() {});
            var pg = require('pg');
            navigator.notification.alert("konexia hasteko prest", function() {});
            var connectionURI="postgres://ofwsfkgedzztju:fbd2eab314bba2b3c81cd727730947c9ef5445f01bb2542821a124b2c99b4f98@ec2-79-125-125-97.eu-west-1.compute.amazonaws.com:5432/d32n963hbr8ngb";
            var database= new pg.Client(connectionURI);
            navigator.notification.alert("konexia hasteko prest", function() {});
            database.connect();
            navigator.notification.alert("Konektatua", function() {});
            var password_crypted=SHA1(password);
            navigator.notification.alert(password_crypted, function() {});
            var query= database.query("SELECT id from User where username="+user+"and password="+password_crypted);
            navigator.notification.alert("Size: "+query._size, function() {});
            if(query._size > 0){
                window.localStorage["username"]=user;
                window.localStorage["password"]=password_crypted;
                navigator.notification.alert("Osondo", function() {});
            } else {
                navigator.notification.alert("Your login failed", function() {});
            }

        } else {
            navigator.notification.alert("You must enter a username and password", function() {});
        }
    });

})(window);
