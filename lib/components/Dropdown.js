import { createIconComponent } from "../createIconComponent.js";
import { S } from "../../index.js";
import { SVGIcons } from "../../src/static.js";
const CheckIcon = ()=>createIconComponent({
        icon: SVGIcons.check
    });
const DropdownMenuItem = ({ option, isActive, onSwitch, children })=>{
    const activeStyle = {
        backgroundColor: "rgba(var(--spice-rgb-selected-row),.1)"
    };
    return /*#__PURE__*/ S.React.createElement(S.ReactComponents.MenuItem, {
        trigger: "click",
        onClick: ()=>onSwitch(option),
        "data-checked": isActive,
        trailingIcon: isActive ? /*#__PURE__*/ S.React.createElement(CheckIcon, null) : undefined,
        style: isActive ? activeStyle : undefined
    }, children);
};
export default function({ options, activeOption, onSwitch }) {
    const { ContextMenu, Menu, TextComponent } = S.ReactComponents;
    const SelectedOption = options[activeOption];
    if (Object.keys(options).length === 1) {
        return /*#__PURE__*/ S.React.createElement("button", {
            className: "w6j_vX6SF5IxSXrrkYw5",
            type: "button",
            role: "combobox",
            "aria-expanded": "false"
        }, /*#__PURE__*/ S.React.createElement(TextComponent, {
            variant: "mesto",
            semanticColor: "textSubdued"
        }, /*#__PURE__*/ S.React.createElement(SelectedOption, {
            preview: true
        })));
    }
    const DropdownMenu = (props)=>{
        return /*#__PURE__*/ S.React.createElement(Menu, props, Object.entries(options).map(([option, Children])=>/*#__PURE__*/ S.React.createElement(DropdownMenuItem, {
                option: option,
                isActive: option === activeOption,
                onSwitch: onSwitch
            }, /*#__PURE__*/ S.React.createElement(Children, null))));
    };
    return /*#__PURE__*/ S.React.createElement(ContextMenu, {
        menu: /*#__PURE__*/ S.React.createElement(DropdownMenu, null),
        trigger: "click"
    }, /*#__PURE__*/ S.React.createElement("button", {
        className: "w6j_vX6SF5IxSXrrkYw5",
        type: "button",
        role: "combobox",
        "aria-expanded": "false"
    }, /*#__PURE__*/ S.React.createElement(TextComponent, {
        variant: "mesto",
        semanticColor: "textSubdued"
    }, /*#__PURE__*/ S.React.createElement(SelectedOption, {
        preview: true
    })), createIconComponent({
        icon: `<path d="m14 6-6 6-6-6h12z" />`
    })));
}
