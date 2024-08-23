import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
import type { Splitpanes } from 'svelte-splitpanes';

type Component<T extends SvelteComponent = SvelteComponent> = {
	props: ComponentProps<T>;
	component: ComponentType<T>;
};

type SizeUnit = 'px' | '%';

type Size = `${number}${SizeUnit}`;

type SizeRange = undefined | Size | { min?: Size; max?: Size; initial?: Size };

export type Tile = ({ branch: Branch } | Component) & {
	size: SizeRange;
	snapSize?: Size;
	class?: string;
};

export type Branch = {
	alpha: Tile;
	beta: Tile;
} & ComponentProps<Splitpanes>;

// Parses the size to a percentage of the container size
export function parseSize(size: Size, containerSizePx: number) {
	const parts = size.match(/(\d*\.?\d+)(px|%)/) as [string, string, SizeUnit];
	const value = Number(parts[1]);
	return parts[2] === '%' ? value : (value / containerSizePx) * 100;
}

export function parseSizeRange(
	sizeRange: SizeRange,
	containerSize: number
): { min: number; max: number; initial?: number } {
	if (sizeRange === undefined) return { min: 0, max: 100 };
	if (typeof sizeRange === 'object') {
		const min = sizeRange.min ? parseSize(sizeRange.min, containerSize) : 0;
		const max = sizeRange.max ? parseSize(sizeRange.max, containerSize) : 100;
		let initial: undefined | number;
		if (sizeRange.initial !== undefined) {
			initial = parseSize(sizeRange.initial, containerSize);
		} else if (min > 50) {
			initial = min;
		} else if (max < 50) {
			initial = max;
		}
		return { min, max, initial };
	}
	const fixedSize = parseSize(sizeRange, containerSize);
	return {
		min: fixedSize,
		max: fixedSize,
		initial: fixedSize
	};
}
