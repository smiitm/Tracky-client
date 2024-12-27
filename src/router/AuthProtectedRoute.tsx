import { Outlet } from "react-router-dom";
import SignInPage from "../pages/auth/SignInPage";
import { useSession } from "../context/SessionContext";

const AuthProtectedRoute = () => {
  const { session } = useSession();
  if (!session) {
    // redirect to sign in if not logged in
    return <SignInPage />;
  }
  return <Outlet />;
};

export default AuthProtectedRoute;