// Generated by CoffeeScript 1.12.2
(function() {
  'use strict';
  var BaseModuleInitService, DataWranglerInitService,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseModuleInitService = require('scripts/BaseClasses/BaseModuleInitService.coffee');

  module.exports = DataWranglerInitService = (function(superClass) {
    extend(DataWranglerInitService, superClass);

    function DataWranglerInitService() {
      return DataWranglerInitService.__super__.constructor.apply(this, arguments);
    }

    DataWranglerInitService.inject('app_analysis_dataWrangler_msgService');

    DataWranglerInitService.prototype.initialize = function() {
      this.msgService = this.app_analysis_dataWrangler_msgService;
      return this.setMsgList();
    };

    return DataWranglerInitService;

  })(BaseModuleInitService);

}).call(this);

//# sourceMappingURL=DataWranglerInit.service.js.map
