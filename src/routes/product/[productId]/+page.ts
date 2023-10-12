import { client } from '$lib/client/directus.js';
import { readItem } from '@directus/sdk';
import { superValidate } from 'sveltekit-superforms/client';
import { AddToCartSchema } from './addToCart';

export async function load({ params }) {
	return {
		addToCartForm: await superValidate(AddToCartSchema),
		product: await client.request(readItem('Product', params.productId))
	};
}
