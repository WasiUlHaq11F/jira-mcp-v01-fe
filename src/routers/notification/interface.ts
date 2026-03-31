import { notificationCreateSchema, notificationUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager } from '@/interface/common';


export type NotificationCreate = z.infer<typeof notificationCreateSchema>;
export type NotificationUpdate = z.infer<typeof notificationUpdateSchema>;
export type NotificationPrimaryKeys = {
	notificationId: string;
}


export type Notification = NotificationPrimaryKeys & {
	ticketId: string;
	recipientId: string;
	typeName: string;
	message: string;
	status: string;
	notificationChannel?: string | null;
	jiraLink?: string | null;
}


export type NotificationIndex = Notification & {
	createdAt: Date;
	updatedAt: Date;
	notificationLabel: string;
}

export type NotificationPager = {
	data: NotificationIndex[];
	meta: Pager;
}

export type NotificationQueryParams = {
	page?: number;
	pageSize?: number;
}

export type NotificationDetail = Notification & {
	notificationId: string;
	ticketId: string;
	recipientId: string;
	typeName: string;
	message: string;
	status: string;
	notificationChannel?: string | null;
	jiraLink?: string | null;
	createdAt: Date;
	updatedAt: Date;
}

