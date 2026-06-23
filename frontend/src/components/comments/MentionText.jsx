import { splitForRender } from "../../utils/mentionUtils";

export function MentionText({ content = "" }) {
    const parts = splitForRender(content);

    return (
        <>
            {parts.map((part, i) => {
                if (typeof part === "string") {
                    return <span key={i}>{part}</span>;
                }
                return (
                    <span
                        key={i}
                        className="inline-flex items-center font-semibold rounded px-1 mx-0.5"
                        style={{ color: "#C4714A", background: "rgba(196,113,74,0.08)" }}
                    >
                        @{part.name}
                    </span>
                );
            })}
        </>
    );
}