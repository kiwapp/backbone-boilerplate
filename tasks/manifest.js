var gulp    = require('gulp'),
    jeditor = require("gulp-json-editor"),
    gutil   = require('gulp-util');

/**
 * Update the manifest for an app
 * It will generate a new codename and also set our env for the prod zip
 */
module.exports = function() {
    "use strict";

    gulp.src("./src/manifest.json")
        .pipe(jeditor(function (json) {

            json.app_info.codename = Number(Math.round(((+json.app_info.codename) + 0.1) * 100) /100).toFixed(1);

            // Remove space from name
            gutil.env.name    = json.app_info.name.replace(/ /g,"-");
            gutil.env.version = json.app_info.codename;

            return json; // must return JSON object.
        }))
        .pipe(gulp.dest("./src"))
        .pipe(gulp.dest("./build"));
};