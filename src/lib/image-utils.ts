/**
 * Compress an image file to reduce file size
 * @param file - The image file to compress
 * @param maxWidth - Maximum width of the compressed image (default: 400)
 * @param quality - Compression quality 0-1 (default: 0.8)
 * @returns Promise with the compressed File
 */
export function compressImage(
    file: File,
    maxWidth = 400,
    quality = 0.8
): Promise<File> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Scale down if larger than maxWidth
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    if (blob) {
                        const compressedFile = new File([blob], file.name, {
                            type: 'image/jpeg',
                            lastModified: Date.now()
                        });
                        resolve(compressedFile);
                    } else {
                        resolve(file);
                    }
                }, 'image/jpeg', quality);
            };
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    });
}

/**
 * Validate image file type and size
 * @param file - File to validate
 * @param maxSizeKB - Maximum file size in KB (default: 5000 = 5MB)
 * @returns Error message or null if valid
 */
export function validateImageFile(file: File, maxSizeKB = 5000): string | null {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (!validTypes.includes(file.type)) {
        return 'Please upload a valid image file (JPEG, PNG, GIF, or WebP)';
    }

    if (file.size > maxSizeKB * 1024) {
        return `Image size should be less than ${maxSizeKB / 1000}MB`;
    }

    return null;
}

/**
 * Create a preview URL from a file
 * @param file - File to create preview for
 * @returns Promise with the data URL
 */
export function createImagePreview(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
