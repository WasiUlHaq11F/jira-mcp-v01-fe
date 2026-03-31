import { sprintCreateSchema, sprintUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager } from '@/interface/common';


export type SprintCreate = z.infer<typeof sprintCreateSchema>;
export type SprintUpdate = z.infer<typeof sprintUpdateSchema>;
export type SprintPrimaryKeys = {
	sprintId: string;
}


export type Sprint = SprintPrimaryKeys & {
	name: string;
	startDate: Date;
	endDate: Date;
	status: string;
	jiraSprintId?: string | null;
}


export type SprintIndex = Sprint & {
	createdAt: Date;
	updatedAt: Date;
	sprintLabel: string;
}

export type SprintPager = {
	data: SprintIndex[];
	meta: Pager;
}

export type SprintQueryParams = {
	page?: number;
	pageSize?: number;
}

export type SprintDetail = Sprint & {
	sprintId: string;
	name: string;
	startDate: Date;
	endDate: Date;
	status: string;
	jiraSprintId?: string | null;
	createdAt: Date;
	updatedAt: Date;
}

