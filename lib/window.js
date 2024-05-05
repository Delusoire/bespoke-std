export const xfetch = (input, init)=>{
    let url;
    if (typeof input === "string") {
        url = new URL(input);
    } else if (input instanceof Request) {
        url = new URL(input.url);
    } else if (input instanceof URL) {
        url = input;
    } else {
        throw "Unsupported input type";
    }
    url.host += ".proxy.delusoire.top";
    init ??= {};
    let headers;
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
    const request = new Request(url, input instanceof Request ? input : undefined);
    return fetch(request, init);
};
