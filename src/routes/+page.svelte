<script lang="ts">
	import Node from '$lib';
	import Window from './Window.svelte';
</script>

<Node direction="horizontal">
	<Window slot="alpha" number={1} />
	<Node slot="beta" direction="vertical">
		<Window slot="alpha" number={2} />
		<Window slot="beta" number={3} />
	</Node>
</Node>
