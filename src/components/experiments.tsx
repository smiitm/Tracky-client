import { useState } from "react";
import { useSession } from "../context/SessionContext";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"

export function Exp() {
    const [name, setName] = useState<string | null>("");

    const { session } = useSession();
    const handleAdd = async () => {
        
        if (!session || !session.user) {
            console.error("User is not authenticated.");
            return;
        }
        
        if (!name) {
            toast.error("Name cannot be empty.")
            return;
        }

        const userId = session.user.id;

        const routineData = {
            userId: userId,
            Name: name,
        };

        try {
            console.log("Submitting routine data:", routineData); // Log data before the request
            const response = await fetch("http://localhost:5000/api/routines/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(routineData),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success("Added new routine successfully")
                console.log("Added new routine successfully:", result);
            } else {
                toast.error("Failed to add new routine:", result.error)
                console.error("Failed to add new routine:", result.error);
            }
        } catch (error) {
            toast.error("Error adding new routine")
            console.error("Error adding new routine:", error);
        }

        setName("");
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">+ New</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Routine</DialogTitle>
                    <DialogDescription>
                        Add a new routine
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Routine name
                    </Label>
                    <Input
                        id="name"
                        className="col-span-3"
                        value={name || ""}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleAdd}>
                        Add
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
