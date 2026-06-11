import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import FormField from "./FormField";
import { inputStyle } from "../assets/constants/formStyles";
import { cn } from "@/lib/utils";

export function DatePicker({ value, onChange, placeholder = "Pick a date" }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal border-transparent",
                        "focus:border-[#C4714A] focus:ring-[#C4714A]/20",
                        !value && "text-muted-foreground"
                    )}
                    style={inputStyle}
                >
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                    {value ? format(value, "PPP") : placeholder}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value ?? undefined}
                    onSelect={onChange}
                    disabled={(date) => date < new Date()}
                    captionLayout="dropdown"
                    fromYear={new Date().getFullYear()}
                    toYear={2030}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}

export default function DueDatePicker({ control, error }) {
    return (
        <FormField label="Due date" error={error}>
            <Controller
                control={control}
                name="dueAt"
                rules={{ required: "Due date is required" }}
                render={({ field }) => (
                    <DatePicker value={field.value} onChange={field.onChange} />
                )}
            />
        </FormField>
    );
}