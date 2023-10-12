import { PUBLIC_DIRECTUS_URL } from '$env/static/public';
import type { DirectusCollections, components } from '$lib/types/my-collections';
import { createDirectus, rest } from '@directus/sdk';

const url = PUBLIC_DIRECTUS_URL;
export const client = createDirectus<DirectusCollections>(url).with(rest());
export function getImageUrl(file?: string | components['schemas']['Files'] | null) {
	const id = typeof file === 'string' ? file : file?.id;
	return id ? `${url}/assets/${id}` : undefined;
}
