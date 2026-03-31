import { ReleaseCreate, ReleaseUpdate, ReleasePager, ReleaseDetail, ReleaseQueryParams, ReleasePrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getReleases = async (queryParams: ReleaseQueryParams | null) => {
  const url = `/releases${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<ReleasePager>(url);
};

export const getSelectReleases = async () => {
  const url = `/releases/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getReleaseDetails = async (releaseId: string) => {
  const url = `/releases/detail/${releaseId}`;
  return await apiClient.get<ReleaseDetail>(url);
};

export const getReleaseEditDetails = async (releaseId: string) => {
  const url = `/releases/${releaseId}`;
  return await apiClient.get<ReleaseUpdate>(url);
};

export const deleteRelease = async (primaryKeys: Partial<ReleasePrimaryKeys>) => {
  const { releaseId } = primaryKeys;
  const url = `/releases/${releaseId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateRelease = async (data: Partial<ReleasePrimaryKeys & ReleaseUpdate>) => {
  const { releaseId, ...rest } = data;
  const url = `/releases/${releaseId}`;
  return await apiClient.put<MutationResponse<ReleaseUpdate>>(url, { releaseId, ...rest });
};

export const addRelease = async (data: Partial<ReleaseCreate>) => {
  return await apiClient.post<MutationResponse<ReleaseCreate>>('/releases', data);
};

export const uploadRelease = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/releases/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadRelease = async (data: ReleasePrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/releases/upload/${data.releaseId}`, { data });
};

