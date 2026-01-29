import { useState, useCallback } from 'react';
import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form';
import { Upload, CheckCircle2, RefreshCw, Trash2, ImageIcon } from 'lucide-react';
import { compressImage, createImagePreview } from '@/lib/image-utils';

interface ProfileImageUploadProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue: UseFormSetValue<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors?: FieldErrors<any>;
    disabled?: boolean;
    fieldName?: string;
    onImageSelect?: (file: File) => void;
}

/**
 * Reusable profile image upload component with compression and preview
 */
export function ProfileImageUpload({
    register,
    setValue,
    disabled = false,
    fieldName = 'profileImage',
    onImageSelect,
}: ProfileImageUploadProps) {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Compress if file is larger than 500KB
            const processedFile = file.size > 500 * 1024
                ? await compressImage(file)
                : file;

            setSelectedImage(processedFile);
            const preview = await createImagePreview(processedFile);
            setImagePreview(preview);

            // Notify parent component
            onImageSelect?.(processedFile);
        }
    }, [onImageSelect]);

    const removeImage = useCallback(() => {
        setSelectedImage(null);
        setImagePreview(null);
        setValue(fieldName, undefined);
    }, [setValue, fieldName]);

    return (
        <div className="space-y-2">
            <label className="text-[9px] sm:text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider ml-1 flex items-center gap-1">
                <ImageIcon size={12} className="text-primary-500" />
                Profile Picture <span className="text-[var(--muted-foreground)]/60 font-normal">(Optional)</span>
            </label>

            <div className="relative">
                {!imagePreview ? (
                    <label className="flex flex-col items-center justify-center w-full h-24 sm:h-28 border-2 border-dashed border-[var(--border)] rounded-xl bg-[var(--background)]/30 hover:bg-[var(--background)]/50 hover:border-primary-500/50 transition-all cursor-pointer group">
                        <div className="flex flex-col items-center justify-center py-3">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-500/10 flex items-center justify-center mb-2 group-hover:bg-primary-500/20 group-hover:scale-110 transition-all">
                                <Upload size={16} className="sm:w-[18px] sm:h-[18px] text-primary-500" />
                            </div>
                            <p className="text-[10px] sm:text-xs font-semibold text-[var(--foreground)]">
                                <span className="text-primary-500">Click to upload</span> or drag & drop
                            </p>
                            <p className="text-[8px] sm:text-[9px] text-muted-foreground mt-0.5">PNG, JPG up to 5MB</p>
                        </div>
                        <input
                            type='file'
                            accept="image/jpeg,image/png,image/jpg,image/webp"
                            className="hidden"
                            disabled={disabled}
                            {...register(fieldName)}
                            onChange={(e) => {
                                register(fieldName).onChange(e);
                                handleImageChange(e);
                            }}
                        />
                    </label>
                ) : (
                    <div className="flex items-center gap-3 p-3 bg-[var(--background)]/40 border border-[var(--border)] rounded-xl">
                        <div className="relative shrink-0">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-2 ring-primary-500/30 ring-offset-2 ring-offset-[var(--background)] shadow-lg">
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover object-center" />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-500 rounded-full border-2 border-[var(--background)] flex items-center justify-center">
                                <CheckCircle2 size={10} className="text-white" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-[var(--foreground)] truncate">{selectedImage?.name}</p>
                            <p className="text-[9px] text-green-500 font-semibold flex items-center gap-0.5 mt-0.5">
                                <CheckCircle2 size={10} /> Ready
                            </p>
                        </div>
                        <div className="flex gap-1.5">
                            <label className="w-7 h-7 rounded-lg bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-muted-foreground hover:text-primary-500 cursor-pointer transition-all">
                                <RefreshCw size={12} />
                                <input
                                    type='file'
                                    accept="image/*"
                                    className="hidden"
                                    disabled={disabled}
                                    {...register(fieldName)}
                                    onChange={(e) => {
                                        register(fieldName).onChange(e);
                                        handleImageChange(e);
                                    }}
                                />
                            </label>
                            <button
                                type="button"
                                onClick={removeImage}
                                disabled={disabled}
                                className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                            >
                                <Trash2 size={12} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Export selected image getter for form submission
export function useProfileImage() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    return {
        selectedImage,
        setSelectedImage,
    };
}
