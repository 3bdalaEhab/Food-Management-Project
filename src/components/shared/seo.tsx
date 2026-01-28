import { useEffect } from "react";

interface SEOProps {
    title: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    ogType?: string;
}

/**
 * SEO Component for Food Management Project
 * Leverages React 19's native support for document head elements.
 * 
 * @param title - The page title
 * @param description - Meta description for SEO
 * @param keywords - Meta keywords
 * @param ogImage - OpenGraph Image URL
 * @param ogType - OpenGraph Type (e.g., website, article)
 */
export function SEO({
    title,
    description = "Food Management - Professional Recipe & Kitchen Management System",
    keywords = "cooking, recipes, food management, kitchen, culinary",
    ogImage,
    ogType = "website"
}: SEOProps) {
    const fullTitle = `${title} | Food Management`;

    useEffect(() => {
        document.title = fullTitle;

        // Update meta tags manually if needed, 
        // though React 19 supports <title> and <meta> directly in components.
    }, [fullTitle]);

    return (
        <>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            {ogImage && <meta property="og:image" content={ogImage} />}

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            {ogImage && <meta property="twitter:image" content={ogImage} />}
        </>
    );
}
