import { z } from "zod";

export const releaseCreateSchema = z.object({
	name: z.string({error: "Name is required"}),
	versionNumber: z.string({error: "Version Number is required"}),
	releaseDate: z.date().nullish(),
	status: z.string({error: "Status is required"}),
	jiraReleaseId: z.string().nullish().or(z.literal('')),
});


export const releaseUpdateSchema = z.object({
	name: z.string({error: "Name is required"}),
	versionNumber: z.string({error: "Version Number is required"}),
	releaseDate: z.date().nullish(),
	status: z.string({error: "Status is required"}),
	jiraReleaseId: z.string().nullish().or(z.literal('')),
});


