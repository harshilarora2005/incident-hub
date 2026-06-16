import { Controller } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { PRIORITY_LABELS, CATEGORY_LABELS } from "../assets/constants/labels";
import FormField from "./FormField";
import { inputStyle } from "../assets/constants/formStyles";

const selectTriggerClass =
    "border-transparent focus:border-[#C4714A] focus:ring-[#C4714A]/20";
const selectContentStyle = { background: "#F5F0E8", color: "#1C2B3A" };

export function PrioritySelect({ control }) {
    return (
        <FormField label="Priority">
            <Controller
                control={control}
                name="priority"
                render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className={selectTriggerClass} style={inputStyle}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent style={selectContentStyle}>
                            {PRIORITY_LABELS.map((p) => (
                                <SelectItem key={p} value={p}>{p}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
        </FormField>
    );
}

export function CategorySelect({ control }) {
    return (
        <FormField label="Category">
            <Controller
                control={control}
                name="category"
                render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className={selectTriggerClass} style={inputStyle}>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent style={selectContentStyle}>
                            {Object.keys(CATEGORY_LABELS).map((c) => (
                                <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
        </FormField>
    );
}