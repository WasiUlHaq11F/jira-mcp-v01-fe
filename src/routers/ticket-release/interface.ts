import { ticketReleaseCreateSchema, ticketReleaseUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager } from '@/interface/common';


export type TicketReleaseCreate = z.infer<typeof ticketReleaseCreateSchema>;
export type TicketReleaseUpdate = z.infer<typeof ticketReleaseUpdateSchema>;
export type TicketReleasePrimaryKeys = {
	ticketReleaseId: string;
}


export type TicketRelease = TicketReleasePrimaryKeys & {
	ticketId: string;
	releaseId: string;
}


export type TicketReleaseIndex = TicketRelease & {
	createdAt: Date;
	updatedAt: Date;
	ticketReleaseLabel: string;
}

export type TicketReleasePager = {
	data: TicketReleaseIndex[];
	meta: Pager;
}

export type TicketReleaseQueryParams = {
	page?: number;
	pageSize?: number;
}

export type TicketReleaseDetail = TicketRelease & {
	ticketReleaseId: string;
	ticketId: string;
	releaseId: string;
	createdAt: Date;
	updatedAt: Date;
}

