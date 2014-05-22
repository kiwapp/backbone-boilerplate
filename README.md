# Kiwapp Backbone.js boilerplate

A boilerplate for **backbone.js**. From [Marrow](http://mdwn.in/gh/kud/marrow) and [Serval Backbone](https://github.com/dhoko/serval-backbone).

## How to install ?

### Requirements

- node.js
- npm

Ok, let's run : `npm install`

### Included:

- A structure
- A great compilation process via Gulp
- Browserify
- Templating via lodash
- Lo-Dash instead of underscore for performance!
- Kiwapp.js
- Normalize.css
- jQuery 2.1
- SwiftClick
- Moment.js
- `box-sinzing : border-box`
- i18n
- Documentation with [Docker](https://github.com/jbt/docker)
- An HTTP server with [Express.js](http://expressjs.com/)
- pushState
- some helpers
- ... all you need to begin a great app and being happy

## Helpers

This application contains some helpers :

- `openPage(page,delay)`
- `resetTimeout()` : Clean your app's timeouts
- `repeatAction(cb, delay, msg)` : Reapeat a custom action after a delay (s).
- `resetActions()` : Clean your app's intervals (from repeatAction)
- `tpl(partialName)` : Load your template
- `log(msg)` : Alias of kiwapp.log()

### i18n

- `i18nLoader(cb)` : Activate i18n inside your app. Init your app inside the callback

### Load plugins

- `lineaLoader()` : Load the linea for your application

### Direct access to your app's components

- `App.view(ViewNameInstance)` : Direct access to an instance of a view
- `App.model(ModelNameInstance)` : Direct access to an instance of a Model
- `App.collection(CollectionNameInstance)` : Direct access to an instance of a Collection
- `App.lang(LanguageName)` : Direct access to a Language
- `App.currentLang()` : Direct access to the current instance of a language

It also provides a verbose mode, the default value it set to **1**, so you can view App's internal debugs. If you change the value to **0** it hides them.

> You can view these helpers inside `src/js/bootstrap.js`.

### i18n inside your application

I18n is built on top of Yaml files and Gulp. We concatenate them, then we convert it to a file `languages.json` inside the directory `i18n`.

#### French translation for the boilerplate

```yaml
title: "Yo petit papillon de lumière !"
baseline: "Bienvenue sur"
baselineInfo: "le boilerplate Kiwapp avec Backbone.js"
includes: "Tu peux désormais coder. Tu disposes de :"
launchApp: "Ouvre une console et saisi cette commande :"
aboutTpl: "On utilise une  version customisée du template lodash cf:"
aboutTpl2: "Tu peux modifier ça dans la variable templateSettings, on trouve ça dans ce fichier"
aboutLink: "Tu peux aller à la page suivante avec ce lien : "
aboutLink2: "ou, en utilisant ce bouton avec un event"
aboutAnchor: avec une ancre
buttonMsg: Page suivante
```

***You must respect a convention for the filename***
> Language are defined with a `-` as defined inside the [BCP 47](http://tools.ietf.org/html/bcp47). cf [Value of the HTML5 lang attribute](http://webmasters.stackexchange.com/questions/28307/value-of-the-html5-lang-attribute). So the filename will be `fr-FR.yml`

#### Built i18n for your app

Run `gulp` (*for the dev*), it will create the i18n, it will also watch for changes inside each file in `i18n/` and refresh the page.

You can run the task without the dev's server, just run `gulp i18n`.

When you run `gulp prod`, it will regenerate all your app, including i18n.

> `languages.json` is a JSON object, with primary key as language. If you don't configure the ShopParameters inside the manager, the first key will be your default language.

## Some tips

### Go to another page on click

You can create a button or anything else to redirect to another page. It's easy, you don't need to write a line of JavaScript.

```html
<button type="button" data-page-dest="form">Go to form</button>
```

That's it, just add `data-page-dest` attribute. Then add a page name and when you click, the application will know where is your destination.

> For the root page, just add root.

### Switch to another language on click

You have to put something like this button :

```html
<button type="button" data-i18n="fr-FR" class="btn-i18n">fr-FR</button>
```

It can be anything else, but he has to have these:

- a className : `btn-i18n`
- an attribute : data-i18n with the value to change

#### Details

Please read the issue, [Boilerplate Backbone #70](https://github.com/procheo/ProcheoApps/issues/70)

## Explanation

```shell
.
├── GulpFile.js
├── README.md
├── .jshintrc
├── .editorconfig
├── .bowerrc
├── bower.json
├── build // final files
├── i18n // for i18n
    └── languages.json // i18n translations
├── config // Application config
    └── kiwapp_config.js
├── doc // API documentation
├── package.json
├── src // where you code
    ├── layout // Your app layout (header,footer...)
    ├── partials // HTML partials
    ├── styles // Your css
    ├── assets // static files
    └── js // Your backbone app
        ├── app.js // $(document).ready
        ├── bootstrap.js
        ├── collections // http://backbonejs.org/#Collection
        ├── models // http://backbonejs.org/#Model
        ├── routers // http://backbonejs.org/#Router
        └── views // http://backbonejs.org/#View
└── tasks // Directory for each of your gulp tasjs
```

## Configuration for the application

Create a `kiwapp_config.js` inside the directory `config`

Ex :

```JavaScript
Kiwapp.set({
    appParameters : {
        deviceType : "webbrowser",
        osID : "webbrowser",
        deviceIdentifier : "Guillaume Chrome"
    },
    shopParameters : {
        lang : ["fr-FR","en-US"],
        url : "http://dev-gr.procheo.fr/upload/newlook/collect/save"
    },
    shopInfosConfig : {
        external_identifier : "1",
        address1 : "2 avenue de la cristallerie",
        zipcode : "93500",
        phone : "0645379283",
        name : "Procheo Dev",
        country_id : 72, //FRANCE
        country_name : "fr"
    }
});
```


## Development

```shell
$ gulp
```

## Production

```shell
$ gulp prod
```

It build the zip, update your manifest and aslo generate your API documention for the application.

## About the gulpFile.js

The gulpFile contains our tasks in order to built|dev the application, there are

- *env* : Set the env to production
- *assets* : Move our assets from `src/assets/` to `build/assets/`
- *vendor* : Concatenate Backbone,lodash etc. and build a `vendor.min.js`
- *templates* : Build an `index.html` with each partials as scripts
- *scripts* : Build the backbone application
- *styles* : Move our CSS to `build/styles/`
- *manifest* : Update our app manifest an update the version
- *i18n* : Build the i18n `languages.json` file
- *zip* : Zip de content of build directory
- *doc* : Create an API documentation with Docco
- *prod* : Build the application, aggregate each previous tasks
- *default* : Default task

### default task, to dev

This task will start a server with express.js, it will start the server and open the browser to : `http://localhost:8080/build/`.

It also provides you a wrappper for an API, `http://localhost:8080/apitest`, it can be access throught POST|GET|DELETE|PUT|PATCH... Any http request you want.

This task launch liverload, so you have to install [Livereload for Chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) in your browser.

### Other tasks

You can modify each task, there are in the directory `tasks`.

> Default is inside the gulpfile.

## Note

Serval backbone boilerplate is built on top of [Marrow](https://github.com/kud/marrow).
