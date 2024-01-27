import { useCookies } from "react-cookie";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  // const { logout, isLoading } = useLogout();
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

  return (
    <header className="fixed top-0 left-0 z-50 w-full py-5 border-b bg-background border-border">
      <nav className="container flex items-center justify-between w-full h-full px-5">
        <Link to={"/"} className="font-medium">
          E.P.
        </Link>
        <div className="flex items-center gap-5">
          <Button asChild variant={"link"}>
            <Link to={"/products"}>Products</Link>
          </Button>

          <Button asChild variant={"link"}>
            <Link to={"/orders"}>Orders</Link>
          </Button>

          <Button asChild variant={"link"}>
            <Link to={"/waitlist"}>Waitlist</Link>
          </Button>

          <Button asChild variant={"link"}>
            <Link to={"/settings"}>Settings</Link>
          </Button>
        </div>
        <div className="flex items-center gap-5">
          <ModeToggle />
          {!cookies.exc_prop_user && (
            <Button asChild>
              <Link to={"/login"}>Login</Link>
            </Button>
          )}
        </div>
        {cookies.exc_prop_user && (
          <div>
            <LogOut onClick={() => handleLogout()} />
          </div>
        )}
      </nav>
    </header>
  );
}
