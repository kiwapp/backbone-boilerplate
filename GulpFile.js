var path        = require('path'),
    express     = require('express'),
    bodyParser  = require('body-parser'),
    tinylr      = require('tiny-lr'),
    gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    livereload  = require('gulp-livereload'),
    server      = tinylr(),
    openBrowser = require('./tasks/open');


/**
 * Create a watcher for a glob it can activate livereload too
 * @param  {Glob} path
 * @param  {Array} task  Task to launch
 * @param  {Boolean} watch Activate a watch for livereloadq
 */
function watchThemAll(path, task, watch) {
    var watcher = gulp.watch(path,task);
    if(watch) {
        watcher.on("change", function(file) {
            gutil.log('File updated', gutil.colors.yellow(file.path));
            livereload(server).changed(file.path);
        });
    }
}

// Default task : Open url, lauch server, livereaload
gulp.task('default',['assets','vendor','templates','scripts','styles','i18n'], function() {

  // Open Google Chrome @ localhost:8080
    openBrowser();

    var app = express();

    app.use(bodyParser());
    app.use(express.static(path.resolve('./')));
    app.listen(8080, function() {
      gutil.log('Listening on', 8080);
    });

    // Proxy for our request
    app.all("/apitest", function(req,res) {
        console.log();
        console.log(req.body);
        console.log();
        res.send(201);
    });

    // Livereload listener
    server.listen(35729, function (err) {
        if (err) {
            throw err;
        }

        // watchThemAll(["./src/js/**/*"], ["scripts"],true);
        watchThemAll("./src/styles/*", ["styles"],true);
        watchThemAll("./i18n/**/*.yml", ["i18n"],true);
        watchThemAll(["./src/layout/**/*","./src/partials/**/*"], ["templates"]);
    });

});

// Concatenate your partials and append them to index.html
gulp.task('templates', function() {
    require('./tasks/templates')(server);
});

// Build my css
gulp.task('styles', require('./tasks/styles'));
gulp.task('scripts', function() {
    require('./tasks/app')(server);
});

// Build our assets
gulp.task('assets',require('./tasks/assets'));

// Build your vendors
gulp.task('vendor', require("./tasks/vendor"));

// Create i18n file for the app
gulp.task("i18n",require("./tasks/i18n"));

// Update the app's manifest
gulp.task('manifest', require('./tasks/manifest'));

// Create a zipfile for your app version
gulp.task('zip', require('./tasks/zip'));

// Set our env to production
gulp.task('env', function(){
    gutil.env.type = 'prod';
});

// Generate your documentation using docker
gulp.task('doc', function(){
  var spawn = require('child_process').spawn;
  spawn('docker', ['-i','./src','-x','vendor','-n'], {stdio: 'inherit'});
});

// Prod all the things !
gulp.task('prod',['env','assets','vendor','templates','scripts','styles','manifest','i18n'], function() {
    gulp.start("zip");
    gulp.start("doc");
});