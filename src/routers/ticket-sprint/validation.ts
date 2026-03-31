import { z } from "zod";

export const ticketSprintCreateSchema = z.object({
	ticketId: z.uuid("Invalid UUID format"),
	sprintId: z.uuid("Invalid UUID format"),
});


export const ticketSprintUpdateSchema = z.object({
	ticketId: z.uuid("Invalid UUID format"),
	sprintId: z.uuid("Invalid UUID format"),
});


