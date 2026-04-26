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
export { BLUR, CONTEXT_MENU, FOCUS_OUT, MOUSE_CANCEL, MOUSE_DOWN, MOUSE_MOVE, MOUSE_UP, SCROLL, SELECT, SELECTION_CHANGE, TOUCH_CANCEL, TOUCH_END, TOUCH_MOVE, TOUCH_START, isCancelish, isEndish, isMoveish, isScroll, isSelectionChange, isStartish };
//# sourceMappingURL=types.native.js.map
