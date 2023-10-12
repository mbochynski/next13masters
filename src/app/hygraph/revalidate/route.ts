import { type NextRequest } from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
	const webhookSecret = process.env.HYGRAPH_WEBHOOK_KEY;
	if (!webhookSecret) {
		return new Response("No webhook secret", { status: 500 });
	}

	console.log("Hygraph revalidate webhook");
	console.dir(req.json());

	return new Response(null, { status: 204 });
}
