import { useRef, useState } from "react";
import { Camera, Upload, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface ChangePhotoFormProps {
    currentPhoto?: string;
    onSuccess: (newPhotoUrl: string) => void;
    onCancel: () => void;
}

export function ChangePhotoForm({ currentPhoto, onSuccess, onCancel }: ChangePhotoFormProps) {
    const { t } = useTranslation();
    const [preview, setPreview] = useState<string | null>(currentPhoto || null);
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            // Validate file type
            if (!selectedFile.type.startsWith('image/')) {
                toast.error('Please select an image file');
                return;
            }

            // Validate file size (max 5MB)
            if (selectedFile.size > 5 * 1024 * 1024) {
                toast.error('Image size must be less than 5MB');
                return;
            }

            setFile(selectedFile);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error('Please select an image first');
            return;
        }

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('photo', file);

            const response = await apiClient.put('/Users/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success(t('profile.photo_updated') || 'Profile picture updated successfully');
            onSuccess(response.data.photoUrl || preview!);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to upload photo';
            toast.error(message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-md mx-auto overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--sidebar-background)] shadow-xl"
        >
            <div className="relative p-10">

                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center border border-primary-500/30">
                        <Camera className="w-8 h-8 text-primary-500" />
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold text-[var(--foreground)]">
                            {t('profile.change_photo') || 'Change Profile Picture'}
                        </h2>
                        <p className="text-sm text-[var(--muted-foreground)]">
                            {t('profile.upload_photo_desc') || 'Upload a new profile picture'}
                        </p>
                    </div>

                    {/* Image Preview */}
                    <div className="relative group">
                        <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-[var(--border)] bg-[var(--background)]">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-[var(--muted-foreground)]">
                                    <Camera size={40} />
                                </div>
                            )}
                        </div>

                        {/* Upload overlay */}
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                            <div className="text-white flex flex-col items-center gap-2">
                                <Upload size={24} />
                                <span className="text-xs font-bold">{t('profile.upload_photo') || 'Upload Photo'}</span>
                            </div>
                        </button>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    <p className="text-xs text-[var(--muted-foreground)]">
                        JPG, PNG or GIF (Max 5MB)
                    </p>

                    {/* Action Buttons */}
                    <div className="w-full flex gap-3 pt-4">
                        <button
                            onClick={onCancel}
                            className="h-12 flex-1 rounded-xl border-2 border-[var(--border)] font-bold text-sm text-[var(--foreground)] hover:bg-[var(--background)] transition-all"
                        >
                            {t('common.cancel') || 'Cancel'}
                        </button>
                        <button
                            onClick={handleUpload}
                            disabled={!file || isUploading}
                            className="premium-button premium-button-primary h-12 flex-[2] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isUploading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Upload size={18} />
                                    <span className="font-bold">{t('profile.upload_photo') || 'Upload Photo'}</span>
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
