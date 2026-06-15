import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function InlineSelect({ value, options, onSave }) {
    return (
        <Select value={value} onValueChange={onSave}>
            <SelectTrigger
                className="h-auto border-0 p-0 shadow-none bg-transparent focus:ring-0 text-[13px] font-medium hover:bg-[rgba(138,155,170,0.08)] rounded px-1 -mx-1 w-full"
                style={{ color: "#111D28" }}
            >
                <SelectValue />
            </SelectTrigger>
            <SelectContent className='z-1500'>
                {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}