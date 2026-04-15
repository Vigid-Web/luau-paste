export async function onRequestGet(context) {
  const { params, env } = context;
  const id = params.id;
  const content = await env.PASTES.get(id);
  if (!content) {
    return new Response('Paste not found', { status: 404 });
  }
  const escaped = content.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Paste ${id}</title>
  <style>body{background:#0f172a;color:#e2e8f0;font-family:ui-monospace;padding:2rem} a{color:#5eead4} pre{white-space:pre-wrap;background:#1e293b;padding:1rem;border-radius:8px}</style>
  </head><body><h2>Raw: <a href="/raw/${id}">/raw/${id}</a></h2><pre>${escaped}</pre></body></html>`;
  return new Response(html, { headers: {'Content-Type':'text/html; charset=utf-8'} });
}
