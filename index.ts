import { visit, SKIP, type Visitor } from 'unist-util-visit';

import type { Content as MdastContent } from 'mdast';

function assertNonNullable<T>(
  value: T,
  err: string
): asserts value is NonNullable<T> {
  if (value === null) {
    throw new Error(err);
  }
}

export function visitAndReveal<Tree extends MdastContent>(
  tree: Tree,
  visitor?: Visitor,
  reverse?: boolean
) {
  visit(
    tree,
    'hidden',
    (node, index, parent) => {
      // assertNonNullable(
      //   index,
      //   'error while revealing hidden node: node index is missing'
      // );

      // assertNonNullable(
      //   parent,
      //   'error while revealing hidden node: node parent is missing'
      // );

      return visitor?.(node, index, parent) ?? [SKIP, index];
    },
    reverse
  );
}
