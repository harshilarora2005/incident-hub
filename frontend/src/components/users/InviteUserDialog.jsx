import { useForm, Controller } from "react-hook-form";
import { UserPlus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import FormField from "../FormField";
import { inviteUser } from "../../api/userApi";
import { toast } from "sonner";
import { inputStyle, colors } from "../../assets/constants/formStyles";
import { ROLE_LABELS } from "../../assets/constants/roleLabels";

const ROLES = ["ADMIN", "MANAGER", "ENGINEER"];

export function InviteUserDialog({ open, onOpenChange, onInvited }) {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: { name: "", email: "", role: "ENGINEER" },
    });

    const onSubmit = async (data) => {
        try {
            const created = await inviteUser(data);
            toast.success(`${created.name} has been added to the workspace`);
            onInvited(created);
            reset();
            onOpenChange(false);
        } catch (err) {
            toast.error(err.response?.data?.message ?? "Failed to invite user");
        }
    };

    const handleClose = () => {
        reset();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md" showCloseButton>
                <DialogHeader>
                    <div className="flex items-center gap-2.5 mb-1">
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: "rgba(196,113,74,0.12)" }}
                        >
                            <UserPlus size={15} style={{ color: colors.accent }} />
                        </div>
                        <div>
                            <DialogTitle className="text-[15px] font-semibold" style={{ color: "#111D28" }}>
                                Add team member
                            </DialogTitle>
                            <p className="text-[12px] mt-0.5" style={{ color: "#8A9BAA" }}>
                                They'll receive an email with a temporary password.
                            </p>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
                    <FormField label="Full name" error={errors.name?.message}>
                        <Input
                            placeholder="XYZ"
                            style={inputStyle}
                            className="border-transparent focus:border-[#C4714A] focus:ring-[#C4714A]/20"
                            {...register("name", { required: "Name is required" })}
                        />
                    </FormField>

                    <FormField label="Email address" error={errors.email?.message}>
                        <Input
                            type="email"
                            placeholder="XYZ@mail.com"
                            style={inputStyle}
                            className="border-transparent focus:border-[#C4714A] focus:ring-[#C4714A]/20"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Enter a valid email address",
                                },
                            })}
                        />
                    </FormField>

                    <FormField label="Role" error={errors.role?.message}>
                        <Controller
                            control={control}
                            name="role"
                            rules={{ required: "Role is required" }}
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger
                                        style={inputStyle}
                                        className="w-full border-transparent focus:border-[#C4714A] focus:ring-[#C4714A]/20"
                                    >
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ROLES.map((role) => {
                                            const cfg = ROLE_LABELS[role];
                                            return (
                                                <SelectItem key={role} value={role}>
                                                    <div className="flex items-center gap-2">
                                                        <span
                                                            className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                                                            style={{ background: cfg.bg, color: cfg.color }}
                                                        >
                                                            {cfg.label}
                                                        </span>
                                                    </div>
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </FormField>

                    <div
                        className="rounded-xl px-4 py-3 text-[12px] leading-relaxed"
                        style={{ background: "rgba(196,113,74,0.07)", color: "#8A9BAA" }}
                    >
                        A temporary password{" "}
                        <span className="font-mono font-semibold" style={{ color: colors.accent }}>
                            Welcome@123
                        </span>{" "}
                        will be emailed to them. Ask them to change it after first login.
                    </div>

                    <DialogFooter className="pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            style={{ background: colors.accent, color: colors.offWhite, border: "none" }}
                        >
                            {isSubmitting ? "Adding…" : "Add member"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}