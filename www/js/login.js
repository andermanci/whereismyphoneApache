/**
 * Created by urtzi on 30/04/2017.
 */



    $('#login').click(function(){
        var user = $("#username").val();
        var password = $("#password").val();
        if(user != '' && password!= '') {



            window.jdbc.load('org.postgresql.Driver', loaded, errorea);



            // navigator.notification.alert(password_crypted, function() {});
            // var query= database.query("SELECT id from User where username="+user+"and password="+password_crypted);
            // navigator.notification.alert("Size: "+query._size, function() {});
            // if(query._size > 0){
            //     window.localStorage["username"]=user;
            //     window.localStorage["password"]=password_crypted;
            //     navigator.notification.alert("Osondo", function() {});
            // } else {
            //     navigator.notification.alert("Your login failed", function() {});
            // }

        } else {
            navigator.notification.alert("You must enter a username and password", function() {});
        }
    });

function loaded(){
    window.jdbc.connect('jdbc:postgres://ec2-79-125-125-97.eu-west-1.compute.amazonaws.com:5432/d32n963hbr8ngb', 'ofwsfkgedzztju', 'fbd2eab314bba2b3c81cd727730947c9ef5445f01bb2542821a124b2c99b4f98', connected, errorea1);

}
function connected(){
    var user = $("#username").val();
    var password = $("#password").val();
    var pass=$.sha1(password);
    var query= "SELECT * from users where username= '"+user+"' and password= '"+pass+"';";

    navigator.notification.alert(query, function() {});
    window.jdbc.execute(query,  Query, errorQuery);
}
function Query(dataSet){
    if(dataSet.length != 0){
        window.localStorage["username"]=user;
        window.localStorage["password"]=pass;
        window.localStorage["user_id"]=dataSet[0]["id"];
        navigator.notification.alert("Osondo", function() {});
        window.location="main.html";

    }
    else{
        errorea();
    }
}

function errorQuery(dataSet){

    if(dataSet.length != 0){
        window.localStorage["usernamffgfdgfgfgfgfdgfdgfdgdfge"]=user;
        window.localStorage["password"]=pass;
        window.localStorage["user_id"]=dataSet[0]["id"];
        navigator.notification.alert("Osondo", function() {});
        window.location="main.html";

    }
    else{
        errorea();
    }
    navigator.notification.alert("User not found", function() {});
}
function errorea(){
    navigator.notification.alert("Connection error", function() {});
}
function errorea1(){
    window.jdbc.isConnected(connected, errorea);
    //navigator.notification.alert("Connection error1", function() {});
}

(function($){

    var rotateLeft = function(lValue, iShiftBits) {

        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    var lsbHex = function(value) {
        var string = "";
        var i;
        var vh;
        var vl;
        for(i = 0;i <= 6;i += 2) {
            vh = (value>>>(i * 4 + 4))&0x0f;
            vl = (value>>>(i*4))&0x0f;
            string += vh.toString(16) + vl.toString(16);
        }
        return string;
    };

    var cvtHex = function(value) {
        var string = "";
        var i;
        var v;
        for(i = 7;i >= 0;i--) {
            v = (value>>>(i * 4))&0x0f;
            string += v.toString(16);
        }
        return string;
    };

    var uTF8Encode = function(string) {
        string = string.replace(/\x0d\x0a/g, "\x0a");
        var output = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                output += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                output += String.fromCharCode((c >> 6) | 192);
                output += String.fromCharCode((c & 63) | 128);
            } else {
                output += String.fromCharCode((c >> 12) | 224);
                output += String.fromCharCode(((c >> 6) & 63) | 128);
                output += String.fromCharCode((c & 63) | 128);
            }
        }
        return output;
    };

    $.extend({
        sha1: function(string) {
            var blockstart;
            var i, j;
            var W = new Array(80);
            var H0 = 0x67452301;
            var H1 = 0xEFCDAB89;
            var H2 = 0x98BADCFE;
            var H3 = 0x10325476;
            var H4 = 0xC3D2E1F0;
            var A, B, C, D, E;
            var tempValue;
            string = uTF8Encode(string);
            var stringLength = string.length;
            var wordArray = new Array();
            for(i = 0;i < stringLength - 3;i += 4) {
                j = string.charCodeAt(i)<<24 | string.charCodeAt(i + 1)<<16 | string.charCodeAt(i + 2)<<8 | string.charCodeAt(i + 3);
                wordArray.push(j);
            }
            switch(stringLength % 4) {
                case 0:
                    i = 0x080000000;
                    break;
                case 1:
                    i = string.charCodeAt(stringLength - 1)<<24 | 0x0800000;
                    break;
                case 2:
                    i = string.charCodeAt(stringLength - 2)<<24 | string.charCodeAt(stringLength - 1)<<16 | 0x08000;
                    break;
                case 3:
                    i = string.charCodeAt(stringLength - 3)<<24 | string.charCodeAt(stringLength - 2)<<16 | string.charCodeAt(stringLength - 1)<<8 | 0x80;
                    break;
            }
            wordArray.push(i);
            while((wordArray.length % 16) != 14 ) wordArray.push(0);
            wordArray.push(stringLength>>>29);
            wordArray.push((stringLength<<3)&0x0ffffffff);
            for(blockstart = 0;blockstart < wordArray.length;blockstart += 16) {
                for(i = 0;i < 16;i++) W[i] = wordArray[blockstart+i];
                for(i = 16;i <= 79;i++) W[i] = rotateLeft(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
                A = H0;
                B = H1;
                C = H2;
                D = H3;
                E = H4;
                for(i = 0;i <= 19;i++) {
                    tempValue = (rotateLeft(A, 5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
                    E = D;
                    D = C;
                    C = rotateLeft(B, 30);
                    B = A;
                    A = tempValue;
                }
                for(i = 20;i <= 39;i++) {
                    tempValue = (rotateLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
                    E = D;
                    D = C;
                    C = rotateLeft(B, 30);
                    B = A;
                    A = tempValue;
                }
                for(i = 40;i <= 59;i++) {
                    tempValue = (rotateLeft(A, 5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
                    E = D;
                    D = C;
                    C = rotateLeft(B, 30);
                    B = A;
                    A = tempValue;
                }
                for(i = 60;i <= 79;i++) {
                    tempValue = (rotateLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
                    E = D;
                    D = C;
                    C = rotateLeft(B, 30);
                    B = A;
                    A = tempValue;
                }
                H0 = (H0 + A) & 0x0ffffffff;
                H1 = (H1 + B) & 0x0ffffffff;
                H2 = (H2 + C) & 0x0ffffffff;
                H3 = (H3 + D) & 0x0ffffffff;
                H4 = (H4 + E) & 0x0ffffffff;
            }
            tempValue = cvtHex(H0) + cvtHex(H1) + cvtHex(H2) + cvtHex(H3) + cvtHex(H4);
            return tempValue.toLowerCase();
        }
    });
})(jQuery);