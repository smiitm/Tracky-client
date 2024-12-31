import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/modeToggle"
import { UserIcon } from "@/components/userIcon"

import { Home, Settings } from "lucide-react"
import {
    SidebarHeader,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Calendar } from "@/components/ui/calendar"

// Menu items.
const items = [
    {
        title: "Home",
        url: "",
        icon: Home,
    },
    {
        title: "Settings",
        url: "/user/settings",
        icon: Settings,
    },
]

export function RightSide() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <SidebarProvider>
            <div className="pr-2 pt-2 w-full">
                <SidebarHeader>
                    <div className="flex space-x-2 justify-end">
                        <ModeToggle />
                        <UserIcon />
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Application</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border mx-2"
                    />
                </SidebarContent>
            </div>
        </SidebarProvider>
    )
}
