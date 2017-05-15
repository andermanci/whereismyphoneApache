/**
 * Created by urtzi on 03/05/2017.
 */

function onLoad(){

    var storage = window.localStorage;

   if(  storage.getItem("device_ID") != undefined){
       window.location="syncronize.html";
   }
}
$('#info').click(function(){
    var storage = window.localStorage;
    storage.getItem("id")
    navigator.notification.alert( storage.getItem("id"), function () {
    });
    navigator.notification.alert( storage.getItem("device_ID"), function () {
    });
    navigator.notification.alert( storage.getItem("device_token"), function () {
    });
    navigator.notification.alert( storage.getItem("password"), function () {
    });
    navigator.notification.alert( storage.getItem("user"), function () {
    });
    navigator.geolocation.getCurrentPosition(geolocationSuccess,
        geolocationError
       );





});

function geolocationSuccess (position) {
    navigator.notification.alert(
    ('Latitude: '          + position.coords.latitude          + '\n' +
        'Longitude: '         + position.coords.longitude         + '\n' +
        'Altitude: '          + position.coords.altitude          + '\n' +
        'Accuracy: '          + position.coords.accuracy          + '\n' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        'Heading: '           + position.coords.heading           + '\n' +
        'Speed: '             + position.coords.speed             + '\n' +
        'Timestamp: '         + position.timestamp                + '\n'), function () {
        });
};

function geolocationError(error) {
    navigator.notification.alert(('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n'), function () {
    });
}