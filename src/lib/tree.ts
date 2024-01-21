import type { ComponentType, SvelteComponent } from 'svelte';

const treeMarker = Symbol('isTree');
export const isComponent = Symbol('isComponent');

export interface UntaggedComponent {
    [key: string]: unknown,
    component: ComponentType<SvelteComponent>,
}

export interface Component extends UntaggedComponent {
    [isComponent]: symbol,
}

export interface UntaggedTree {
    alpha: UntaggedTree | UntaggedComponent;
    beta: UntaggedTree | UntaggedComponent;
    direction: 'horizontal' | 'vertical';
    alphaSize?: [min?: number, max?: number];
    betaSize?: [min?: number, max?: number];
}

export interface Tree extends UntaggedTree {
    alpha: Tree | Component;
    beta: Tree | Component;
    /** @internal */
    [treeMarker]: symbol;
}

export function isUntaggedTree(tree: unknown): tree is UntaggedTree {
    return tree !== null
        && typeof tree === "object"
        && 'alpha' in tree
        && 'beta' in tree
        && 'direction' in tree
        && typeof tree.direction === "string"
        && (tree.direction === 'horizontal' || tree.direction === 'vertical')
}

export function isTree(tree: unknown): tree is Tree {
    return tree !== null
        && typeof tree === "object"
        && treeMarker in tree
        && typeof tree[treeMarker] === "symbol"
}

export function branch(tree: UntaggedTree): Tree {
    return {
        ...tree,
        alpha: isUntaggedTree(tree.alpha) ? branch(tree.alpha) : {
            ...tree.alpha,
            [isComponent]: Symbol('component'),
        },
        beta: isUntaggedTree(tree.beta) ? branch(tree.beta) : {
            ...tree.beta,
            [isComponent]: Symbol('component'),
        },
        [treeMarker]: Symbol('isTree'),
    }
}

type Visit = [component: Component, branch: ('alpha' | 'beta')[], element: HTMLElement]

export function locateComponents(tree: Tree): Visit[] {
    const visits: Visit[] = []
    
    function visit(tree: Tree, branch: ('alpha' | 'beta')[] = []) {
        if (isTree(tree.alpha)) {
            visit(tree.alpha, [...branch, 'alpha'])
        } else {
            visits.push([tree.alpha, [...branch, 'alpha'], undefined as unknown as HTMLElement])
        }
        if (isTree(tree.beta)) {
            visit(tree.beta, [...branch, 'beta'])
        } else {
            visits.push([tree.beta, [...branch, 'beta'], undefined as unknown as HTMLElement])
        }
    }

    visit(tree);

    return visits;
}
