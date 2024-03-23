import { S } from "../src/expose/index.js";

export const createIconComponent = ({
	icon,
	realIconSize,
	iconSize = 16,
	...props
}: { [k: string]: any; icon: string; realIconSize?: number; iconSize?: number }) => {
	return (
		<S.ReactComponents.IconComponent
			autoMirror={false}
			iconSize={realIconSize ?? iconSize}
			viewBox={`0 0 ${iconSize} ${iconSize}`}
			dangerouslySetInnerHTML={{ __html: icon }}
			{...props}
		/>
	);
};
