import type { Component, ComponentProps, SvelteComponent } from 'svelte';

const treeMarker = Symbol('isTree');

type IComponent<T extends SvelteComponent = SvelteComponent> = {
	props: ComponentProps<T>;
	component: Component<ComponentProps<T>>;
};

export interface Tree {
	onSizeChange: () => void;
	alpha: Tree | IComponent;
	beta: Tree | IComponent;
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
