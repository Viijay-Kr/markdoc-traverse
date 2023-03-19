import { Node } from "@markdoc/markdoc";
import { Visitors, VistorsWithNodeAndTags, VisitNode } from "./types";

export function traverse<N extends Node, V extends Visitors, Tags>(
  node: Node,
  visitors: VistorsWithNodeAndTags<Tags>,
  tags: Tags
): void;
export function traverse(node: Node, visitors: Visitors, tags?: unknown): void;
export function traverse(node: Node, visitors: Visitors) {
  function traverseNode(n: Node) {
    visitors.enter?.(n);
    const visitor = resolveVisitor(n, visitors);
    if (typeof visitor === "function") {
      visitor(n);
    }
    if (visitor && "enter" in visitor) {
      visitor.enter?.(n);
    }

    for (const child of n.children) {
      traverseNode(child);
    }
    if (visitor && "exit" in visitor) {
      visitor.exit?.(n);
    }
  }
  traverseNode(node);
  visitors.exit?.(node);
}

function resolveVisitor(
  n: Node,
  visitors: Visitors
): VisitNode<Node> | undefined {
  if (n.type === "tag") {
    const tag = n.tag ?? "";
    if (tag) {
      // @ts-expect-error
      return visitors[tag];
    }
  }
  return visitors[n.type];
}
