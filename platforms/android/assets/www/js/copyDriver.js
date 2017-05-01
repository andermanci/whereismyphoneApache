/**
 * Created by urtzi on 30/04/2017.
 */
var fs = require('fs');
var path = require('path');

module.exports = function(context) {
    var libsPath = path.join(context.opts.projectRoot, 'libs');
    var platformLibsPath = path.join(context.opts.projectRoot, 'platforms',
        'android', 'libs');
    var libs = fs.readdirSync(libsPath);

    libs.forEach(function (lib) {
        console.log('Copying libs/%s to platforms/android/libs...', lib);
        fs.createReadStream(path.join(libsPath, lib))
            .pipe(fs.createWriteStream(path.join(platformLibsPath, lib)));
    });
};