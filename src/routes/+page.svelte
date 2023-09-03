<script lang="ts">
	import DiGithubBadge from 'svelte-icons/di/DiGithubBadge.svelte';
	import DiNpm from 'svelte-icons/di/DiNpm.svelte';

	import Node from '$lib';
	import Window from './Window.svelte';
</script>

<header>
	<div class="title">
		<h1 class="name">svelte-mosa<span class="i">i</span>c</h1>
		<p>svelte's w<span class="i">i</span>ndow manager</p>
	</div>
    <h1>demo: streaml<span class="i">i</span>ned</h1>
	<div class="icons">
		<a href="https://github.com/LeoDog896/svelte-mosaic"><DiGithubBadge /></a>
		<a href="https://npmjs.com/package/svelte-mosaic"><DiNpm /></a>
	</div>
</header>

<Node direction="horizontal">
	<Window slot="alpha" number={1} />
	<Node slot="beta" direction="vertical">
		<Window slot="alpha" number={2} />
		<Window slot="beta" number={3} />
	</Node>
</Node>

<style>
	header {
		background-color: #007991;
		color: white;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.icons {
		height: 5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-right: 1rem;
	}

    a {
        display: block;
        height: 5rem;
        color: white;
    }

	.title {
		display: flex;
		flex-direction: column;
		margin: 0.5rem 1rem;
	}

	.i {
		color: #bcd8c1;
	}

	h1.name {
		margin: 0;
		margin-bottom: 0.5rem;
	}

	p {
		margin: 0;
	}
</style>
