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

const ENABLE_STRAPI_DEBUG = process.env.NEXT_PUBLIC_LOG_FETCH_ERRORS === "true";

// Timeout for fetch requests (8 seconds)
const FETCH_TIMEOUT = 8000;
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

type CacheEntry<T> = {
  data?: T;
  timestamp?: number;
  promise?: Promise<T>;
};

const strapiCache = new Map<string, CacheEntry<unknown>>();

function logStrapi(
  message: string,
  error?: unknown,
  level: "error" | "warn" = "error"
) {
  const prefix = `[Strapi] ${message}`;
  if (ENABLE_STRAPI_DEBUG && error) {
    if (level === "warn") {
      console.warn(prefix, error);
    } else {
      console.error(prefix, error);
    }
    return;
  }

  if (level === "warn") {
    console.warn(prefix);
  } else {
    console.error(prefix);
  }
}

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

function getFreshCacheValue<T>(key: string): T | undefined {
  const entry = strapiCache.get(key) as CacheEntry<T> | undefined;
  if (!entry?.data || !entry.timestamp) {
    return undefined;
  }

  const isFresh = Date.now() - entry.timestamp < CACHE_TTL;
  return isFresh ? entry.data : undefined;
}

async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> {
  const freshValue = getFreshCacheValue<T>(key);
  if (freshValue !== undefined) {
    return freshValue;
  }

  const existing = strapiCache.get(key) as CacheEntry<T> | undefined;
  if (existing?.promise) {
    return existing.promise;
  }

  const promise = (async () => {
    try {
      const data = await fetcher();
      strapiCache.set(key, { data, timestamp: Date.now() });
      return data;
    } catch (error) {
      if (existing?.data !== undefined) {
        logStrapi(
          `Serving stale cache for ${key} after fetch error`,
          error,
          "warn"
        );
        return existing.data;
      }
      throw error;
    } finally {
      const current = strapiCache.get(key) as CacheEntry<T> | undefined;
      if (current) {
        current.promise = undefined;
      }
    }
  })();

  strapiCache.set(key, { ...(existing ?? {}), promise });
  return promise;
}

/**
 * Fetches all products from the Strapi API
 * @returns Promise with the list of products
 */
export async function getProjects(): Promise<Product[]> {
  try {
    return await withCache<Product[]>("products:all", async () => {
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
    });
  } catch (error) {
    logStrapi("Error fetching products from Strapi", error);
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
    return await withCache<Product | null>(
      `products:slug:${slug}`,
      async () => {
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
      }
    );
  } catch (error) {
    logStrapi(`Error fetching product with slug "${slug}" from Strapi`, error);
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
