<script lang="ts">
	/** The orientation of the element */
	export let direction: 'horizontal' | 'vertical';

	export let alphaSize: [min?: number, max?: number] = [undefined, undefined];
	export let betaSize: [min?: number, max?: number] = [undefined, undefined];

	let wrapper: HTMLDivElement;
	let alpha: HTMLDivElement;
	let handle: HTMLDivElement;

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

			const containerSize = direction === 'horizontal' ? wrapper.clientWidth : wrapper.clientHeight;

			const alphaBoundedSize = Math.max(
				0,
				alphaSize[0] ?? 0,
				Math.min(pointerRelativePos - 4, alphaSize[1] ?? Infinity)
			);
			// size is the alpha bounded size which is bounded by the beta size
			const size = Math.max(
				containerSize - (betaSize[1] ?? containerSize),
				Math.min(containerSize - (betaSize[0] ?? 0), alphaBoundedSize)
			);

			if (direction === 'horizontal') {
				alpha.style.width = size + 'px';
			} else {
				alpha.style.height = size + 'px';
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
		max-height: 100%;
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
