const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";
const DELIVERY_TOKEN = process.env.CONTENTFUL_DELIVERY_TOKEN;
const PREVIEW_TOKEN = process.env.CONTENTFUL_PREVIEW_TOKEN;

const GRAPHQL_BASE = SPACE_ID
  ? `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}`
  : "";

type FetchOptions = {
  preview?: boolean;
  cache?: RequestCache;
};

type ContentfulImage = {
  url?: string | null;
  description?: string | null;
  width?: number | null;
  height?: number | null;
};

type ContentfulProduct = {
  sys: { id: string };
  title?: string | null;
  slug?: string | null;
  frontPage?: boolean | null;
  frontPageOrder?: number | null;
  frontPageText2?: string | null;
  content?: string | null;
  tools?: (string | null)[] | null;
  tags?: (string | null)[] | null;
  coverImage?: ContentfulImage | null;
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  frontPage: boolean;
  frontPageOrder: number;
  frontPageText: string;
  content?: string;
  tools: string[];
  tags: string[];
  coverImage?: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  };
};

type ProductsQuery = {
  productCollection: {
    items: ContentfulProduct[];
  };
};

type ProductBySlugQuery = {
  productCollection: {
    items: ContentfulProduct[];
  };
};

const PRODUCT_FIELDS = `
  sys { id }
  title
  slug
  frontPage
  frontPageOrder
  frontPageText2
  content
  tools
  tags
  coverImage {
    url
    description
    width
    height
  }
`;

const isConfigured = Boolean(SPACE_ID && DELIVERY_TOKEN);

async function contentfulFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  options: FetchOptions = {}
): Promise<T> {
  if (!SPACE_ID) {
    throw new Error(
      "CONTENTFUL_SPACE_ID is missing. Please set it in your environment."
    );
  }

  const token = options.preview ? PREVIEW_TOKEN : DELIVERY_TOKEN;
  if (!token) {
    throw new Error(
      options.preview
        ? "CONTENTFUL_PREVIEW_TOKEN is required for preview queries."
        : "CONTENTFUL_DELIVERY_TOKEN is required for production queries."
    );
  }

  const response = await fetch(GRAPHQL_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: options.cache ?? "no-store",
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Contentful request failed: ${response.statusText}`);
  }

  const json = (await response.json()) as { data: T; errors?: unknown[] };

  if (json.errors?.length) {
    throw new Error(
      `Contentful returned errors: ${JSON.stringify(json.errors, null, 2)}`
    );
  }

  return json.data;
}

function normalizeUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("http")) return url;
  return `https://${url.replace(/^\/+/, "")}`;
}

function normalizeProduct(entry: ContentfulProduct): Product {
  const coverUrl = normalizeUrl(entry.coverImage?.url);
  const slugFallback =
    entry.slug ??
    (entry.frontPageOrder !== null && entry.frontPageOrder !== undefined
      ? String(entry.frontPageOrder)
      : entry.sys.id);

  return {
    id: entry.sys.id,
    title: entry.title ?? "Untitled product",
    slug: slugFallback,
    frontPage: Boolean(entry.frontPage ?? true),
    frontPageOrder: entry.frontPageOrder ?? 0,
    frontPageText: entry.frontPageText2 ?? "",
    content: entry.content ?? undefined,
    tools: entry.tools?.filter(Boolean).map((tool) => tool!.trim()) ?? [],
    tags: entry.tags?.filter(Boolean).map((tag) => tag!.trim()) ?? [],
    coverImage: coverUrl
      ? {
          url: coverUrl,
          alt: entry.coverImage?.description ?? undefined,
          width: entry.coverImage?.width ?? undefined,
          height: entry.coverImage?.height ?? undefined,
        }
      : undefined,
  };
}

export async function getProducts(): Promise<Product[]> {
  if (!isConfigured) {
    console.warn(
      "[Contentful] Environment variables missing. Returning empty product list."
    );
    return [];
  }

  try {
    const data = await contentfulFetch<ProductsQuery>(
      `
      query Products {
        productCollection(order: frontPageOrder_ASC, limit: 100) {
          items {
            ${PRODUCT_FIELDS}
          }
        }
      }
    `
    );

    return (
      data.productCollection.items?.map(normalizeProduct).filter(Boolean) ?? []
    );
  } catch (error) {
    console.error("[Contentful] Failed to fetch products", error);
    return [];
  }
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  if (!isConfigured) {
    console.warn(
      "[Contentful] Environment variables missing. Cannot fetch product by slug."
    );
    return null;
  }

  try {
    const data = await contentfulFetch<ProductBySlugQuery>(
      `
      query ProductBySlug($slug: String) {
        productCollection(where: { slug: $slug }, limit: 1) {
          items {
            ${PRODUCT_FIELDS}
          }
        }
      }
    `,
      { slug }
    );

    const item = data.productCollection.items?.[0];
    return item ? normalizeProduct(item) : null;
  } catch (error) {
    console.error("[Contentful] Failed to fetch product by slug", error);
    return null;
  }
}

