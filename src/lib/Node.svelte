<script lang="ts">
	export let direction: 'horizontal' | 'vertical';

	let wrapper: HTMLDivElement;
	let alpha: HTMLDivElement;
	let handle: HTMLDivElement;

	let isDragging = false;
	let width: number | undefined = undefined;
</script>

<svelte:window
	on:mousedown|preventDefault={(event) => {
		if (event.target == handle) {
			isDragging = true;
		}
	}}
	on:mouseup={(event) => {
		if (event.target == handle) {
			isDragging = false;
		}
	}}
	on:mousemove|preventDefault={({ clientX, clientY }) => {
		if (isDragging) {
			// Get offset
			const containerOffset = direction === 'horizontal' ? wrapper.offsetLeft : wrapper.offsetTop;

			// Get coordinate of pointer relative to container
			const pos = direction === 'horizontal' ? clientX : clientY;
			const pointerRelativePos = pos - containerOffset;

			if (direction === 'horizontal') {
				alpha.style.width = pointerRelativePos - 1.5 + 'px';
			} else {
				alpha.style.height = pointerRelativePos - 1.5 + 'px';
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
		background-color: #ccc;
	}

	.sash-horizontal {
		width: 3px;
		height: 100%;
		cursor: ew-resize;
	}

	.sash-vertical {
		height: 3px;
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
