import { Registry } from "./registry.js";
import { registerTransform } from "../../mixin.js";

const registry = new Registry<React.ReactElement, void>();
export default registry;

globalThis.__renderRoutes = registry.getItems.bind(registry);
registerTransform({
	transform: emit => str => {
		str = str.replace(
			/(\(0,[a-zA-Z_\$][\w\$]*\.jsx\)\([a-zA-Z_\$][\w\$]*\.[a-zA-Z_\$][\w\$]*,\{[^\{]*path:"\/search\/\*")/,
			"...__renderRoutes(),$1",
		);
		emit();
		return str;
	},
	glob: /^\/xpui\.js/,
});
