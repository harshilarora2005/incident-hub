import useAuth from "./useAuth";

export function useCanComment(reporter, assignees = []) {
    const { user } = useAuth();
    if (!user) return false;
    const isAdmin = user.roles?.includes("ADMIN");
    const isReporter = reporter?.id === user.userId;
    const isAssignee = assignees.some(
        (assignee) => assignee === user.userId
    );
    return isAdmin || isReporter || isAssignee;
}