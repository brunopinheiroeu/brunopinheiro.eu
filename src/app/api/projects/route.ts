import { NextResponse } from "next/server";
import { getProducts } from "@/lib/contentful";

export const revalidate = 300; // Cache the API response for 5 minutes
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const projects = await getProducts();

    return NextResponse.json(
      {
        data: projects,
        cachedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "s-maxage=300, stale-while-revalidate=60",
        },
      }
    );
  } catch (error) {
    console.error("[API /projects] Failed to fetch projects", error);
    return NextResponse.json(
      { error: "Failed to fetch products from Contentful" },
      { status: 500 }
    );
  }
}
