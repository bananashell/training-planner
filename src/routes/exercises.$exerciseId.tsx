import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";

export const Route = createFileRoute("/exercises/$exerciseId")({
	component: ExerciseDetail,
});

function ExerciseDetail() {
	const { exerciseId } = Route.useParams();

	const { data: exercise } = useSuspenseQuery(
		convexQuery(api.exercises.get, {
			id: exerciseId as Id<"exercises">,
		}),
	);

	if (!exercise) {
		return (
			<div
				className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-100"
				style={{
					backgroundImage:
						"radial-gradient(50% 50% at 50% 50%, #D2149D 0%, #8E1066 50%, #2D0A1F 100%)",
				}}
			>
				<div className="text-white text-xl">Exercise not found</div>
			</div>
		);
	}

	return (
		<div
			className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4"
			style={{
				backgroundImage:
					"radial-gradient(50% 50% at 50% 50%, #D2149D 0%, #8E1066 50%, #2D0A1F 100%)",
			}}
		>
			<div className="max-w-4xl mx-auto">
				<div className="bg-black/50 backdrop-blur-md rounded-xl shadow-xl border-8 border-black/10 overflow-hidden">
					{exercise.image && (
						<div className="w-full h-64 md:h-80">
							<img
								src={exercise.image}
								alt={exercise.name}
								className="w-full h-full object-cover"
								onError={(e) => {
									e.currentTarget.style.display = "none";
								}}
							/>
						</div>
					)}

					<div className="p-8">
						<h1 className="text-4xl font-bold text-white mb-4">
							{exercise.name}
						</h1>

						{exercise.description && (
							<div className="mb-6">
								<h2 className="text-xl font-semibold text-white mb-2">
									Description
								</h2>
								<p className="text-white/90 leading-relaxed">
									{exercise.description}
								</p>
							</div>
						)}

						{exercise.tags && exercise.tags.length > 0 && (
							<div className="mb-6">
								<h2 className="text-xl font-semibold text-white mb-2">Tags</h2>
								<div className="flex flex-wrap gap-2">
									{exercise.tags.map((tag) => (
										<span
											key={tag}
											className="px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full border border-blue-500/30"
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						)}

						{exercise.links && exercise.links.length > 0 && (
							<div className="mb-6">
								<h2 className="text-xl font-semibold text-white mb-2">
									Resources
								</h2>
								<div className="space-y-2">
									{exercise.links.map((link, index) => (
										<a
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											key={link.url + index}
											href={link.url}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-colors duration-200"
										>
											<span className="capitalize mr-2">{link.type}:</span>
											<span className="text-blue-200 hover:text-blue-100">
												{link.url.replace(/^https?:\/\//, "")}
											</span>
											{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
											<svg
												className="w-4 h-4 ml-2"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
												/>
											</svg>
										</a>
									))}
								</div>
							</div>
						)}

						<div className="pt-6 border-t border-white/20">
							<button
								type="button"
								onClick={() => window.history.back()}
								className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200"
							>
								Back to Exercises
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
