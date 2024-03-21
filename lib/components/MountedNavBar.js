import { S } from "../../index.js";
const { ReactDOM } = S;
const NavToChip = ({ to, title, selected, onClick })=>/*#__PURE__*/ S.React.createElement(S.ReactComponents.NavTo, {
        replace: true,
        to: to,
        tabIndex: -1,
        onClick: onClick,
        className: "ZWI7JsjzJaR_G8Hy4W6J"
    }, /*#__PURE__*/ S.React.createElement(S.ReactComponents.Chip, {
        selected: selected,
        selectedColorSet: "invertedLight",
        tabIndex: -1
    }, title));
const NavBar = ({ categories, selectedCategory })=>/*#__PURE__*/ S.React.createElement("div", {
        className: "fVB_YDdnaDlztX7CcWTA"
    }, /*#__PURE__*/ S.React.createElement("div", {
        className: "e179_Eg8r7Ub6yjjxctr contentSpacing"
    }, /*#__PURE__*/ S.React.createElement("div", {
        className: "VIeVCUUETJyYPCDpsBif"
    }, /*#__PURE__*/ S.React.createElement(S.ReactComponents.ScrollableContainer, null, categories.map((category)=>/*#__PURE__*/ S.React.createElement(NavToChip, {
            to: `spotify:app:stats:${category}`,
            title: category,
            selected: category === selectedCategory
        }, category))))));
const TopBarMounted = ({ children })=>{
    const { enableGlobalNavBar } = S.Platform.getLocalStorageAPI().getItem("remote-config-overrides");
    const isTouchscreenUi = enableGlobalNavBar === "home-next-to-navigation" || enableGlobalNavBar === "home-next-to-search";
    const component = /*#__PURE__*/ S.React.createElement("div", {
        className: "main-topbar-topbarContent",
        style: {
            pointerEvents: "all"
        }
    }, children);
    return isTouchscreenUi ? component : ReactDOM.createPortal(component, document.querySelector(".rovbQsmAS_mwvpKHaVhQ"));
};
export const TopNavBar = (props)=>/*#__PURE__*/ S.React.createElement(TopBarMounted, null, /*#__PURE__*/ S.React.createElement(NavBar, props));
