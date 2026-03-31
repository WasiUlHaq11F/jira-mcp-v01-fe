import { useQuery } from '@tanstack/react-query';
import { getSelectSprints } from '../service';


export function useSprintOptions() {
  const query = useQuery({
    queryKey: ['sprint', 'select'],
    queryFn: async () => {
      const response = await getSelectSprints();
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
