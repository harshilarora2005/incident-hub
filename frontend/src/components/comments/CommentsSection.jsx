import { useRef, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { CommentCard } from "./CommentCard";
import { CommentForm } from "./CommentForm";
import { useComments } from "../../hooks/useComments"

function CommentsSkeleton() {
    return (
        <div className="space-y-4 py-2">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-3">
                    <Skeleton className="h-7 w-7 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-3 w-32" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-3/4" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function CommentsSection({ incidentId }) {
    const { comments, loading, submitComment, updateComment, removeComment } = useComments(incidentId);
    const bottomRef = useRef(null);
    useEffect(() => {
        if (!loading) {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [comments.length, loading]);

    return (
        <div className="flex flex-col gap-4 mt-3">
            <div className="flex items-center gap-2 ">
                <MessageSquare size={14} style={{ color: "#8A9BAA" }} />
                <span
                    className="text-[11px] uppercase tracking-wider font-semibold"
                    style={{ color: "#8A9BAA" }}
                >
                    Comments
                </span>
                {comments.length > 0 && (
                    <span
                        className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                        style={{ background: "rgba(138,155,170,0.15)", color: "#8A9BAA" }}
                    >
                        {comments.length}
                    </span>
                )}
            </div>

            {/* Comment list */}
            {loading ? (
                <CommentsSkeleton />
            ) : comments.length === 0 ? (
                <div className="py-6 text-center">
                    <MessageSquare size={20} className="mx-auto mb-2 opacity-20" />
                    <p className="text-[12px]" style={{ color: "#8A9BAA" }}>
                        No comments yet — be the first to add one
                    </p>
                </div>
            ) : (
                <ScrollArea className="max-h-72">
                    <div>
                        {comments.map((comment) => (
                            <CommentCard
                                key={comment.id}
                                comment={comment}
                                incidentId={incidentId}
                                onUpdate={updateComment}
                                onDelete={removeComment}
                            />
                        ))}
                        <div ref={bottomRef} />
                    </div>
                </ScrollArea>
            )}

            {/* New comment form */}
            <CommentForm onSubmit={submitComment} />
        </div>
    );
}