import { serverClient } from '$lib/server/directus.js';
import type { Cart, NewLineItem } from '$lib/types/my-collections';
import { readItem, updateItem } from '@directus/sdk';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';
import { AddToCartSchema } from './addToCart';

export const actions = {
	async addToCart({ request, locals: { cartId }, params }) {
		const form = await superValidate(request, AddToCartSchema);
		const product = await serverClient.request(readItem('Product', params.productId));
		product.properties?.forEach((property, i) => {
			if (!form.data.properties[property.Title] && property.Required) {
				form.errors.properties = form.errors.properties || [];
				form.errors.properties[i] = `Missing required field ${property.Title}`;
				form.valid = false;
			}
		});
		if (!form.valid) return fail(400, { form });

		const lineItem: NewLineItem = {
			product: params.productId,
			properties: Object.entries(form.data.properties).map(([Key, Value]) => ({ Key, Value })),
			quantity: form.data.quantity
		};
		const cart = await serverClient.request(readItem('cart', cartId));
		const matchingItem = getMatchingLineItem(cart, lineItem);
		if (matchingItem) {
			matchingItem.quantity += form.data.quantity;
			await serverClient.request(updateItem('cart', cartId, cart));
		} else {
			await serverClient.request(
				updateItem('cart', cartId, { line_items: [...(cart.line_items || []), lineItem] })
			);
		}
	}
};

function getMatchingLineItem(cart: Cart, lineItem: NewLineItem) {
	const potentialMatches =
		cart.line_items?.filter((x) => x.properties?.length === lineItem.properties?.length) || [];
	for (const match of potentialMatches) {
		const matchProperties = match.properties || [];
		for (const property of lineItem.properties || []) {
			if (!matchProperties.find((x) => x.Key === property.Key && x.Value === property.Value)) {
				break;
			}
		}
		return match;
	}
	return undefined;
}
