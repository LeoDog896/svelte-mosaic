<script lang="ts">
	import { parseSize, parseSizeRange, type Tile } from '$lib/tree.js';
	import { Pane } from 'svelte-splitpanes';
	import Mosaic from '$lib/Mosaic.svelte';

	export let tile: Tile;
	export let containerSizePx: number;
	$: sizeParsed = parseSizeRange(tile.size, containerSizePx);

	// Prevents initial from being unnecessarily reactive
	const getInitial = () => sizeParsed.initial;
</script>

<Pane
	size={getInitial()}
	minSize={sizeParsed.min}
	maxSize={sizeParsed.max}
	snapSize={tile.snapSize ? parseSize(tile.snapSize, containerSizePx / 2) : undefined}
	class={tile.class}
>
	{#if 'branch' in tile}
		<Mosaic tree={tile.branch} />
	{:else}
		<svelte:component this={tile.component} {...tile.props} />
	{/if}
</Pane>
