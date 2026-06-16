import { CATEGORY_CONFIG } from "../../assets/constants/incidentStyles";
export function CategoryBars({ byCategory }) {
    const max = Math.max(...byCategory.map(c => c.count), 1);
    return (
        <div>
            <p className="text-[11px] uppercase tracking-wider font-medium mb-3"
                style={{ color: "#8A9BAA" }}>
                By category
            </p>
            <div className="space-y-2.5">
                {byCategory.map(({ cat, count }) => {
                    const cfg = CATEGORY_CONFIG[cat] ?? CATEGORY_CONFIG.GENERAL;
                    return (
                        <div key={cat} className="flex items-center gap-3">
                            <span className="text-[12px] w-20 shrink-0 font-medium"
                                style={{ color: "#8A9BAA" }}>
                                {cfg.label}
                            </span>
                            <div className="flex-1 h-1.5 rounded-full overflow-hidden"
                                style={{ background: "rgba(138,155,170,0.15)" }}>
                                <div
                                    className="h-full rounded-full transition-all duration-700"
                                    style={{
                                        width: `${(count / max) * 100}%`,
                                        background: cfg.color,
                                    }}
                                />
                            </div>
                            <span className="text-[12px] w-4 text-right font-medium tabular-nums"
                                style={{ color: "#111D28" }}>
                                {count}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}