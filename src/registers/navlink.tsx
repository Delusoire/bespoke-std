import { type Predicate, Registry } from "./registry.js";
import { S } from "../expose/index.js";
import { findMatchingPos } from "/hooks/util.js";
import { createIconComponent } from "../../lib/createIconComponent.js";
import { registerTransform } from "../../mixin.js";

const registry = new (class extends Registry<React.FC, void> {
	register(item: React.FC, predicate: Predicate<void>): React.FC {
		super.register(item, predicate);
		refreshNavLinks?.();
		return item;
	}

	unregister(item: React.FC): React.FC {
		super.unregister(item);
		refreshNavLinks?.();
		return item;
	}
})();
export default registry;

let refreshNavLinks: React.DispatchWithoutAction | undefined;

let navLinkFactoryCtx: React.Context<React.FC<NavLinkFactoryProps>>;
globalThis.__renderNavLinks = (isTouchscreenUi: boolean) =>
	S.React.createElement(() => {
		const [refreshCount, refresh] = S.React.useReducer(x => x + 1, 0);
		refreshNavLinks = refresh;

		const navLinkFactory = isTouchscreenUi ? NavLinkGlobal : NavLinkSidebar;

		if (!navLinkFactoryCtx) navLinkFactoryCtx = S.React.createContext<React.FC<NavLinkFactoryProps> | null>(null);

		return (
			<navLinkFactoryCtx.Provider value={navLinkFactory}>
				{registry.getItems().map(NavLink => (
					<NavLink />
				))}
			</navLinkFactoryCtx.Provider>
		);
	});
registerTransform({
	transform: emit => str => {
		const j = str.search(/\("li",\{[^\{]*\{[^\{]*\{to:"\/search/);
		const i = findMatchingPos(str, j, 1, ["(", ")"], 1);

		str = `${str.slice(0, i)},__renderNavLinks(false)${str.slice(i)}`;

		str = str.replace(/(,[a-zA-Z_\$][\w\$]*===(?:[a-zA-Z_\$][\w\$]*\.){2}HOME_NEXT_TO_NAVIGATION&&.+?)\]/, "$1,__renderNavLinks(true)]");

		emit();
		return str;
	},
	glob: /^\/xpui\.js/,
});

export type NavLinkProps = { localizedApp: string; appRoutePath: string; icon: string; activeIcon: string };
export const NavLink = ({ localizedApp, appRoutePath, icon, activeIcon }: NavLinkProps) => {
	const isActive = S.Platform.getHistory().location.pathanme?.startsWith(appRoutePath);
	const createIcon = () => createIconComponent({ icon: isActive ? activeIcon : icon, iconSize: 24 });

	const NavLinkFactory = S.React.useContext(navLinkFactoryCtx);

	return NavLinkFactory && <NavLinkFactory localizedApp={localizedApp} appRoutePath={appRoutePath} createIcon={createIcon} isActive={isActive} />;
};

interface NavLinkFactoryProps {
	localizedApp: string;
	appRoutePath: string;
	createIcon: () => React.ReactNode;
	isActive: boolean;
}

export const NavLinkSidebar = ({ localizedApp, appRoutePath, createIcon, isActive }: NavLinkFactoryProps) => {
	const isSidebarCollapsed = S.Platform.getLocalStorageAPI().getItem("ylx-sidebar-state") === 1;

	return (
		<li className="main-yourLibraryX-navItem InvalidDropTarget">
			<S.ReactComponents.Tooltip label={isSidebarCollapsed ? localizedApp : null} disabled={!isSidebarCollapsed} placement="right">
				<S.ReactComponents.Nav
					to={appRoutePath}
					referrer="other"
					className={S.classnames("link-subtle", "main-yourLibraryX-navLink", {
						"main-yourLibraryX-navLinkActive": isActive,
					})}
					onClick={() => undefined}
					aria-label={localizedApp}
				>
					{createIcon()}
					{!isSidebarCollapsed && <S.ReactComponents.Text variant="bodyMediumBold">{localizedApp}</S.ReactComponents.Text>}
				</S.ReactComponents.Nav>
			</S.ReactComponents.Tooltip>
		</li>
	);
};

export const NavLinkGlobal = ({ localizedApp, appRoutePath, createIcon, isActive }: NavLinkFactoryProps) => {
	return (
		<S.ReactComponents.Tooltip label={localizedApp}>
			<S.ReactComponents.ButtonTertiary
				iconOnly={createIcon}
				className={S.classnames("bWBqSiXEceAj1SnzqusU", "jdlOKroADlFeZZQeTdp8", "cUwQnQoE3OqXqSYLT0hv", {
					voA9ZoTTlPFyLpckNw3S: isActive,
				})}
				aria-label={localizedApp}
				onClick={() => S.Platform.getHistory().push(appRoutePath)}
			/>
		</S.ReactComponents.Tooltip>
	);
};
