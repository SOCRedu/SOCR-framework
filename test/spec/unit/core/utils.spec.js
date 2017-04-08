// Generated by CoffeeScript 1.12.2
(function() {
  'use strict';
  describe('utils module', function() {
    var $injector;
    $injector = angular.injector(['app_utils']);
    return describe('provides service utils', function() {
      var utils;
      utils = $injector.get('utils');
      describe("runParallel", function() {
        it("runs an array of functions", function(done) {
          var cb1, cb2, cb3, foo;
          foo = {
            cb1: function() {},
            cb2: function() {},
            cb3: function() {}
          };
          spyOn(foo, 'cb1');
          spyOn(foo, 'cb2');
          spyOn(foo, 'cb3');
          cb1 = function(next) {
            (expect(foo.cb1)).not.toHaveBeenCalled();
            (expect(foo.cb2)).not.toHaveBeenCalled();
            (expect(foo.cb3)).not.toHaveBeenCalled();
            return setTimeout((function() {
              (expect(foo.cb1)).not.toHaveBeenCalled();
              (expect(foo.cb2)).toHaveBeenCalled();
              (expect(foo.cb3)).toHaveBeenCalled();
              foo.cb1();
              return next(null, "one", false);
            }), 30);
          };
          cb2 = function(next) {
            (expect(foo.cb1)).not.toHaveBeenCalled();
            (expect(foo.cb2)).not.toHaveBeenCalled();
            (expect(foo.cb3)).not.toHaveBeenCalled();
            return setTimeout((function() {
              (expect(foo.cb1)).not.toHaveBeenCalled();
              (expect(foo.cb2)).not.toHaveBeenCalled();
              (expect(foo.cb3)).toHaveBeenCalled();
              foo.cb2();
              return next(null, "two");
            }), 0);
          };
          cb3 = function(next) {
            (expect(foo.cb1)).not.toHaveBeenCalled();
            (expect(foo.cb2)).not.toHaveBeenCalled();
            (expect(foo.cb3)).not.toHaveBeenCalled();
            foo.cb3();
            return next(null, "three");
          };
          (expect(utils.runParallel)).toBeDefined();
          return utils.runParallel([cb1, cb2, cb3], function(err, res) {
            (expect(err)).toBeNull();
            (expect(res[0])).toEqual(["one", false]);
            (expect(res[1])).toEqual("two");
            (expect(res[2])).toEqual("three");
            return done();
          });
        });
        it("does not break if the array is empty or not defined", function(done) {
          return utils.runParallel([], (function(_this) {
            return function(err, res) {
              (expect(err != null)).toBeFalsy();
              return utils.runParallel(void 0, function(err, res) {
                (expect(err != null)).toBeFalsy();
                return done();
              });
            };
          })(this));
        });
        return it("doesn't stop on errors if the 'force' option is 'true'", function(done) {
          var cb1, cb2, cb3, cb4, fini;
          cb1 = function(next) {
            return next(null, "one", 2);
          };
          cb2 = function(next) {
            return thisMethodDoesNotExist();
          };
          cb3 = function(next) {
            return next(null, "three");
          };
          cb4 = function(next) {
            return next(new Error("fake"), "four");
          };
          fini = function(err, res) {
            (expect(err)).toBeDefined();
            (expect(res[0])).toEqual(["one", 2]);
            (expect(res[1])).not.toBeDefined();
            (expect(res[2])).toEqual("three");
            (expect(res[3])).not.toBeDefined();
            return done();
          };
          return utils.runParallel([cb1, cb2, cb3, cb4], fini, true);
        });
      });
      describe("runSeries", function() {
        it("runs an array of functions", function(done) {
          var cb1, cb2, cb3, foo;
          foo = {
            cb1: function() {},
            cb2: function() {},
            cb3: function() {}
          };
          spyOn(foo, 'cb1');
          spyOn(foo, 'cb2');
          spyOn(foo, 'cb3');
          cb1 = function(next) {
            (expect(foo.cb1)).not.toHaveBeenCalled();
            (expect(foo.cb2)).not.toHaveBeenCalled();
            (expect(foo.cb3)).not.toHaveBeenCalled();
            return setTimeout((function() {
              (expect(foo.cb1)).not.toHaveBeenCalled();
              (expect(foo.cb2)).not.toHaveBeenCalled();
              (expect(foo.cb3)).not.toHaveBeenCalled();
              foo.cb1();
              return next(null, "one", false);
            }), 30);
          };
          cb2 = function(next) {
            (expect(foo.cb1)).toHaveBeenCalled();
            (expect(foo.cb2)).not.toHaveBeenCalled();
            (expect(foo.cb3)).not.toHaveBeenCalled();
            return setTimeout((function() {
              (expect(foo.cb1)).toHaveBeenCalled();
              (expect(foo.cb2)).not.toHaveBeenCalled();
              (expect(foo.cb3)).not.toHaveBeenCalled();
              foo.cb2();
              return next(null, "two");
            }), 0);
          };
          cb3 = function(next) {
            (expect(foo.cb1)).toHaveBeenCalled();
            (expect(foo.cb2)).toHaveBeenCalled();
            (expect(foo.cb3)).not.toHaveBeenCalled();
            foo.cb3();
            return next(null, "three");
          };
          (expect(utils.runSeries)).toBeDefined();
          return utils.runSeries([cb1, cb2, cb3], function(err, res) {
            (expect(err)).toBeNull();
            (expect(res.hasOwnProperty('-1'))).toBeFalsy();
            (expect(res[0])).toEqual(["one", false]);
            (expect(res[1])).toEqual("two");
            (expect(res[2])).toEqual("three");
            return done();
          });
        });
        it("does not break if the array is empty or not defined", function(done) {
          return utils.runSeries([], (function(_this) {
            return function(err, res) {
              (expect(err)).toBeNull();
              return utils.runSeries(void 0, function(err, res) {
                (expect(err)).toBeNull();
                return done();
              });
            };
          })(this));
        });
        it("stops on errors", function(done) {
          var cb1, cb2, cb3, fini;
          cb1 = function(next) {
            return next(null, "one", 2);
          };
          cb2 = function(next) {
            return thisMethodDoesNotExist();
          };
          cb3 = function(next) {
            return next(null, "three");
          };
          fini = function(err, res) {
            (expect(err)).toBeDefined();
            (expect(res[0])).toEqual(["one", 2]);
            (expect(res[1])).not.toBeDefined();
            (expect(res[2])).not.toBeDefined();
            return done();
          };
          return utils.runSeries([cb1, cb2, cb3], fini);
        });
        return it("doesn't stop on errors if the 'force' option is 'true'", function(done) {
          var cb1, cb2, cb3, cb4, fini;
          cb1 = function(next) {
            return next(null, "one", 2);
          };
          cb2 = function(next) {
            return thisMethodDoesNotExist();
          };
          cb3 = function(next) {
            return next(null, "three");
          };
          cb4 = function(next) {
            return next(new Error("fake"), "four");
          };
          fini = function(err, res) {
            (expect(err)).toBeDefined();
            (expect(res[0])).toEqual(["one", 2]);
            (expect(res[1])).not.toBeDefined();
            (expect(res[2])).toEqual("three");
            (expect(res[3])).not.toBeDefined();
            return done();
          };
          return utils.runSeries([cb1, cb2, cb3, cb4], fini, true);
        });
      });
      describe("runWaterfall", function() {
        return it("runs an array of functions and passes the results", function(done) {
          var cb1, cb2, cb3;
          cb1 = function(next) {
            return next(null, "one", 2);
          };
          cb2 = function(a, b, next) {
            (expect(a)).toEqual("one");
            (expect(b)).toEqual(2);
            return setTimeout((function() {
              return next(null, 3);
            }), 0);
          };
          cb3 = function(d, next) {
            (expect(d)).toEqual(3);
            return next(null, "two", "three");
          };
          return utils.runWaterfall([cb1, cb2, cb3], function(err, res1, res2) {
            (expect(err)).toBeNull();
            (expect(res1)).toEqual("two");
            (expect(res2)).toEqual("three");
            return done();
          });
        });
      });
      describe('getArgumentNames function', function() {
        it('should return an array of argument names', function() {
          var fn;
          fn = function(a, b, c, d) {};
          (expect(utils.getArgumentNames(fn))).toEqual(['a', 'b', 'c', 'd']);
          return (expect(utils.getArgumentNames(function() {}))).toEqual([]);
        });
        return it('shouldn\' tbreak if the function is not defined', function() {
          return (expect(utils.getArgumentNames(void 0))).toEqual([]);
        });
      });
      describe('installFromTo function', function() {
        return it('copies all properties of first object to second', function() {
          var obj1, obj2;
          obj1 = {
            name: 'object',
            id: 1
          };
          obj2 = {
            ownProperty: 'prop'
          };
          utils.installFromTo(obj1, obj2);
          (expect(Object.keys(obj2).length)).toEqual(3);
          (expect(obj2.name)).toBeDefined();
          return (expect(obj2.id)).toBeDefined();
        });
      });
      describe('getGuid function', function() {
        return it('should return unique id every time', function() {
          return (expect(utils.getGuid())).not.toEqual(utils.getGuid());
        });
      });
      return describe('doForAll function', function() {
        it('runs a functions for each argument within an array ', function(done) {
          var fn, result;
          result = [];
          fn = function(arg, next) {
            result.push(arg);
            return next();
          };
          return utils.doForAll(['a', 2, false], fn, function(err) {
            (expect(err != null)).toBe(false);
            (expect(result)).toEqual(['a', 2, false]);
            return done();
          });
        });
        return it('does not break if the array is empty or not defined', function() {
          var fn;
          fn = function(arg, next) {
            return next();
          };
          return utils.doForAll([], fn, (function(_this) {
            return function(err) {
              (expect(err != null)).toBe(false);
              return utils.doForAll(void 0, fn, function(err) {
                return (expect(err != null)).toBe(false);
              });
            };
          })(this));
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=utils.spec.js.map
