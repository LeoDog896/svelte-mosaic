import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';

type Component<T extends SvelteComponent = SvelteComponent> = {
	props: ComponentProps<T>;
	component: ComponentType<T>;
};

type Tile = (Tree | Component) & { size?: [min?: number, max?: number] };

export interface Tree {
	alpha: Tile;
	beta: Tile;
	direction: 'horizontal' | 'vertical';
}
