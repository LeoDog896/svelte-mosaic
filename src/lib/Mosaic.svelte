<script lang="ts">
	import { parseSizeRange, type Tree } from '$lib/tree';
	import { Pane, Splitpanes } from 'svelte-splitpanes';

	export let tree: Tree;

	let height: number = Number.MAX_SAFE_INTEGER;
	let width: number = Number.MAX_SAFE_INTEGER;
	$: containerSizePx = tree.direction === 'vertical' ? height : width;

	$: alphaSize = parseSizeRange(tree.alpha.size, containerSizePx);
	$: betaSize = parseSizeRange(tree.beta.size, containerSizePx);
</script>

<div bind:clientWidth={width} bind:clientHeight={height}>
	<Splitpanes horizontal={tree.direction === 'vertical'}>
		<Pane minSize={alphaSize.min} maxSize={alphaSize.max}>
			{#if 'alpha' in tree.alpha}
				<svelte:self tree={tree.alpha} />
			{:else}
				<svelte:component this={tree.alpha.component} {...tree.alpha.props} />
			{/if}
		</Pane>
		<Pane minSize={betaSize.min} maxSize={betaSize.max}>
			{#if 'alpha' in tree.beta}
				<svelte:self tree={tree.beta} />
			{:else}
				<svelte:component this={tree.beta.component} {...tree.beta.props} />
			{/if}
		</Pane>
	</Splitpanes>
</div>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>
