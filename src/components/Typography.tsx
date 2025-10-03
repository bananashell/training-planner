import type { ReactNode } from "react";

export const Heading1 = ({ children }: { children: ReactNode }) => {
	return <h1 className="text-3xl font-bold mb-6 text-white">{children}</h1>;
};
