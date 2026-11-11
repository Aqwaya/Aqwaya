import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginUser } from "../services";

export function useLogin() {
  const router = useRouter();

  const { isPending: isLoggingIn, mutate: login } = useMutation({
    mutationFn: loginUser,

    onSuccess(data) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login successful");

      if (data.user.isOnboarded) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
    },

    onError: (err) => {
      console.log(err);
      toast.error(err?.message || "Login Failed");
    },
  });

  return { isLoggingIn, login };
}
