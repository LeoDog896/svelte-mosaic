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
<script>
	import { Mosaic, branch } from 'svelte-mosaic';

	const tree = branch({
		direction: "horizontal",
		alpha: { component: Window, number: 1 },
		beta: {
			direction: "vertical",
			alpha: { component: Window, number: 2 },
			beta: { component: Window, number: 3 }
		}
	})
</script>

<Mosaic {tree}>
```

### Internals

Because the API is very simple and doesn't require child-parent passing, we need to keep
track of the tree structure ourselves.

Whenever a `Node` is constructed, it backpropagates itself to its parents, giving each `Node` a reference to its parent.
