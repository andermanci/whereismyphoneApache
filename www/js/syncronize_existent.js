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

    var devID = $("#sincronizationID").val();
    if(devID != '' ) {
        var storage = window.localStorage;
        var id = storage.getItem("id");
        var dataString="id="+id+"&devID="+devID;
        navigator.notification.alert(dataString, function() {});
        $.support.cors = true;
        $.ajax({
            type:"GET",
            url:"https://whereismyphoneservices.herokuapp.com/getDevice.php",
            data: dataString,
            crossDomain: true,
            cache: false,
            success: function(result){
                if(result!="error")
                {
                    var storage = window.localStorage;

                    storage.setItem("device_ID", devID) ;
                    storage.setItem("device_token", result) ;


                    window.location="main.html";
                    navigator.notification.alert("ONGI SINKRONIZATU DA!!", function() {});

                }
                else if(result=="error")
                {
                    navigator.notification.alert("Device not found!!", function() {});
                }
            }
        });
    }
    else {
        navigator.notification.alert("You have to insert your device syncronization ID", function() {});
    }


});