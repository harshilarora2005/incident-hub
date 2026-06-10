import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PRIORITY_LABELS, CATEGORY_LABELS } from "../assets/constants/incidentLables";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
        },
    });

    const onSubmit = async (data) => {
        const payload = {
            ...data,
            dueAt: data.dueAt
                ? new Date(data.dueAt).toISOString()
                : null,
        };

        console.log(payload);

        // await createIncident(payload)
    };

    return (
        <div className="max-w-2xl mx-auto">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Title
                    </label>

                    <Input
                        placeholder="Database outage"
                        {...register("title", {
                            required: "Title is required",
                        })}
                    />

                    {errors.title && (
                        <p className="text-sm text-red-500">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Description
                    </label>

                    <Textarea
                        rows={5}
                        placeholder="Describe the incident..."
                        {...register("description")}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Priority
                        </label>

                        <Controller
                            control={control}
                            name="priority"
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {PRIORITY_LABELS.map((priority) => (
                                            <SelectItem
                                                key={priority}
                                                value={priority}
                                            >
                                                {priority}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Category
                        </label>

                        <Controller
                            control={control}
                            name="category"
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {Object.keys(CATEGORY_LABELS).map((category) => (
                                            <SelectItem
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Due Date
                    </label>

                    <Input
                        type="datetime-local"
                        {...register("dueAt")}
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                >
                    {isSubmitting
                        ? "Creating..."
                        : "Create Incident"}
                </Button>
            </form>
        </div>
    );
}