import { _ } from "/modules/Delusoire/stdlib/deps.js";
import { S } from "/modules/Delusoire/stdlib/index.js";
const { React } = S;

export interface FilterOption {
	key: string;
	filter: {
		"": React.ReactNode;
	};
}

export interface ChipFilterProps {
	availableFilters: FilterOption[];
	selectedFilters: FilterOption[];
	toggleFilter: (filter: FilterOption) => void;
	className?: string;
}
export const ChipFilter = React.memo(({ availableFilters, selectedFilters, toggleFilter, className }: ChipFilterProps) => {
	const createChip = isSelected => (filter, index) => (
		<S.ReactComponents.Chip
			onClick={() => toggleFilter(filter)}
			selectedColorSet="invertedLight"
			selected={isSelected}
			secondary={isSelected && index > 0}
			style={{ marginBlockEnd: 0, willChange: "transform, opacity" }}
			tabIndex={-1}
			index={index}
			key={filter.key}
		>
			{filter.filter[""]}
		</S.ReactComponents.Chip>
	);

	return (
		selectedFilters.length + availableFilters.length > 0 && (
			<S.ReactComponents.ScrollableContainer className={className} ariaLabel={"Filter options"}>
				{selectedFilters.map(createChip(true))}
				{availableFilters.map(createChip(false))}
			</S.ReactComponents.ScrollableContainer>
		)
	);
});
