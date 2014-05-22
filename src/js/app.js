var App = require('./start');
var Bootstrap = require('./bootstrap');
var Router = require('./routers/router');

$(document).ready(function() {

    // Init the application custom context
    Kiwapp("../config/kiwapp_config.js", function(){

        log('[App@init] : The application context is ready');

        Bootstrap.i18nLoader(function() {

            // Because we have a landscape app
            Kiwapp.driver().trigger('callApp', {call:'rotation', data:{
                "orientation" : 10
            }});

            App.Routers.Instances.router = new Router();

            Backbone.history.start();
            App.swiftclick = SwiftClick.attach(document.body);
        });
    });
});
