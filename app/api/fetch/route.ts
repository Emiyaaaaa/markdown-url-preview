import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const url = searchParams.get("url");
	if (!url) {
		return new Response("url is required", { status: 400 });
	}
	try {
		const res = await fetch(url);
		if (!res.ok) {
			return Response.json(
				{ error: `Failed to fetch: ${res.status} ${res.statusText}` },
				{ status: res.status },
			);
		}
		const data = await res.text();
		return Response.json({ data });
	} catch (err) {
		const message = err instanceof Error ? err.message : "Unknown error";
		return Response.json(
			{ error: `Failed to fetch URL: ${message}` },
			{ status: 502 },
		);
	}
}
