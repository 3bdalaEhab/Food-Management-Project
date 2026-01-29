import { describe, it, expect } from 'vitest';
import { cn, formatCurrency, formatDate, truncate, getInitials, getImageUrl } from '../utils';

describe('cn (classNames utility)', () => {
    it('should merge class names', () => {
        expect(cn('foo', 'bar')).toBe('foo bar');
    });

    it('should handle conditional classes', () => {
        expect(cn('base', true && 'active')).toBe('base active');
        expect(cn('base', false && 'active')).toBe('base');
    });

    it('should handle undefined and null', () => {
        expect(cn('foo', undefined, 'bar', null)).toBe('foo bar');
    });

    it('should merge conflicting Tailwind classes', () => {
        expect(cn('px-2', 'px-4')).toBe('px-4');
        expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    });
});

describe('formatCurrency', () => {
    it('should format number as EGP by default', () => {
        const result = formatCurrency(1000);
        expect(result).toContain('١٬٠٠٠'); // Arabic numerals
        expect(result).toContain('ج.م'); // EGP symbol in Arabic
    });

    it('should format with custom currency', () => {
        const result = formatCurrency(500, 'USD');
        expect(result).toContain('$');
    });
});

describe('formatDate', () => {
    it('should format date string', () => {
        const result = formatDate('2024-01-15');
        expect(result).toContain('January');
        expect(result).toContain('15');
        expect(result).toContain('2024');
    });

    it('should format Date object', () => {
        const date = new Date(2024, 5, 20); // June 20, 2024
        const result = formatDate(date);
        expect(result).toContain('June');
        expect(result).toContain('20');
    });
});

describe('truncate', () => {
    it('should truncate text longer than limit', () => {
        expect(truncate('Hello World', 5)).toBe('Hello...');
    });

    it('should not truncate text shorter than limit', () => {
        expect(truncate('Hi', 10)).toBe('Hi');
    });

    it('should handle exact length', () => {
        expect(truncate('Hello', 5)).toBe('Hello');
    });
});

describe('getInitials', () => {
    it('should get initials from full name', () => {
        expect(getInitials('John Doe')).toBe('JD');
    });

    it('should handle single name', () => {
        expect(getInitials('John')).toBe('J');
    });

    it('should handle multiple names (max 2)', () => {
        expect(getInitials('John Doe Smith')).toBe('JD');
    });

    it('should uppercase initials', () => {
        expect(getInitials('jane doe')).toBe('JD');
    });
});

describe('getImageUrl', () => {
    it('should return placeholder for null', () => {
        expect(getImageUrl(null)).toBe('/placeholder-food.jpg');
    });

    it('should return placeholder for undefined', () => {
        expect(getImageUrl(undefined)).toBe('/placeholder-food.jpg');
    });

    it('should return full URL as-is', () => {
        expect(getImageUrl('https://example.com/image.jpg')).toBe('https://example.com/image.jpg');
    });

    it('should prepend base URL for relative paths', () => {
        expect(getImageUrl('images/food.jpg')).toBe('https://upskilling-egypt.com/images/food.jpg');
    });
});
