import { Registry } from "./registry.js";
import { S } from "../expose/index.js";
import { createIconComponent } from "../../lib/createIconComponent.js";
import { registerTransform } from "../../mixin.js";
import { isTouchscreenUi } from "../utils/index.js";
const registry = new class extends Registry {
    register(item, predicate) {
        super.register(item, predicate);
        refreshTopbarRightButtons?.();
        return item;
    }
    unregister(item) {
        super.unregister(item);
        refreshTopbarRightButtons?.();
        return item;
    }
}();
export default registry;
let refreshTopbarRightButtons;
let topbarRightButtonFactoryCtx;
globalThis.__renderTopbarRightButtons = ()=>S.React.createElement(()=>{
        const [refreshCount, refresh] = S.React.useReducer((x)=>x + 1, 0);
        refreshTopbarRightButtons = refresh;
        const topbarRightButtonFactory = isTouchscreenUi() ? TopbarRightButtonRound : TopbarRightButtonSquare;
        if (!topbarRightButtonFactoryCtx) topbarRightButtonFactoryCtx = S.React.createContext(null);
        return /*#__PURE__*/ S.React.createElement(topbarRightButtonFactoryCtx.Provider, {
            value: topbarRightButtonFactory
        }, registry.getItems(undefined, true).map((TopbarRightButton)=>/*#__PURE__*/ S.React.createElement(TopbarRightButton, null)));
    });
registerTransform({
    transform: (emit)=>(str)=>{
            str = str.replace(/("login-button"[^\}]*\}[^\}]*\}[^\}]*\}\))/, "$1,__renderTopbarRightButtons()");
            emit();
            return str;
        },
    glob: /^\/xpui\.js/
});
export const Button = (props)=>{
    const TopbarRightButtonFactory = S.React.useContext(topbarRightButtonFactoryCtx);
    return TopbarRightButtonFactory && /*#__PURE__*/ S.React.createElement(TopbarRightButtonFactory, props);
};
const TopbarRightButtonRound = ({ label, disabled = false, onClick, icon })=>{
    /*#__PURE__*/ S.React.createElement(S.ReactComponents.Tooltip, {
        label: label
    }, /*#__PURE__*/ S.React.createElement(S.ReactComponents.ButtonTertiary, {
        "aria-label": label,
        onClick: onClick,
        size: "small",
        condensedAll: true,
        className: "OomFKn3bsxs5JfNUoWhz"
    }, icon && createIconComponent({
        icon,
        realIconSize: 24,
        iconSize: 16
    })));
};
const TopbarRightButtonSquare = ({ label, disabled = false, onClick, icon })=>/*#__PURE__*/ S.React.createElement(S.ReactComponents.Tooltip, {
        label: label
    }, /*#__PURE__*/ S.React.createElement("button", {
        "aria-label": label,
        className: "encore-over-media-set WtC1lGbmQRplD6JBhNFU",
        onClick: onClick,
        disabled: disabled
    }, icon && createIconComponent({
        icon,
        iconSize: 16
    })));
