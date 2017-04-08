// Generated by CoffeeScript 1.12.2
(function() {
  module.exports = function(config) {
    return config.set({
      basePath: '../',
      frameworks: ["jasmine"],
      files: ['bower_components/angular/angular.js', 'bower_components/jquery/dist/jquery.js', 'bower_components/jquery-highlight/jquery.highlight.js', 'bower_components/jquery-hoverintent/jquery.hoverIntent.js', 'bower_components/datatables/media/js/jquery.dataTables.js', 'bower_components/d3/d3.js', 'bower_components/angular-animate/angular-animate.js', 'bower_components/angular-cookies/angular-cookies.js', 'bower_components/angular-messages/angular-messages.js', 'bower_components/angular-resource/angular-resource.js', 'bower_components/angular-route/angular-route.js', 'bower_components/angular-sanitize/angular-sanitize.js', 'bower_components/angular-touch/angular-touch.js', 'bower_components/angular-ui-router/release/angular-ui-router.js', 'bower_components/zeroclipboard/dist/ZeroClipboard.js', 'bower_components/moment/moment.js', 'bower_components/pikaday/pikaday.js', 'bower_components/handsontable/dist/handsontable.js', 'bower_components/ngHandsontable/dist/ngHandsontable.js', 'bower_components/wrangler/lib/datavore/datavore-d0.1.js', 'bower_components/wrangler/dw.js', 'bower_components/bootstrap/dist/js/bootstrap.js', 'bower_components/angular-bootstrap/ui-bootstrap-tpls.js', 'bower_components/jquery-layout/source/stable/jquery.layout.js', 'bower_components/jstat/dist/jstat.js', 'bower_components/jsfeat/build/jsfeat.js', 'bower_components/angular-mocks/angular-mocks.js', "app/scripts/**/*.coffee", "test/mock/**/*.coffee", "test/spec/**/*.coffee"],
      exclude: [],
      port: 8080,
      logLevel: config.LOG_INFO,
      browsers: ["PhantomJS2"],
      plugins: ["karma-phantomjs2-launcher", "karma-jasmine", "karma-coffee-preprocessor"],
      autoWatch: true,
      singleRun: false,
      colors: true,
      preprocessors: {
        '**/*.coffee': ['coffee']
      }
    });
  };

}).call(this);

//# sourceMappingURL=karma.conf.js.map
