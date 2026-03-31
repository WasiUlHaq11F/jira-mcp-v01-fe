import { z } from "zod";

export const ticketCreateSchema = z.object({
	title: z.string({error: "Title is required"}),
	description: z.string({error: "Description is required"}),
	assignedById: z.uuid("Invalid UUID format"),
	assignedToId: z.uuid("Invalid UUID format"),
	issueType: z.string({error: "Issue Type is required"}),
	status: z.string({error: "Status is required"}),
	dueDate: z.date().nullish(),
	timeLogHour: z.number().nullish(),
	isBlocked: z.boolean().refine(val => val === true || val === false, "Must be checked or unchecked"),
	blockerDescription: z.string().nullish().or(z.literal('')),
	jiraTicketId: z.string().nullish().or(z.literal('')),
	jiraLink: z.url("Invalid URL format").nullish().or(z.literal('')),
});


export const ticketUpdateSchema = z.object({
	title: z.string({error: "Title is required"}),
	description: z.string({error: "Description is required"}),
	assignedById: z.uuid("Invalid UUID format"),
	assignedToId: z.uuid("Invalid UUID format"),
	issueType: z.string({error: "Issue Type is required"}),
	status: z.string({error: "Status is required"}),
	dueDate: z.date().nullish(),
	timeLogHour: z.number().nullish(),
	isBlocked: z.boolean().refine(val => val === true || val === false, "Must be checked or unchecked"),
	blockerDescription: z.string().nullish().or(z.literal('')),
	jiraTicketId: z.string().nullish().or(z.literal('')),
	jiraLink: z.url("Invalid URL format").nullish().or(z.literal('')),
});


