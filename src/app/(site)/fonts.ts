import { Zalando_Sans } from "next/font/google";

const sans = Zalando_Sans({
	variable: "--font-zalando-sans",
	fallback: ["-apple-system", "BlinkMacSystemFont", "Roboto", "Helvetica Neue", "sans-serif"],
});

export const fonts = { sans };
