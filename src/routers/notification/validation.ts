import { z } from "zod";

export const notificationCreateSchema = z.object({
	ticketId: z.uuid("Invalid UUID format"),
	recipientId: z.uuid("Invalid UUID format"),
	typeName: z.string({error: "Type Name is required"}),
	message: z.string({error: "Message is required"}),
	status: z.string({error: "Status is required"}),
	notificationChannel: z.string().nullish(),
	jiraLink: z.url("Invalid URL format").nullish().or(z.literal('')),
});


export const notificationUpdateSchema = z.object({
	ticketId: z.uuid("Invalid UUID format"),
	recipientId: z.uuid("Invalid UUID format"),
	typeName: z.string({error: "Type Name is required"}),
	message: z.string({error: "Message is required"}),
	status: z.string({error: "Status is required"}),
	notificationChannel: z.string().nullish(),
	jiraLink: z.url("Invalid URL format").nullish().or(z.literal('')),
});


