import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
    User as UserIcon,
    Mail,
    Globe,
    Phone,
    Loader2,
    Save,
    X,
    Camera
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useUpdateProfile } from "../hooks";
import { compressImage } from "@/lib/image-utils";
import type { User } from "../types";

const profileSchema = z.object({
    userName: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    country: z.string().min(1, "Country is required"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 characters"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileEditFormProps {
    user: User;
    onSuccess: () => void;
    onCancel: () => void;
}

export function ProfileEditForm({ user, onSuccess, onCancel }: ProfileEditFormProps) {
    const { t } = useTranslation();
    const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(user.imagePath || null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            userName: user.userName,
            email: user.email,
            country: user.country || "",
            phoneNumber: user.phoneNumber || "",
        },
    });

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const processedFile = file.size > 500 * 1024
                ? await compressImage(file)
                : file;

            setSelectedImage(processedFile);
            setPreviewUrl(URL.createObjectURL(processedFile));
        }
    };

    const onSubmit = (data: ProfileFormData) => {
        updateProfile({
            ...data,
            profileImage: selectedImage
        }, {
            onSuccess: () => onSuccess()
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mx-auto bg-[var(--sidebar-background)] rounded-[2.5rem] border border-[var(--border)] shadow-2xl overflow-hidden"
        >
            <div className="p-8 md:p-12">
                <div className="flex items-center justify-between mb-10">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-black italic uppercase tracking-tighter text-[var(--foreground)]">
                            {t('profile.edit_portfolio')}
                        </h2>
                        <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-widest opacity-70">
                            {t('profile.update_profile_desc') || "Synchronize your professional identity"}
                        </p>
                    </div>
                    <button
                        onClick={onCancel}
                        className="w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-[var(--background)] transition-colors text-[var(--muted-foreground)]"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Profile Image Section */}
                    <div className="flex flex-col items-center gap-6">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-primary-500/20 bg-[var(--background)] relative">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[var(--muted-foreground)]/20">
                                        <UserIcon size={60} />
                                    </div>
                                )}
                            </div>
                            <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white cursor-pointer shadow-lg hover:scale-110 transition-transform">
                                <Camera size={20} />
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Username */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)] ml-2">
                                {t('auth.register.username')}
                            </label>
                            <div className="relative group">
                                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/40 group-focus-within:text-primary-500" size={18} />
                                <input
                                    {...register("userName")}
                                    className="premium-input pl-12 h-14 bg-[var(--background)]/50"
                                    placeholder="Username"
                                />
                            </div>
                            {errors.userName && <p className="text-[10px] text-red-500 font-bold ml-2">{errors.userName.message}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)] ml-2">
                                {t('auth.register.email')}
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/40 group-focus-within:text-primary-500" size={18} />
                                <input
                                    {...register("email")}
                                    className="premium-input pl-12 h-14 bg-[var(--background)]/50"
                                    placeholder="Email Address"
                                />
                            </div>
                            {errors.email && <p className="text-[10px] text-red-500 font-bold ml-2">{errors.email.message}</p>}
                        </div>

                        {/* Country */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)] ml-2">
                                {t('auth.register.country')}
                            </label>
                            <div className="relative group">
                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/40 group-focus-within:text-primary-500" size={18} />
                                <input
                                    {...register("country")}
                                    className="premium-input pl-12 h-14 bg-[var(--background)]/50"
                                    placeholder="Country"
                                />
                            </div>
                            {errors.country && <p className="text-[10px] text-red-500 font-bold ml-2">{errors.country.message}</p>}
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted-foreground)] ml-2">
                                {t('auth.register.phone')}
                            </label>
                            <div className="relative group">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]/40 group-focus-within:text-primary-500" size={18} />
                                <input
                                    {...register("phoneNumber")}
                                    className="premium-input pl-12 h-14 bg-[var(--background)]/50"
                                    placeholder="Phone Number"
                                />
                            </div>
                            {errors.phoneNumber && <p className="text-[10px] text-red-500 font-bold ml-2">{errors.phoneNumber.message}</p>}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="h-14 flex-1 rounded-2xl border-2 border-[var(--border)] font-bold text-sm hover:bg-[var(--background)] transition-all"
                        >
                            {t('common.cancel')}
                        </button>
                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="premium-button premium-button-primary h-14 flex-[2] text-sm group"
                        >
                            {isUpdating ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <Save size={18} />
                                    <span className="font-bold">{t('common.save') || "Save Changes"}</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}
