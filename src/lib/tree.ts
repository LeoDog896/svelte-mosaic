import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';

type Component<T extends SvelteComponent = SvelteComponent> = {
	props: ComponentProps<T>;
	component: ComponentType<T>;
};

type Unit = 'px' | '%';

type Size = `${number}${Unit}`;

type SizeRange = undefined | Size | { min?: Size; max?: Size };

type Tile = (Tree | Component) & { size: SizeRange };

export interface Tree {
	alpha: Tile;
	beta: Tile;
	direction: 'horizontal' | 'vertical';
}

// Parses the size to a percentage of the container size
function parseSize(size: Size, containerSizePx: number) {
	const parts = size.match(/(\d*\.?\d+)(px|%)/) as [string, string, Unit];
	const value = Number(parts[1]);
	return parts[2] === '%' ? value : (value / containerSizePx) * 100;
}

export function parseSizeRange(
	sizeRange: SizeRange,
	containerSize: number
): { min: number; max: number } {
	if (sizeRange === undefined) return { min: 0, max: containerSize };
	if (typeof sizeRange === 'object') {
		return {
			min: sizeRange.min ? parseSize(sizeRange.min, containerSize) : 0,
			max: sizeRange.max ? parseSize(sizeRange.max, containerSize) : 100
		};
	}
	return {
		min: parseSize(sizeRange, containerSize),
		max: parseSize(sizeRange, containerSize)
	};
}
