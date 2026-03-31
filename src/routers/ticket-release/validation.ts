import { z } from "zod";

export const ticketReleaseCreateSchema = z.object({
	ticketId: z.uuid("Invalid UUID format"),
	releaseId: z.uuid("Invalid UUID format"),
});


export const ticketReleaseUpdateSchema = z.object({
	ticketId: z.uuid("Invalid UUID format"),
	releaseId: z.uuid("Invalid UUID format"),
});


