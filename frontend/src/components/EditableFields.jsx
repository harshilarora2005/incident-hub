import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
export function EditableTitle({ value, onSave }) {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(value);
    const commit = () => {
        setEditing(false);
        if (text.trim() && text.trim() !== value) onSave(text.trim());
        else setText(value);
    };

    if (editing) {
        return (
            <Input
                autoFocus
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={commit}
                onKeyDown={(e) => {
                    if (e.key === "Enter") commit();
                    if (e.key === "Escape") { setText(value); setEditing(false); }
                }}
                className="text-[22px] font-bold tracking-tight h-auto py-0.5 px-2 -mx-2 border-[#C4714A] focus-visible:ring-[#C4714A]/20"
                style={{ color: "#111D28" }}
            />
        );
    }

    return (
        <h1
            onClick={() => setEditing(true)}
            title="Click to edit"
            className="text-[22px] font-bold tracking-tight mb-2 cursor-text rounded-md px-2 -mx-2 py-0.5 hover:bg-[rgba(138,155,170,0.08)] transition-colors"
            style={{ color: "#111D28" }}
        >
            {value}
        </h1>
    );
}

export function EditableDescription({ value, onSave }) {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(value);
    const ref = useRef();

    useEffect(() => {
        if (editing && ref.current) {
            ref.current.style.height = "auto";
            ref.current.style.height = ref.current.scrollHeight + "px";
        }
    }, [editing, text]);

    const commit = () => {
        setEditing(false);
        if (text !== value) onSave(text);
    };

    if (editing) {
        return (
            <Textarea
                ref={ref}
                autoFocus
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={commit}
                onKeyDown={(e) => {
                    if (e.key === "Escape") { setText(value); setEditing(false); }
                }}
                className="text-[14px] leading-relaxed resize-none overflow-hidden px-2 -mx-2 border-[#C4714A] focus-visible:ring-[#C4714A]/20 min-h-18"
                style={{ color: "#8A9BAA" }}
            />
        );
    }

    return (
        <p
            onClick={() => setEditing(true)}
            title="Click to edit"
            className="text-[14px] leading-relaxed whitespace-pre-wrap cursor-text rounded-md px-2 -mx-2 py-1 hover:bg-[rgba(138,155,170,0.08)] transition-colors"
            style={{ color: "#8A9BAA" }}
        >
            {value || <span className="italic opacity-40">No description — click to add</span>}
        </p>
    );
}

export function EditableDueDate({ value, onSave }) {
    const [open, setOpen] = useState(false);
    const parsed = value ? parseISO(value) : undefined;

    const handleSelect = (date) => {
        setOpen(false);
        const iso = date ? format(date, "yyyy-MM-dd") : null;
        if (iso !== value) onSave(iso);
    };

    return (
        <Popover open={open} onOpenChange={setOpen} >
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    className="h-auto px-2 -mx-2 py-0.5 text-[13px] font-medium justify-start gap-2 hover:bg-[rgba(138,155,170,0.08)] w-full"
                    style={{ color: parsed ? "#111D28" : "#8A9BAA" }}
                >
                    <CalendarIcon size={12} style={{ color: "#8A9BAA" }} />
                    {parsed ? format(parsed, "d MMM yyyy") : "No due date"}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start" className='z-1500'>
                <Calendar
                    mode="single"
                    selected={parsed}
                    onSelect={handleSelect}
                    initialFocus
                    classNames={{
                        day_selected: "bg-[#C4714A] text-white hover:bg-[#C4714A]",
                        day_today: "border border-[#C4714A]",
                    }}
                />
            </PopoverContent>
        </Popover>
    );
}