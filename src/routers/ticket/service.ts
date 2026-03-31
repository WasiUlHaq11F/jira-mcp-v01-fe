import { TicketCreate, TicketUpdate, TicketPager, TicketDetail, TicketQueryParams, TicketPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getTickets = async (queryParams: TicketQueryParams | null) => {
  const url = `/tickets${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<TicketPager>(url);
};

export const getSelectTickets = async () => {
  const url = `/tickets/select`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getTicketDetails = async (ticketId: string) => {
  const url = `/tickets/detail/${ticketId}`;
  return await apiClient.get<TicketDetail>(url);
};

export const getTicketEditDetails = async (ticketId: string) => {
  const url = `/tickets/${ticketId}`;
  return await apiClient.get<TicketUpdate>(url);
};

export const deleteTicket = async (primaryKeys: Partial<TicketPrimaryKeys>) => {
  const { ticketId } = primaryKeys;
  const url = `/tickets/${ticketId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateTicket = async (data: Partial<TicketPrimaryKeys & TicketUpdate>) => {
  const { ticketId, ...rest } = data;
  const url = `/tickets/${ticketId}`;
  return await apiClient.put<MutationResponse<TicketUpdate>>(url, { ticketId, ...rest });
};

export const addTicket = async (data: Partial<TicketCreate>) => {
  return await apiClient.post<MutationResponse<TicketCreate>>('/tickets', data);
};

export const uploadTicket = async (data: FormData) => {
  return await apiClient.post<{ url: string }>('/tickets/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadTicket = async (data: TicketPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/tickets/upload/${data.ticketId}`, { data });
};

