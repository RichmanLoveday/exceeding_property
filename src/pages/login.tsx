import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { FormEvent, useEffect } from "react";
import useLogin from "./hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Login() {
  const [cookies, removeCookie] = useCookies();
  const { userLogin, isPending } = useLogin();

  const navigate = useNavigate();

  //? check if user is loggedin
  useEffect(() => {
    if (typeof cookies.exc_prop_user == "string") {
      navigate("/products");
    }
  }, [cookies.exc_prop_user]);

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget)) as {
      email: string;
      password: string;
    };

    userLogin(formData);
  }

  return (
    <Card className="max-w-lg mx-auto my-20">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="space-y-2 text-left">
            <Label>Email</Label>

            <Input
              type="email"
              name="email"
              placeholder="Enter your email address"
            />
          </div>

          <div className="space-y-2 text-left">
            <Label>Password</Label>

            <Input type="password" name="password" placeholder="********" />
          </div>

          <Button className="" type="submit">
            {isPending ? (
              <>
                Logging in...
                <Loader className="ml-2 animate-spin" />
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
