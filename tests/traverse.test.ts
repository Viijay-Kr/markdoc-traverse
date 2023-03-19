import Markdoc, { Tag } from "@markdoc/markdoc";
import { vitest, test } from "vitest";
import { expect } from "vitest";
import { traverse } from "../dist";
import { doc } from "./doc";

const ast = Markdoc.parse(doc);
test("should visit heading nodes", () => {
  const visitor = {
    heading: vitest.fn(),
  };
  traverse(ast, visitor);
  expect(visitor.heading).toBeCalledTimes(3);
});

test("should visit custom tag", () => {
  const callout = vitest.fn();
  traverse(
    ast,
    {
      callout,
    },
    {
      callout: new Tag("callout"),
    }
  );
  expect(callout).toBeCalledTimes(1);
});

test("should visit item node", () => {
  const visitor = {
    item: vitest.fn(),
  };
  traverse(ast, visitor);
  expect(visitor.item).toBeCalled();
});
