export async function onRequestGet({params, request, env}) {
  const ua = request.headers.get('User-Agent') || '';
  if (!/Roblox/i.test(ua)) {
    return new Response('ACCESS DENIED LOL Skidder Nigger', {status:403, headers:{'Content-Type':'text/plain'}});
  }
  const content = await env.PASTES.get(params.id);
  if (!content) return new Response('not found',{status:404});
  return new Response(content,{headers:{'Content-Type':'text/plain; charset=utf-8','Access-Control-Allow-Origin':'*'}});
}
