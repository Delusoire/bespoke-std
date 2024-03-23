import { S } from "/modules/Delusoire/stdlib/index.js";
const { React } = S;
export const ChipFilter = React.memo(({ availableFilters, selectedFilters, toggleFilter, className })=>{
    const createChip = (isSelected)=>(filter, index)=>/*#__PURE__*/ S.React.createElement(S.ReactComponents.UI.Chip, {
                onClick: ()=>toggleFilter(filter),
                selectedColorSet: "invertedLight",
                selected: isSelected,
                secondary: isSelected && index > 0,
                style: {
                    marginBlockEnd: 0,
                    willChange: "transform, opacity"
                },
                tabIndex: -1,
                index: index,
                key: filter.key
            }, filter.filter[""]);
    return selectedFilters.length + availableFilters.length > 0 && /*#__PURE__*/ S.React.createElement(S.ReactComponents.ScrollableContainer, {
        className: className,
        ariaLabel: "Filter options"
    }, selectedFilters.map(createChip(true)), availableFilters.map(createChip(false)));
});
