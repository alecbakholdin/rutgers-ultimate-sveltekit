import { serverClient } from '$lib/server/directus.js';
import type { Cart } from '$lib/types/my-collections.js';
import { readItem } from '@directus/sdk';

export async function load({ locals: { cartId } }) {
	return {
		cart: serverClient.request(readItem('cart', cartId, { fields: ['*.*.*'] })) as Promise<Cart>
	};
}
