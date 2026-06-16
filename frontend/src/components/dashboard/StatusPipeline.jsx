export function StatusPipeline({ open, inProgress, review, resolved }) {
    const total = open + inProgress + review + resolved || 1;
    const segments = [
        { label: "Open",value: open,color:"#8A9BAA" },
        { label: "In Progress", value: inProgress,color: "#C4714A" },
        { label: "Review",value: review,color: "#E2A84B" },
        { label: "Resolved",value: resolved,color: "#4CAF82" },
    ];

    return (
        <div>
            <p className="text-[11px] uppercase tracking-wider font-medium mb-3"
                style={{ color: "#8A9BAA" }}>
                Status pipeline
            </p>
            <div className="flex h-7 rounded-lg overflow-hidden gap-0.5">
                {segments.map(s => (
                    s.value > 0 && (
                        <div
                            key={s.label}
                            className="flex items-center justify-center text-[10px] font-semibold text-white transition-all"
                            style={{ flex: s.value / total, background: s.color, minWidth: s.value > 0 ? 24 : 0 }}
                            title={`${s.label}: ${s.value}`}
                        >
                            {Math.round((s.value / total) * 100) > 10 ? s.value : ""}
                        </div>
                    )
                ))}
            </div>
            <div className="flex gap-4 mt-2.5 flex-wrap">
                {segments.map(s => (
                    <div key={s.label} className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                        <span className="text-[11px]" style={{ color: "#8A9BAA" }}>
                            {s.label} · {s.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}