import { ExcerciseCard } from "@/components/ExcerciseCard";
import { Heading1 } from "@/components/Typography";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { api } from "convex/_generated/api";

export const Route = createFileRoute("/exercises/$")({
	component: ExercisesList,
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(
			convexQuery(api.exercises.getAll, {}),
		);
	},
});

function ExercisesList() {
	const { data: exercises } = useSuspenseQuery(
		convexQuery(api.exercises.getAll, {}),
	);

	return (
		<div className="flex items-center justify-center min-h-screen p-4 bg-black">
			<div className="w-full max-w-4xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10">
				<Heading1>Träningsbank</Heading1>

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
							<ExcerciseCard
								name={exercise.name}
								description={exercise.description}
								tags={exercise.tags}
								image={exercise.image}
							/>
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
