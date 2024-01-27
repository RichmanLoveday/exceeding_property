import { LoginUser } from "@/services/api";
import { UserProps } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const [cookies, setCookie] = useCookies(["exc_prop_user"]);
  const navigate = useNavigate();

  function handleSetCookie(user: UserProps) {
    setCookie("exc_prop_user", user);
  }

  const { mutate: userLogin, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      LoginUser(email, password),
    mutationKey: ["login-user"],
    onSuccess: (res) => {
      toast.success(res.message);

      handleSetCookie(res.data.token);
      navigate("/products");
    },
    onError: (data) => {
      console.log(data);
      toast.error(data?.response?.data?.message);
    },
  });

  return { cookies, userLogin, isPending };
}

export default useLogin;
