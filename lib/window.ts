export const xfetch = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
	let url: string;
	if (typeof input === "string") {
		url = input;
	} else if (input instanceof Request) {
		url = input.url;
	} else if (input instanceof URL) {
		url = input.href;
	} else {
		throw "Unsupported input type";
	}

	init ??= {};

	let headers: Headers;
	if (init.headers) {
		headers = new Headers(init.headers);
	} else if (input instanceof Request) {
		headers = input.headers;
	} else {
		headers = new Headers();
	}

	const _headers = new Headers();
	_headers.set("X-Set-Headers", JSON.stringify(Object.fromEntries(headers.entries())));

	init.headers = _headers;

	if (input instanceof Request) {
		// @ts-ignore
		input.duplex = "half";
	}

	const request = new Request(`https://bespoke-proxy.delusoire.workers.dev/mitm/${url}`, input instanceof Request ? input : undefined);

	return fetch(request, init);
};
