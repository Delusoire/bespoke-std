import { Registry } from "./registry.js";
import { registerTransform } from "../../mixin.js";
const registry = new Registry();
export default registry;
globalThis.__renderSettingSections = registry.getItems.bind(registry);
registerTransform({
	transform: emit => str => {
		str = str.replace(
			/(\(0,[a-zA-Z_\$][\w\$]*\.jsx\)\([a-zA-Z_\$][\w\$]*,{settings:[a-zA-Z_\$][\w\$]*,setValue:[a-zA-Z_\$][\w\$]*}\))]/,
			"$1,...__renderSettingSections()]",
		);
		emit();
		return str;
	},
	glob: /^\/xpui\.js/,
});
