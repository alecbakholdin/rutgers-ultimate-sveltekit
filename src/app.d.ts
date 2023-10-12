// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { Session } from 'svelte-kit-cookie-session';

interface SessionData {
	cartId: string;
}

// and what to do when importing types
declare global {
	declare namespace App {
		interface Locals {
			session: Session<SessionData>;
		}
		interface PageData {
			session: Session<SessionData>;
		}
		// interface Error {}
		// interface Platform {}
	}
}
