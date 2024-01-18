<script lang="ts">
    import Node from '$lib/Node.svelte';
    import { type Tree, isTree } from '$lib/tree';

    export let tree: Tree;
</script>

<Node direction={tree.direction}>
    <div slot="alpha">
        {#if isTree(tree.alpha)}
            <svelte:self tree={tree.alpha} />
        {:else}
            <svelte:component this={tree.alpha.component} {...tree.alpha} />
        {/if}
    </div>
    <div slot="beta">
        {#if isTree(tree.beta)}
            <svelte:self tree={tree.beta} />
        {:else}
            <svelte:component this={tree.beta.component} {...tree.beta} />
        {/if}
    </div>
</Node>

<style>
    div {
        display: contents;
    }
</style>
