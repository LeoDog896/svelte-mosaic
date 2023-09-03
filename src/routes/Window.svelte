<!-- 
    This is a component for the demo.
    
    TODO: maybe display some cooler widgets and things?
-->
<script lang="ts">
	export let number = 1;
</script>

<div class="container">
	<h1>W<span class="i">i</span>ndow {number}</h1>
	{#each number.toString(2).split('').reverse() as bit}
		<div class="bit" class:active={bit == '1'} />
	{/each}
</div>

<style>
	.container {
		margin: 2rem;
		text-align: center;
	}

	h1 {
		color: #222e50;
	}

	.i {
		color: #007991;
	}

	.bit {
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		border: 2px solid #d5c67a;
		margin: 0.5rem;
		display: inline-block;
	}

	.bit.active {
		background-color: #e9d985;
	}
</style>
