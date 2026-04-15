export async function onRequestGet(context) {
  const { params, request, env } = context;
  const ua = request.headers.get('User-Agent') || '';
  
  // 1. Block non-Roblox
  if (!/Roblox/i.test(ua)) {
    return new Response(
      'Access denied – this raw link only works inside Roblox loadstring()',
      { status: 403, headers: { 'Content-Type': 'text/plain' } }
    );
  }

  // 2. Normal paste fetch
  const id = params.id;
  const content = await env.PASTES.get(id);
  if (!content) {
    return new Response('Paste not found', { status: 404 });
  }

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store'
    }
  });
}
