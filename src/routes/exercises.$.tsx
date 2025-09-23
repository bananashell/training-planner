import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";

export const Route = createFileRoute("/exercises/$")({
	component: ExercisesList,
	// loader: async ({ context }) => {
	// 	await context.queryClient.ensureQueryData(
	// 		convexQuery(api.exercises.getAll, {}),
	// 	);
	// },
});

function ExercisesList() {
	const { data: exercises } = useSuspenseQuery(
		convexQuery(api.exercises.getAll, {}),
	);

	return (
		<div className="flex items-center justify-center min-h-screen p-4 bg-black">
			<div className="w-full max-w-4xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10">
				<h1 className="text-3xl font-bold mb-6 text-white">Träningsbank</h1>

				<section>
					<input
						type="text"
						placeholder="Sök övningar..."
						className="w-full p-3 mb-6 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</section>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{exercises?.map((exercise) => (
						<Link
							key={exercise._id}
							to="/exercises/$exerciseId"
							params={{ exerciseId: exercise._id }}
							className="group bg-white/10 border border-white/20 rounded-lg p-4 backdrop-blur-sm shadow-md hover:bg-white/20 transition-all duration-200 transform hover:scale-105"
						>
							{exercise.image && (
								<div className="w-full h-32 mb-3 rounded-lg overflow-hidden bg-white/5">
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

							<h2 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-200">
								{exercise.name}
							</h2>

							{exercise.description && (
								<p className="text-white/80 text-sm line-clamp-3 mb-3">
									{exercise.description}
								</p>
							)}

							{exercise.tags && exercise.tags.length > 0 && (
								<div className="flex flex-wrap gap-1">
									{exercise.tags.map((tag) => (
										<span
											key={tag}
											className="px-2 py-1 text-xs bg-blue-500/20 text-blue-200 rounded-full border border-blue-500/30"
										>
											{tag}
										</span>
									))}
								</div>
							)}
						</Link>
					))}
				</div>

				{!exercises ||
					(exercises.length === 0 && (
						<div className="text-center text-white/60 py-8">
							No exercises found. Add some exercises to get started!
						</div>
					))}
			</div>
		</div>
	);
}
