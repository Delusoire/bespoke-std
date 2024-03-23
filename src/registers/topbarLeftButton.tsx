import { type Predicate, Registry } from "./registry.js";
import { S } from "../expose/index.js";
import { createIconComponent } from "../../lib/createIconComponent.js";
import { registerTransform } from "../../mixin.js";
import { isTouchscreenUi } from "../utils/index.js";

const registry = new (class extends Registry<React.FC, void> {
	register(item: React.FC, predicate: Predicate<void>): React.FC {
		super.register(item, predicate);
		refreshTopbarLeftButtons?.();
		return item;
	}

	unregister(item: React.FC): React.FC {
		super.unregister(item);
		refreshTopbarLeftButtons?.();
		return item;
	}
})();
export default registry;

let refreshTopbarLeftButtons: React.DispatchWithoutAction | undefined;

let topbarLeftButtonFactoryCtx: React.Context<React.FC<TopbarLeftButtonProps>>;
globalThis.__renderTopbarLeftButtons = () =>
	S.React.createElement(() => {
		const [refreshCount, refresh] = S.React.useReducer(x => x + 1, 0);
		refreshTopbarLeftButtons = refresh;

		const topbarLeftButtonFactory = isTouchscreenUi() ? TopbarLeftButtonRound : TopbarLeftButtonSquare;

		if (!topbarLeftButtonFactoryCtx) topbarLeftButtonFactoryCtx = S.React.createContext<React.FC<TopbarLeftButtonProps> | null>(null);

		return (
			<topbarLeftButtonFactoryCtx.Provider value={topbarLeftButtonFactory}>
				{registry.getItems().map(TopbarLeftButton => (
					<TopbarLeftButton />
				))}
			</topbarLeftButtonFactoryCtx.Provider>
		);
	});
registerTransform({
	transform: emit => str => {
		str = str.replace(/("top-bar-forward-button"[^\]]*)/g, "$1,__renderTopbarLeftButtons()");
		emit();
		return str;
	},
	glob: /^\/xpui\.js/,
});

type TopbarLeftButtonProps = { label: string; disabled?: boolean; onClick: () => void; icon?: string };
export const Button = (props: TopbarLeftButtonProps) => {
	const TopbarLeftButtonFactory = S.React.useContext(topbarLeftButtonFactoryCtx);
	return TopbarLeftButtonFactory && <TopbarLeftButtonFactory {...props} />;
};

const TopbarLeftButtonRound = ({ label, disabled = false, onClick, icon }: TopbarLeftButtonProps) => (
	<S.ReactComponents.Tooltip label={label}>
		<S.ReactComponents.UI.ButtonTertiary
			size="medium"
			iconOnly={() => icon && createIconComponent({ icon, realIconSize: 24, iconSize: 16 })}
			condensed
			aria-label={label}
			disabled={disabled}
			onClick={onClick}
			className="rBX1EWVZ2EaPwP4y1Gkd"
		/>
	</S.ReactComponents.Tooltip>
);

const TopbarLeftButtonSquare = ({ label, disabled = false, onClick, icon }: TopbarLeftButtonProps) => (
	<S.ReactComponents.Tooltip label={label}>
		<button aria-label={label} disabled={disabled} className="ql0zZd7giPXSnPg75NR0" onClick={onClick}>
			{icon && createIconComponent({ icon, iconSize: 16, className: "main-topBar-icon" })}
		</button>
	</S.ReactComponents.Tooltip>
);
