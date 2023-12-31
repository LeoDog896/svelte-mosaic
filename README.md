# svelte-mosaic

port of [react-mosaic](https://github.com/nomcopter/react-mosaic) to Svelte.

## API

A `Node` is compromised of two siblings, `alpha` and `beta`.
These two homogeneous siblings are the only two children of `Node`.
However, a sibling can be a `Node` itself, creating a recursive tree structure.

For example, the following creates a Node with the following structure:

```
+-----------------------+
| Element A | Element B |
|           |-----------+
|           | Element C |
+-----------+-----------+
```

```svelte
<Node direction="horizontal">
	<Window slot="alpha" number={1} />
	<Node slot="beta" direction="vertical">
		<Window slot="alpha" number={2} />
		<Window slot="beta" number={3} />
	</Node>
</Node>
```

### Illegal structures

:x: A `Node` cannot have more than two children.

### Internals

Because the API is very simple and doesn't require child-parent passing, we need to keep
track of the tree structure ourselves.

Whenever a `Node` is constructed, it backpropagates itself to its parents, giving each `Node` a reference to its parent.
