import { useQuery } from '@tanstack/react-query';
import { getCampaign } from '../api';

export function useCampaign(id: string) {
  return useQuery({
    queryKey: ['campaigns', id],
    queryFn: () => getCampaign(id),
    enabled: !!id,
  });
}
