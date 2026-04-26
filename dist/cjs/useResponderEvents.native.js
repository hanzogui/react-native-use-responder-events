"use strict";

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, {
    get: all[name],
    enumerable: true
  });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
// If the importer is in node compatibility mode or this is not an ESM
// file that has been converted to a CommonJS file using a Babel-
// compatible transform (i.e. "__esModule" has not been set), then set
// "default" to the CommonJS "module.exports" for node compatibility.
isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
  value: mod,
  enumerable: true
}) : target, mod));
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: true
}), mod);
var useResponderEvents_exports = {};
__export(useResponderEvents_exports, {
  getResponderConfigIfDefined: () => getResponderConfigIfDefined,
  useResponderEvents: () => useResponderEvents
});
module.exports = __toCommonJS(useResponderEvents_exports);
var React = __toESM(require("react"), 1);
var ResponderSystem = __toESM(require("./ResponderSystem.native.js"), 1);
__reExport(useResponderEvents_exports, require("./utils.native.js"), module.exports);
var emptyObject = {};
var Attached = /* @__PURE__ */new WeakMap();
var Ids = /* @__PURE__ */new WeakMap();
function useResponderEvents(hostRef) {
  var configIn = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : emptyObject;
  var _hostRef_current;
  var config = getResponderConfigIfDefined(configIn);
  var node = (hostRef === null || hostRef === void 0 ? void 0 : (_hostRef_current = hostRef.current) === null || _hostRef_current === void 0 ? void 0 : _hostRef_current.host) || (hostRef === null || hostRef === void 0 ? void 0 : hostRef.current);
  React.useEffect(function () {
    if (config === emptyObject) return;
    ResponderSystem.attachListeners();
    if (!Ids.has(hostRef)) {
      Ids.set(hostRef, `${Math.random()}`);
    }
    var id = Ids.get(hostRef);
    ResponderSystem.addNode(id, node, config);
    Attached.set(hostRef, true);
    return function () {
      ResponderSystem.removeNode(node);
      Attached.set(hostRef, false);
    };
  }, [config, hostRef]);
  if (process.env.NODE_ENV === "development") {
    React.useDebugValue({
      isResponder: node === ResponderSystem.getResponderNode()
    });
    React.useDebugValue(config);
  }
}
function getResponderConfigIfDefined(param) {
  var {
    onMoveShouldSetResponder,
    onMoveShouldSetResponderCapture,
    onResponderEnd,
    onResponderGrant,
    onResponderMove,
    onResponderReject,
    onResponderRelease,
    onResponderStart,
    onResponderTerminate,
    onResponderTerminationRequest,
    onScrollShouldSetResponder,
    onScrollShouldSetResponderCapture,
    onSelectionChangeShouldSetResponder,
    onSelectionChangeShouldSetResponderCapture,
    onStartShouldSetResponder,
    onStartShouldSetResponderCapture
  } = param;
  return onMoveShouldSetResponder || onMoveShouldSetResponderCapture || onResponderEnd || onResponderGrant || onResponderMove || onResponderReject || onResponderRelease || onResponderStart || onResponderTerminate || onResponderTerminationRequest || onScrollShouldSetResponder || onScrollShouldSetResponderCapture || onSelectionChangeShouldSetResponder || onSelectionChangeShouldSetResponderCapture || onStartShouldSetResponder || onStartShouldSetResponderCapture ? {
    onMoveShouldSetResponder,
    onMoveShouldSetResponderCapture,
    onResponderEnd,
    onResponderGrant,
    onResponderMove,
    onResponderReject,
    onResponderRelease,
    onResponderStart,
    onResponderTerminate,
    onResponderTerminationRequest,
    onScrollShouldSetResponder,
    onScrollShouldSetResponderCapture,
    onSelectionChangeShouldSetResponder,
    onSelectionChangeShouldSetResponderCapture,
    onStartShouldSetResponder,
    onStartShouldSetResponderCapture
  } : emptyObject;
}
//# sourceMappingURL=useResponderEvents.native.js.map
