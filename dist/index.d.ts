import { Node, NodeType } from '@markdoc/markdoc';

type Visitors = VisitNodeObject<Node> & {
    [Type in NodeType]?: VisitNode<Node>;
};
type VisitNode<P extends Node> = VisitNodeFunctions<P> | VisitNodeObject<P>;
interface VisitNodeObject<P extends Node> {
    enter?: VisitNodeFunctions<P>;
    exit?: VisitNodeFunctions<P>;
}
type VisitNodeFunctions<P extends Node> = (node: P) => void;
type VistorsWithNodeAndTags<T> = VisitTags<T> | Visitors;
type VisitTags<T> = {
    [K in keyof T]?: VisitNodeFunctions<Node>;
};

declare function traverse<N extends Node, V extends Visitors, Tags>(node: Node, visitors: VistorsWithNodeAndTags<Tags>, tags: Tags): void;
declare function traverse(node: Node, visitors: Visitors, tags?: unknown): void;

export { traverse };
