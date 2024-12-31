import { Link } from "react-router-dom";
import supabase from "../supabase";

import { User } from "lucide-react";
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/modeToggle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useSession } from "../context/SessionContext";

export function Navbar() {
    const { session } = useSession();
    return (
        <div className="py-2 border-b-2 ">
            <header>
                <div className="flex justify-between items-center">
                    <div>
                        <Link to="/" className="text-xl font-medium mx-4">Tracky</Link>
                    </div>

                    <div  className="flex space-x-2">
                        <ModeToggle />
                        {session ? (
                            <div className="flex">
                                <Avatar>
                                    <AvatarFallback><User /></AvatarFallback>
                                </Avatar>
                                <Button className="mx-2" onClick={() => supabase.auth.signOut()}></Button>
                            </div>
                        ) : (
                            <Link to="/auth/sign-in">Sign In</Link>
                        )}
                    </div>


                </div>
            </header>
        </div>
    )
}
