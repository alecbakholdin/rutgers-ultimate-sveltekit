import { serverClient } from '$lib/server/directus';
import { readItems } from '@directus/sdk';

export async function load() {
	return { products: await serverClient.request(readItems('Product')) };
}
