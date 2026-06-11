import { Label } from "@/components/ui/label";
import { labelStyle, errorStyle } from "../assets/constants/formStyles";

export default function FormField({ label, error, children }) {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <Label style={labelStyle}>{label}</Label>
            )}
            {children}
            {error && (
                <p style={errorStyle}>{error}</p>
            )}
        </div>
    );
}