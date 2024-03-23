import { S } from "../src/expose/index.js";
export const createIconComponent = ({ icon, iconSize = 16, realIconSize = iconSize, ...props })=>{
    return /*#__PURE__*/ S.React.createElement(S.ReactComponents.UI.Icon, {
        autoMirror: false,
        iconSize: realIconSize,
        viewBox: `0 0 ${iconSize} ${iconSize}`,
        dangerouslySetInnerHTML: {
            __html: icon
        },
        ...props
    });
};
