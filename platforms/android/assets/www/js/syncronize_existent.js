/**
 * Created by urtzi on 03/05/2017.
 */

function onLoad(){

    var storage = window.localStorage;

   if(  storage.getItem("device_id") != undefined){
       window.location="main.html";
   }
}
$('#syncronize').click(function(){

    var devID = $("#syncronizationID").val();
    if(devID != '' ) {
        var storage = window.localStorage;
        var id = storage.getItem("id");
        var dataString="id="+id+"&devID="+devID;
        navigator.notification.alert(dataString, function() {});
        $.support.cors = true;
        $.ajax({
            type:"GET",
            url:"https://whereismyphoneservices.herokuapp.com/getDevices.php",
            data: dataString,
            crossDomain: true,
            cache: false,
            success: function(result){
                if(result!="error")
                {
                    var tokena;
                    window.FirebasePlugin.getToken(function (token) {
                        // save this server-side and use it to push notifications to this device
                         tokena = token;
                            var dataString = "id=" + devID + "&token=" + tokena;
                            $.support.cors = true;
                            $.ajax({
                                type: "GET",
                                url: "https://whereismyphoneservices.herokuapp.com/updateDevice.php",
                                data: dataString,
                                crossDomain: true,
                                cache: false,
                                success: function (result) {
                                    if (result != "error") {
                                        storage.setItem("device_ID", devID);
                                        storage.setItem("device_token", tokena);
                                        window.location="main.html";
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
                         tokena = "error";
                        navigator.notification.alert(error, function () {
                        });

                    });

                }
                else
                {
                    navigator.notification.alert("Device not found!!", function() {});
                }
            },
            error: function(){
                navigator.notification.alert("Try again, conexion error", function() {});
            }
        });
    }
    else {
        navigator.notification.alert("You have to insert your device syncronization ID", function() {});
    }


});