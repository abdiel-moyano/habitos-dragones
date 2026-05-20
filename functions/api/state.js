// functions/api/state.js
// Maneja GET (leer estado) y POST (guardar estado)

export async function onRequestGet({ env }) {
  try {
    const data = await env.HABITOS_KV.get("estado", "json");
    return new Response(JSON.stringify(data || {}), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    await env.HABITOS_KV.put("estado", JSON.stringify(body));
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}