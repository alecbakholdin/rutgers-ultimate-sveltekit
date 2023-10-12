<script>
	import { onNavigate } from '$app/navigation';
	import ProductCard from './ProductCard.svelte';

	export let data;
</script>

<div class="w-full h-max grid place-items-center">
	{#each data.products as product}
		<ProductCard {product} />
	{/each}
</div>
