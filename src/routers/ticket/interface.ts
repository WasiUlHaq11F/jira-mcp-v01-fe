import { ticketCreateSchema, ticketUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager } from '@/interface/common';


export type TicketCreate = z.infer<typeof ticketCreateSchema>;
export type TicketUpdate = z.infer<typeof ticketUpdateSchema>;
export type TicketPrimaryKeys = {
	ticketId: string;
}


export type Ticket = TicketPrimaryKeys & {
	title: string;
	description: string;
	assignedById: string;
	assignedToId: string;
	issueType: string;
	status: string;
	dueDate?: Date | null;
	timeLogHour?: number | null;
	isBlocked: boolean;
	blockerDescription?: string | null;
	jiraTicketId?: string | null;
	jiraLink?: string | null;
}


export type TicketIndex = Ticket & {
	createdAt: Date;
	updatedAt: Date;
	ticketLabel: string;
}

export type TicketPager = {
	data: TicketIndex[];
	meta: Pager;
}

export type TicketQueryParams = {
	page?: number;
	pageSize?: number;
}

export type TicketDetail = Ticket & {
	ticketId: string;
	title: string;
	description: string;
	assignedById: string;
	assignedToId: string;
	issueType: string;
	status: string;
	dueDate?: Date | null;
	timeLogHour?: number | null;
	isBlocked: boolean;
	blockerDescription?: string | null;
	jiraTicketId?: string | null;
	jiraLink?: string | null;
	createdAt: Date;
	updatedAt: Date;
}

