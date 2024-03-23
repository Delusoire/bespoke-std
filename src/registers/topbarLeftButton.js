import { Registry } from "./registry.js";
import { S } from "../expose/index.js";
import { createIconComponent } from "../../lib/createIconComponent.js";
import { registerTransform } from "../../mixin.js";
import { isTouchscreenUi } from "../utils/index.js";
const registry = new class extends Registry {
    register(item, predicate) {
        super.register(item, predicate);
        refreshTopbarLeftButtons?.();
        return item;
    }
    unregister(item) {
        super.unregister(item);
        refreshTopbarLeftButtons?.();
        return item;
    }
}();
export default registry;
let refreshTopbarLeftButtons;
let topbarLeftButtonFactoryCtx;
globalThis.__renderTopbarLeftButtons = ()=>S.React.createElement(()=>{
        const [refreshCount, refresh] = S.React.useReducer((x)=>x + 1, 0);
        refreshTopbarLeftButtons = refresh;
        const topbarLeftButtonFactory = isTouchscreenUi() ? TopbarLeftButtonRound : TopbarLeftButtonSquare;
        if (!topbarLeftButtonFactoryCtx) topbarLeftButtonFactoryCtx = S.React.createContext(null);
        return /*#__PURE__*/ S.React.createElement(topbarLeftButtonFactoryCtx.Provider, {
            value: topbarLeftButtonFactory
        }, registry.getItems().map((TopbarLeftButton)=>/*#__PURE__*/ S.React.createElement(TopbarLeftButton, null)));
    });
registerTransform({
    transform: (emit)=>(str)=>{
            str = str.replace(/("top-bar-forward-button"[^\]]*)/g, "$1,__renderTopbarLeftButtons()");
            emit();
            return str;
        },
    glob: /^\/xpui\.js/
});
export const Button = (props)=>{
    const TopbarLeftButtonFactory = S.React.useContext(topbarLeftButtonFactoryCtx);
    return TopbarLeftButtonFactory && /*#__PURE__*/ S.React.createElement(TopbarLeftButtonFactory, props);
};
const TopbarLeftButtonRound = ({ label, disabled = false, onClick, icon })=>/*#__PURE__*/ S.React.createElement(S.ReactComponents.Tooltip, {
        label: label
    }, /*#__PURE__*/ S.React.createElement(S.ReactComponents.UI.ButtonTertiary, {
        size: "medium",
        iconOnly: ()=>icon && createIconComponent({
                icon,
                iconSize: 16,
                realIconSize: 24
            }),
        condensed: true,
        "aria-label": label,
        disabled: disabled,
        onClick: onClick,
        className: "rBX1EWVZ2EaPwP4y1Gkd"
    }));
const TopbarLeftButtonSquare = ({ label, disabled = false, onClick, icon })=>/*#__PURE__*/ S.React.createElement(S.ReactComponents.Tooltip, {
        label: label
    }, /*#__PURE__*/ S.React.createElement("button", {
        "aria-label": label,
        disabled: disabled,
        className: "ql0zZd7giPXSnPg75NR0",
        onClick: onClick
    }, icon && createIconComponent({
        icon,
        iconSize: 16,
        className: "IYDlXmBmmUKHveMzIPCF"
    })));
