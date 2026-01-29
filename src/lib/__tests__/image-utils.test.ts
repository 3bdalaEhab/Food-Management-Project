import { describe, it, expect } from 'vitest';
import { compressImage, validateImageFile, createImagePreview } from '../image-utils';

describe('validateImageFile', () => {
    it('should return null for valid JPEG file', () => {
        const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
        expect(validateImageFile(file)).toBeNull();
    });

    it('should return null for valid PNG file', () => {
        const file = new File([''], 'test.png', { type: 'image/png' });
        expect(validateImageFile(file)).toBeNull();
    });

    it('should return null for valid GIF file', () => {
        const file = new File([''], 'test.gif', { type: 'image/gif' });
        expect(validateImageFile(file)).toBeNull();
    });

    it('should return null for valid WebP file', () => {
        const file = new File([''], 'test.webp', { type: 'image/webp' });
        expect(validateImageFile(file)).toBeNull();
    });

    it('should return error for invalid file type', () => {
        const file = new File([''], 'test.pdf', { type: 'application/pdf' });
        const result = validateImageFile(file);
        expect(result).toContain('valid image file');
    });

    it('should return error for file too large', () => {
        // Create a mock file object with a large size
        const largeContent = new Array(6 * 1024 * 1024).fill('a').join('');
        const file = new File([largeContent], 'large.jpg', { type: 'image/jpeg' });
        const result = validateImageFile(file);
        expect(result).toContain('less than');
    });

    it('should accept file within custom size limit', () => {
        const content = new Array(400 * 1024).fill('a').join('');
        const file = new File([content], 'medium.jpg', { type: 'image/jpeg' });
        const result = validateImageFile(file, 500); // 500KB limit
        expect(result).toBeNull();
    });

    it('should reject file exceeding custom size limit', () => {
        const content = new Array(600 * 1024).fill('a').join('');
        const file = new File([content], 'medium.jpg', { type: 'image/jpeg' });
        const result = validateImageFile(file, 500); // 500KB limit
        expect(result).not.toBeNull();
    });
});

describe('createImagePreview', () => {
    it('should return a data URL for a valid image file', async () => {
        // Create a minimal valid JPEG as bytes
        const jpegBytes = new Uint8Array([0xFF, 0xD8, 0xFF, 0xE0]);
        const file = new File([jpegBytes], 'test.jpg', { type: 'image/jpeg' });

        const result = await createImagePreview(file);
        expect(result).toMatch(/^data:/);
    });

    it('should return base64 encoded content', async () => {
        const content = 'Hello, World!';
        const file = new File([content], 'test.txt', { type: 'text/plain' });

        const result = await createImagePreview(file);
        expect(result).toContain('base64');
    });
});

describe('compressImage', () => {
    // Note: compressImage uses Canvas which might not work in all test environments
    // These tests verify the function signature and basic behavior

    it('should be a function', () => {
        expect(typeof compressImage).toBe('function');
    });

    it('should return a Promise', () => {
        const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
        const result = compressImage(file);
        expect(result).toBeInstanceOf(Promise);
    });

    // Integration test would require canvas support
    // In a real environment, you'd test:
    // - Image is actually compressed
    // - Dimensions are reduced when larger than maxWidth
    // - Quality setting affects output size
});
