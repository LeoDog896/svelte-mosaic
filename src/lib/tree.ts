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

/**
 * Converts a unit into a function that converts
 * that type into the percentage of the container size.
 *
 * Will throw an error if unit is not in the UnitType union.
 */
function parseUnit(unit: string): (containerSizePx: number, value: number) => number {
	switch (unit) {
		case 'px':
			return (containerSize, value) => value / containerSize;
		case '%':
			return (_, value) => value;
		default:
			throw new Error(`Invalid unit ${unit}`);
	}
}

/** Parses the given unit size to a percentage of the container size. */
export function parseSize(size: Size, containerSizePx: number) {
	const index = [...size].findIndex((char) => isNaN(Number(char)) && char !== '.');

	const number = Number(size.slice(0, index));
	console.assert(
		!Number.isNaN(number),
		`Number(${size.slice(0, index)}) is NaN - please report this.`
	);

	const unit = parseUnit(size.slice(index));

	return unit(containerSizePx, number);
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
