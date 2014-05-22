var fs     = require('fs'),
    gulp   = require('gulp'),
    es     = require('event-stream'),
    concat = require('gulp-concat');

/**
 * Build vendor, Concat and build our dependencies
 */
module.exports = function() {

    "use strict";

    var dependencies = './node_modules';

    return es.concat(
      gulp.src([
        dependencies + '/jquery/dist/jquery.js',
        dependencies + '/lodash/dist/lodash.js',
        dependencies + '/backbone/backbone.js',
        dependencies + '/momentjs/moment.js',
        dependencies + '/swiftclick/js/libs/swiftclick.js',
        dependencies + '/kiwapp.js/kiwapp.js',
        'src/vendor' + '/parseConnector/parseConnector.js'
      ])
        .pipe(concat("vendor.min.js"))
        .pipe(gulp.dest('build/js')),
      gulp.src(dependencies + '/normalize-css/normalize.css')
        .pipe(gulp.dest('build/styles'))
    );
};