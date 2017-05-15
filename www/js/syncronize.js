/**
 * Created by urtzi on 03/05/2017.
 */

function onLoad(){

    var storage = window.localStorage;

   if(  storage.getItem("device_id") != undefined){
       window.location="main.html";
   }
}
$('#existent').click(function(){

    window.location="syncronize_existent.html";

});

$('#new').click(function(){

    window.location="syncronize_new.html";

});