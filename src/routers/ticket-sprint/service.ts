import { TicketSprintCreate, TicketSprintUpdate, TicketSprintPager, TicketSprintDetail, TicketSprintQueryParams, TicketSprintPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getTicketSprints = async (queryParams: TicketSprintQueryParams | null) => {
  const url = `/ticket-sprints${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<TicketSprintPager>(url);
};

export const getSelectTicketSprints = async () => {
  const url = `/ticket-sprints/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getTicketSprintDetails = async (ticketSprintId: string) => {
  const url = `/ticket-sprints/detail/${ticketSprintId}`;
  return await apiClient.get<TicketSprintDetail>(url);
};

export const getTicketSprintEditDetails = async (ticketSprintId: string) => {
  const url = `/ticket-sprints/${ticketSprintId}`;
  return await apiClient.get<TicketSprintUpdate>(url);
};

export const deleteTicketSprint = async (primaryKeys: Partial<TicketSprintPrimaryKeys>) => {
  const { ticketSprintId } = primaryKeys;
  const url = `/ticket-sprints/${ticketSprintId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateTicketSprint = async (data: Partial<TicketSprintPrimaryKeys & TicketSprintUpdate>) => {
  const { ticketSprintId, ...rest } = data;
  const url = `/ticket-sprints/${ticketSprintId}`;
  return await apiClient.put<MutationResponse<TicketSprintUpdate>>(url, { ticketSprintId, ...rest });
};

export const addTicketSprint = async (data: Partial<TicketSprintCreate>) => {
  return await apiClient.post<MutationResponse<TicketSprintCreate>>('/ticket-sprints', data);
};

export const uploadTicketSprint = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/ticket-sprints/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadTicketSprint = async (data: TicketSprintPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/ticket-sprints/upload/${data.ticketSprintId}`, { data });
};

