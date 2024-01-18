import type { ComponentType, SvelteComponent } from 'svelte';

const treeMarker = Symbol('isTree')

type Component = {
    [key: string]: unknown,
    component: ComponentType<SvelteComponent>,
}

export interface Tree {
    alpha: Tree | Component;
    beta: Tree | Component;
    direction: 'horizontal' | 'vertical';
    alphaSize?: [min?: number, max?: number],
    betaSize?: [min?: number, max?: number]
    [treeMarker]: true;
}

export function isTree(tree: unknown): tree is Tree {
    return tree !== null
        && typeof tree === "object"
        && treeMarker in tree
        && tree[treeMarker] === true
}

export function branch(tree: Omit<Tree, typeof treeMarker>): Tree {
    return {
        ...tree,
        [treeMarker]: true
    }
}
