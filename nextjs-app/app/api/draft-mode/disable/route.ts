import { draftMode } from "next/headers";

export async function GET() {
  const mode = await draftMode(); // ✅ Await it before calling .disable()
  mode.disable();
  return new Response("Draft mode disabled", { status: 200 });
}
