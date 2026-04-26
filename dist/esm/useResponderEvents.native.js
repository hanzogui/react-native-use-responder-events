import * as React from "react";
import * as ResponderSystem from "./ResponderSystem.native.js";
export * from "./utils.native.js";
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
export { getResponderConfigIfDefined, useResponderEvents };
//# sourceMappingURL=useResponderEvents.native.js.map
