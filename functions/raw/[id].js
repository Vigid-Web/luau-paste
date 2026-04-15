export async function onRequestGet(context) {
  const { params, env } = context;
  const id = params.id;
  const content = await env.PASTES.get(id);
  if (!content) {
    return new Response('-- paste not found', { status: 404, headers: {'Content-Type':'text/plain; charset=utf-8'} });
  }
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
