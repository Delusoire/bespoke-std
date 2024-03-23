import { Registry } from "./registry.js";
import { S } from "../expose/index.js";
import { findMatchingPos } from "/hooks/util.js";
import { createIconComponent } from "../../lib/createIconComponent.js";
import { registerTransform } from "../../mixin.js";
const registry = new class extends Registry {
    register(item, predicate) {
        super.register(item, predicate);
        refreshNavLinks?.();
        return item;
    }
    unregister(item) {
        super.unregister(item);
        refreshNavLinks?.();
        return item;
    }
}();
export default registry;
let refreshNavLinks;
let navLinkFactoryCtx;
globalThis.__renderNavLinks = (isTouchscreenUi)=>S.React.createElement(()=>{
        const [refreshCount, refresh] = S.React.useReducer((x)=>x + 1, 0);
        refreshNavLinks = refresh;
        const navLinkFactory = isTouchscreenUi ? NavLinkGlobal : NavLinkSidebar;
        if (!navLinkFactoryCtx) navLinkFactoryCtx = S.React.createContext(null);
        return /*#__PURE__*/ S.React.createElement(navLinkFactoryCtx.Provider, {
            value: navLinkFactory
        }, registry.getItems().map((NavLink)=>/*#__PURE__*/ S.React.createElement(NavLink, null)));
    });
registerTransform({
    transform: (emit)=>(str)=>{
            const j = str.search(/\("li",\{[^\{]*\{[^\{]*\{to:"\/search/);
            const i = findMatchingPos(str, j, 1, [
                "(",
                ")"
            ], 1);
            str = `${str.slice(0, i)},__renderNavLinks(false)${str.slice(i)}`;
            str = str.replace(/(,[a-zA-Z_\$][\w\$]*===(?:[a-zA-Z_\$][\w\$]*\.){2}HOME_NEXT_TO_NAVIGATION&&.+?)\]/, "$1,__renderNavLinks(true)]");
            emit();
            return str;
        },
    glob: /^\/xpui\.js/
});
export const NavLink = ({ localizedApp, appRoutePath, icon, activeIcon })=>{
    const isActive = S.Platform.getHistory().location.pathanme?.startsWith(appRoutePath);
    const createIcon = ()=>createIconComponent({
            icon: isActive ? activeIcon : icon,
            iconSize: 24
        });
    const NavLinkFactory = S.React.useContext(navLinkFactoryCtx);
    return NavLinkFactory && /*#__PURE__*/ S.React.createElement(NavLinkFactory, {
        localizedApp: localizedApp,
        appRoutePath: appRoutePath,
        createIcon: createIcon,
        isActive: isActive
    });
};
export const NavLinkSidebar = ({ localizedApp, appRoutePath, createIcon, isActive })=>{
    const isSidebarCollapsed = S.Platform.getLocalStorageAPI().getItem("ylx-sidebar-state") === 1;
    return /*#__PURE__*/ S.React.createElement("li", {
        className: "LU0q0itTx2613uiATSig InvalidDropTarget"
    }, /*#__PURE__*/ S.React.createElement(S.ReactComponents.Tooltip, {
        label: isSidebarCollapsed ? localizedApp : null,
        disabled: !isSidebarCollapsed,
        placement: "right"
    }, /*#__PURE__*/ S.React.createElement(S.ReactComponents.Nav, {
        to: appRoutePath,
        referrer: "other",
        className: S.classnames("link-subtle", "UYeKN11KAw61rZoyjcgZ", {
            "DzWw3g4E_66wu9ktqn36": isActive
        }),
        onClick: ()=>undefined,
        "aria-label": localizedApp
    }, createIcon(), !isSidebarCollapsed && /*#__PURE__*/ S.React.createElement(S.ReactComponents.Text, {
        variant: "bodyMediumBold"
    }, localizedApp))));
};
export const NavLinkGlobal = ({ localizedApp, appRoutePath, createIcon, isActive })=>{
    return /*#__PURE__*/ S.React.createElement(S.ReactComponents.Tooltip, {
        label: localizedApp
    }, /*#__PURE__*/ S.React.createElement(S.ReactComponents.ButtonTertiary, {
        iconOnly: createIcon,
        className: S.classnames("bWBqSiXEceAj1SnzqusU", "jdlOKroADlFeZZQeTdp8", "cUwQnQoE3OqXqSYLT0hv", {
            voA9ZoTTlPFyLpckNw3S: isActive
        }),
        "aria-label": localizedApp,
        onClick: ()=>S.Platform.getHistory().push(appRoutePath)
    }));
};
