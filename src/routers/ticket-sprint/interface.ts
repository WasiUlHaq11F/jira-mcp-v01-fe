import { ticketSprintCreateSchema, ticketSprintUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager } from '@/interface/common';


export type TicketSprintCreate = z.infer<typeof ticketSprintCreateSchema>;
export type TicketSprintUpdate = z.infer<typeof ticketSprintUpdateSchema>;
export type TicketSprintPrimaryKeys = {
	ticketSprintId: string;
}


export type TicketSprint = TicketSprintPrimaryKeys & {
	ticketId: string;
	sprintId: string;
}


export type TicketSprintIndex = TicketSprint & {
	createdAt: Date;
	updatedAt: Date;
	ticketSprintLabel: string;
}

export type TicketSprintPager = {
	data: TicketSprintIndex[];
	meta: Pager;
}

export type TicketSprintQueryParams = {
	page?: number;
	pageSize?: number;
}

export type TicketSprintDetail = TicketSprint & {
	ticketSprintId: string;
	ticketId: string;
	sprintId: string;
	createdAt: Date;
	updatedAt: Date;
}

