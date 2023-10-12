import { PUBLIC_DIRECTUS_URL } from '$env/static/public';
import type { DirectusCollections } from '$lib/types/my-collections';
import { createDirectus, graphql, rest } from '@directus/sdk';

export const serverClient = createDirectus<DirectusCollections>(PUBLIC_DIRECTUS_URL).with(rest());
