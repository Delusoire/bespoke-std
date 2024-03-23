import { S } from "../src/expose/index.js";

export const createIconComponent = ({
	icon,
	iconSize = 16,
	realIconSize = iconSize,
	...props
}: { [k: string]: any; icon: string; realIconSize?: number; iconSize?: number }) => {
	return (
		<S.ReactComponents.UI.Icon
			autoMirror={false}
			iconSize={realIconSize}
			viewBox={`0 0 ${iconSize} ${iconSize}`}
			dangerouslySetInnerHTML={{ __html: icon }}
			{...props}
		/>
	);
};
