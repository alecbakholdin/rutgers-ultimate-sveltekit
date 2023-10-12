// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { Session } from 'svelte-kit-cookie-session';

type SessionData = {
	cartId: string;
}

// and what to do when importing types
declare global {
	namespace App {
		interface Locals {
			cartId: string;
		}
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
}

export {};