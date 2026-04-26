const BLUR = "blur";
const CONTEXT_MENU = "contextmenu";
const FOCUS_OUT = "focusout";
const MOUSE_DOWN = "mousedown";
const MOUSE_MOVE = "mousemove";
const MOUSE_UP = "mouseup";
const MOUSE_CANCEL = "dragstart";
const TOUCH_START = "touchstart";
const TOUCH_MOVE = "touchmove";
const TOUCH_END = "touchend";
const TOUCH_CANCEL = "touchcancel";
const SCROLL = "scroll";
const SELECT = "select";
const SELECTION_CHANGE = "selectionchange";
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
//# sourceMappingURL=types.mjs.map
