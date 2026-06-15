export default function TimelineEvent({ label, date, dot }) {
    return (
        <div className="flex gap-3 items-start">
            <div className="flex flex-col items-center">
                <div
                    className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                    style={{ background: dot }}
                />
                <div className="w-px flex-1 mt-1" style={{ background: "rgba(138,155,170,0.2)" }} />
            </div>
            <div className="pb-4">
                <p className="text-[13px] font-medium text-[#111D28]">{label}</p>
                <p className="text-[12px]" style={{ color: "#8A9BAA" }}>{date}</p>
            </div>
        </div>
    );
}