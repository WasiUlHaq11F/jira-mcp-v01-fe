import { userCreateSchema, userUpdateSchema } from './validation';
import { z } from 'zod';
import { Pager } from '@/interface/common';


export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
export type UserPrimaryKeys = {
	userId: string;
}


export type User = UserPrimaryKeys & {
	email: string;
	username: string;
	password: string;
	role: string;
}


export type UserIndex = Omit<User, 'password'> & {
	createdAt: Date;
	updatedAt: Date;
	userLabel: string;
}

export type UserPager = {
	data: UserIndex[];
	meta: Pager;
}

export type UserQueryParams = {
	page?: number;
	pageSize?: number;
}

export type UserDetail = User & {
	userId: string;
	email: string;
	username: string;
	role: string;
	createdAt: Date;
	updatedAt: Date;
}

