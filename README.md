<h1>MarkDoc Traverse</h1>

A simple, tiny traversal library for `Markdoc`'s AST

## Installation

`npm install markdoc-traverse`

or

`yarn add markdoc-traverse`

or

`pnpm add markdoc-traverse`

## Usage

### Enter / Exit

Visit all nodes by passing an `enter` function.

Exit from the document node by passing a `exit` function.
Useful for performing operations at the end of traversal

```ts
import { traverse } from "markdoc-traverse";
const ast = MarkDoc.parse(`
 Document
 ## Heading
 This is a level 2 heading
`);

traverse(ast, {
  enter(node) {
    // Visits all the nodes in the AST
  },
  exit(node) {
    // Exit after all nodes have been visited in document
  },
});
```

### Nodes

Visit markdoc's [`nodes`](https://markdoc.dev/docs/nodes) by passing any node as visitor

```ts
import { traverse } from "markdoc-traverse";

const ast = MarkDoc.parse(`
 Document
 ## Heading
 This is a level 2 heading
`);

traverse(ast, {
  heading: (node) => {
    // Your traversal logic
  },
  document: (node) => {
    // Your traversal logic
  },
});
```

Visitors are type safe , any makdoc nodes can be passed as a visitor with also option to `enter` and `exit` a node

```ts
import { traverse } from "markdoc-traverse";

const ast = MarkDoc.parse(`
 Document
 ## Heading
 This is a level 2 heading
`);

traverse(ast, {
  heading: {
    enter(node) {
      // Enter all heading nodes
    },
    exit(node) {
      // Exit at the end of each heading node
    },
  },
});
```

### Tags

Visit MarkDocs [tags](https://markdoc.dev/docs/tags) configured inside your config file

`traverse` takes a third arugments which is a record of custom tags you would like to visit

```ts

import { traverse } from 'markdoc-traverse';

const ast = MarkDoc.parse(`
 {% callout %}
   `content`
 {% /callout %}
`)

const config = {
  tags: {
    callout
  }
};

traverse(ast,{
    callout:(node)=>{
       // Visit tags
    }
},{
  ...config.tags
})
```

> tags are spread from your markdoc config

> tags are type safe
