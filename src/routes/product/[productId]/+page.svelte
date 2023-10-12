<script lang="ts">
	import { loadingButton } from '$lib/client/actions/loadingButton.js';
	import { getImageUrl } from '$lib/client/directus.js';
	import { getContrast } from '$lib/client/util/getContrast.js';
	import Icon from '@iconify/svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const product = data.product;
	const properties = product.properties;

	const { form, enhance, constraints, submitting, errors } = superForm(data.addToCartForm, {
		dataType: 'json'
	});
</script>

<div
	class="flex flex-col items-center justify-center md:flex-row md:items-start md:p-20 pt-4 md:pt-8 gap-3"
>
	<img
		src={getImageUrl(product.main_image)}
		alt={product.Title}
		class="h-80 aspect-square object-cover rounded-lg"
		style:view-transition-name="product-{product.id}"
	/>
	<form
		action="/product/{product.id}?/addToCart"
		method="post"
		class="flex flex-col items-start md:items-end w-80 gap-2"
		use:enhance
	>
		<header>
			<h3 class="h3"><strong>{product.Title}</strong></h3>
		</header>
		<div class="border border-surface-400 rounded-md w-full p-4">
			{#each product.properties || [] as { Title, Type, Required, values }, i}
				<label class="label" for={Title}>
					{Title}
					{#if !Required}
						(optional)
					{/if}
				</label>
				{#if Type === 'Text' && values?.length}
					<div class="flex flex-wrap gap-2">
						{#each values || [] as { Text }}
							{@const selected = $form.properties[Title] === Text}
							<button
								type="button"
								class:variant-filled-primary={selected}
								class:variant-outline={!selected}
								class="chip rounded-lg text-md transition-all px-4"
								on:click={() => ($form.properties[Title] = Text)}
							>
								{Text}
							</button>
						{/each}
					</div>
				{:else if Type === 'Color' && values?.length}
					<div class="flex gap-2">
						{#each values || [] as { Color }}
							<button
								type="button"
								class="w-10 rounded-full aspect-square grid place-items-center border border-surface-400 transform hover:scale-105"
								style:background-color={Color}
								style:color={getContrast(Color)}
								on:click={() => ($form.properties[Title] = Color)}
							>
								{#if $form.properties[Title] === Color}
									<Icon icon="mdi:check" class="text-2xl" />
								{/if}
							</button>
						{/each}
					</div>
				{:else if Type === 'Integer'}
					<input
						class="input"
						type="number"
						inputmode="numeric"
						name={Title}
						id={Title}
						placeholder={Title}
						bind:value={$form.properties[Title]}
					/>
				{:else}
					<input
						class="input"
						type="text"
						name={Title}
						id={Title}
						placeholder={Title}
						bind:value={$form.properties[Title]}
					/>
				{/if}
				{#if $errors.properties?.[i]}
					<span class="text-error-400">{$errors.properties?.[i]}</span>
				{/if}
			{/each}
		</div>
		<div class="grid grid-cols-3 place-items-center">
			<label class="label col-span-full" for="quantity"> Quantity </label>
			<button
				type="button"
				class="btn-icon btn-icon-sm variant-soft-primary"
				on:click={() => ($form.quantity = Math.max(0, $form.quantity - 1))}
			>
				<Icon icon="mdi:minus" />
			</button>
			<span>{$form.quantity}</span>
			<button
				type="button"
				class="btn-icon btn-icon-sm variant-soft-primary"
				on:click={() => $form.quantity++}
			>
				<Icon icon="mdi:add" />
			</button>
		</div>
		{#if $errors.quantity}
			<span class="text-error-400">{$errors.quantity?.join(', ')}</span>
		{/if}

		<button class="btn variant-filled-primary" use:loadingButton={{ loading: submitting }}>
			Submit
		</button>
	</form>
</div>
