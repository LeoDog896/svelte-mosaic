<script lang="ts">
    import Node from '$lib/Node.svelte';
    import { type Tree, isTree, locateComponents, isComponent } from '$lib/tree';
	import { onMount } from 'svelte';
    import { Portal, Limbo, teleport } from 'svelte-reparent';
    import { _components } from 'svelte-reparent/Portal.svelte'

    export let tree: Tree;
    $: components = locateComponents(tree);

    function assertNotUndefined<T>(value: T | undefined): T {
        if (value === undefined) throw new Error('Value is undefined');
        return value;
    }

    onMount(() => {
        if (!isTree(tree.alpha)) {
            console.log(Portal)
            teleport(assertNotUndefined(components.find((component) => component[0] === tree.alpha))[2], tree.alpha[isComponent]);
        }
    });
</script>

{#each components as component}
    <div class="hidden">
        <Limbo bind:component={component[2]}>
            <svelte:component this={component[0].component} {...component[0]} />
        </Limbo>
    </div>
{/each}

<Node direction={tree.direction} betaSize={tree.betaSize} alphaSize={tree.alphaSize}>
    <div slot="alpha">
        {#if isTree(tree.alpha)}
            <!-- <svelte:self tree={tree.alpha} /> -->
        {:else}
            <Portal key={tree.alpha[isComponent]} component={assertNotUndefined(components.find((component) => component[0] === tree.alpha))[2]} />
        {/if}
    </div>
    <div slot="beta">
        {#if isTree(tree.beta)}
            <!-- <svelte:self tree={tree.beta} /> -->
        {:else}
            <svelte:component this={tree.beta.component} {...tree.beta} />
        {/if}
    </div>
</Node>

<style>
    div {
        display: contents;
    }

    .hidden {
        display: none;
    }
</style>
