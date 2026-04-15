export async function onRequestPost(context) {
  const { request, env } = context;
  const content = await request.text();
  if (!content || content.length > 500000) {
    return new Response(JSON.stringify({error: 'Empty or too large'}), {status: 400, headers:{'Content-Type':'application/json'}});
  }
  const id = crypto.randomUUID().replace(/-/g,'').slice(0,8);
  await env.PASTES.put(id, content, {expirationTtl: 60*60*24*30}); // 30 days
  const url = new URL(request.url);
  const base = `${url.protocol}//${url.host}`;
  return Response.json({ id, raw: `${base}/raw/${id}`, view: `${base}/p/${id}` });
}
