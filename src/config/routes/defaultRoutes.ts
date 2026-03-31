import React from 'react'
import { CustomRoutes } from '@/interface/common'

export const publicRoutes:CustomRoutes[] = [
{
    key: 'userLogin',
    path: '/userLogin',
    component: React.lazy(() => import('@/routers/user-auth/login')),
  }, {
    key: 'userRegister',
    path: '/userRegister',
    component: React.lazy(() => import('@/routers/user-auth/register')),
  }]

export const defaultRoutes:CustomRoutes[] = [
{
			key: 'notification',
			path: '/notifications',
			component: React.lazy(() => import('@/routers/notification')),
		}, {
			key: 'release',
			path: '/releases',
			component: React.lazy(() => import('@/routers/release')),
		}, {
			key: 'sprint',
			path: '/sprints',
			component: React.lazy(() => import('@/routers/sprint')),
		}, {
			key: 'ticket-release',
			path: '/ticket-releases',
			component: React.lazy(() => import('@/routers/ticket-release')),
		}, {
			key: 'ticket-sprint',
			path: '/ticket-sprints',
			component: React.lazy(() => import('@/routers/ticket-sprint')),
		}, {
			key: 'ticket',
			path: '/tickets',
			component: React.lazy(() => import('@/routers/ticket')),
		}, {
			key: 'user',
			path: '/users',
			component: React.lazy(() => import('@/routers/user')),
		}, {
										key: 'home',
										path: '/',
										component: React.lazy(() => import('@/routers/common/home')),
									}, {
							key: 'userProfile',
							path: '/userProfile',
							component: React.lazy(() => import('@/routers/user-auth/profile')),
						}, {
							key: 'userProfileEdit',
							path: '/userProfile/edit',
							component: React.lazy(() => import('@/routers/user-auth/profile/edit')),
						}]

export default defaultRoutes