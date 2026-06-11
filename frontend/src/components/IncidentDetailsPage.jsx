import { Calendar, Flag, Layers3, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function IncidentDetailsPage({ incident }) {
    const formatDate = (date) =>
        date
            ? new Date(date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                })
            : "—";
    return (
        <div className="max-w-full mx-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-2xl border p-6">
                        <div className="flex items-center gap-2 mb-3">
                            <Badge>{incident.priority}</Badge>
                            <Badge variant="outline">{incident.status}</Badge>
                        </div>

                        <h1 className="text-3xl font-bold mb-3">
                            {incident.title}
                        </h1>

                        <p className="text-muted-foreground whitespace-pre-wrap">
                            {incident.description || "No description provided."}
                        </p>
                    </div>

                    <div className="rounded-2xl border p-6">
                        <h2 className="font-semibold text-lg mb-4">
                            Progress
                        </h2>

                        <Progress value={incident.progress ?? 0} />

                        <p className="text-sm text-muted-foreground mt-2">
                            {incident.progress ?? 0}% completed
                        </p>
                    </div>

                    <div className="rounded-2xl border p-6">
                        <h2 className="font-semibold text-lg mb-4">
                            Timeline
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <p className="font-medium">
                                    Incident Created
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {formatDate(incident.createdAt)}
                                </p>
                            </div>

                            <div>
                                <p className="font-medium">
                                    Last Updated
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {formatDate(incident.updatedAt)}
                                </p>
                            </div>

                            {incident.resolvedAt && (
                                <div>
                                    <p className="font-medium">
                                        Incident Resolved
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatDate(incident.resolvedAt)}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="rounded-2xl border p-6">
                        <h2 className="font-semibold mb-4">Details</h2>

                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <Flag size={18} />
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Priority
                                    </p>
                                    <p>{incident.priority}</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Layers3 size={18} />
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Category
                                    </p>
                                    <p>{incident.category}</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Calendar size={18} />
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Due Date
                                    </p>
                                    <p>{formatDate(incident.dueAt)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border p-6">
                        <h2 className="font-semibold mb-4">Reporter</h2>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                <User size={18} />
                            </div>

                            <div>
                                <p className="font-medium">
                                    {incident.reporter?.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {incident.reporter?.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border p-6">
                        <h2 className="font-semibold mb-4">Assignees</h2>

                        <div className="space-y-3">
                            {incident.assignees?.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
                                        <User size={16} />
                                    </div>

                                    <div>
                                        <p className="font-medium">
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}