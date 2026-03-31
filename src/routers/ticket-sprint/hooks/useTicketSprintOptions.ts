import { useQuery } from '@tanstack/react-query';
import { getSelectTicketSprints } from '../service';


export function useTicketSprintOptions() {
  const query = useQuery({
    queryKey: ['ticketSprint', 'select'],
    queryFn: async () => {
      const response = await getSelectTicketSprints();
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
