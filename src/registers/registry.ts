export type Predicate<I> = (input: I) => boolean;

export class Registry<A, B> {
	_A = undefined as A;
	_B = undefined as B;

	private registered = new Map<A, Predicate<B>>();

	constructor(
		private onRegister: Predicate<A> = () => true,
		private onUnregister: Predicate<A> = () => true,
	) {}

	getItems(input: B, reverse = false) {
		const items = Array.from(this.registered.entries())
			.map(([i, p]) => p(input) && i)
			.filter(Boolean) as A[];
		reverse && items.reverse();
		return items;
	}

	register(item: A, predicate: Predicate<B>) {
		this.onRegister(item) && this.registered.set(item, predicate);
		return item;
	}

	unregister(item: A) {
		this.onUnregister(item) && this.registered.delete(item);
		return item;
	}
}
