import React from "react";
import { Link } from "react-router-dom";
import {
    NavigationMenu,
    // NavigationMenuContent,
    // NavigationMenuIndicator,
    NavigationMenuItem,
    // NavigationMenuLink,
    NavigationMenuList,
    // NavigationMenuTrigger,
    // NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import supabase from "../supabase";
import { useSession } from "../context/SessionContext";


export function Navbar() {
    const { session } = useSession();
    return (
        <div className="py-2 border-b-2 flex justify-end">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link to="/" className="text-xl font-bold mx-4">Tracky</Link>
                    </NavigationMenuItem>
                    <div className="flex">
                        <NavigationMenuItem className="border rounded-lg">
                            <ModeToggle />
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Button variant="outline" className="mx-2">
                                {session ? (
                                    <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
                                ) : (
                                    <Link to="/auth/sign-in">Sign In</Link>
                                )}
                            </Button>
                        </NavigationMenuItem>
                    </div>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}
