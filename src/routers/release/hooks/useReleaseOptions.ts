import { useQuery } from '@tanstack/react-query';
import { getSelectReleases } from '../service';


export function useReleaseOptions() {
  const query = useQuery({
    queryKey: ['release', 'select'],
    queryFn: async () => {
      const response = await getSelectReleases();
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
