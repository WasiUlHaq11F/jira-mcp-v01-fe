import { TicketReleaseCreate, TicketReleaseUpdate, TicketReleasePager, TicketReleaseDetail, TicketReleaseQueryParams, TicketReleasePrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getTicketReleases = async (queryParams: TicketReleaseQueryParams | null) => {
  const url = `/ticket-releases${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<TicketReleasePager>(url);
};

export const getSelectTicketReleases = async () => {
  const url = `/ticket-releases/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getTicketReleaseDetails = async (ticketReleaseId: string) => {
  const url = `/ticket-releases/detail/${ticketReleaseId}`;
  return await apiClient.get<TicketReleaseDetail>(url);
};

export const getTicketReleaseEditDetails = async (ticketReleaseId: string) => {
  const url = `/ticket-releases/${ticketReleaseId}`;
  return await apiClient.get<TicketReleaseUpdate>(url);
};

export const deleteTicketRelease = async (primaryKeys: Partial<TicketReleasePrimaryKeys>) => {
  const { ticketReleaseId } = primaryKeys;
  const url = `/ticket-releases/${ticketReleaseId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateTicketRelease = async (data: Partial<TicketReleasePrimaryKeys & TicketReleaseUpdate>) => {
  const { ticketReleaseId, ...rest } = data;
  const url = `/ticket-releases/${ticketReleaseId}`;
  return await apiClient.put<MutationResponse<TicketReleaseUpdate>>(url, { ticketReleaseId, ...rest });
};

export const addTicketRelease = async (data: Partial<TicketReleaseCreate>) => {
  return await apiClient.post<MutationResponse<TicketReleaseCreate>>('/ticket-releases', data);
};

export const uploadTicketRelease = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/ticket-releases/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadTicketRelease = async (data: TicketReleasePrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/ticket-releases/upload/${data.ticketReleaseId}`, { data });
};

