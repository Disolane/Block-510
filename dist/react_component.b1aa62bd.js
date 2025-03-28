// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}
(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was latter defined
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  }
  // if clearTimeout wasn't available but was latter defined
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
};

// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function (name) {
  return [];
};
process.binding = function (name) {
  throw new Error('process.binding is not supported');
};
process.cwd = function () {
  return '/';
};
process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};
process.umask = function () {
  return 0;
};
},{}],"../node_modules/react/cjs/react.development.js":[function(require,module,exports) {
var process = require("process");
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";

"production" !== "development" && function () {
  function defineDeprecationWarning(methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        console.warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
      }
    });
  }
  function getIteratorFn(maybeIterable) {
    if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
    maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
    return "function" === typeof maybeIterable ? maybeIterable : null;
  }
  function warnNoop(publicInstance, callerName) {
    publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
    var warningKey = publicInstance + "." + callerName;
    didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, publicInstance), didWarnStateUpdateForUnmountedComponent[warningKey] = !0);
  }
  function Component(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = emptyObject;
    this.updater = updater || ReactNoopUpdateQueue;
  }
  function ComponentDummy() {}
  function PureComponent(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = emptyObject;
    this.updater = updater || ReactNoopUpdateQueue;
  }
  function testStringCoercion(value) {
    return "" + value;
  }
  function checkKeyStringCoercion(value) {
    try {
      testStringCoercion(value);
      var JSCompiler_inline_result = !1;
    } catch (e) {
      JSCompiler_inline_result = !0;
    }
    if (JSCompiler_inline_result) {
      JSCompiler_inline_result = console;
      var JSCompiler_temp_const = JSCompiler_inline_result.error;
      var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
      JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
      return testStringCoercion(value);
    }
  }
  function getComponentNameFromType(type) {
    if (null == type) return null;
    if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE$2 ? null : type.displayName || type.name || null;
    if ("string" === typeof type) return type;
    switch (type) {
      case REACT_FRAGMENT_TYPE:
        return "Fragment";
      case REACT_PORTAL_TYPE:
        return "Portal";
      case REACT_PROFILER_TYPE:
        return "Profiler";
      case REACT_STRICT_MODE_TYPE:
        return "StrictMode";
      case REACT_SUSPENSE_TYPE:
        return "Suspense";
      case REACT_SUSPENSE_LIST_TYPE:
        return "SuspenseList";
    }
    if ("object" === typeof type) switch ("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return (type.displayName || "Context") + ".Provider";
      case REACT_CONSUMER_TYPE:
        return (type._context.displayName || "Context") + ".Consumer";
      case REACT_FORWARD_REF_TYPE:
        var innerType = type.render;
        type = type.displayName;
        type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
        return type;
      case REACT_MEMO_TYPE:
        return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
      case REACT_LAZY_TYPE:
        innerType = type._payload;
        type = type._init;
        try {
          return getComponentNameFromType(type(innerType));
        } catch (x) {}
    }
    return null;
  }
  function isValidElementType(type) {
    return "string" === typeof type || "function" === typeof type || type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_OFFSCREEN_TYPE || "object" === typeof type && null !== type && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_CONSUMER_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_CLIENT_REFERENCE$1 || void 0 !== type.getModuleId) ? !0 : !1;
  }
  function disabledLog() {}
  function disableLogs() {
    if (0 === disabledDepth) {
      prevLog = console.log;
      prevInfo = console.info;
      prevWarn = console.warn;
      prevError = console.error;
      prevGroup = console.group;
      prevGroupCollapsed = console.groupCollapsed;
      prevGroupEnd = console.groupEnd;
      var props = {
        configurable: !0,
        enumerable: !0,
        value: disabledLog,
        writable: !0
      };
      Object.defineProperties(console, {
        info: props,
        log: props,
        warn: props,
        error: props,
        group: props,
        groupCollapsed: props,
        groupEnd: props
      });
    }
    disabledDepth++;
  }
  function reenableLogs() {
    disabledDepth--;
    if (0 === disabledDepth) {
      var props = {
        configurable: !0,
        enumerable: !0,
        writable: !0
      };
      Object.defineProperties(console, {
        log: assign({}, props, {
          value: prevLog
        }),
        info: assign({}, props, {
          value: prevInfo
        }),
        warn: assign({}, props, {
          value: prevWarn
        }),
        error: assign({}, props, {
          value: prevError
        }),
        group: assign({}, props, {
          value: prevGroup
        }),
        groupCollapsed: assign({}, props, {
          value: prevGroupCollapsed
        }),
        groupEnd: assign({}, props, {
          value: prevGroupEnd
        })
      });
    }
    0 > disabledDepth && console.error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
  }
  function describeBuiltInComponentFrame(name) {
    if (void 0 === prefix) try {
      throw Error();
    } catch (x) {
      var match = x.stack.trim().match(/\n( *(at )?)/);
      prefix = match && match[1] || "";
      suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
    return "\n" + prefix + name + suffix;
  }
  function describeNativeComponentFrame(fn, construct) {
    if (!fn || reentry) return "";
    var frame = componentFrameCache.get(fn);
    if (void 0 !== frame) return frame;
    reentry = !0;
    frame = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var previousDispatcher = null;
    previousDispatcher = ReactSharedInternals.H;
    ReactSharedInternals.H = null;
    disableLogs();
    try {
      var RunInRootFrame = {
        DetermineComponentFrameRoot: function () {
          try {
            if (construct) {
              var Fake = function () {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function () {
                  throw Error();
                }
              });
              if ("object" === typeof Reflect && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  var control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x$0) {
                  control = x$0;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x$1) {
                control = x$1;
              }
              (Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function () {});
            }
          } catch (sample) {
            if (sample && control && "string" === typeof sample.stack) return [sample.stack, control.stack];
          }
          return [null, null];
        }
      };
      RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var namePropDescriptor = Object.getOwnPropertyDescriptor(RunInRootFrame.DetermineComponentFrameRoot, "name");
      namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(RunInRootFrame.DetermineComponentFrameRoot, "name", {
        value: "DetermineComponentFrameRoot"
      });
      var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(),
        sampleStack = _RunInRootFrame$Deter[0],
        controlStack = _RunInRootFrame$Deter[1];
      if (sampleStack && controlStack) {
        var sampleLines = sampleStack.split("\n"),
          controlLines = controlStack.split("\n");
        for (_RunInRootFrame$Deter = namePropDescriptor = 0; namePropDescriptor < sampleLines.length && !sampleLines[namePropDescriptor].includes("DetermineComponentFrameRoot");) namePropDescriptor++;
        for (; _RunInRootFrame$Deter < controlLines.length && !controlLines[_RunInRootFrame$Deter].includes("DetermineComponentFrameRoot");) _RunInRootFrame$Deter++;
        if (namePropDescriptor === sampleLines.length || _RunInRootFrame$Deter === controlLines.length) for (namePropDescriptor = sampleLines.length - 1, _RunInRootFrame$Deter = controlLines.length - 1; 1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter && sampleLines[namePropDescriptor] !== controlLines[_RunInRootFrame$Deter];) _RunInRootFrame$Deter--;
        for (; 1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter; namePropDescriptor--, _RunInRootFrame$Deter--) if (sampleLines[namePropDescriptor] !== controlLines[_RunInRootFrame$Deter]) {
          if (1 !== namePropDescriptor || 1 !== _RunInRootFrame$Deter) {
            do if (namePropDescriptor--, _RunInRootFrame$Deter--, 0 > _RunInRootFrame$Deter || sampleLines[namePropDescriptor] !== controlLines[_RunInRootFrame$Deter]) {
              var _frame = "\n" + sampleLines[namePropDescriptor].replace(" at new ", " at ");
              fn.displayName && _frame.includes("<anonymous>") && (_frame = _frame.replace("<anonymous>", fn.displayName));
              "function" === typeof fn && componentFrameCache.set(fn, _frame);
              return _frame;
            } while (1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter);
          }
          break;
        }
      }
    } finally {
      reentry = !1, ReactSharedInternals.H = previousDispatcher, reenableLogs(), Error.prepareStackTrace = frame;
    }
    sampleLines = (sampleLines = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(sampleLines) : "";
    "function" === typeof fn && componentFrameCache.set(fn, sampleLines);
    return sampleLines;
  }
  function describeUnknownElementTypeFrameInDEV(type) {
    if (null == type) return "";
    if ("function" === typeof type) {
      var prototype = type.prototype;
      return describeNativeComponentFrame(type, !(!prototype || !prototype.isReactComponent));
    }
    if ("string" === typeof type) return describeBuiltInComponentFrame(type);
    switch (type) {
      case REACT_SUSPENSE_TYPE:
        return describeBuiltInComponentFrame("Suspense");
      case REACT_SUSPENSE_LIST_TYPE:
        return describeBuiltInComponentFrame("SuspenseList");
    }
    if ("object" === typeof type) switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        return type = describeNativeComponentFrame(type.render, !1), type;
      case REACT_MEMO_TYPE:
        return describeUnknownElementTypeFrameInDEV(type.type);
      case REACT_LAZY_TYPE:
        prototype = type._payload;
        type = type._init;
        try {
          return describeUnknownElementTypeFrameInDEV(type(prototype));
        } catch (x) {}
    }
    return "";
  }
  function getOwner() {
    var dispatcher = ReactSharedInternals.A;
    return null === dispatcher ? null : dispatcher.getOwner();
  }
  function hasValidKey(config) {
    if (hasOwnProperty.call(config, "key")) {
      var getter = Object.getOwnPropertyDescriptor(config, "key").get;
      if (getter && getter.isReactWarning) return !1;
    }
    return void 0 !== config.key;
  }
  function defineKeyPropWarningGetter(props, displayName) {
    function warnAboutAccessingKey() {
      specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
    }
    warnAboutAccessingKey.isReactWarning = !0;
    Object.defineProperty(props, "key", {
      get: warnAboutAccessingKey,
      configurable: !0
    });
  }
  function elementRefGetterWithDeprecationWarning() {
    var componentName = getComponentNameFromType(this.type);
    didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
    componentName = this.props.ref;
    return void 0 !== componentName ? componentName : null;
  }
  function ReactElement(type, key, self, source, owner, props) {
    self = props.ref;
    type = {
      $$typeof: REACT_ELEMENT_TYPE,
      type: type,
      key: key,
      props: props,
      _owner: owner
    };
    null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
      enumerable: !1,
      get: elementRefGetterWithDeprecationWarning
    }) : Object.defineProperty(type, "ref", {
      enumerable: !1,
      value: null
    });
    type._store = {};
    Object.defineProperty(type._store, "validated", {
      configurable: !1,
      enumerable: !1,
      writable: !0,
      value: 0
    });
    Object.defineProperty(type, "_debugInfo", {
      configurable: !1,
      enumerable: !1,
      writable: !0,
      value: null
    });
    Object.freeze && (Object.freeze(type.props), Object.freeze(type));
    return type;
  }
  function cloneAndReplaceKey(oldElement, newKey) {
    newKey = ReactElement(oldElement.type, newKey, void 0, void 0, oldElement._owner, oldElement.props);
    newKey._store.validated = oldElement._store.validated;
    return newKey;
  }
  function validateChildKeys(node, parentType) {
    if ("object" === typeof node && node && node.$$typeof !== REACT_CLIENT_REFERENCE) if (isArrayImpl(node)) for (var i = 0; i < node.length; i++) {
      var child = node[i];
      isValidElement(child) && validateExplicitKey(child, parentType);
    } else if (isValidElement(node)) node._store && (node._store.validated = 1);else if (i = getIteratorFn(node), "function" === typeof i && i !== node.entries && (i = i.call(node), i !== node)) for (; !(node = i.next()).done;) isValidElement(node.value) && validateExplicitKey(node.value, parentType);
  }
  function isValidElement(object) {
    return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  function validateExplicitKey(element, parentType) {
    if (element._store && !element._store.validated && null == element.key && (element._store.validated = 1, parentType = getCurrentComponentErrorInfo(parentType), !ownerHasKeyUseWarning[parentType])) {
      ownerHasKeyUseWarning[parentType] = !0;
      var childOwner = "";
      element && null != element._owner && element._owner !== getOwner() && (childOwner = null, "number" === typeof element._owner.tag ? childOwner = getComponentNameFromType(element._owner.type) : "string" === typeof element._owner.name && (childOwner = element._owner.name), childOwner = " It was passed a child from " + childOwner + ".");
      var prevGetCurrentStack = ReactSharedInternals.getCurrentStack;
      ReactSharedInternals.getCurrentStack = function () {
        var stack = describeUnknownElementTypeFrameInDEV(element.type);
        prevGetCurrentStack && (stack += prevGetCurrentStack() || "");
        return stack;
      };
      console.error('Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.', parentType, childOwner);
      ReactSharedInternals.getCurrentStack = prevGetCurrentStack;
    }
  }
  function getCurrentComponentErrorInfo(parentType) {
    var info = "",
      owner = getOwner();
    owner && (owner = getComponentNameFromType(owner.type)) && (info = "\n\nCheck the render method of `" + owner + "`.");
    info || (parentType = getComponentNameFromType(parentType)) && (info = "\n\nCheck the top-level render call using <" + parentType + ">.");
    return info;
  }
  function escape(key) {
    var escaperLookup = {
      "=": "=0",
      ":": "=2"
    };
    return "$" + key.replace(/[=:]/g, function (match) {
      return escaperLookup[match];
    });
  }
  function getElementKey(element, index) {
    return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
  }
  function noop$1() {}
  function resolveThenable(thenable) {
    switch (thenable.status) {
      case "fulfilled":
        return thenable.value;
      case "rejected":
        throw thenable.reason;
      default:
        switch ("string" === typeof thenable.status ? thenable.then(noop$1, noop$1) : (thenable.status = "pending", thenable.then(function (fulfilledValue) {
          "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
        }, function (error) {
          "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
        })), thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenable.reason;
        }
    }
    throw thenable;
  }
  function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
    var type = typeof children;
    if ("undefined" === type || "boolean" === type) children = null;
    var invokeCallback = !1;
    if (null === children) invokeCallback = !0;else switch (type) {
      case "bigint":
      case "string":
      case "number":
        invokeCallback = !0;
        break;
      case "object":
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = !0;
            break;
          case REACT_LAZY_TYPE:
            return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
        }
    }
    if (invokeCallback) {
      invokeCallback = children;
      callback = callback(invokeCallback);
      var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
      isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function (c) {
        return c;
      })) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + childKey), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
      return 1;
    }
    invokeCallback = 0;
    childKey = "" === nameSoFar ? "." : nameSoFar + ":";
    if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);else if (i = getIteratorFn(children), "function" === typeof i) for (i === children.entries && (didWarnAboutMaps || console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), didWarnAboutMaps = !0), children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);else if ("object" === type) {
      if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
      array = String(children);
      throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
    }
    return invokeCallback;
  }
  function mapChildren(children, func, context) {
    if (null == children) return children;
    var result = [],
      count = 0;
    mapIntoArray(children, result, "", "", function (child) {
      return func.call(context, child, count++);
    });
    return result;
  }
  function lazyInitializer(payload) {
    if (-1 === payload._status) {
      var ctor = payload._result;
      ctor = ctor();
      ctor.then(function (moduleObject) {
        if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject;
      }, function (error) {
        if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error;
      });
      -1 === payload._status && (payload._status = 0, payload._result = ctor);
    }
    if (1 === payload._status) return ctor = payload._result, void 0 === ctor && console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", ctor), "default" in ctor || console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", ctor), ctor.default;
    throw payload._result;
  }
  function resolveDispatcher() {
    var dispatcher = ReactSharedInternals.H;
    null === dispatcher && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
    return dispatcher;
  }
  function noop() {}
  function enqueueTask(task) {
    if (null === enqueueTaskImpl) try {
      var requireString = ("require" + Math.random()).slice(0, 7);
      enqueueTaskImpl = (module && module[requireString]).call(module, "timers").setImmediate;
    } catch (_err) {
      enqueueTaskImpl = function (callback) {
        !1 === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = !0, "undefined" === typeof MessageChannel && console.error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
        var channel = new MessageChannel();
        channel.port1.onmessage = callback;
        channel.port2.postMessage(void 0);
      };
    }
    return enqueueTaskImpl(task);
  }
  function aggregateErrors(errors) {
    return 1 < errors.length && "function" === typeof AggregateError ? new AggregateError(errors) : errors[0];
  }
  function popActScope(prevActQueue, prevActScopeDepth) {
    prevActScopeDepth !== actScopeDepth - 1 && console.error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
    actScopeDepth = prevActScopeDepth;
  }
  function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
    var queue = ReactSharedInternals.actQueue;
    if (null !== queue) if (0 !== queue.length) try {
      flushActQueue(queue);
      enqueueTask(function () {
        return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
      });
      return;
    } catch (error) {
      ReactSharedInternals.thrownErrors.push(error);
    } else ReactSharedInternals.actQueue = null;
    0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
  }
  function flushActQueue(queue) {
    if (!isFlushing) {
      isFlushing = !0;
      var i = 0;
      try {
        for (; i < queue.length; i++) {
          var callback = queue[i];
          do {
            ReactSharedInternals.didUsePromise = !1;
            var continuation = callback(!1);
            if (null !== continuation) {
              if (ReactSharedInternals.didUsePromise) {
                queue[i] = callback;
                queue.splice(0, i);
                return;
              }
              callback = continuation;
            } else break;
          } while (1);
        }
        queue.length = 0;
      } catch (error) {
        queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
      } finally {
        isFlushing = !1;
      }
    }
  }
  "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
  var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
    REACT_PORTAL_TYPE = Symbol.for("react.portal"),
    REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
    REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
    REACT_PROFILER_TYPE = Symbol.for("react.profiler");
  Symbol.for("react.provider");
  var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
    REACT_CONTEXT_TYPE = Symbol.for("react.context"),
    REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
    REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
    REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
    REACT_MEMO_TYPE = Symbol.for("react.memo"),
    REACT_LAZY_TYPE = Symbol.for("react.lazy"),
    REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen"),
    MAYBE_ITERATOR_SYMBOL = Symbol.iterator,
    didWarnStateUpdateForUnmountedComponent = {},
    ReactNoopUpdateQueue = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function (publicInstance) {
        warnNoop(publicInstance, "forceUpdate");
      },
      enqueueReplaceState: function (publicInstance) {
        warnNoop(publicInstance, "replaceState");
      },
      enqueueSetState: function (publicInstance) {
        warnNoop(publicInstance, "setState");
      }
    },
    assign = Object.assign,
    emptyObject = {};
  Object.freeze(emptyObject);
  Component.prototype.isReactComponent = {};
  Component.prototype.setState = function (partialState, callback) {
    if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, partialState, callback, "setState");
  };
  Component.prototype.forceUpdate = function (callback) {
    this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
  };
  var deprecatedAPIs = {
      isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
      replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
    },
    fnName;
  for (fnName in deprecatedAPIs) deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
  ComponentDummy.prototype = Component.prototype;
  deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
  deprecatedAPIs.constructor = PureComponent;
  assign(deprecatedAPIs, Component.prototype);
  deprecatedAPIs.isPureReactComponent = !0;
  var isArrayImpl = Array.isArray,
    REACT_CLIENT_REFERENCE$2 = Symbol.for("react.client.reference"),
    ReactSharedInternals = {
      H: null,
      A: null,
      T: null,
      S: null,
      actQueue: null,
      isBatchingLegacy: !1,
      didScheduleLegacyUpdate: !1,
      didUsePromise: !1,
      thrownErrors: [],
      getCurrentStack: null
    },
    hasOwnProperty = Object.prototype.hasOwnProperty,
    REACT_CLIENT_REFERENCE$1 = Symbol.for("react.client.reference"),
    disabledDepth = 0,
    prevLog,
    prevInfo,
    prevWarn,
    prevError,
    prevGroup,
    prevGroupCollapsed,
    prevGroupEnd;
  disabledLog.__reactDisabledLog = !0;
  var prefix,
    suffix,
    reentry = !1;
  var componentFrameCache = new ("function" === typeof WeakMap ? WeakMap : Map)();
  var REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"),
    specialPropKeyWarningShown,
    didWarnAboutOldJSXRuntime;
  var didWarnAboutElementRef = {};
  var ownerHasKeyUseWarning = {},
    didWarnAboutMaps = !1,
    userProvidedKeyEscapeRegex = /\/+/g,
    reportGlobalError = "function" === typeof reportError ? reportError : function (error) {
      if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
        var event = new window.ErrorEvent("error", {
          bubbles: !0,
          cancelable: !0,
          message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
          error: error
        });
        if (!window.dispatchEvent(event)) return;
      } else if ("object" === typeof process && "function" === typeof process.emit) {
        process.emit("uncaughtException", error);
        return;
      }
      console.error(error);
    },
    didWarnAboutMessageChannel = !1,
    enqueueTaskImpl = null,
    actScopeDepth = 0,
    didWarnNoAwaitAct = !1,
    isFlushing = !1,
    queueSeveralMicrotasks = "function" === typeof queueMicrotask ? function (callback) {
      queueMicrotask(function () {
        return queueMicrotask(callback);
      });
    } : enqueueTask;
  exports.Children = {
    map: mapChildren,
    forEach: function (children, forEachFunc, forEachContext) {
      mapChildren(children, function () {
        forEachFunc.apply(this, arguments);
      }, forEachContext);
    },
    count: function (children) {
      var n = 0;
      mapChildren(children, function () {
        n++;
      });
      return n;
    },
    toArray: function (children) {
      return mapChildren(children, function (child) {
        return child;
      }) || [];
    },
    only: function (children) {
      if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
      return children;
    }
  };
  exports.Component = Component;
  exports.Fragment = REACT_FRAGMENT_TYPE;
  exports.Profiler = REACT_PROFILER_TYPE;
  exports.PureComponent = PureComponent;
  exports.StrictMode = REACT_STRICT_MODE_TYPE;
  exports.Suspense = REACT_SUSPENSE_TYPE;
  exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
  exports.act = function (callback) {
    var prevActQueue = ReactSharedInternals.actQueue,
      prevActScopeDepth = actScopeDepth;
    actScopeDepth++;
    var queue = ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : [],
      didAwaitActCall = !1;
    try {
      var result = callback();
    } catch (error) {
      ReactSharedInternals.thrownErrors.push(error);
    }
    if (0 < ReactSharedInternals.thrownErrors.length) throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
    if (null !== result && "object" === typeof result && "function" === typeof result.then) {
      var thenable = result;
      queueSeveralMicrotasks(function () {
        didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = !0, console.error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
      });
      return {
        then: function (resolve, reject) {
          didAwaitActCall = !0;
          thenable.then(function (returnValue) {
            popActScope(prevActQueue, prevActScopeDepth);
            if (0 === prevActScopeDepth) {
              try {
                flushActQueue(queue), enqueueTask(function () {
                  return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                });
              } catch (error$2) {
                ReactSharedInternals.thrownErrors.push(error$2);
              }
              if (0 < ReactSharedInternals.thrownErrors.length) {
                var _thrownError = aggregateErrors(ReactSharedInternals.thrownErrors);
                ReactSharedInternals.thrownErrors.length = 0;
                reject(_thrownError);
              }
            } else resolve(returnValue);
          }, function (error) {
            popActScope(prevActQueue, prevActScopeDepth);
            0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
          });
        }
      };
    }
    var returnValue$jscomp$0 = result;
    popActScope(prevActQueue, prevActScopeDepth);
    0 === prevActScopeDepth && (flushActQueue(queue), 0 !== queue.length && queueSeveralMicrotasks(function () {
      didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = !0, console.error("A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"));
    }), ReactSharedInternals.actQueue = null);
    if (0 < ReactSharedInternals.thrownErrors.length) throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
    return {
      then: function (resolve, reject) {
        didAwaitActCall = !0;
        0 === prevActScopeDepth ? (ReactSharedInternals.actQueue = queue, enqueueTask(function () {
          return recursivelyFlushAsyncActWork(returnValue$jscomp$0, resolve, reject);
        })) : resolve(returnValue$jscomp$0);
      }
    };
  };
  exports.cache = function (fn) {
    return function () {
      return fn.apply(null, arguments);
    };
  };
  exports.cloneElement = function (element, config, children) {
    if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
    var props = assign({}, element.props),
      key = element.key,
      owner = element._owner;
    if (null != config) {
      var JSCompiler_inline_result;
      a: {
        if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(config, "ref").get) && JSCompiler_inline_result.isReactWarning) {
          JSCompiler_inline_result = !1;
          break a;
        }
        JSCompiler_inline_result = void 0 !== config.ref;
      }
      JSCompiler_inline_result && (owner = getOwner());
      hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
      for (propName in config) !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
    }
    var propName = arguments.length - 2;
    if (1 === propName) props.children = children;else if (1 < propName) {
      JSCompiler_inline_result = Array(propName);
      for (var i = 0; i < propName; i++) JSCompiler_inline_result[i] = arguments[i + 2];
      props.children = JSCompiler_inline_result;
    }
    props = ReactElement(element.type, key, void 0, void 0, owner, props);
    for (key = 2; key < arguments.length; key++) validateChildKeys(arguments[key], props.type);
    return props;
  };
  exports.createContext = function (defaultValue) {
    defaultValue = {
      $$typeof: REACT_CONTEXT_TYPE,
      _currentValue: defaultValue,
      _currentValue2: defaultValue,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    };
    defaultValue.Provider = defaultValue;
    defaultValue.Consumer = {
      $$typeof: REACT_CONSUMER_TYPE,
      _context: defaultValue
    };
    defaultValue._currentRenderer = null;
    defaultValue._currentRenderer2 = null;
    return defaultValue;
  };
  exports.createElement = function (type, config, children) {
    if (isValidElementType(type)) for (var i = 2; i < arguments.length; i++) validateChildKeys(arguments[i], type);else {
      i = "";
      if (void 0 === type || "object" === typeof type && null !== type && 0 === Object.keys(type).length) i += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
      if (null === type) var typeString = "null";else isArrayImpl(type) ? typeString = "array" : void 0 !== type && type.$$typeof === REACT_ELEMENT_TYPE ? (typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />", i = " Did you accidentally export a JSX literal instead of a component?") : typeString = typeof type;
      console.error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, i);
    }
    var propName;
    i = {};
    typeString = null;
    if (null != config) for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = !0, console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")), hasValidKey(config) && (checkKeyStringCoercion(config.key), typeString = "" + config.key), config) hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
    var childrenLength = arguments.length - 2;
    if (1 === childrenLength) i.children = children;else if (1 < childrenLength) {
      for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++) childArray[_i] = arguments[_i + 2];
      Object.freeze && Object.freeze(childArray);
      i.children = childArray;
    }
    if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === i[propName] && (i[propName] = childrenLength[propName]);
    typeString && defineKeyPropWarningGetter(i, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
    return ReactElement(type, typeString, void 0, void 0, getOwner(), i);
  };
  exports.createRef = function () {
    var refObject = {
      current: null
    };
    Object.seal(refObject);
    return refObject;
  };
  exports.forwardRef = function (render) {
    null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : "function" !== typeof render ? console.error("forwardRef requires a render function but was given %s.", null === render ? "null" : typeof render) : 0 !== render.length && 2 !== render.length && console.error("forwardRef render functions accept exactly two parameters: props and ref. %s", 1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
    null != render && null != render.defaultProps && console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");
    var elementType = {
        $$typeof: REACT_FORWARD_REF_TYPE,
        render: render
      },
      ownName;
    Object.defineProperty(elementType, "displayName", {
      enumerable: !1,
      configurable: !0,
      get: function () {
        return ownName;
      },
      set: function (name) {
        ownName = name;
        render.name || render.displayName || (Object.defineProperty(render, "name", {
          value: name
        }), render.displayName = name);
      }
    });
    return elementType;
  };
  exports.isValidElement = isValidElement;
  exports.lazy = function (ctor) {
    return {
      $$typeof: REACT_LAZY_TYPE,
      _payload: {
        _status: -1,
        _result: ctor
      },
      _init: lazyInitializer
    };
  };
  exports.memo = function (type, compare) {
    isValidElementType(type) || console.error("memo: The first argument must be a component. Instead received: %s", null === type ? "null" : typeof type);
    compare = {
      $$typeof: REACT_MEMO_TYPE,
      type: type,
      compare: void 0 === compare ? null : compare
    };
    var ownName;
    Object.defineProperty(compare, "displayName", {
      enumerable: !1,
      configurable: !0,
      get: function () {
        return ownName;
      },
      set: function (name) {
        ownName = name;
        type.name || type.displayName || (Object.defineProperty(type, "name", {
          value: name
        }), type.displayName = name);
      }
    });
    return compare;
  };
  exports.startTransition = function (scope) {
    var prevTransition = ReactSharedInternals.T,
      currentTransition = {};
    ReactSharedInternals.T = currentTransition;
    currentTransition._updatedFibers = new Set();
    try {
      var returnValue = scope(),
        onStartTransitionFinish = ReactSharedInternals.S;
      null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
      "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
    } catch (error) {
      reportGlobalError(error);
    } finally {
      null === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.")), ReactSharedInternals.T = prevTransition;
    }
  };
  exports.unstable_useCacheRefresh = function () {
    return resolveDispatcher().useCacheRefresh();
  };
  exports.use = function (usable) {
    return resolveDispatcher().use(usable);
  };
  exports.useActionState = function (action, initialState, permalink) {
    return resolveDispatcher().useActionState(action, initialState, permalink);
  };
  exports.useCallback = function (callback, deps) {
    return resolveDispatcher().useCallback(callback, deps);
  };
  exports.useContext = function (Context) {
    var dispatcher = resolveDispatcher();
    Context.$$typeof === REACT_CONSUMER_TYPE && console.error("Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?");
    return dispatcher.useContext(Context);
  };
  exports.useDebugValue = function (value, formatterFn) {
    return resolveDispatcher().useDebugValue(value, formatterFn);
  };
  exports.useDeferredValue = function (value, initialValue) {
    return resolveDispatcher().useDeferredValue(value, initialValue);
  };
  exports.useEffect = function (create, deps) {
    return resolveDispatcher().useEffect(create, deps);
  };
  exports.useId = function () {
    return resolveDispatcher().useId();
  };
  exports.useImperativeHandle = function (ref, create, deps) {
    return resolveDispatcher().useImperativeHandle(ref, create, deps);
  };
  exports.useInsertionEffect = function (create, deps) {
    return resolveDispatcher().useInsertionEffect(create, deps);
  };
  exports.useLayoutEffect = function (create, deps) {
    return resolveDispatcher().useLayoutEffect(create, deps);
  };
  exports.useMemo = function (create, deps) {
    return resolveDispatcher().useMemo(create, deps);
  };
  exports.useOptimistic = function (passthrough, reducer) {
    return resolveDispatcher().useOptimistic(passthrough, reducer);
  };
  exports.useReducer = function (reducer, initialArg, init) {
    return resolveDispatcher().useReducer(reducer, initialArg, init);
  };
  exports.useRef = function (initialValue) {
    return resolveDispatcher().useRef(initialValue);
  };
  exports.useState = function (initialState) {
    return resolveDispatcher().useState(initialState);
  };
  exports.useSyncExternalStore = function (subscribe, getSnapshot, getServerSnapshot) {
    return resolveDispatcher().useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  };
  exports.useTransition = function () {
    return resolveDispatcher().useTransition();
  };
  exports.version = "19.0.0";
  "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
}();
},{"process":"../node_modules/process/browser.js"}],"../node_modules/react/index.js":[function(require,module,exports) {
'use strict';

if ("development" === 'production') {
  module.exports = require('./cjs/react.production.js');
} else {
  module.exports = require('./cjs/react.development.js');
}
},{"./cjs/react.development.js":"../node_modules/react/cjs/react.development.js"}],"../node_modules/react-dom/cjs/react-dom.development.js":[function(require,module,exports) {
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

"use strict";

"production" !== "development" && function () {
  function noop() {}
  function testStringCoercion(value) {
    return "" + value;
  }
  function createPortal$1(children, containerInfo, implementation) {
    var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    try {
      testStringCoercion(key);
      var JSCompiler_inline_result = !1;
    } catch (e) {
      JSCompiler_inline_result = !0;
    }
    JSCompiler_inline_result && (console.error("The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", "function" === typeof Symbol && Symbol.toStringTag && key[Symbol.toStringTag] || key.constructor.name || "Object"), testStringCoercion(key));
    return {
      $$typeof: REACT_PORTAL_TYPE,
      key: null == key ? null : "" + key,
      children: children,
      containerInfo: containerInfo,
      implementation: implementation
    };
  }
  function getCrossOriginStringAs(as, input) {
    if ("font" === as) return "";
    if ("string" === typeof input) return "use-credentials" === input ? input : "";
  }
  function getValueDescriptorExpectingObjectForWarning(thing) {
    return null === thing ? "`null`" : void 0 === thing ? "`undefined`" : "" === thing ? "an empty string" : 'something with type "' + typeof thing + '"';
  }
  function getValueDescriptorExpectingEnumForWarning(thing) {
    return null === thing ? "`null`" : void 0 === thing ? "`undefined`" : "" === thing ? "an empty string" : "string" === typeof thing ? JSON.stringify(thing) : "number" === typeof thing ? "`" + thing + "`" : 'something with type "' + typeof thing + '"';
  }
  function resolveDispatcher() {
    var dispatcher = ReactSharedInternals.H;
    null === dispatcher && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
    return dispatcher;
  }
  "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
  var React = require("react"),
    Internals = {
      d: {
        f: noop,
        r: function () {
          throw Error("Invalid form element. requestFormReset must be passed a form that was rendered by React.");
        },
        D: noop,
        C: noop,
        L: noop,
        m: noop,
        X: noop,
        S: noop,
        M: noop
      },
      p: 0,
      findDOMNode: null
    },
    REACT_PORTAL_TYPE = Symbol.for("react.portal"),
    ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  "function" === typeof Map && null != Map.prototype && "function" === typeof Map.prototype.forEach && "function" === typeof Set && null != Set.prototype && "function" === typeof Set.prototype.clear && "function" === typeof Set.prototype.forEach || console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
  exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
  exports.createPortal = function (children, container) {
    var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
    if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType) throw Error("Target container is not a DOM element.");
    return createPortal$1(children, container, null, key);
  };
  exports.flushSync = function (fn) {
    var previousTransition = ReactSharedInternals.T,
      previousUpdatePriority = Internals.p;
    try {
      if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
    } finally {
      ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f() && console.error("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.");
    }
  };
  exports.preconnect = function (href, options) {
    "string" === typeof href && href ? null != options && "object" !== typeof options ? console.error("ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.", getValueDescriptorExpectingEnumForWarning(options)) : null != options && "string" !== typeof options.crossOrigin && console.error("ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.", getValueDescriptorExpectingObjectForWarning(options.crossOrigin)) : console.error("ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", getValueDescriptorExpectingObjectForWarning(href));
    "string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
  };
  exports.prefetchDNS = function (href) {
    if ("string" !== typeof href || !href) console.error("ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", getValueDescriptorExpectingObjectForWarning(href));else if (1 < arguments.length) {
      var options = arguments[1];
      "object" === typeof options && options.hasOwnProperty("crossOrigin") ? console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", getValueDescriptorExpectingEnumForWarning(options)) : console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", getValueDescriptorExpectingEnumForWarning(options));
    }
    "string" === typeof href && Internals.d.D(href);
  };
  exports.preinit = function (href, options) {
    "string" === typeof href && href ? null == options || "object" !== typeof options ? console.error("ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.", getValueDescriptorExpectingEnumForWarning(options)) : "style" !== options.as && "script" !== options.as && console.error('ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are "style" and "script".', getValueDescriptorExpectingEnumForWarning(options.as)) : console.error("ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", getValueDescriptorExpectingObjectForWarning(href));
    if ("string" === typeof href && options && "string" === typeof options.as) {
      var as = options.as,
        crossOrigin = getCrossOriginStringAs(as, options.crossOrigin),
        integrity = "string" === typeof options.integrity ? options.integrity : void 0,
        fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
      "style" === as ? Internals.d.S(href, "string" === typeof options.precedence ? options.precedence : void 0, {
        crossOrigin: crossOrigin,
        integrity: integrity,
        fetchPriority: fetchPriority
      }) : "script" === as && Internals.d.X(href, {
        crossOrigin: crossOrigin,
        integrity: integrity,
        fetchPriority: fetchPriority,
        nonce: "string" === typeof options.nonce ? options.nonce : void 0
      });
    }
  };
  exports.preinitModule = function (href, options) {
    var encountered = "";
    "string" === typeof href && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
    void 0 !== options && "object" !== typeof options ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : options && "as" in options && "script" !== options.as && (encountered += " The `as` option encountered was " + getValueDescriptorExpectingEnumForWarning(options.as) + ".");
    if (encountered) console.error("ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s", encountered);else switch (encountered = options && "string" === typeof options.as ? options.as : "script", encountered) {
      case "script":
        break;
      default:
        encountered = getValueDescriptorExpectingEnumForWarning(encountered), console.error('ReactDOM.preinitModule(): Currently the only supported "as" type for this function is "script" but received "%s" instead. This warning was generated for `href` "%s". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)', encountered, href);
    }
    if ("string" === typeof href) if ("object" === typeof options && null !== options) {
      if (null == options.as || "script" === options.as) encountered = getCrossOriginStringAs(options.as, options.crossOrigin), Internals.d.M(href, {
        crossOrigin: encountered,
        integrity: "string" === typeof options.integrity ? options.integrity : void 0,
        nonce: "string" === typeof options.nonce ? options.nonce : void 0
      });
    } else null == options && Internals.d.M(href);
  };
  exports.preload = function (href, options) {
    var encountered = "";
    "string" === typeof href && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
    null == options || "object" !== typeof options ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : "string" === typeof options.as && options.as || (encountered += " The `as` option encountered was " + getValueDescriptorExpectingObjectForWarning(options.as) + ".");
    encountered && console.error('ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel="preload" as="..." />` tag.%s', encountered);
    if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
      encountered = options.as;
      var crossOrigin = getCrossOriginStringAs(encountered, options.crossOrigin);
      Internals.d.L(href, encountered, {
        crossOrigin: crossOrigin,
        integrity: "string" === typeof options.integrity ? options.integrity : void 0,
        nonce: "string" === typeof options.nonce ? options.nonce : void 0,
        type: "string" === typeof options.type ? options.type : void 0,
        fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
        referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
        imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
        imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
        media: "string" === typeof options.media ? options.media : void 0
      });
    }
  };
  exports.preloadModule = function (href, options) {
    var encountered = "";
    "string" === typeof href && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
    void 0 !== options && "object" !== typeof options ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : options && "as" in options && "string" !== typeof options.as && (encountered += " The `as` option encountered was " + getValueDescriptorExpectingObjectForWarning(options.as) + ".");
    encountered && console.error('ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel="modulepreload" as="..." />` tag.%s', encountered);
    "string" === typeof href && (options ? (encountered = getCrossOriginStringAs(options.as, options.crossOrigin), Internals.d.m(href, {
      as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
      crossOrigin: encountered,
      integrity: "string" === typeof options.integrity ? options.integrity : void 0
    })) : Internals.d.m(href));
  };
  exports.requestFormReset = function (form) {
    Internals.d.r(form);
  };
  exports.unstable_batchedUpdates = function (fn, a) {
    return fn(a);
  };
  exports.useFormState = function (action, initialState, permalink) {
    return resolveDispatcher().useFormState(action, initialState, permalink);
  };
  exports.useFormStatus = function () {
    return resolveDispatcher().useHostTransitionStatus();
  };
  exports.version = "19.0.0";
  "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
}();
},{"react":"../node_modules/react/index.js"}],"../node_modules/react-dom/index.js":[function(require,module,exports) {
'use strict';

function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') {
    return;
  }
  if ("development" !== 'production') {
    // This branch is unreachable because this function is only called
    // in production, but the condition is true only in development.
    // Therefore if the branch is still here, dead code elimination wasn't
    // properly applied.
    // Don't change the message. React DevTools relies on it. Also make sure
    // this message doesn't occur elsewhere in this function, or it will cause
    // a false positive.
    throw new Error('^_^');
  }
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}
if ("development" === 'production') {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = require('./cjs/react-dom.production.js');
} else {
  module.exports = require('./cjs/react-dom.development.js');
}
},{"./cjs/react-dom.development.js":"../node_modules/react-dom/cjs/react-dom.development.js"}],"react_component.js":[function(require,module,exports) {
"use strict";

var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Counter() {
  return /*#__PURE__*/_react.default.createElement("div", null, "\u0421\u0447\u0451\u0442\u0447\u0438\u043A: 0");
}
_reactDom.default.render(/*#__PURE__*/_react.default.createElement(Counter, null), document.getElementById('react-container'));
},{"react":"../node_modules/react/index.js","react-dom":"../node_modules/react-dom/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54702" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","react_component.js"], null)
//# sourceMappingURL=/react_component.b1aa62bd.js.map