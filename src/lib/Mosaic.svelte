<script lang="ts">
	import Mosaic from './Mosaic.svelte';
	import Node from '$lib/Node.svelte';
	import { type Tree, isTree } from '$lib/tree';

	interface Props {
		tree: Tree;
	}

	let { tree }: Props = $props();
</script>

<Node direction={tree.direction} betaSize={tree.betaSize} alphaSize={tree.alphaSize} onSizeChange={tree.onSizeChange}>
	{#snippet alpha()}
		<div >
			{#if isTree(tree.alpha)}
				<Mosaic tree={tree.alpha} />
			{:else}
				<tree.alpha.component {...tree.alpha.props} />
			{/if}
		</div>
	{/snippet}
	{#snippet beta()}
		<div >
			{#if isTree(tree.beta)}
				<Mosaic tree={tree.beta} />
			{:else}
				<tree.beta.component {...tree.beta.props} />
			{/if}
		</div>
	{/snippet}
</Node>

<style>
	div {
		display: contents;
	}
</style>
