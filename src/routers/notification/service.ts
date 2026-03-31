import { NotificationCreate, NotificationUpdate, NotificationPager, NotificationDetail, NotificationQueryParams, NotificationPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getNotifications = async (queryParams: NotificationQueryParams | null) => {
  const url = `/notifications${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<NotificationPager>(url);
};

export const getSelectNotifications = async () => {
  const url = `/notifications/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getNotificationDetails = async (notificationId: string) => {
  const url = `/notifications/detail/${notificationId}`;
  return await apiClient.get<NotificationDetail>(url);
};

export const getNotificationEditDetails = async (notificationId: string) => {
  const url = `/notifications/${notificationId}`;
  return await apiClient.get<NotificationUpdate>(url);
};

export const deleteNotification = async (primaryKeys: Partial<NotificationPrimaryKeys>) => {
  const { notificationId } = primaryKeys;
  const url = `/notifications/${notificationId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateNotification = async (data: Partial<NotificationPrimaryKeys & NotificationUpdate>) => {
  const { notificationId, ...rest } = data;
  const url = `/notifications/${notificationId}`;
  return await apiClient.put<MutationResponse<NotificationUpdate>>(url, { notificationId, ...rest });
};

export const addNotification = async (data: Partial<NotificationCreate>) => {
  return await apiClient.post<MutationResponse<NotificationCreate>>('/notifications', data);
};

export const uploadNotification = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/notifications/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadNotification = async (data: NotificationPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/notifications/upload/${data.notificationId}`, { data });
};

