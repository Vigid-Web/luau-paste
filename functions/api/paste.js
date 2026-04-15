export async function onRequestPost(context) {
  const { request, env } = context;
  const content = await request.text();
  if (!content) return Response.json({error:'Empty'}, {status:400});
  const id = crypto.randomUUID().replace(/-/g,'').slice(0,8);
  await env.PASTES.put(id, content, {expirationTtl: 2592000});
  const base = new URL(request.url).origin;
  return Response.json({ id, raw: `${base}/raw/${id}`, view: `${base}/p/${id}` });
}
