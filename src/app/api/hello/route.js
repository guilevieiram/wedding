import { readConvidados } from "@/lib/convidados";
export async function GET(request) {
  const conv = readConvidados()
  return new Response(JSON.stringify({ conv: conv }), { status: 200 });
}