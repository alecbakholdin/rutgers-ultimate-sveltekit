import { serverClient } from '$lib/server/directus.js';
import { readItem, updateItem } from '@directus/sdk';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

const ChangeQuantitySchema = z.object({
	lineItemIndex: z.number(),
	quantity: z.number().nonnegative()
});

export async function load() {
	return {
		changeQuantityForm: await superValidate(ChangeQuantitySchema)
	};
}

export const actions = {
	async changeQuantity({ request, locals: { cartId } }) {
		const form = await superValidate(request, ChangeQuantitySchema);
		if (!form.valid) return fail(400, { form });
		console.log(form.data);

		const { lineItemIndex, quantity } = form.data;
		const cart = await serverClient.request(readItem('cart', cartId, { fields: ['line_items'] }));
		const lineItems: number[] = (cart.line_items as unknown as number[]) || [];
		if (form.data.lineItemIndex >= lineItems.length) {
			return fail(400, { form });
		}

		if (!quantity) {
			lineItems.splice(lineItemIndex, 1);
			await serverClient.request(updateItem('cart', cartId, cart));
		} else {
			await serverClient.request(updateItem('line_item', lineItems[lineItemIndex], { quantity }));
		}
	}
};
