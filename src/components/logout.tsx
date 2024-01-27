import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  //const navigate = useNavigate();
  // return <LogOut className="cursor-pointer" onClick={handleLogout} />;
  const [cookies, removeCookie] = useCookies(["exc_prop_user"]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  function handleLogout() {
    if (cookies.exc_prop_user) {
      removeCookie("exc_prop_user", { path: "/" });
      queryClient.removeQueries();
      navigate("/login");
    }
  }
}
