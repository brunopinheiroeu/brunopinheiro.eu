import { NextResponse } from "next/server";
import { getProjects } from "@/lib/strapi";

export const revalidate = 300; // Cache the API response for 5 minutes

export async function GET() {
  try {
    const projects = await getProjects();

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
      { error: "Failed to fetch projects from Strapi" },
      { status: 500 }
    );
  }
}
