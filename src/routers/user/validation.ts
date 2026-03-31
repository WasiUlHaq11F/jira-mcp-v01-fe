import { z } from "zod";

export const userCreateSchema = z.object({
	email: z.email("Invalid email format"),
	username: z.string({error: "Username is required"}),
	password: z.string({error: "Password is required"}),
	role: z.string({error: "Role is required"}),
});


export const userUpdateSchema = z.object({
	email: z.email("Invalid email format"),
	username: z.string({error: "Username is required"}),
	password: z.string().nullish().or(z.literal('')),
	role: z.string({error: "Role is required"}),
});


