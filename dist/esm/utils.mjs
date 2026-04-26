const keyName = "__reactResponderId";
const canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
const getBoundingClientRect = node => {
  if (!node) return;
  if (node.nodeType !== 1) return;
  if (node.getBoundingClientRect) {
    return node.getBoundingClientRect();
  }
};
function getEventPath(domEvent) {
  if (domEvent.type === "selectionchange") {
    const target = window.getSelection()?.anchorNode;
    return composedPathFallback(target);
  }
  const path = domEvent.composedPath != null ? domEvent.composedPath() : composedPathFallback(domEvent.target);
  return path;
}
function composedPathFallback(target) {
  const path = [];
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
  const idPath = [];
  const nodePath = [];
  const eventPath = getEventPath(domEvent);
  for (let i = 0; i < eventPath.length; i++) {
    const node = eventPath[i];
    const id = getResponderId(node);
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
  let pathALength = pathA.length;
  let pathBLength = pathB.length;
  if (
  // If either path is empty
  pathALength === 0 || pathBLength === 0 ||
  // If the last elements aren't the same there can't be a common ancestor
  // that is connected to the responder system
  pathA[pathALength - 1] !== pathB[pathBLength - 1]) {
    return null;
  }
  let itemA = pathA[0];
  let indexA = 0;
  let itemB = pathB[0];
  let indexB = 0;
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
  let depth = pathALength;
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
  for (let i = 0; i < touches.length; i++) {
    const node = touches[i].target;
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
  const {
    altKey,
    button,
    buttons,
    ctrlKey,
    type
  } = domEvent;
  const isTouch = type === "touchstart" || type === "touchmove";
  const isPrimaryMouseDown = type === "mousedown" && (button === 0 || buttons === 1);
  const isPrimaryMouseMove = type === "mousemove" && buttons === 1;
  const noModifiers = altKey === false && ctrlKey === false;
  if (isTouch || isPrimaryMouseDown && noModifiers || isPrimaryMouseMove && noModifiers) {
    return true;
  }
  return false;
}
function isSelectionValid() {
  const selection = window.getSelection();
  if (!selection) return false;
  const string = selection.toString();
  const anchorNode = selection.anchorNode;
  const focusNode = selection.focusNode;
  const isTextNode = anchorNode && anchorNode.nodeType === window.Node.TEXT_NODE || focusNode && focusNode.nodeType === window.Node.TEXT_NODE;
  return string.length >= 1 && string !== "\n" && !!isTextNode;
}
export { canUseDOM, getBoundingClientRect, getLowestCommonAncestor, getResponderPaths, hasTargetTouches, hasValidSelection, isPrimaryPointerDown, isSelectionValid, setResponderId };
//# sourceMappingURL=utils.mjs.map
