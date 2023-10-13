<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { AppBar, AppShell, LightSwitch } from '@skeletonlabs/skeleton';
	import '../app.postcss';
	import Icon from '@iconify/svelte';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	export let data;
	$: cartQuantity = data.cart?.line_items?.reduce((t, { quantity }) => t + quantity, 0) ?? 0;
</script>

<!-- App Shell -->
<AppShell slotPageContent="pt-8">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/"><strong class="text-xl uppercase">Rutgers Ultimate</strong></a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a class="relative" href="/cart">
					<Icon icon="mdi:cart" class="text-3xl text-primary" />
					<span class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-6 h-6 text-center rounded-full bg-surface-400">{cartQuantity}</span>
				</a>
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
