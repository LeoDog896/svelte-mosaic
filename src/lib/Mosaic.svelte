<script lang="ts">
	import { type Branch } from '$lib/tree';
	import { Splitpanes } from 'svelte-splitpanes';
	import Tile from '$lib/Tile.svelte';

	export let tree: Branch;
	$: ({ alpha, beta, ...splitPanesProps } = tree);

	let height: number | undefined;
	let width: number | undefined;

	$: containerSizePx = tree.horizontal ? height : width;
</script>

<div bind:clientWidth={width} bind:clientHeight={height}>
	<Splitpanes {...splitPanesProps}>
		<Tile tile={alpha} {containerSizePx} />
		<Tile tile={beta} {containerSizePx} />
	</Splitpanes>
</div>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>
