// TypeScript types for Strapi API responses
export interface StrapiImage {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: unknown;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  front_page: boolean;
  tags?: string; // Comma-separated tags
  tools?: string; // Comma-separated tool names (figma, photoshop, html5, css3)
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover_image?: StrapiImage | null;
  content?: string; // Changed from unknown to string (markdown)
}

// Type alias for backward compatibility
export type Project = Product;

export interface StrapiResponse {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Fetches all products from the Strapi API
 * @returns Promise with the list of products
 */
export async function getProjects(): Promise<Product[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/products?populate=*`, {
      cache: "no-store", // Disable caching for dynamic data
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data: StrapiResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching products from Strapi:", error);
    return [];
  }
}
/**
 * Fetches a single product by its slug from the Strapi API
 * @param slug - The product slug
 * @returns Promise with the product data or null if not found
 */
export async function getProjectBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    const data: StrapiResponse = await response.json();
    return data.data.length > 0 ? data.data[0] : null;
  } catch (error) {
    console.error(
      `Error fetching product with slug "${slug}" from Strapi:`,
      error
    );
    return null;
  }
}

/**
 * Helper function to get the full URL for a Strapi image
 * @param imageUrl - The relative URL from Strapi
 * @returns The full URL to the image
 */
export function getStrapiImageUrl(imageUrl: string | undefined): string {
  if (!imageUrl) return "";

  // If the URL is already absolute, return it as is
  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }

  // Otherwise, prepend the Strapi URL
  return `${STRAPI_URL}${imageUrl}`;
}
