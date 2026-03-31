import { useQuery } from '@tanstack/react-query';
import { getSelectTickets } from '../service';


export function useTicketOptions() {
  const query = useQuery({
    queryKey: ['ticket', 'select'],
    queryFn: async () => {
      const response = await getSelectTickets();
      return response.data;
    }, 
  });

  return {
    data : query.data ?? [],
    isLoading : query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch
  };
}
