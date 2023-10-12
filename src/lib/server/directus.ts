import { DIRECTUS_ADMIN_EMAIL, DIRECTUS_ADMIN_PASSWORD } from '$env/static/private';
import { PUBLIC_DIRECTUS_URL } from '$env/static/public';
import type { DirectusCollections } from '$lib/types/my-collections';
import { authentication, createDirectus, rest, type AuthenticationClient } from '@directus/sdk';

async function initServerClient() {
	const client = createDirectus<DirectusCollections>(PUBLIC_DIRECTUS_URL)
		.with(rest())
		.with(authentication());
	await login(client);
	return client;
}
export const serverClient = await initServerClient();

async function login(client: AuthenticationClient<DirectusCollections>) {
    await client.login(DIRECTUS_ADMIN_EMAIL, DIRECTUS_ADMIN_PASSWORD);
    setTimeout(() => login(client), 120_000)
}
