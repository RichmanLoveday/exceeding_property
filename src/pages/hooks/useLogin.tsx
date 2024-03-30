import { LoginUser } from "@/services/api";
import { UserProps } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();

  //? redirect to product when login
  // useEffect(() => {
  //   if (cookies.exc_prop_user) {
  //     navigate("/products");
  //   }
  // }, [cookies.exc_prop_user]);

  function handleSetCookie(token: UserProps) {
    setCookie("exc_prop_user", token);
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
      //@ts-ignore
      toast.error(data?.response?.data?.message);
    },
  });

  return { cookies, userLogin, isPending };
}

export default useLogin;
