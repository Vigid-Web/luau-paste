export async function onRequestPost({request, env}) {
  const content = await request.text();
  if (!content) return Response.json({error:'empty'},{status:400});
  const id = crypto.randomUUID().replace(/-/g,'').slice(0,8);
  const owner = crypto.randomUUID().replace(/-/g,'');
  await env.PASTES.put(id, content, {metadata:{owner}, expirationTtl:2592000});
  const base = new URL(request.url).origin;
  return Response.json({id, owner, raw:`${base}/raw/${id}`, view:`${base}/p/${id}`});
}
