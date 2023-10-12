import { serverClient } from '$lib/server/directus.js';
import { readItem } from '@directus/sdk';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

const AddToCartSchema = z.object({
	quantity: z.number().positive().int(),
	properties: z.record(z.string(), z.any())
});

export async function load({ params }) {
	return {
		product: await serverClient.request(readItem('Product', params.productId)),
		addToCartForm: await superValidate(AddToCartSchema)
	};
}

export const actions = {
	async addToCart({ request, locals: { session }, params }) {
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
	}
};
