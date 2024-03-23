import { createIconComponent } from "../createIconComponent.js";
import { S } from "../../index.js";
import { SVGIcons } from "../../src/static.js";

const CheckIcon = () =>
	createIconComponent({
		icon: SVGIcons.check,
	});

interface MenuItemProps {
	option: string;
	isActive: boolean;
	onSwitch: (option: string) => void;
	children: React.ReactNode;
}
const DropdownMenuItem = ({ option, isActive, onSwitch, children }: MenuItemProps) => {
	const activeStyle = {
		backgroundColor: "rgba(var(--spice-rgb-selected-row),.1)",
	};

	return (
		<S.ReactComponents.MenuItem
			trigger="click"
			onClick={() => onSwitch(option)}
			data-checked={isActive}
			trailingIcon={isActive ? <CheckIcon /> : undefined}
			style={isActive ? activeStyle : undefined}
		>
			{children}
		</S.ReactComponents.MenuItem>
	);
};

export interface OptionProps {
	preview?: boolean;
}
export type DropdownOptions = Record<string, React.FC<OptionProps>>;

interface DropdownMenuProps<O extends DropdownOptions> {
	options: O;
	activeOption: keyof O;
	onSwitch: (option: keyof O) => void;
}
export default function <O extends DropdownOptions>({ options, activeOption, onSwitch }: DropdownMenuProps<O>) {
	const SelectedOption: React.FC<OptionProps> = options[activeOption];

	if (Object.keys(options).length === 1) {
		return (
			<button className="x-sortBox-sortDropdown" type="button" role="combobox" aria-expanded="false">
				<S.ReactComponents.UI.Type variant="mesto" semanticColor="textSubdued">
					<SelectedOption preview />
				</S.ReactComponents.UI.Type>
			</button>
		);
	}

	const DropdownMenu = props => {
		return (
			<S.ReactComponents.Menu {...props}>
				{Object.entries(options).map(([option, Children]) => (
					<DropdownMenuItem option={option} isActive={option === activeOption} onSwitch={onSwitch}>
						<Children />
					</DropdownMenuItem>
				))}
			</S.ReactComponents.Menu>
		);
	};

	return (
		<S.ReactComponents.ContextMenu menu={<DropdownMenu />} trigger="click">
			<button className="x-sortBox-sortDropdown" type="button" role="combobox" aria-expanded="false">
				<S.ReactComponents.UI.Type variant="mesto" semanticColor="textSubdued">
					<SelectedOption preview />
				</S.ReactComponents.UI.Type>
				{createIconComponent({ icon: `<path d="m14 6-6 6-6-6h12z" />` })}
			</button>
		</S.ReactComponents.ContextMenu>
	);
}
