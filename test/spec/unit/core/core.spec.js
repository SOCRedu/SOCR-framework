// Generated by CoffeeScript 1.12.2
(function() {
  'use strict';
  describe('Core module', function() {
    var moduleId, validModule;
    moduleId = 'myId';
    validModule = function(sb) {
      return {
        init: function(opt, done) {
          return setTimeout((function() {
            return done();
          }), 0);
        },
        destroy: function(done) {
          return setTimeout((function() {
            return done();
          }), 0);
        },
        msgList: {
          outgoing: ['0'],
          incoming: ['1'],
          scope: ['validModuleScope']
        }
      };
    };
    beforeEach(function() {
      module('app_core');
      return module('app_mocks');
    });
    return describe('provides service $core containing methods:', function() {
      beforeEach(function() {
        return inject(function(core) {
          core.stop(moduleId);
          return core.unregister(moduleId);
        });
      });
      describe('register function', function() {
        it('should register valid module', function() {
          return inject(function(core) {
            return (expect(core.register(moduleId, validModule))).toBeTruthy();
          });
        });
        it('should not register module if the module creator is an object', function() {
          return inject(function(core) {
            return (expect(core.register(moduleId, {}))).toBeFalsy();
          });
        });
        it('should not register module if the module creator does not return an object', function() {
          return inject(function(core) {
            return (expect(core.register(moduleId, function() {
              return 'I\'m not an object';
            }))).toBeFalsy();
          });
        });
        it('should not register module if the created module object has not the functions init and destroy', function() {
          return inject(function(core) {
            return (expect(core.register(moduleId, function() {}))).toBeFalsy();
          });
        });
        it('should register module if option parameter is an object', function() {
          return inject(function(core) {
            return (expect(core.register(moduleId, validModule, {}))).toBeTruthy();
          });
        });
        it('should not register module if the option parameter is not an object', function() {
          return inject(function(core) {
            return (expect(core.register(moduleId, validModule, 'I\'m not an object'))).toBeFalsy();
          });
        });
        return it('should not register module if module already exits', function() {
          return inject(function(core) {
            (expect(core.register(moduleId, validModule))).toBeTruthy();
            return (expect(core.register(moduleId, validModule))).toBeFalsy();
          });
        });
      });
      describe('unregister function', function() {
        return it('should unregister registered module', function() {
          return inject(function(core) {
            (expect(core.register(moduleId, validModule))).toBeTruthy();
            (expect(core.unregister(moduleId))).toBeTruthy();
            return (expect(core.start(moduleId))).toBeFalsy();
          });
        });
      });
      describe('unregisterAll function', function() {
        return it('should unregister all modules', function() {
          return inject(function(core) {
            (expect(core.register(moduleId, validModule))).toBeTruthy();
            (expect(core.register('module2', validModule))).toBeTruthy();
            core.unregisterAll();
            (expect(core.start(moduleId))).toBeFalsy();
            return (expect(core.start('module2'))).toBeFalsy();
          });
        });
      });
      describe('start function', function() {
        var foo;
        foo = {
          cb1: function() {}
        };
        beforeEach(function() {
          return inject(function(core) {
            return core.register(moduleId, validModule);
          });
        });
        it('should not start module if invalid name was passed', function() {
          return inject(function(core) {
            (expect(core.start(123))).toBeFalsy();
            (expect(core.start(function() {}))).toBeFalsy();
            return (expect(core.start([]))).toBeFalsy();
          });
        });
        it('should start module if valid name was passed', function() {
          return inject(function(core) {
            return (expect(core.start(moduleId))).toBeTruthy();
          });
        });
        it('should start module if empty parameters object was passed', function() {
          return inject(function(core) {
            return (expect(core.start(moduleId, {}))).toBeTruthy();
          });
        });
        it('should return false if second parameter is a number', function() {
          return inject(function(core) {
            return (expect(core.start(moduleId, 123))).toBeFalsy();
          });
        });
        it('should return false if module does not exist', function() {
          return inject(function(core) {
            return (expect(core.start('foo'))).toBeFalsy();
          });
        });
        it('should return true if module exist', function() {
          return inject(function(core) {
            return (expect(core.start(moduleId))).toBeTruthy();
          });
        });
        it('should return false if instance was already started', function() {
          return inject(function(core) {
            core.start('myId');
            return (expect(core.start(moduleId))).toBeFalsy();
          });
        });
        it('should pass the options', function(done) {
          return inject(function(core) {
            var mod;
            mod = function(sb) {
              return {
                init: function(opt) {
                  (expect(typeof opt)).toEqual('object');
                  (expect(opt.foo)).toEqual('bar');
                  return done();
                },
                destroy: function() {},
                msgList: {
                  outgoing: ['0'],
                  incoming: ['1'],
                  scope: ['fooScope']
                }
              };
            };
            core.register('foo', mod);
            return core.start('foo', {
              options: {
                foo: 'bar'
              }
            });
          });
        });
        it('should call the callback function after the initialization', function(done) {
          return inject(function(core) {
            var cb, x;
            x = 0;
            cb = function() {
              (expect(x)).toBe(2);
              return done();
            };
            core.register('anId', function(sb) {
              return {
                init: function(opt, fini) {
                  setTimeout((function() {
                    x = 2;
                    return fini();
                  }), 0);
                  return x = 1;
                },
                destroy: function() {},
                msgList: {
                  outgoing: ['0'],
                  incoming: ['1'],
                  scope: ['idScope']
                }
              };
            });
            return core.start('anId', {
              callback: cb
            });
          });
        });
        it('should call the callback immediately if no callback was defined', function() {
          return inject(function(core) {
            var mod1;
            spyOn(foo, 'cb1');
            mod1 = function(sb) {
              return {
                init: function(opt) {},
                destroy: function() {},
                msgList: {
                  outgoing: ['0'],
                  incoming: ['1'],
                  scope: ['idScope']
                }
              };
            };
            (expect(core.register('anId', mod1))).toBeTruthy();
            core.start('anId', {
              callback: foo.cb1
            });
            return (expect(foo.cb1)).toHaveBeenCalled();
          });
        });
        it('should call the callback function with an error if an error occurs', function() {
          return inject(function(core) {
            var mod1;
            spyOn(foo, 'cb1');
            mod1 = function(sb) {
              return {
                init: function() {
                  foo.cb1();
                  return thisWillProduceAnError();
                },
                destroy: function() {},
                msgList: {
                  outgoing: ['a'],
                  incoming: ['b'],
                  scope: ['fooScope']
                }
              };
            };
            (expect(core.register('anId', mod1))).toBeTruthy();
            return (expect(core.start('anId', {
              callback: function(err) {
                (expect(foo.cb1)).toHaveBeenCalled();
                return (expect(err.message)).toEqual('could not start module: thisWillProduceAnError is not defined');
              }
            }))).toBeFalsy();
          });
        });
        it('should start a separate instance', function() {
          return inject(function(core) {
            var mod1;
            spyOn(foo, 'cb1');
            mod1 = function(sb) {
              return {
                init: function() {
                  return foo.cb1();
                },
                destroy: function() {},
                msgList: {
                  outgoing: ['0'],
                  incoming: ['1'],
                  scope: ['fooScope']
                }
              };
            };
            (expect(core.register('separate', mod1))).toBeTruthy();
            core.start('separate', {
              instanceId: 'instance'
            });
            return (expect(foo.cb1)).toHaveBeenCalled();
          });
        });
        it('should fire event in response to registered module according to event map', function() {
          return inject(function(core, pubSub) {
            var map, mod1;
            spyOn(foo, 'cb1');
            mod1 = function(sb) {
              return {
                init: function() {
                  sb.subscribe({
                    msg: 'b',
                    listener: function() {
                      return foo.cb1();
                    },
                    msgScope: ['anId']
                  });
                  return sb.publish({
                    msg: 'a',
                    data: '',
                    msgScope: ['anId']
                  });
                },
                destroy: function() {},
                msgList: {
                  outgoing: ['a'],
                  incoming: ['b'],
                  scope: ['anId']
                }
              };
            };
            map = [
              {
                msgFrom: 'a',
                scopeFrom: ['anId'],
                msgTo: 'b',
                scopeTo: ['anId']
              }
            ];
            core.setEventsMapping(map);
            (expect(core.register('anId', mod1))).toBeTruthy();
            return (expect(core.start('anId', {
              callback: function(err) {
                return (expect(foo.cb1)).toHaveBeenCalled();
              }
            }))).toBeTruthy();
          });
        });
        return it('should not subscribe for module messages if scope does not match module Id', function() {
          return inject(function(core, pubSub) {
            var map, mod1;
            spyOn(foo, 'cb1');
            mod1 = function(sb) {
              return {
                init: function() {
                  sb.subscribe({
                    msg: 'b',
                    listener: function() {
                      return foo.cb1();
                    },
                    msgScope: ['anId']
                  });
                  return sb.publish({
                    msg: 'a',
                    data: '',
                    msgScope: ['anId']
                  });
                },
                destroy: function() {},
                msgList: {
                  outgoing: ['a'],
                  incoming: ['b'],
                  scope: ['notAnId']
                }
              };
            };
            map = [
              {
                msgFrom: 'a',
                scopeFrom: ['anId'],
                msgTo: 'b',
                scopeTo: ['anId']
              }
            ];
            core.setEventsMapping(map);
            (expect(core.register('anId', mod1))).toBeTruthy();
            return (expect(core.start('anId', {
              callback: function(err) {
                return (expect(foo.cb1)).not.toHaveBeenCalled();
              }
            }))).toBeTruthy();
          });
        });
      });
      describe('stop function', function() {
        it('should call the callback afterwards', function(done) {
          return inject(function(core) {
            (expect(core.register(moduleId, validModule))).toBeTruthy();
            (expect(core.start(moduleId))).toBeTruthy();
            return (expect(core.stop(moduleId, done))).toBeTruthy();
          });
        });
        return it('should support synchronous stopping', function() {
          return inject(function(core) {
            var end, mod;
            mod = function(sb) {
              return {
                init: function() {},
                destroy: function() {},
                msgList: {
                  outgoing: ['0'],
                  incoming: ['1'],
                  scope: ['fooScope']
                }
              };
            };
            end = false;
            (expect(core.register(moduleId, mod))).toBeTruthy();
            (expect(core.start(moduleId))).toBeTruthy();
            (expect(core.stop(moduleId, function() {
              return end = true;
            }))).toBeTruthy();
            return (expect(end)).toEqual(true);
          });
        });
      });
      describe('startAll function', function() {
        var foo;
        foo = {};
        beforeEach(function() {
          return inject(function(core) {
            core.stopAll();
            core.unregisterAll();
            return foo = {
              cb1: function() {},
              cb2: function() {},
              cb3: function() {},
              finished: function() {}
            };
          });
        });
        it('instantiates and starts all available modules', function() {
          return inject(function(core) {
            var mod1, mod2;
            spyOn(foo, 'cb1');
            spyOn(foo, 'cb2');
            mod1 = function(sb) {
              return {
                init: function() {
                  return foo.cb1();
                },
                destroy: function() {},
                msgList: {
                  outgoing: ['0'],
                  incoming: ['1'],
                  scope: ['fooScope']
                }
              };
            };
            mod2 = function(sb) {
              return {
                init: function() {
                  return foo.cb2();
                },
                destroy: function() {},
                msgList: {
                  outgoing: ['0'],
                  incoming: ['1'],
                  scope: ['fooScope']
                }
              };
            };
            (expect(core.register('first', mod1))).toBeTruthy();
            (expect(core.register('second', mod2))).toBeTruthy();
            (expect(foo.cb1)).not.toHaveBeenCalled();
            (expect(foo.cb2)).not.toHaveBeenCalled();
            (expect(core.startAll())).toBeTruthy();
            (expect(foo.cb1)).toHaveBeenCalled();
            return (expect(foo.cb2)).toHaveBeenCalled();
          });
        });
        it('starts all modules of the passed array', function() {
          return inject(function(core) {
            var mod1, mod2, mod3;
            spyOn(foo, 'cb1');
            spyOn(foo, 'cb2');
            spyOn(foo, 'cb3');
            mod1 = function(sb) {
              return {
                init: function() {
                  return foo.cb1();
                },
                destroy: function() {},
                msgList: {
                  outgoing: ['0'],
                  incoming: ['1'],
                  scope: ['fooScope']
                }
              };
            };
            mod2 = function(sb) {
              return {
                init: function() {
                  return foo.cb2();
                },
                destroy: function() {},
                msgList: {
                  outgoing: ['0'],
                  incoming: ['1'],
                  scope: ['fooScope']
                }
              };
            };
            mod3 = function(sb) {
              return {
                init: function() {
                  return foo.cb3();
                },
                destroy: function() {},
                msgList: {
                  outgoing: ['0'],
                  incoming: ['1'],
                  scope: ['fooScope']
                }
              };
            };
            core.stopAll();
            core.unregisterAll();
            (expect(core.register('first', mod1))).toBeTruthy();
            (expect(core.register('second', mod2))).toBeTruthy();
            (expect(core.register('third', mod3))).toBeTruthy();
            (expect(foo.cb1)).not.toHaveBeenCalled();
            (expect(foo.cb2)).not.toHaveBeenCalled();
            (expect(foo.cb3)).not.toHaveBeenCalled();
            (expect(core.startAll(['first', 'third']))).toBeTruthy();
            (expect(foo.cb1)).toHaveBeenCalled();
            (expect(foo.cb2)).not.toHaveBeenCalled();
            return (expect(foo.cb3)).toHaveBeenCalled();
          });
        });
        it('calls the callback function after all modules have started', function(done) {
          return inject(function(core) {
            var async, pseudoAsync, sync;
            spyOn(foo, 'cb1');
            sync = function(sb) {
              return {
                init: function(opt) {
                  (expect(foo.cb1)).not.toHaveBeenCalled();
                  return foo.cb1();
                },
                destroy: function() {},
                msgList: {
                  outgoing: ['0'],
                  incoming: ['1'],
                  scope: ['fooScope']
                }
              };
            };
            pseudoAsync = function(sb) {
              return {
                init: function(opt) {
                  (expect(foo.cb1.calls.count())).toEqual(1);
                  return foo.cb1();
                },
                destroy: function() {},
                msgList: {
                  outgoing: ['0'],
                  incoming: ['1'],
                  scope: ['fooScope']
                }
              };
            };
            async = function(sb) {
              return {
                init: function(opt, cb) {
                  return setTimeout((function() {
                    (expect(foo.cb1.calls.count())).toEqual(2);
                    foo.cb1();
                    return done();
                  }), 0);
                },
                destroy: function() {},
                msgList: {
                  outgoing: ['0'],
                  incoming: ['1'],
                  scope: ['fooScope']
                }
              };
            };
            core.register('first', sync);
            core.register('second', async);
            core.register('third', pseudoAsync);
            return (expect(core.startAll(function() {
              (expect(foo.cb1.calls.count())).toEqual(3);
              return done();
            }))).toBeTruthy();
          });
        });
        it('calls the callback after defined modules have started', function(done) {
          return inject(function(core) {
            var mod1, mod2;
            spyOn(foo, 'finished');
            spyOn(foo, 'cb1');
            spyOn(foo, 'cb2');
            mod1 = function(sb) {
              return {
                init: function(opt, done) {
                  setTimeout((function() {
                    return done();
                  }), 0);
                  return (expect(foo.finished)).not.toHaveBeenCalled();
                },
                destroy: function() {},
                msgList: {
                  outgoing: ['0'],
                  incoming: ['1'],
                  scope: ['fooScope']
                }
              };
            };
            mod2 = function(sb) {
              return {
                init: function(opt, done) {
                  setTimeout((function() {
                    return done();
                  }), 0);
                  return (expect(foo.finished)).not.toHaveBeenCalled();
                },
                destroy: function() {},
                msgList: {
                  outgoing: ['0'],
                  incoming: ['1'],
                  scope: ['fooScope']
                }
              };
            };
            core.register('first', mod1, {
              callback: foo.cb1
            });
            core.register('second', mod2, {
              callback: foo.cb2
            });
            return (expect(core.startAll(['first', 'second'], function() {
              foo.finished();
              (expect(foo.cb1)).toHaveBeenCalled();
              (expect(foo.cb2)).toHaveBeenCalled();
              return done();
            }))).toBeTruthy();
          });
        });
        it('calls the callback with an error if one or more modules couldn\'t start', function(done) {
          return inject(function(core) {
            var mod1, mod2;
            spyOn(foo, 'cb1');
            spyOn(foo, 'cb2');
            mod1 = function(sb) {
              return {
                init: function() {
                  foo.cb1();
                  return thisIsAnInvalidMethod();
                },
                destroy: function() {},
                msgList: {
                  outgoing: ['0'],
                  incoming: ['1'],
                  scope: ['fooScope']
                }
              };
            };
            mod2 = function(sb) {
              return {
                init: function() {
                  return foo.cb2();
                },
                destroy: function() {},
                msgList: {
                  outgoing: ['0'],
                  incoming: ['1'],
                  scope: ['fooScope']
                }
              };
            };
            core.register('invalid', mod1);
            core.register('valid', mod2);
            return core.startAll(['invalid', 'valid'], function(err) {
              (expect(foo.cb1)).toHaveBeenCalled();
              (expect(foo.cb2)).toHaveBeenCalled();
              (expect(err.message)).toEqual('errors occoured in the following modules: \'invalid\'');
              return done();
            });
          });
        });
        it('calls the callback with an error if one or more modules don\'t exist', function() {
          return inject(function(core) {
            var finished, mod, mods;
            spyOn(foo, 'cb2');
            mod = function(sb) {
              return {
                init: function(opt) {
                  foo.cb2();
                  return setTimeout((function() {}), 0);
                },
                destroy: function() {},
                msgList: {
                  outgoing: ['0'],
                  incoming: ['1'],
                  scope: ['fooScope']
                }
              };
            };
            core.register('valid', validModule);
            core.register('x', mod);
            finished = function(err) {
              console.log(err);
              return (expect(err)).toEqual("these modules don't exist: 'invalid', 'y'");
            };
            mods = ['valid', 'invalid', 'x', 'y'];
            (expect(core.startAll(mods, this.finished))).toBeFalsy();
            return (expect(foo.cb2)).toHaveBeenCalled();
          });
        });
        return it('calls the callback without an error if module array is empty', function() {
          return inject(function(core) {
            var finished;
            spyOn(foo, 'cb1');
            finished = function(err) {
              (expect(err)).toEqual(null);
              return foo.cb1();
            };
            (expect(core.startAll([], finished))).toBeTruthy();
            return (expect(foo.cb1)).toHaveBeenCalled();
          });
        });
      });
      describe('stopAll function', function() {
        var foo;
        foo = {};
        beforeEach(function() {
          return inject(function(core) {
            core.stop(moduleId);
            core.unregister(moduleId);
            return foo = {
              cb1: function() {},
              cb2: function() {},
              cb3: function() {},
              finished: function() {}
            };
          });
        });
        it('should stop all running instances', function() {
          return inject(function(core) {
            var mod1;
            spyOn(foo, 'cb1');
            mod1 = function(sb) {
              return {
                init: function() {},
                destroy: function() {
                  return foo.cb1();
                },
                msgList: {
                  outgoing: ['0'],
                  incoming: ['1'],
                  scope: ['fooScope']
                }
              };
            };
            core.register(moduleId, mod1);
            core.start(moduleId, {
              instanceId: 'a'
            });
            core.start(moduleId, {
              instanceId: 'b'
            });
            (expect(core.stopAll())).toBeTruthy();
            return (expect(foo.cb1.calls.count())).toEqual(2);
          });
        });
        it('should call the callback afterwards', function(done) {
          return inject(function(core) {
            (expect(core.register(moduleId, validModule))).toBeTruthy();
            (expect(core.start(moduleId))).toBeTruthy();
            (expect(core.start(moduleId, {
              instanceId: 'valid'
            }))).toBeTruthy();
            return (expect(core.stopAll(done))).toBeTruthy();
          });
        });
        return it('should call the callback if not destroyed in a asynchronous way', function(done) {
          return inject(function(core) {
            var mod;
            spyOn(foo, 'cb1');
            mod = function(sb) {
              return {
                init: function() {},
                destroy: function() {
                  return foo.cb1();
                },
                msgList: {
                  outgoing: ['0'],
                  incoming: ['1'],
                  scope: ['fooScope']
                }
              };
            };
            (expect(core.register('syncDestroy', mod))).toBeTruthy();
            (expect(core.start('syncDestroy'))).toBeTruthy();
            (expect(core.start('syncDestroy', {
              instanceId: 'second'
            }))).toBeTruthy();
            return core.stopAll(function() {
              (expect(foo.cb1)).toHaveBeenCalled();
              return done();
            });
          });
        });
      });
      describe('setEventsMapping function', function() {
        return it('should set event map if it\'s an object', function() {
          return inject(function(core, $exceptionHandler) {
            var e, invalidMap, validMap;
            invalidMap = 5;
            validMap = [
              {
                msgFrom: '111',
                scopeFrom: ['0'],
                msgTo: '123',
                scopeTo: ['1']
              }, {
                msgFrom: '234',
                scopeFrom: ['1'],
                msgTo: '000',
                scopeTo: ['0']
              }
            ];
            try {
              core.setEventsMapping(invalidMap);
            } catch (error) {
              e = error;
              expect(e.message).toEqual('event map has to be a object');
            }
            return (expect(core.setEventsMapping(validMap))).toBeTruthy();
          });
        });
      });
      return describe('list methods', function() {
        beforeEach(function() {
          return inject(function(core) {
            core.stopAll();
            return core.register(moduleId, validModule);
          });
        });
        it('has an lsModules method', function() {
          return inject(function(core) {
            return (expect(core.lsModules())).toEqual([moduleId]);
          });
        });
        return it('has an lsInstances method', function() {
          return inject(function(core) {
            (expect(typeof core.lsInstances)).toEqual('function');
            (expect(core.lsInstances())).toEqual([]);
            (expect(core.start(moduleId))).toBeTruthy();
            (expect(core.lsInstances())).toEqual([moduleId]);
            (expect(core.start(moduleId, {
              instanceId: 'test'
            }))).toBeTruthy();
            (expect(core.lsInstances())).toEqual([moduleId, 'test']);
            (expect(core.stop(moduleId))).toBeTruthy();
            return (expect(core.lsInstances())).toEqual(['test']);
          });
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=core.spec.js.map
