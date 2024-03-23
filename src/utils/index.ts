import { S } from "../expose/index.js";

export const isTouchscreenUi = () => {
	const { enableGlobalNavBar } = S.Platform?.getLocalStorageAPI()?.getItem("remote-config-overrides") ?? {};
	return enableGlobalNavBar === "home-next-to-navigation" || enableGlobalNavBar === "home-next-to-search";
};
