import { S } from "../src/expose/index.js";
export const createIconComponent = ({ icon, realIconSize = 16, iconSize = 16, ...props })=>{
    return /*#__PURE__*/ S.React.createElement(S.ReactComponents.IconComponent, {
        autoMirror: false,
        iconSize: realIconSize ?? iconSize,
        viewBox: `0 0 ${iconSize} ${iconSize}`,
        dangerouslySetInnerHTML: {
            __html: icon
        },
        ...props
    });
};
