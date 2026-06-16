import { useState } from "react";
import { MoreHorizontal, Trash2 } from "lucide-react";
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteIncident } from "../api/incidents";
import { toast } from "sonner";

export function IncidentCardMenu({ incidentId, onDeleted }) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteIncident(incidentId);
            onDeleted(incidentId);
            toast.success("Incident deleted");
        } catch {
            toast.error("Failed to delete incident");
        } finally {
            setLoading(false);
            setConfirmOpen(false);
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <button className="p-1 rounded hover:bg-[rgba(138,155,170,0.15)] transition-colors">
                        <MoreHorizontal size={14} style={{ color: "#8A9BAA" }} />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                    <DropdownMenuItem
                        onClick={() => setConfirmOpen(true)}
                        className="text-red-500 focus:text-red-500 focus:bg-red-50 gap-2 text-[13px]"
                    >
                        <Trash2 size={13} />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete incident?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This can't be undone. The incident will be permanently removed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={loading}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            {loading ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}