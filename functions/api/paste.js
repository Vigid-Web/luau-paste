export async function onRequestPost() {
  return new Response(JSON.stringify({
    id: "test1234",
    raw: "https://luau-paste.pages.dev/raw/test1234",
    view: "https://luau-paste.pages.dev/p/test1234"
  }), { headers: { "Content-Type": "application/json" }});
}
