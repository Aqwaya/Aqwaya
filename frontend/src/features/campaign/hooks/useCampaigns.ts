import { useQuery } from '@tanstack/react-query';
import { getCampaigns } from '../api';

export function useCampaigns() {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: getCampaigns,
  });
}
