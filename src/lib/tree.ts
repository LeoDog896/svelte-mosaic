import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';

const treeMarker = Symbol('isTree');

type Component<T extends SvelteComponent = SvelteComponent> = {
	props: ComponentProps<T>;
	component: ComponentType<T>;
};

export interface Tree {
	alpha: Tree | Component;
	beta: Tree | Component;
	direction: 'horizontal' | 'vertical';
	alphaSize?: [min?: number, max?: number];
	betaSize?: [min?: number, max?: number];
	[treeMarker]: true;
}

export function isTree(tree: unknown): tree is Tree {
	return (
		tree !== null && typeof tree === 'object' && treeMarker in tree && tree[treeMarker] === true
	);
}

export function branch(tree: Omit<Tree, typeof treeMarker>): Tree {
	return {
		...tree,
		[treeMarker]: true
	};
}
