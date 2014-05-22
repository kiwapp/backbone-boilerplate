var App      = require('../start');
var viewRoot = require('../views/root');
var viewHome = require('../views/home');

/**
* Router
* @type {object}
*/
module.exports = Backbone.Router.extend({

    // If you are using queries param for a route, duplicate the master, see for home and home/:query
    routes: {
      '': 'root',
      'home': 'home',
      'home/:query': 'home',
      '*path': 'redirect404' // The last one, Always dude.
    },

    /**
     * Router init
     * It will create a new instance of each view and listen to transition between pages
     * @return {void}
     */
    initialize: function() {

        App.Views.Instances.root = new viewRoot();
        App.Views.Instances.home = new viewHome();

        window.addEventListener("webkitAnimationEnd", function(e) {
            if( /page-/g.test(e.target.className) ) {
                e.target.classList.toggle('transition-in');
            } else {
                e.target.classList.toggle('blink');
            }
        });
    },

    /**
     * Used before every action
     * If you come to the home page it will create a new session
     * It also clean your app's timeouts
     * @return {void}
     */
    before: function(page, query) {

        // When we come home we reset the session
        if('root' === page && Backbone.history.history.length > 1) {
            Kiwapp.session().end();

            if(query) {
                console.log("[Router@before] Query param is : ", query);
            }
        }

        // Clean different timeouts
        window.resetTimeout();

    },

    /**
     * Used after every action
     * It will create a stat per page for you and also inform the native that we open dat page
     * @return {void}
     */
    after: function(page,query) {

        if('root' === page) {
            Kiwapp.session().start();
        }

        // Prepare your query to be logged
        query = (!query) ? '' : '/' + query;

        log("[Router@after] : Open page - " + page + query);
        console.debug("[Router@after] : Open page - " + page + query);

        // Create a new interaction for this page
        Kiwapp.stats().page(page + query);
    },

    root: function(query) {
        this.before('root');
        App.Views.Instances.root.render();
        this.after('root', query);
    },

    home: function(query) {
        this.before('home');
        App.Views.Instances.home.render();
        this.after('home', query);
    },

    //=route=//

    /**
     * Used when a page isn't found
     * @return {void}
     */
    redirect404: function() {
        console.log('Oops, 404!');
    }

});