var fs       = require('fs'),
    archiver = require('archiver'),
    gutil    = require('gulp-util');

/**
 * Create zip from our build app directory
 */
module.exports = function() {
    "use strict";

    var zipName = './../prod-' + gutil.env.name + '-' + gutil.env.version + '.zip',
        output = fs.createWriteStream(zipName),
        archive = archiver('zip');

    output.on('close', function() {
        console.log('archiver has been finalized and the output file descriptor has closed.');
    });
    archive.on('error', function(err) {
        throw err;
    });
    archive.pipe(output);
    archive.bulk([{ expand: true, cwd: 'build/', src: ['**'] }]);

    archive.finalize(function(err, bytes) {
        if (err) {
            throw err;
        }
        console.log(bytes + ' total bytes');
    });
};