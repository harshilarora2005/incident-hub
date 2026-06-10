import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Field } from "@/components/ui/field";
import { PRIORITY_LABELS, CATEGORY_LABELS } from "../assets/constants/incidentLables";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import AssigneeSelect from "../components/AssigneeFleet";

export default function ReportIncident() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
            priority: "MEDIUM",
            category: "GENERAL",
            dueAt: "",
            assigneeIds: [],
        },
    });
    const onSubmit = async (data) => {
        const payload = {
            ...data,
            dueAt: data.dueAt ? new Date(data.dueAt).toISOString() : null,
        };
        console.log(payload);
    };

    return (
        <div className="max-w-2xl mx-auto rounded-xl p-8" >
            <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: "#C4714A" }}>
                Incident Management
            </p>
            <h2 className="text-xl mb-7 font-black">
                Report new incident
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Field>
                    <Label
                        className="text-xs font-medium uppercase tracking-wider"
                        style={{ color: "#8A9BAA" }}
                    >
                        Title
                    </Label>
                    <Input
                        placeholder="e.g. Database outage in prod"
                        className="border-transparent focus:border-[#C4714A] focus:ring-[#C4714A]/20"
                        style={{ background: "#F5F0E8", color: "#1C2B3A" }}
                        {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && (
                        <p className="text-xs mt-1" style={{ color: "#C4714A" }}>
                            {errors.title.message}
                        </p>
                    )}
                </Field>
                <Field>
                    <Label
                        className="text-xs font-medium uppercase tracking-wider"
                        style={{ color: "#8A9BAA" }}
                    >
                        Description
                    </Label>
                    <Textarea
                        rows={5}
                        placeholder="Describe what's happening, what's affected, and any steps already taken…"
                        className="border-transparent focus:border-[#C4714A] focus:ring-[#C4714A]/20 resize-y"
                        style={{ background: "#F5F0E8", color: "#1C2B3A" }}
                        {...register("description",{ required: "Description is required" })}
                    />
                </Field>
                <hr style={{ borderColor: "rgba(138,155,170,0.15)" }} />
                <div className="grid grid-cols-2 gap-4">
                    <Field>
                        <Label
                            className="text-xs font-medium uppercase tracking-wider"
                            style={{ color: "#8A9BAA" }}
                        >
                            Priority
                        </Label>
                        <Controller
                            control={control}
                            name="priority"
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger
                                        className="border-transparent focus:border-[#C4714A] focus:ring-[#C4714A]/20"
                                        style={{ background: "#F5F0E8", color: "#1C2B3A" }}
                                    >
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent style={{ background: "#F5F0E8", color: "#1C2B3A" }}>
                                        {PRIORITY_LABELS.map((p) => (
                                            <SelectItem key={p} value={p}>{p}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </Field>

                    <Field>
                        <Label
                            className="text-xs font-medium uppercase tracking-wider"
                            style={{ color: "#8A9BAA" }}
                        >
                            Category
                        </Label>
                        <Controller
                            control={control}
                            name="category"
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger
                                        className="border-transparent focus:border-[#C4714A] focus:ring-[#C4714A]/20"
                                        style={{ background: "#F5F0E8", color: "#1C2B3A" }}
                                    >
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent style={{ background: "#F5F0E8", color: "#1C2B3A" }}>
                                        {Object.keys(CATEGORY_LABELS).map((c) => (
                                            <SelectItem key={c} value={c}>{c}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </Field>
                </div>
                <Field>
                    <Label
                        className="text-xs font-medium uppercase tracking-wider"
                        style={{ color: "#8A9BAA" }}
                    >
                        Due date
                    </Label>
                    <Input
                        type="datetime-local"
                        className="border-transparent focus:border-[#C4714A] focus:ring-[#C4714A]/20"
                        style={{ background: "#F5F0E8", color: "#1C2B3A", colorScheme: "light" }}
                        {...register("dueAt",{ required: "Due Date is required" })}
                    />
                </Field>
                <Field>
                    <Label
                        className="text-xs font-medium uppercase tracking-wider"
                        style={{ color: "#8A9BAA" }}
                    >
                        Assign Members
                    </Label>
                    <Controller
                        control={control}
                        name="assigneeIds"
                        render={({ field }) => (
                            <AssigneeSelect
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    {errors.assigneeIds && (
                        <p
                            className="text-xs mt-1"
                            style={{ color: "#C4714A" }}
                        >
                            {errors.assigneeIds.message}
                        </p>
                    )}
                </Field>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-medium"
                    style={{ background: "#C4714A", color: "#FAFAF7", border: "none" }}
                >
                    {isSubmitting ? "Creating..." : "Create incident"}
                </Button>
            </form>
        </div>
    );
}