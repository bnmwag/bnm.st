import { ConsentManagerDialog, ConsentManagerProvider } from "@c15t/nextjs";
import type { ReactNode } from "react";
import { ConsentManagerClient } from "./consent-manager.client";
import { CustomCookieBanner } from "./cookie-banner";

export function ConsentManager({ children }: { children: ReactNode }) {
	return (
		<ConsentManagerProvider
			options={{
				mode: "c15t",
				backendURL: "/api/c15t",
				consentCategories: ["necessary", "marketing"],
				ignoreGeoLocation: true,
			}}
		>
			<CustomCookieBanner />
			<ConsentManagerDialog
				theme={{
					"dialog.overlay": "fixed! inset-0! z-400! bg-foreground/60! backdrop-blur-sm!",
					"dialog.root": "fixed! inset-0! h-full!",
					"dialog.card":
						"fixed! z-500! top-1/2! left-1/2! -translate-x-1/2! -translate-y-1/2! w-full! max-w-md! border! border-foreground/10! rounded-none! bg-background! p-0! shadow-none!",
					"dialog.header": "bg-transparent! p-4! pb-2!",
					"dialog.title":
						"m-0! font-medium! text-[clamp(.625rem,.5vw,.75rem)]! text-foreground! uppercase! leading-none! tracking-normal!",
					"dialog.description": "m-0! mt-2! text-caption! text-foreground/50! leading-normal! uppercase!",
					"dialog.content": "bg-background! p-0!",
					"dialog.footer": "hidden!",
					"widget.root": "bg-background! p-0!",
					"widget.footer": "bg-background! border-t! border-foreground/10! p-4! pt-3!",
					"widget.footer.sub-group": "gap-2!",
					"widget.footer.accept-button":
						"rounded-none! px-2! py-0.5! bg-foreground! text-background! uppercase! font-medium! text-[clamp(.625rem,.5vw,.75rem)]! shadow-none! leading-none! border-0! cursor-pointer!",
					"widget.footer.reject-button":
						"rounded-none! px-2! py-0.5! bg-transparent! border! border-foreground/20! text-foreground! uppercase! font-medium! text-[clamp(.625rem,.5vw,.75rem)]! shadow-none! leading-none! cursor-pointer!",
					"widget.footer.save-button":
						"rounded-none! px-2! py-0.5! bg-transparent! border! border-foreground/20! text-foreground! uppercase! font-medium! text-[clamp(.625rem,.5vw,.75rem)]! shadow-none! leading-none! cursor-pointer!",
					"widget.accordion": "px-4! space-y-0!",
					"widget.accordion.item":
						"mt-0! bg-background! border-foreground/10! rounded-none! shadow-none! border-l-0! border-r-0! border-t-0! last:border-b-0! p-0!",
					"widget.accordion.trigger": "bg-background! py-2.5! px-0!",
					"widget.accordion.trigger-inner": "text-foreground! text-[clamp(.625rem,.5vw,.75rem)]! font-medium! uppercase!",
					"widget.accordion.content": "bg-background! text-foreground/50! text-caption! normal-case! pb-2.5! px-0! pt-0!",
					"widget.accordion.icon": "text-foreground/40! size-3.5!",
					"widget.switch": "group",
					"widget.switch.track": "group-data-[state=checked]:bg-foreground! bg-foreground/20! rounded-none! h-3! w-6! p-0.25!",
					"widget.switch.thumb": "bg-background! rounded-none! size-2.5! border-0! after:shadow-none!",
					"widget.branding": "hidden!",
				}}
			/>
			<ConsentManagerClient>{children}</ConsentManagerClient>
		</ConsentManagerProvider>
	);
}
