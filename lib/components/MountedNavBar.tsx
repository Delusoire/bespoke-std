import { S } from "../../index.js";
import { isTouchscreenUi } from "../../src/utils/index.js";
const { ReactDOM } = S;

const NavToChip = ({ to, title, selected, onClick }) => (
	<S.ReactComponents.NavTo replace={true} to={to} tabIndex={-1} onClick={onClick} className="ZWI7JsjzJaR_G8Hy4W6J">
		<S.ReactComponents.Chip selected={selected} selectedColorSet="invertedLight" tabIndex={-1}>
			{title}
		</S.ReactComponents.Chip>
	</S.ReactComponents.NavTo>
);

export interface NavBarProps {
	categories: string[];
	selectedCategory: string;
}
const NavBar = ({ categories, selectedCategory }: NavBarProps) => (
	<div className="fVB_YDdnaDlztX7CcWTA">
		<div className="e179_Eg8r7Ub6yjjxctr contentSpacing">
			<div className="VIeVCUUETJyYPCDpsBif">
				<S.ReactComponents.ScrollableContainer>
					{categories.map(category => (
						<NavToChip to={`spotify:app:stats:${category}`} title={category} selected={category === selectedCategory}>
							{category}
						</NavToChip>
					))}
				</S.ReactComponents.ScrollableContainer>
			</div>
		</div>
	</div>
);

const TopBarMounted = ({ children }) => {
	const touchscreenUi = isTouchscreenUi();

	const component = (
		<div className="main-topbar-topbarContent" style={{ pointerEvents: "all" }}>
			{children}
		</div>
	);

	return touchscreenUi ? component : ReactDOM.createPortal(component, document.querySelector(".main-topBar-topbarContentWrapper"));
};

export const TopNavBar = (props: NavBarProps) => (
	<TopBarMounted>
		<NavBar {...props} />
	</TopBarMounted>
);
