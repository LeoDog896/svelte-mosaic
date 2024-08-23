<script lang="ts">
	import DiGithubBadge from 'svelte-icons/di/DiGithubBadge.svelte';
	import DiNpm from 'svelte-icons/di/DiNpm.svelte';
	import FaviconLight from './favicon-light.png';

	import { Mosaic, type Branch } from '$lib';
	import Window from './Window.svelte';

	let tree: Branch = {
		alpha: {
			component: Window,
			props: { number: 1 },
			size: { min: '200px', initial: '400px' }
		},
		beta: {
			branch: {
				horizontal: true,
				alpha: {
					component: Window,
					props: { number: 2 },
					size: { min: '250px' }
				},
				beta: {
					component: Window,
					props: { number: 3 },
					size: { min: '300px' }
				}
			},
			size: { min: '200px' }
		}
	};
</script>

<div class="container">
	<header>
		<div class="title child">
			<img src={FaviconLight} class="logo" alt="Svelte logo" />
			<div class="description">
				<h1 class="name">svelte-mosa<span class="i">i</span>c</h1>
				<p>svelte's w<span class="i">i</span>ndow manager</p>
			</div>
		</div>
		<h1 class="child">streaml<span class="i">i</span>ned demo</h1>
		<div class="icons child">
			<a href="https://github.com/LeoDog896/svelte-mosaic"><DiGithubBadge /></a>
			<a href="https://npmjs.com/package/svelte-mosaic"><DiNpm /></a>
		</div>
	</header>

	<div class="node-container">
		<Mosaic {tree} />
	</div>
</div>

<style>
	.logo {
		height: 5rem;
		width: 5rem;
	}

	.child {
		width: 30%;
	}

	h1.child {
		justify-content: center;
		text-align: center;
	}

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
		justify-content: right;
	}

	a {
		display: block;
		height: 5rem;
		color: white;
	}

	.title {
		display: flex;
		flex-direction: row;
		margin: 0.5rem 1rem;
		justify-content: left;
	}

	.description {
		flex-direction: column;
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

	.container {
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
	}

	.node-container {
		flex-grow: 1;
	}
</style>
