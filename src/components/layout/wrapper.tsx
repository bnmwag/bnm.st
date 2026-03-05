import type { LenisOptions } from "lenis";
import type { ComponentProps, FC } from "react";
import { Lenis } from "./lenis";

interface IWrapperProps extends ComponentProps<"div"> {
	lenis?: {
		options?: LenisOptions;
	};
}

export const Wrapper: FC<IWrapperProps> = ({ lenis, children }) => {
	return (
		<>
			{children}
			<Lenis root options={lenis?.options} />
		</>
	);
};
