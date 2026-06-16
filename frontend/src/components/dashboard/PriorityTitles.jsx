export function PriorityTiles({ critical, high, medium, low }) {
    const tiles = [
        { label: "Critical", value: critical, bg: "#FAECE7", color: "#712B13", sub: "#993C1D" },
        { label: "High",value: high,bg: "#FAEEDA", color: "#633806", sub: "#854F0B" },
        { label: "Medium",value: medium,bg: "#E6F1FB", color: "#0C447C", sub: "#185FA5" },
        { label: "Low",value: low,bg: "#EAF3DE", color: "#27500A", sub: "#3B6D11" },
    ];

    return (
        <div>
            <p className="text-[11px] uppercase tracking-wider font-medium mb-3"
                style={{ color: "#8A9BAA" }}>
                Priority split
            </p>
            <div className="grid grid-cols-4 gap-2">
                {tiles.map(t => (
                    <div
                        key={t.label}
                        className="rounded-lg px-3 py-2.5 text-center"
                        style={{ background: t.bg }}
                    >
                        <p className="text-[20px] font-bold leading-none" style={{ color: t.color }}>
                            {t.value}
                        </p>
                        <p className="text-[10px] mt-1 font-medium uppercase tracking-wide"
                            style={{ color: t.sub }}>
                            {t.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}