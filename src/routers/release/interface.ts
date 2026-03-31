import { releaseCreateSchema, releaseUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager } from '@/interface/common';


export type ReleaseCreate = z.infer<typeof releaseCreateSchema>;
export type ReleaseUpdate = z.infer<typeof releaseUpdateSchema>;
export type ReleasePrimaryKeys = {
	releaseId: string;
}


export type Release = ReleasePrimaryKeys & {
	name: string;
	versionNumber: string;
	releaseDate?: Date | null;
	status: string;
	jiraReleaseId?: string | null;
}


export type ReleaseIndex = Release & {
	createdAt: Date;
	updatedAt: Date;
	releaseLabel: string;
}

export type ReleasePager = {
	data: ReleaseIndex[];
	meta: Pager;
}

export type ReleaseQueryParams = {
	page?: number;
	pageSize?: number;
}

export type ReleaseDetail = Release & {
	releaseId: string;
	name: string;
	versionNumber: string;
	releaseDate?: Date | null;
	status: string;
	jiraReleaseId?: string | null;
	createdAt: Date;
	updatedAt: Date;
}

