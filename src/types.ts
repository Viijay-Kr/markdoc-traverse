import { NodeType, Node, Tag } from "@markdoc/markdoc";

export type Visitors = VisitNodeObject<Node> & {
  [Type in NodeType]?: VisitNode<Node>;
};

export type VisitNode<P extends Node> =
  | VisitNodeFunctions<P>
  | VisitNodeObject<P>;

interface VisitNodeObject<P extends Node> {
  enter?: VisitNodeFunctions<P>;
  exit?: VisitNodeFunctions<P>;
}

export type VisitNodeFunctions<P extends Node> = (node: P) => void;

export type VistorsWithNodeAndTags<T> = VisitTags<T> | Visitors;

type VisitTags<T> = {
  [K in keyof T]?: VisitNodeFunctions<Node>;
};
