cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-dialogs.notification",
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "cordova-plugin-dialogs.notification_android",
        "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "cordova-plugin-bb-crypto.client",
        "file": "plugins/cordova-plugin-bb-crypto/www/client.js",
        "pluginId": "cordova-plugin-bb-crypto",
        "clobbers": [
            "community.gsecrypto"
        ]
    },
    {
        "id": "cordova-plugin-minisodium.MiniSodium",
        "file": "plugins/cordova-plugin-minisodium/www/MiniSodium.js",
        "pluginId": "cordova-plugin-minisodium",
        "clobbers": [
            "window.plugins.MiniSodium"
        ]
    },
    {
        "id": "cordova-plugin-jdbc.jdbc",
        "file": "plugins/cordova-plugin-jdbc/www/jdbc.js",
        "pluginId": "cordova-plugin-jdbc",
        "clobbers": [
            "jdbc"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.2",
    "cordova-plugin-dialogs": "1.3.2",
    "cordova-plugin-bb-crypto": "1.0.0",
    "cordova-plugin-minisodium": "1.0.0",
    "cordova-plugin-jdbc": "0.1.0"
};
// BOTTOM OF METADATA
});