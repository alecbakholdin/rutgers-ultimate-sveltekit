<script lang="ts">
	import { getImageUrl } from '$lib/client/directus';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { enhance } = superForm(data.changeQuantityForm, {
		onResult: console.error
	});
</script>

<div class="sm:card flex flex-col max-w-xl w-full m-auto">
	<header class="card-header">
		<h3 class="h3">Cart</h3>
	</header>
	<section class="p-4 flex flex-col gap-2">
		{#each data.cart.line_items || [] as { product, properties, quantity }, i}
			{@const propertyMap = Object.fromEntries(product.properties?.map((x) => [x.Title, x]) || [])}
			<div class="flex gap-2">
				<img
					src={getImageUrl(product.main_image)}
					alt={product.Title}
					class="h-28 aspect-square object-cover rounded-md"
					style:view-transition-name="product-{product.id}"
				/>
				<div class="flex-grow">
					<a href="/product/{product.id}">
						<h4 class="h4">{product.Title}</h4>
					</a>
					<div class="flex flex-col flex-wrap h-20 pl-2 pt-2">
						{#each properties || [] as { Key, Value }}
							<span class="flex items-center gap-2">
								<strong>{Key}:</strong>
								{#if propertyMap[Key]?.Type === 'Color'}
									<div class="w-4 h-4 rounded-full" style:background-color={Value} />
								{:else}
									{Value}
								{/if}
							</span>
						{/each}
					</div>
				</div>

				<form action="/cart?/changeQuantity" method="post" use:enhance>
					<input id="lineItemIndex" type="hidden" name="lineItemIndex" value={i} />
					<label class="label" for="quantity-{i}">Quantity</label>
					<select
						id="quantity-{i}"
						class="select rounded-md"
						name="quantity"
						value={quantity}
						on:change={(e) => e.currentTarget?.form?.requestSubmit()}
					>
						{#each { length: Math.max(5, quantity + 1) } as _, i}
							<option value={i}>{i}</option>
						{/each}
					</select>
				</form>
			</div>
            <hr class="last:hidden"/>
		{:else}
			<span class="text-surface-400">No items in cart right now</span>
		{/each}
	</section>
	<footer class="card-footer flex justify-end">
		<a href="/checkout" class="btn variant-filled-primary flex items-center w-fit"> Checkout </a>
	</footer>
</div>
