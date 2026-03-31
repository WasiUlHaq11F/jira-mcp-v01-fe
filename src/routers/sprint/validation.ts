import { z } from "zod";

export const sprintCreateSchema = z.object({
	name: z.string({error: "Name is required"}),
	startDate: z.date({error: "Start Date is required"}),
	endDate: z.date({error: "End Date is required"}),
	status: z.string({error: "Status is required"}),
	jiraSprintId: z.string().nullish().or(z.literal('')),
});


export const sprintUpdateSchema = z.object({
	name: z.string({error: "Name is required"}),
	startDate: z.date({error: "Start Date is required"}),
	endDate: z.date({error: "End Date is required"}),
	status: z.string({error: "Status is required"}),
	jiraSprintId: z.string().nullish().or(z.literal('')),
});


