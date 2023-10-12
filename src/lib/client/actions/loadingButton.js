/** @type {import("svelte/action").Action<HTMLButtonElement, {loading: import("svelte/store").Readable<boolean>}>} */
export function loadingButton(node, { loading }) {
	/** @type {string} */
	let innerHTML = node.innerHTML;
	/** @type {number} */
	let width = node.clientWidth;
	/** @type {number} */
	let height = node.clientHeight;

	loading.subscribe((update) => {
		if (update) {
			innerHTML = node.innerHTML;
			width = node.clientWidth;
		}
		node.innerHTML = update ? '<iconify-icon icon="eos-icons:loading" >' : innerHTML;
		node.style.width = update ? `${width}px` : '';
        node.style.height = update ? `${height}px` : '';
        node.disabled = update;
	});
	return {};
}
