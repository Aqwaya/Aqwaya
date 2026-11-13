import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { registerUser } from '../services';

export function useSignup() {
  const router = useRouter();

  const { isPending: isRegistering, mutate: signup } = useMutation({
    mutationFn: registerUser,
    onSuccess() {
      toast.success('Registration successful');
      router.push('/auth/login');
    },

    onError: (err) => {
      console.log(err);
      toast.error(err?.message || 'Registration  Failed');
    },
  });

  return { isRegistering, signup };
}
