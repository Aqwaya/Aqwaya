import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteCampaign, getCampaigns } from '../api';
import { toast } from 'sonner';

export function useDeleteCampaign(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns', id] });
    },
    onError: (err) => toast.error(err.message),
  });
}
