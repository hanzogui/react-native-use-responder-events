import * as React from "react";
import * as ResponderSystem from "./ResponderSystem.mjs";
export * from "./utils.mjs";
const emptyObject = {};
const Attached = /* @__PURE__ */new WeakMap();
const Ids = /* @__PURE__ */new WeakMap();
function useResponderEvents(hostRef, configIn = emptyObject) {
  const config = getResponderConfigIfDefined(configIn);
  const node = hostRef?.current?.host || hostRef?.current;
  React.useEffect(() => {
    if (config === emptyObject) return;
    ResponderSystem.attachListeners();
    if (!Ids.has(hostRef)) {
      Ids.set(hostRef, `${Math.random()}`);
    }
    const id = Ids.get(hostRef);
    ResponderSystem.addNode(id, node, config);
    Attached.set(hostRef, true);
    return () => {
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
function getResponderConfigIfDefined({
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
}) {
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
//# sourceMappingURL=useResponderEvents.mjs.map
