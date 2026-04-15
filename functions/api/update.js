export async function onRequestPost({request, env}) {
  const {id, owner, content} = await request.json();
  const {metadata} = await env.PASTES.getWithMetadata(id);
  if (!metadata || metadata.owner !== owner) return Response.json({error:'denied'},{status:403});
  await env.PASTES.put(id, content, {metadata, expirationTtl:2592000});
  return Response.json({ok:true});
}
