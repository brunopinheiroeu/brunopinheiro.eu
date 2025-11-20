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
  front_page_order?: number;
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

// Timeout for fetch requests (8 seconds)
const FETCH_TIMEOUT = 8000;

/**
 * Creates a fetch request with timeout
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(
        `Request timeout: ${url} took longer than ${FETCH_TIMEOUT}ms`
      );
    }
    throw error;
  }
}

/**
 * Fetches all products from the Strapi API
 * @returns Promise with the list of products
 */
export async function getProjects(): Promise<Product[]> {
  try {
    const response = await fetchWithTimeout(
      `${STRAPI_URL}/api/products?populate=*&sort=front_page_order:asc`,
      {
        cache: "no-store", // Force fresh data on each request
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText}`
      );
    }

    const data: StrapiResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching products from Strapi:", error);
    // Return empty array to prevent page crash
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
    const response = await fetchWithTimeout(
      `${STRAPI_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`,
      {
        cache: "no-store", // Force fresh data on each request
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch product: ${response.status} ${response.statusText}`
      );
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
