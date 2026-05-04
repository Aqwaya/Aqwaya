import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useLogout() {
  const router = useRouter();

  const { isPending: isLoggingOut, mutate: logout } = useMutation({
    mutationFn: async () => {},
    onSuccess() {
      toast.success('Logged out successfully');
      router.push('/auth/login');
    },
    onError() {
      toast.error('Something went wrong');
    },
  });

  return { isLoggingOut, logout };
}
