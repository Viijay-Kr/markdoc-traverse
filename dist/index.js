"use strict";
function traverse(node, visitors) {
  var _a;
  function traverseNode(n) {
    var _a, _b, _c;
    (_a = visitors.enter) === null || _a === void 0
      ? void 0
      : _a.call(visitors, n);
    const visitor = resolveVisitor(n, visitors);
    if (typeof visitor === "function") {
      visitor(n);
    }
    if (visitor && "enter" in visitor) {
      (_b = visitor.enter) === null || _b === void 0
        ? void 0
        : _b.call(visitor, n);
    }
    for (const child of n.children) {
      traverseNode(child);
    }
    if (visitor && "exit" in visitor) {
      (_c = visitor.exit) === null || _c === void 0
        ? void 0
        : _c.call(visitor, n);
    }
  }
  traverseNode(node);
  (_a = visitors.exit) === null || _a === void 0
    ? void 0
    : _a.call(visitors, node);
}
function resolveVisitor(n, visitors) {
  var _a;
  if (n.type === "tag") {
    const tag = (_a = n.tag) !== null && _a !== void 0 ? _a : "";
    if (tag) {
      // @ts-expect-error
      return visitors[tag];
    }
  }
  return visitors[n.type];
}
exports.traverse = traverse;
