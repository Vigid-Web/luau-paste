export async function onRequestGet({request, env}) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const token = request.headers.get('x-owner') || '';
  const {value, metadata} = await env.PASTES.getWithMetadata(id);
  if (!value) return new Response('not found',{status:404});
  if (metadata?.owner !== token) return new Response('denied',{status:403});
  return new Response(value,{headers:{'Content-Type':'text/plain'}});
}
