<script lang="ts">
	import { parseSize, parseSizeRange, type Tile } from '$lib/tree.js';
	import { Pane } from 'svelte-splitpanes';
	import Mosaic from '$lib/Mosaic.svelte';
	import { onMount } from 'svelte';

	export let tile: Tile;
	export let sibling: Tile;
	export let containerSizePx: number;

	let mountSymbol: symbol | undefined;

	$: sizeParsed = mountSymbol && parseSizeRange(tile.size, containerSizePx);
	$: siblingSizeParsed = mountSymbol && parseSizeRange(sibling.size, containerSizePx);

	// Prevents initial from being unnecessarily reactive
	const getInitial = () => {
		if (sizeParsed?.initial) {
			return sizeParsed.initial * 100;
		} else if (siblingSizeParsed?.initial) {
			return (1 - siblingSizeParsed.initial) * 100;
		} else {
			return undefined;
		}
	};

	$: initial = mountSymbol && getInitial();

	onMount(() => {
		mountSymbol = Symbol();
	});
</script>

<Pane
	size={initial}
	minSize={sizeParsed ? sizeParsed.min * 100 : 0}
	maxSize={sizeParsed ? sizeParsed.max * 100 : 100}
	snapSize={tile.snapSize ? parseSize(tile.snapSize, containerSizePx / 2) * 100 : undefined}
	class={tile.class}
>
	{#if 'branch' in tile}
		<Mosaic tree={tile.branch} />
	{:else}
		<svelte:component this={tile.component} {...tile.props} />
	{/if}
</Pane>
