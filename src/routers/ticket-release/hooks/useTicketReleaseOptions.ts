import { useQuery } from '@tanstack/react-query';
import { getSelectTicketReleases } from '../service';


export function useTicketReleaseOptions() {
  const query = useQuery({
    queryKey: ['ticketRelease', 'select'],
    queryFn: async () => {
      const response = await getSelectTicketReleases();
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
