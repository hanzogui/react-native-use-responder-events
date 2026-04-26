"use strict";

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
var utils_exports = {};
__export(utils_exports, {
  canUseDOM: () => canUseDOM,
  getBoundingClientRect: () => getBoundingClientRect,
  getLowestCommonAncestor: () => getLowestCommonAncestor,
  getResponderPaths: () => getResponderPaths,
  hasTargetTouches: () => hasTargetTouches,
  hasValidSelection: () => hasValidSelection,
  isPrimaryPointerDown: () => isPrimaryPointerDown,
  isSelectionValid: () => isSelectionValid,
  setResponderId: () => setResponderId
});
module.exports = __toCommonJS(utils_exports);
var keyName = "__reactResponderId";
var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var getBoundingClientRect = function (node) {
  if (!node) return;
  if (node.nodeType !== 1) return;
  if (node.getBoundingClientRect) {
    return node.getBoundingClientRect();
  }
};
function getEventPath(domEvent) {
  if (domEvent.type === "selectionchange") {
    var _window_getSelection;
    var target = (_window_getSelection = window.getSelection()) === null || _window_getSelection === void 0 ? void 0 : _window_getSelection.anchorNode;
    return composedPathFallback(target);
  }
  var path = domEvent.composedPath != null ? domEvent.composedPath() : composedPathFallback(domEvent.target);
  return path;
}
function composedPathFallback(target) {
  var path = [];
  while (target != null && target !== document.body) {
    path.push(target);
    target = target.parentNode;
  }
  return path;
}
function getResponderId(node) {
  if (node != null) {
    return node[keyName];
  }
  return null;
}
function setResponderId(node, id) {
  if (node != null) {
    node[keyName] = id;
  }
}
function getResponderPaths(domEvent) {
  var idPath = [];
  var nodePath = [];
  var eventPath = getEventPath(domEvent);
  for (var i = 0; i < eventPath.length; i++) {
    var node = eventPath[i];
    var id = getResponderId(node);
    if (id != null) {
      idPath.push(id);
      nodePath.push(node);
    }
  }
  return {
    idPath,
    nodePath
  };
}
function getLowestCommonAncestor(pathA, pathB) {
  var pathALength = pathA.length;
  var pathBLength = pathB.length;
  if (
  // If either path is empty
  pathALength === 0 || pathBLength === 0 ||
  // If the last elements aren't the same there can't be a common ancestor
  // that is connected to the responder system
  pathA[pathALength - 1] !== pathB[pathBLength - 1]) {
    return null;
  }
  var itemA = pathA[0];
  var indexA = 0;
  var itemB = pathB[0];
  var indexB = 0;
  if (pathALength - pathBLength > 0) {
    indexA = pathALength - pathBLength;
    itemA = pathA[indexA];
    pathALength = pathBLength;
  }
  if (pathBLength - pathALength > 0) {
    indexB = pathBLength - pathALength;
    itemB = pathB[indexB];
    pathBLength = pathALength;
  }
  var depth = pathALength;
  while (depth--) {
    if (itemA === itemB) {
      return itemA;
    }
    itemA = pathA[indexA++];
    itemB = pathB[indexB++];
  }
  return null;
}
function hasTargetTouches(target, touches) {
  if (!touches || touches.length === 0) {
    return false;
  }
  for (var i = 0; i < touches.length; i++) {
    var node = touches[i].target;
    if (node != null) {
      if (target.contains(node)) {
        return true;
      }
    }
  }
  return false;
}
function hasValidSelection(domEvent) {
  if (domEvent.type === "selectionchange") {
    return isSelectionValid();
  }
  return domEvent.type === "select";
}
function isPrimaryPointerDown(domEvent) {
  var {
    altKey,
    button,
    buttons,
    ctrlKey,
    type
  } = domEvent;
  var isTouch = type === "touchstart" || type === "touchmove";
  var isPrimaryMouseDown = type === "mousedown" && (button === 0 || buttons === 1);
  var isPrimaryMouseMove = type === "mousemove" && buttons === 1;
  var noModifiers = altKey === false && ctrlKey === false;
  if (isTouch || isPrimaryMouseDown && noModifiers || isPrimaryMouseMove && noModifiers) {
    return true;
  }
  return false;
}
function isSelectionValid() {
  var selection = window.getSelection();
  if (!selection) return false;
  var string = selection.toString();
  var anchorNode = selection.anchorNode;
  var focusNode = selection.focusNode;
  var isTextNode = anchorNode && anchorNode.nodeType === window.Node.TEXT_NODE || focusNode && focusNode.nodeType === window.Node.TEXT_NODE;
  return string.length >= 1 && string !== "\n" && !!isTextNode;
}
//# sourceMappingURL=utils.native.js.map
