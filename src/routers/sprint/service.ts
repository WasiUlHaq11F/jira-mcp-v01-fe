import { SprintCreate, SprintUpdate, SprintPager, SprintDetail, SprintQueryParams, SprintPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getSprints = async (queryParams: SprintQueryParams | null) => {
  const url = `/sprints${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<SprintPager>(url);
};

export const getSelectSprints = async () => {
  const url = `/sprints/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getSprintDetails = async (sprintId: string) => {
  const url = `/sprints/detail/${sprintId}`;
  return await apiClient.get<SprintDetail>(url);
};

export const getSprintEditDetails = async (sprintId: string) => {
  const url = `/sprints/${sprintId}`;
  return await apiClient.get<SprintUpdate>(url);
};

export const deleteSprint = async (primaryKeys: Partial<SprintPrimaryKeys>) => {
  const { sprintId } = primaryKeys;
  const url = `/sprints/${sprintId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateSprint = async (data: Partial<SprintPrimaryKeys & SprintUpdate>) => {
  const { sprintId, ...rest } = data;
  const url = `/sprints/${sprintId}`;
  return await apiClient.put<MutationResponse<SprintUpdate>>(url, { sprintId, ...rest });
};

export const addSprint = async (data: Partial<SprintCreate>) => {
  return await apiClient.post<MutationResponse<SprintCreate>>('/sprints', data);
};

export const uploadSprint = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/sprints/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadSprint = async (data: SprintPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/sprints/upload/${data.sprintId}`, { data });
};

