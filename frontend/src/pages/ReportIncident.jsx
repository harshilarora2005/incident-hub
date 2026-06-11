import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createIncident } from "../api/incidents";
import FormField from "../components/FormField.jsx";
import DueDatePicker from "../components/DueDatePicker.jsx"
import { PrioritySelect, CategorySelect } from "../components/IncidentSelects.jsx";
import AssigneeSelect from "../components/AssigneeSelect";
import { inputStyle, colors } from "../assets/constants/formStyles.js"

const DEFAULT_VALUES = {
    title: "",
    description: "",
    priority: "MEDIUM",
    category: "GENERAL",
    dueAt: null,
    assigneeIds: [],
};

async function submitIncident(data) {
    const payload = {
        ...data,
        dueAt: data.dueAt ? data.dueAt.toISOString().split("T")[0] : null,
    };
    return createIncident(payload);
}

export default function ReportIncident() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm({ defaultValues: DEFAULT_VALUES });

    const onSubmit = async (data) => {
        try {
            await submitIncident(data);
            toast.success("Incident created");
        } catch (error) {
            toast.error(error.response?.data?.message ?? "Failed to create incident");
        }
    };

    return (
        <div className="max-w-2xl mx-auto rounded-xl p-8">
            <p
                className="text-xs font-medium uppercase tracking-widest mb-1"
                style={{ color: colors.accent }}
            >
                Incident Management
            </p>
            <h2 className="text-xl mb-7 font-black">Report new incident</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <FormField label="Title" error={errors.title?.message}>
                    <Input
                        placeholder="e.g. Database outage in prod"
                        className="border-transparent focus:border-[#C4714A] focus:ring-[#C4714A]/20"
                        style={inputStyle}
                        {...register("title", { required: "Title is required" })}
                    />
                </FormField>

                <FormField label="Description" error={errors.description?.message}>
                    <Textarea
                        rows={5}
                        placeholder="Describe what's happening, what's affected, and any steps already taken…"
                        className="border-transparent focus:border-[#C4714A] focus:ring-[#C4714A]/20 resize-y"
                        style={inputStyle}
                        {...register("description", { required: "Description is required" })}
                    />
                </FormField>

                <hr style={{ borderColor: "rgba(138,155,170,0.15)" }} />

                <div className="grid grid-cols-2 gap-4">
                    <PrioritySelect control={control} />
                    <CategorySelect control={control} />
                </div>

                <DueDatePicker control={control} error={errors.dueAt?.message} />

                <FormField label="Assign members" error={errors.assigneeIds?.message}>
                    <Controller
                        control={control}
                        name="assigneeIds"
                        render={({ field }) => (
                            <AssigneeSelect value={field.value} onChange={field.onChange} />
                        )}
                    />
                </FormField>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-medium"
                    style={{ background: colors.accent, color: colors.offWhite, border: "none" }}
                >
                    {isSubmitting ? "Creating…" : "Create incident"}
                </Button>
            </form>
        </div>
    );
}