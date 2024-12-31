import supabase from "../supabase";
import { Link } from "react-router-dom";
import { useSession } from "../context/SessionContext";

import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function UserIcon() {
  const { session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem >
          {/* this needs to be done later on */}
          <Link to={`/user/${session?.user.email}`}>Your Profile</Link> 
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => supabase.auth.signOut()}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
