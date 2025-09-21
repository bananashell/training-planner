import { generateUUID } from "@/util/generateUUID";
import { os } from "@orpc/server";
import * as z from "zod";

const exerciseSchema = z.object({
	id: z.string().uuid(),
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
		name: "Get groceries",
		description: "",
		tags: [],
		image: "",
		links: [],
	},
] as Exercise[];

export const listExercises = os.input(z.object({})).handler(() => {
	return exercises;
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
