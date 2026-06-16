export function StatCard({ label, value, sub, accentColor, danger }) {
    return (
        <div className="bg-[#FAFAF7] rounded-xl border border-[rgba(138,155,170,0.15)] p-4">
            <div
                className="h-[3px] w-8 rounded-full mb-3"
                style={{ background: accentColor }}
            />
            <p className="text-[11px] uppercase tracking-wider font-medium mb-1"
                style={{ color: "#8A9BAA" }}>
                {label}
            </p>
            <p className="text-[28px] font-bold leading-none"
                style={{ color: danger ? "#dc2626" : "#111D28" }}>
                {value}
            </p>
            {sub && (
                <p className="text-[11px] mt-1.5" style={{ color: "#8A9BAA" }}>{sub}</p>
            )}
        </div>
    );
}