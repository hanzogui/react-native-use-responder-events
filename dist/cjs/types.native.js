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
var types_exports = {};
__export(types_exports, {
  BLUR: () => BLUR,
  CONTEXT_MENU: () => CONTEXT_MENU,
  FOCUS_OUT: () => FOCUS_OUT,
  MOUSE_CANCEL: () => MOUSE_CANCEL,
  MOUSE_DOWN: () => MOUSE_DOWN,
  MOUSE_MOVE: () => MOUSE_MOVE,
  MOUSE_UP: () => MOUSE_UP,
  SCROLL: () => SCROLL,
  SELECT: () => SELECT,
  SELECTION_CHANGE: () => SELECTION_CHANGE,
  TOUCH_CANCEL: () => TOUCH_CANCEL,
  TOUCH_END: () => TOUCH_END,
  TOUCH_MOVE: () => TOUCH_MOVE,
  TOUCH_START: () => TOUCH_START,
  isCancelish: () => isCancelish,
  isEndish: () => isEndish,
  isMoveish: () => isMoveish,
  isScroll: () => isScroll,
  isSelectionChange: () => isSelectionChange,
  isStartish: () => isStartish
});
module.exports = __toCommonJS(types_exports);
var BLUR = "blur";
var CONTEXT_MENU = "contextmenu";
var FOCUS_OUT = "focusout";
var MOUSE_DOWN = "mousedown";
var MOUSE_MOVE = "mousemove";
var MOUSE_UP = "mouseup";
var MOUSE_CANCEL = "dragstart";
var TOUCH_START = "touchstart";
var TOUCH_MOVE = "touchmove";
var TOUCH_END = "touchend";
var TOUCH_CANCEL = "touchcancel";
var SCROLL = "scroll";
var SELECT = "select";
var SELECTION_CHANGE = "selectionchange";
function isStartish(eventType) {
  return eventType === TOUCH_START || eventType === MOUSE_DOWN;
}
function isMoveish(eventType) {
  return eventType === TOUCH_MOVE || eventType === MOUSE_MOVE;
}
function isEndish(eventType) {
  return eventType === TOUCH_END || eventType === MOUSE_UP || isCancelish(eventType);
}
function isCancelish(eventType) {
  return eventType === TOUCH_CANCEL || eventType === MOUSE_CANCEL;
}
function isScroll(eventType) {
  return eventType === SCROLL;
}
function isSelectionChange(eventType) {
  return eventType === SELECT || eventType === SELECTION_CHANGE;
}
//# sourceMappingURL=types.native.js.map
