// Generated by CoffeeScript 1.12.2
(function() {
  'use strict';
  var Sandbox;

  Sandbox = (function() {
    function Sandbox(_instanceId, _options) {
      if (_options == null) {
        _options = {};
      }
      this.instanceId = _instanceId;
      this.options = _options;
      if (this.instanceId == null) {
        throw new TypeError("no id was specified");
      }
      if (typeof this.instanceId !== "string") {
        throw new TypeError("id is not a string");
      }
    }

    return Sandbox;

  })();

  angular.module('app_sandbox', []).service('Sandbox', function() {
    return Sandbox;
  });

}).call(this);

//# sourceMappingURL=Sandbox.js.map
