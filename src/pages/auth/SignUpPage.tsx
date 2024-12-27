import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSession } from "../../context/SessionContext";
import supabase from "../../supabase";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"
const SignUpPage = () => {

  // If user is already logged in, redirect to dashboard.
  const { session } = useSession();
  if (session) return <Navigate to="/dashboard" />;

  const [status, setStatus] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Creating account...");
    const { error } = await supabase.auth.signUp({
      email: formValues.email,
      password: formValues.password,
    });
    if (error) {
      alert(error.message);
    }
    setStatus("");
  };

  return (
    <>
      <Navbar />

      <main >
        <Card className="w-[350px] mx-auto my-24">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              <Link className="auth-link" to="/auth/sign-in">
                Already have an account? Sign In
              </Link>
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Email</Label>
                  <Input name="email" type="email" placeholder="Email" onChange={handleInputChange} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Password</Label>
                  <Input name="password" type="password" placeholder="Password" onChange={handleInputChange} />
                </div>
              </div>

              <div>
                {status && <p>{status}</p>}
              </div>

            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit">Sign Up</Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </>
  );
};

export default SignUpPage;