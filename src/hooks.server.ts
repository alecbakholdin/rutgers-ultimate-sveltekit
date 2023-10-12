import { DIRECTUS_ADMIN_EMAIL, DIRECTUS_ADMIN_PASSWORD, SERVER_SECRET } from '$env/static/private';
import { serverClient } from '$lib/server/directus';
import { createItem } from '@directus/sdk';
import jwt from 'jsonwebtoken';

export async function handle({ event, resolve }) {
	const cookie = event.cookies.get('Authorization');
	try {
		const jwtResponse = jwt.verify(cookie!, SERVER_SECRET);
		event.locals.cartId = typeof jwtResponse === 'string' ? jwtResponse : '';
	} catch {
		const cartId = crypto.randomUUID();
		event.locals.cartId = cartId;
		event.cookies.set('Authorization', jwt.sign(cartId, SERVER_SECRET), {
			path: '/',
			maxAge: 86_400 * 365
		});
		await serverClient.request(createItem('cart', { id: cartId }));
	}

	console.log(event.locals);
	return resolve(event);
}

function decodeAndVerify(cookieStr: string) {
	try {
		jwt.verify(cookieStr, SERVER_SECRET);
		return true;
	} catch {
		return false;
	}
}
