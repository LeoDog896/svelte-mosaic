<script lang="ts" context="module">
    export const nodeTrackerKey = "data-svelte-mosaic-node";

	/** 
	 * Represents a full binary tree.
	 * The reason why mosaic uses a full binary tree
	 * is because if a node has only one child, then
	 * it's redundant and can be removed.
	 */
	type Node = {
		id: string;
		children: [Node, Node] | undefined;
		parent: Node | null;
	}

	type Entry = {
		node: Node;
		element: HTMLElement;
	}

	export const parents = new Map<string, Entry>();

    export function getNodeParent(self: HTMLElement): HTMLElement | null {
        return self.closest(`[${nodeTrackerKey}]`);
    }
</script>

<script lang="ts">
	import { onMount } from "svelte";

	/** The orientation of the element */
	export let direction: 'horizontal' | 'vertical';

	let wrapper: HTMLDivElement;
	let alpha: HTMLDivElement;
	let handle: HTMLDivElement;

	onMount(() => {
		// find the parent node (if any)
		const parent = getNodeParent(wrapper);

		if (parent === null) {
			// tag the node as a parent mosaic node
			const uuid = crypto.randomUUID();
			wrapper.setAttribute(nodeTrackerKey, uuid);
			parents.set(uuid, {
				node: {
					id: uuid,
					children: undefined,
					parent: null
				},
				element: wrapper
			});
		}
	})

	let isDragging = false;
	let width: number | undefined = undefined;
</script>

<svelte:window
	on:mousedown={(event) => {
		if (event.target == handle) {
			isDragging = true;
			event.preventDefault();
		}
	}}
	on:mouseup={(event) => {
		if (event.target == handle) {
			isDragging = false;
		}
	}}
	on:mousemove={(event) => {
		const { clientX, clientY } = event;
		if (isDragging) {
			event.preventDefault();
			
			// Get offset
			const containerOffset = direction === 'horizontal' ? wrapper.offsetLeft : wrapper.offsetTop;

			// Get coordinate of pointer relative to container
			const pos = direction === 'horizontal' ? clientX : clientY;
			const pointerRelativePos = pos - containerOffset;

			if (direction === 'horizontal') {
				alpha.style.width = pointerRelativePos - 4 + 'px';
			} else {
				alpha.style.height = pointerRelativePos - 4 + 'px';
			}

			alpha.style.flexGrow = '0';
			alpha.style.flex = 'none';
		}
	}}
/>

<div bind:this={wrapper} class="flex {direction}">
	<div bind:this={alpha} class="child">
		<slot name="alpha" />
	</div>
	<div
		bind:this={handle}
		class="sash sash-{direction}"
		aria-label="Resize"
		role="scrollbar"
		aria-controls="alpha beta"
		aria-orientation={direction}
		aria-valuenow={width}
		tabindex="-1"
	/>
	<div class="child">
		<slot name="beta" />
	</div>
</div>

<style>
	.flex {
		display: flex;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}

	.sash {
		background-color: #ddd;
		box-sizing: border-box;
	}

	.sash-horizontal {
		width: 8px;
		height: 100%;
		cursor: ew-resize;
	}

	.sash-vertical {
		height: 8px;
		width: 100%;
		cursor: ns-resize;
	}

	.horizontal {
		flex-direction: row;
	}

	.vertical {
		flex-direction: column;
	}

	.child {
		flex: 1;
		box-sizing: border-box;
	}
</style>
