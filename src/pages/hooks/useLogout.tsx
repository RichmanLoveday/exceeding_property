import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

// export function useLogout() {
//   const [cookies, removeCookie] = useCookies(["exc_prop_user"]);
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   function logoutApi() {
//     if (cookies.exc_prop_user) {
//       removeCookie("exc_prop_user", { path: "/" });
//     }
//   }

//   const { mutate: logout, isPending: isLoading } = useMutation({
//     mutationFn: () => logoutApi,
//     onSuccess: () => {
//       queryClient.removeQueries();
//       navigate("/login", { replace: true });
//     },
//   });

//   return { logout, isLoading };
// }
