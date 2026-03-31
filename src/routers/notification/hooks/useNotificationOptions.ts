import { useQuery } from '@tanstack/react-query';
import { getSelectNotifications } from '../service';


export function useNotificationOptions() {
  const query = useQuery({
    queryKey: ['notification', 'select'],
    queryFn: async () => {
      const response = await getSelectNotifications();
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
