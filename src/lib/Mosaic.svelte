<script lang="ts">
	import type { Tree } from '$lib/tree';
	import { Pane, Splitpanes } from 'svelte-splitpanes';

	export let tree: Tree;

	let height: number = Number.MAX_SAFE_INTEGER;
	let width: number = Number.MAX_SAFE_INTEGER;
	$: size = tree.direction === 'vertical' ? height : width;

	function parseSize(
		size: [min?: number, max?: number] | undefined,
		defaultMax: number
	): { min: number; max: number } {
		return size === undefined || size.length === 0
			? { min: 0, max: defaultMax }
			: { min: size[0] || 0, max: size[1] || defaultMax };
	}
	$: alphaSize = parseSize(tree.alpha.size, size);
	$: betaSize = parseSize(tree.beta.size, size);
</script>

<div bind:clientWidth={width} bind:clientHeight={height}>
	<Splitpanes horizontal={tree.direction === 'vertical'}>
		<Pane minSize={(alphaSize.min / size) * 100} maxSize={(alphaSize.max / size) * 100}>
			{#if 'alpha' in tree.alpha}
				<svelte:self tree={tree.alpha} />
			{:else}
				<svelte:component this={tree.alpha.component} {...tree.alpha.props} />
			{/if}
		</Pane>
		<Pane minSize={(betaSize.min / size) * 100} maxSize={(betaSize.max / size) * 100}>
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
