import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { DragDropContext } from "@hello-pangea/dnd";
import { KanbanColumn } from "../components/KanbanColumn";
import { getAllIncidents, updateIncidentStatus } from "../api/incidents";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const COLUMNS = [
    { key: "OPEN",label: "Open",dot: "#8A9BAA" },
    { key: "IN_PROGRESS", label: "In Progress",dot: "#C4714A" },
    { key: "REVIEW",label: "Under Review",dot: "#E2A84B" },
    { key: "RESOLVED",label: "Resolved",dot: "#4CAF82" },
];

export default function IncidentsPage() {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getAllIncidents()
            .then((res) => setIncidents(res.data))
            .catch(() => setError("Failed to load incidents."))
            .finally(() => setLoading(false));
    }, []);

    const byStatus = (status) => incidents.filter((i) => i.status === status);

    const handleQuickCreated = (incident) =>
        setIncidents((prev) => [incident, ...prev]);

    const handleUpdated = (updated) =>
        setIncidents((prev) => prev.map((i) => i.id === updated.id ? updated : i));

    const handleDeleted = (id) =>
        setIncidents((prev) => prev.filter((i) => i.id !== id));

    const onDragEnd = async ({ source, destination, draggableId }) => {
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;
        const newStatus = destination.droppableId;
        const id = Number(draggableId);
        setIncidents((prev) =>
            prev.map((inc) => inc.id === id ? { ...inc, status: newStatus } : inc)
        );
        try {
            await updateIncidentStatus(id, newStatus);
        } catch {
            setIncidents((prev) =>
                prev.map((inc) => inc.id === id ? { ...inc, status: source.droppableId } : inc)
            );
            toast.error("Failed to update status");
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-full p-6" style={{ background: "#F0EDE8" }}>
            <p className="text-sm text-[#8A9BAA]">Loading incidents...</p>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center h-full p-6" style={{ background: "#F0EDE8" }}>
            <p className="text-sm text-red-500">{error}</p>
        </div>
    );

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="p-6 min-h-full" style={{ background: "#F0EDE8" }}>
                <div className="flex items-center justify-between mb-5">
                    <h1 className="text-[16px] font-medium text-[#111D28]">Incidents</h1>
                    <button
                        className="flex items-center gap-1.5 bg-[#C4714A] hover:bg-[#b5633e] text-[#FAFAF7] text-[13px] font-medium px-3.5 py-1.5 rounded-lg transition-colors"
                        onClick={() => navigate("/report-incident")}
                    >
                        <Plus size={15} />
                        New incident
                    </button>
                </div>

                <div className="grid grid-cols-4 gap-4 items-start">
                    {COLUMNS.map((col) => (
                        <KanbanColumn
                            key={col.key}
                            column={col}
                            incidents={byStatus(col.key)}
                            onQuickCreated={handleQuickCreated}
                            onUpdated={handleUpdated}
                            onDeleted={handleDeleted}
                        />
                    ))}
                </div>
            </div>
        </DragDropContext>
    );
}