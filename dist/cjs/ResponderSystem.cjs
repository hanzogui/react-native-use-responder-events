var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = mod => __copyProps(__defProp({}, "__esModule", {
  value: true
}), mod);
var ResponderSystem_exports = {};
__export(ResponderSystem_exports, {
  addNode: () => addNode,
  attachListeners: () => attachListeners,
  getResponderNode: () => getResponderNode,
  removeNode: () => removeNode,
  terminateResponder: () => terminateResponder
});
module.exports = __toCommonJS(ResponderSystem_exports);
var import_createResponderEvent = require("./createResponderEvent.cjs");
var import_ResponderTouchHistoryStore = require("./ResponderTouchHistoryStore.cjs");
var import_types = require("./types.cjs");
var import_utils = require("./utils.cjs");
var import_utils2 = require("./utils.cjs");
const emptyObject = {};
const startRegistration = ["onStartShouldSetResponderCapture", "onStartShouldSetResponder", {
  bubbles: true
}];
const moveRegistration = ["onMoveShouldSetResponderCapture", "onMoveShouldSetResponder", {
  bubbles: true
}];
const scrollRegistration = ["onScrollShouldSetResponderCapture", "onScrollShouldSetResponder", {
  bubbles: false
}];
const shouldSetResponderEvents = {
  touchstart: startRegistration,
  mousedown: startRegistration,
  touchmove: moveRegistration,
  mousemove: moveRegistration,
  scroll: scrollRegistration
};
const emptyResponder = {
  id: null,
  idPath: null,
  node: null
};
const responderListenersMap = /* @__PURE__ */new Map();
let isEmulatingMouseEvents = false;
let trackedTouchCount = 0;
let currentResponder = {
  id: null,
  node: null,
  idPath: null
};
const responderTouchHistoryStore = new import_ResponderTouchHistoryStore.ResponderTouchHistoryStore();
function changeCurrentResponder(responder) {
  currentResponder = responder;
}
function getResponderConfig(id) {
  const config = responderListenersMap.get(id);
  return config != null ? config : emptyObject;
}
function eventListener(domEvent) {
  const eventType = domEvent.type;
  const eventTarget = domEvent.target;
  if (eventType === "touchstart") {
    isEmulatingMouseEvents = true;
  }
  if (eventType === "touchmove" || trackedTouchCount > 1) {
    isEmulatingMouseEvents = false;
  }
  if (
  // Ignore browser emulated mouse events
  eventType === "mousedown" && isEmulatingMouseEvents || eventType === "mousemove" && isEmulatingMouseEvents ||
  // Ignore mousemove if a mousedown didn't occur first
  eventType === "mousemove" && trackedTouchCount < 1) {
    return;
  }
  if (isEmulatingMouseEvents && eventType === "mouseup") {
    if (trackedTouchCount === 0) {
      isEmulatingMouseEvents = false;
    }
    return;
  }
  const isStartEvent = (0, import_types.isStartish)(eventType) && (0, import_utils2.isPrimaryPointerDown)(domEvent);
  const isMoveEvent = (0, import_types.isMoveish)(eventType);
  const isEndEvent = (0, import_types.isEndish)(eventType);
  const isScrollEvent = (0, import_types.isScroll)(eventType);
  const isSelectionChangeEvent = (0, import_types.isSelectionChange)(eventType);
  const responderEvent = (0, import_createResponderEvent.createResponderEvent)(domEvent, responderTouchHistoryStore);
  if (isStartEvent || isMoveEvent || isEndEvent) {
    if (domEvent.touches) {
      trackedTouchCount = domEvent.touches.length;
    } else {
      if (isStartEvent) {
        trackedTouchCount = 1;
      } else if (isEndEvent) {
        trackedTouchCount = 0;
      }
    }
    responderTouchHistoryStore.recordTouchTrack(eventType, responderEvent.nativeEvent);
  }
  let eventPaths = (0, import_utils2.getResponderPaths)(domEvent);
  let wasNegotiated = false;
  let wantsResponder;
  if (isStartEvent || isMoveEvent || isScrollEvent && trackedTouchCount > 0) {
    const currentResponderIdPath = currentResponder.idPath;
    const eventIdPath = eventPaths.idPath;
    if (currentResponderIdPath != null && eventIdPath != null) {
      const lowestCommonAncestor = (0, import_utils2.getLowestCommonAncestor)(currentResponderIdPath, eventIdPath);
      if (lowestCommonAncestor != null) {
        const indexOfLowestCommonAncestor = eventIdPath.indexOf(lowestCommonAncestor);
        const index = indexOfLowestCommonAncestor + (lowestCommonAncestor === currentResponder.id ? 1 : 0);
        eventPaths = {
          idPath: eventIdPath.slice(index),
          nodePath: eventPaths.nodePath.slice(index)
        };
      } else {
        eventPaths = null;
      }
    }
    if (eventPaths != null) {
      wantsResponder = findWantsResponder(eventPaths, domEvent, responderEvent);
      if (wantsResponder != null) {
        attemptTransfer(responderEvent, wantsResponder);
        wasNegotiated = true;
      }
    }
  }
  if (currentResponder.id != null && currentResponder.node != null) {
    const {
      id,
      node
    } = currentResponder;
    const {
      onResponderStart,
      onResponderMove,
      onResponderEnd,
      onResponderRelease,
      onResponderTerminate,
      onResponderTerminationRequest
    } = getResponderConfig(id);
    responderEvent.bubbles = false;
    responderEvent.cancelable = false;
    responderEvent.currentTarget = node;
    if (isStartEvent) {
      if (onResponderStart != null) {
        responderEvent.dispatchConfig.registrationName = "onResponderStart";
        onResponderStart(responderEvent);
      }
    } else if (isMoveEvent) {
      if (onResponderMove != null) {
        responderEvent.dispatchConfig.registrationName = "onResponderMove";
        onResponderMove(responderEvent);
      }
    } else {
      const isTerminateEvent = (0, import_types.isCancelish)(eventType) ||
      // native context menu
      eventType === "contextmenu" ||
      // window blur
      eventType === "blur" && eventTarget === window ||
      // responder (or ancestors) blur
      eventType === "blur" && eventTarget.contains(node) && domEvent.relatedTarget !== node ||
      // native scroll without using a pointer
      isScrollEvent && trackedTouchCount === 0 ||
      // native scroll on node that is parent of the responder (allow siblings to scroll)
      isScrollEvent && eventTarget.contains(node) && eventTarget !== node ||
      // native select/selectionchange on node
      isSelectionChangeEvent && (0, import_utils2.hasValidSelection)(domEvent);
      const isReleaseEvent = isEndEvent && !isTerminateEvent && !(0, import_utils2.hasTargetTouches)(node, domEvent.touches);
      if (isEndEvent) {
        if (onResponderEnd != null) {
          responderEvent.dispatchConfig.registrationName = "onResponderEnd";
          onResponderEnd(responderEvent);
        }
      }
      if (isReleaseEvent) {
        if (onResponderRelease != null) {
          responderEvent.dispatchConfig.registrationName = "onResponderRelease";
          onResponderRelease(responderEvent);
        }
        changeCurrentResponder(emptyResponder);
      }
      if (isTerminateEvent) {
        let shouldTerminate = true;
        if (eventType === "contextmenu" || eventType === "scroll" || eventType === "selectionchange") {
          if (wasNegotiated) {
            shouldTerminate = false;
          } else if (onResponderTerminationRequest != null) {
            responderEvent.dispatchConfig.registrationName = "onResponderTerminationRequest";
            if (onResponderTerminationRequest(responderEvent) === false) {
              shouldTerminate = false;
            }
          }
        }
        if (shouldTerminate) {
          if (onResponderTerminate != null) {
            responderEvent.dispatchConfig.registrationName = "onResponderTerminate";
            onResponderTerminate(responderEvent);
          }
          changeCurrentResponder(emptyResponder);
          isEmulatingMouseEvents = false;
          trackedTouchCount = 0;
        }
      }
    }
  }
}
function findWantsResponder(eventPaths, domEvent, responderEvent) {
  const shouldSetCallbacks = shouldSetResponderEvents[domEvent.type];
  if (shouldSetCallbacks != null) {
    const {
      idPath,
      nodePath
    } = eventPaths;
    const shouldSetCallbackCaptureName = shouldSetCallbacks[0];
    const shouldSetCallbackBubbleName = shouldSetCallbacks[1];
    const {
      bubbles
    } = shouldSetCallbacks[2];
    const check = (id, node, callbackName) => {
      const config = getResponderConfig(id);
      const shouldSetCallback = config[callbackName];
      if (shouldSetCallback != null) {
        responderEvent.currentTarget = node;
        if (shouldSetCallback(responderEvent) === true) {
          const prunedIdPath = idPath.slice(idPath.indexOf(id));
          return {
            id,
            node,
            idPath: prunedIdPath
          };
        }
      }
    };
    for (let i = idPath.length - 1; i >= 0; i--) {
      const id = idPath[i];
      const node = nodePath[i];
      const result = check(id, node, shouldSetCallbackCaptureName);
      if (result != null) {
        return result;
      }
      if (responderEvent.isPropagationStopped() === true) {
        return;
      }
    }
    if (bubbles) {
      for (let i = 0; i < idPath.length; i++) {
        const id = idPath[i];
        const node = nodePath[i];
        const result = check(id, node, shouldSetCallbackBubbleName);
        if (result != null) {
          return result;
        }
        if (responderEvent.isPropagationStopped() === true) {
          return;
        }
      }
    } else {
      const id = idPath[0];
      const node = nodePath[0];
      const target = domEvent.target;
      if (target === node) {
        return check(id, node, shouldSetCallbackBubbleName);
      }
    }
  }
}
function attemptTransfer(responderEvent, wantsResponder) {
  const {
    id: currentId,
    node: currentNode
  } = currentResponder;
  const {
    id,
    node
  } = wantsResponder;
  const {
    onResponderGrant,
    onResponderReject
  } = getResponderConfig(id);
  responderEvent.bubbles = false;
  responderEvent.cancelable = false;
  responderEvent.currentTarget = node;
  if (currentId == null) {
    if (onResponderGrant != null) {
      responderEvent.currentTarget = node;
      responderEvent.dispatchConfig.registrationName = "onResponderGrant";
      onResponderGrant(responderEvent);
    }
    changeCurrentResponder(wantsResponder);
  } else {
    const {
      onResponderTerminate,
      onResponderTerminationRequest
    } = getResponderConfig(currentId);
    let allowTransfer = true;
    if (onResponderTerminationRequest != null) {
      responderEvent.currentTarget = currentNode;
      responderEvent.dispatchConfig.registrationName = "onResponderTerminationRequest";
      if (onResponderTerminationRequest(responderEvent) === false) {
        allowTransfer = false;
      }
    }
    if (allowTransfer) {
      if (onResponderTerminate != null) {
        responderEvent.currentTarget = currentNode;
        responderEvent.dispatchConfig.registrationName = "onResponderTerminate";
        onResponderTerminate(responderEvent);
      }
      if (onResponderGrant != null) {
        responderEvent.currentTarget = node;
        responderEvent.dispatchConfig.registrationName = "onResponderGrant";
        onResponderGrant(responderEvent);
      }
      changeCurrentResponder(wantsResponder);
    } else {
      if (onResponderReject != null) {
        responderEvent.currentTarget = node;
        responderEvent.dispatchConfig.registrationName = "onResponderReject";
        onResponderReject(responderEvent);
      }
    }
  }
}
const documentEventsCapturePhase = ["blur", "scroll"];
const documentEventsBubblePhase = [
// mouse
"mousedown", "mousemove", "mouseup", "dragstart",
// touch
"touchstart", "touchmove", "touchend", "touchcancel",
// other
"contextmenu", "select", "selectionchange"];
const isGuiResponderActive = /* @__PURE__ */Symbol();
function attachListeners() {
  if (import_utils.canUseDOM && !window[isGuiResponderActive]) {
    window.addEventListener("blur", eventListener);
    documentEventsBubblePhase.forEach(eventType => {
      document.addEventListener(eventType, eventListener);
    });
    documentEventsCapturePhase.forEach(eventType => {
      document.addEventListener(eventType, eventListener, true);
    });
    window[isGuiResponderActive] = true;
  }
}
function addNode(id, node, config) {
  (0, import_utils2.setResponderId)(node, id);
  responderListenersMap.set(id, config);
}
function removeNode(id) {
  if (currentResponder.id === id) {
    terminateResponder();
  }
  if (responderListenersMap.has(id)) {
    responderListenersMap.delete(id);
  }
}
function terminateResponder() {
  const {
    id,
    node
  } = currentResponder;
  if (id != null && node != null) {
    const {
      onResponderTerminate
    } = getResponderConfig(id);
    if (onResponderTerminate != null) {
      const event = (0, import_createResponderEvent.createResponderEvent)({}, responderTouchHistoryStore);
      event.currentTarget = node;
      onResponderTerminate(event);
    }
    changeCurrentResponder(emptyResponder);
  }
  isEmulatingMouseEvents = false;
  trackedTouchCount = 0;
}
function getResponderNode() {
  return currentResponder.node;
}