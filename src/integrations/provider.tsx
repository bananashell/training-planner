import { env } from "@/env";
import { ConvexQueryClient } from "@convex-dev/react-query";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConvexProvider } from "convex/react";

const convexQueryClient = new ConvexQueryClient(env.VITE_CONVEX_URL);

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			queryKeyHashFn: convexQueryClient.hashFn(),
			queryFn: convexQueryClient.queryFn(),
		},
	},
});

convexQueryClient.connect(queryClient);

export function Providers({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ConvexProvider client={convexQueryClient.convexClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</ConvexProvider>
	);
}
