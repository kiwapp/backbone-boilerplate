var App = require('../start');
var MasterView = require('./masterView');

/**
* Root View
* @type {Backbone.View}
*/
module.exports = MasterView.extend({

    template: tpl('root'),

    events: {
        "click .btn-action-x" : "button",
    },

    button : function button(){
        console.log("This event is called before we swicth to another page");
    },

    // Execute before the render. It can also bind data to the view.
    // Here we bind a key lang to the view
    beforeRender: function beforeRender() {
        return {lang: App.Languages.available};
    }
});
