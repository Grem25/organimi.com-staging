this.init = function($) {
  var app = $.app = $.express();

  // bootstrap the app
  setup();
  loadActions();


  function setup(){
    app.use($.express.cookieParser());
    // app.use($.express.logger());
    app.use($.express.json());
    app.use($.express.urlencoded());
    app.use($.express.methodOverride());
    app.use($.express.static(__dirname + '/assets'));
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    app.set('layout', false);
    app.use($.ejs);
  }

  function loadActions() {
    require('./actions.js').init($);
  }

  function run(){
    var port = process.env.PORT || 3000;

    app.listen(port);
    console.log('Listening on port 3000');
  }

  return {
    run: run
  };
};

