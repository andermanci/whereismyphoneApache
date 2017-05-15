/**
 * Created by urtzi on 03/05/2017.
 */

function onLoad(){

    var storage = window.localStorage;

   if(  storage.getItem("device_id") != undefined){
       window.location="main.html";
   }
}
$('#syncronize').click(function() {

    var name = $("#name").val();
    var info = $("#info").val();

    if (info != '' && info != '') {
        var storage = window.localStorage;
        var id = storage.getItem("id");
        var tokena;
        window.FirebasePlugin.getToken(function (token) {
            // save this server-side and use it to push notifications to this device
            navigator.notification.alert(token, function () {
            });
            tokena = token;
            var dataString = "id=" + id + "&name=" + name + "&info=" + info + "&token=" + tokena;
            navigator.notification.alert(dataString, function () {
            });
            navigator.notification.alert(token, function () {
            });
            $.support.cors = true;
            $.ajax({
                type: "GET",
                url: "https://whereismyphoneservices.herokuapp.com/addDevice.php",
                data: dataString,
                crossDomain: true,
                cache: false,
                success: function (result) {
                    if (result != "error") {

                        storage.setItem("device_ID", result);
                        storage.setItem("device_token", token);


                        //window.location=main.html";
                        navigator.notification.alert("ONGI SINKRONIZATU DA!!", function () {
                        });

                    }
                    else {
                        navigator.notification.alert("Device not found!!", function () {
                        });
                    }
                },
                error: function () {
                    navigator.notification.alert("Try again, conexion error", function () {
                    });
                }
            });


        }, function (error) {

            navigator.notification.alert(error, function () {
            });

        });
    }

    else {
        navigator.notification.alert("You have to insert your device syncronization ID", function() {});
    }


});