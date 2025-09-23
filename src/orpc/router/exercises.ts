import { generateUUID } from "@/util/generateUUID";
import { os } from "@orpc/server";
import * as z from "zod";

const exerciseSchema = z.object({
	id: z.string().nanoid(),
	name: z.string(),
	description: z.string().max(500).optional(),
	tags: z.array(z.string()).optional().default([]),
	image: z.string().url().optional(),
	links: z
		.array(
			z.object({
				type: z.enum(["instagram", "youtube"]),
				url: z.string().url(),
			}),
		)
		.optional()
		.default([]),
});

type Exercise = z.infer<typeof exerciseSchema>;

const exercises = [
	{
		id: "e6220fbc-618f-44d7-aaee-c35047393b29",
		name: "Pass på felvänd spelare med skott",
		description:
			"Träna på att passa en medspelare som vänder upp mot mål och skjuter",
		tags: ["pass", "skott", "vändning"],
		image: "https://example.com/pushups.jpg",
		links: [
			{
				type: "youtube" as const,
				url: "https://youtube.com/watch?v=pushups-demo",
			},
		],
	},
	{
		id: "f7331acc-729g-55e8-bbff-d46158494c30",
		name: "Kvadraten",
		description: "'Apan i mitten'",
		tags: ["passning", "försvar", "press"],
		image: "https://example.com/squats.jpg",
		links: [
			{
				type: "instagram" as const,
				url: "https://instagram.com/p/squats-demo",
			},
		],
	},
	{
		id: "2a7ec189-95af-493c-a273-03632fa80e7a",
		name: "Målstafett",
		description:
			"Spelare från varje lag driver med boll upp till målet. Pass till nästa lagkamrat som passar tillbaka följt av skott i mål",
		tags: ["passning", "driva", "skott", "stafett"],
		image: "https://example.com/squats.jpg",
		links: [
			{
				type: "instagram" as const,
				url: "https://instagram.com/p/squats-demo",
			},
		],
	},
] as Exercise[];

export const listExercises = os.input(z.object({})).handler(() => {
	return exercises;
});

export const getExerciseById = os
	.input(z.object({ id: z.string().uuid() }))
	.handler(({ input }) => {
		const exercise = exercises.find((ex) => ex.id === input.id);
		if (!exercise) {
			throw new Error(`Exercise with id ${input.id} not found`);
		}
		return exercise;
	});

export const addExercise = os
	.input(exerciseSchema.omit({ id: true }))
	.handler(({ input }) => {
		const newExercise = {
			...input,
			tags: input.tags.map((x) => x.toLowerCase()),
			id: generateUUID(),
		};
		exercises.push(newExercise);
		return newExercise;
	});
