import { SERVER_SECRET } from '$env/static/private';
import { handleSession } from 'svelte-kit-cookie-session';

export const handle = handleSession({
	init: () => ({ data: { cartId: crypto.randomUUID() } }),
	secret: SERVER_SECRET
});
