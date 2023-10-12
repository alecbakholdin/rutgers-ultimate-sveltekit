<script lang="ts">
	import { getImageUrl } from '$lib/client/directus';
	import type { Product } from '$lib/types/my-collections';

	export let product: Product;

	$: colorProperty =
		product.properties?.find((x) => x.Type === 'Color') ?? undefined;
</script>

<a class="card card-hover w-60 h-80 rounded-md flex flex-col" href="/product/{product.id}">
	<header class="card-header"><h4 class="h4"><strong>{product.Title}</strong></h4></header>
	<section class="p-4 flex-grow">
		<img
			src={getImageUrl(product.main_image)}
			alt={product.Title}
			class="rounded-md h-52 aspect-square object-cover"
			style:view-transition-name="product-{product.id}"
		/>
	</section>
	<footer class="card-footer flex justify-between">
		${Number(product.Price).toFixed(2)}
	</footer>
</a>
