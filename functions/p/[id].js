export async function onRequestGet({params}) {
  const id = params.id;
  return new Response(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Paste ${id}</title>
<style>
body{background:#000;color:#0f0;font-family:monospace;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
.denied{font-size:3rem;color:#f00;text-align:center;animation:glitch 0.8s infinite}
@keyframes glitch{0%{text-shadow:3px 0 #0ff,-3px 0 #f0f}50%{text-shadow:-3px 0 #0ff,3px 0 #f0f}100%{text-shadow:3px 0 #0ff,-3px 0 #f0f}}
.wrap{width:90%;max-width:900px}
textarea{width:100%;height:60vh;background:#111;color:#0f0;border:1px solid #333;padding:12px;font-family:monospace}
button{padding:10px 16px;margin-top:10px;background:#0f0;color:#000;border:none;cursor:pointer;font-weight:bold}
</style></head><body>
<div id="app"></div>
<script>
const id='${id}';
const token=localStorage.getItem('paste_'+id);
const app=document.getElementById('app');
if(!token){
  app.innerHTML='<div class="denied">ACCESS DENIED<br>SKIDDER DETECTED</div>';
} else {
  fetch('/api/get?id='+id,{headers:{'x-owner':token}}).then(r=>{if(!r.ok) throw 0;return r.text()}).then(code=>{
    app.innerHTML='<div class="wrap"><h2>Your Paste: '+id+'</h2><textarea id="c">'+code.replace(/</g,'&lt;')+'</textarea><br><button id="s">Save</button><p>Raw for Roblox: <code>loadstring(game:HttpGet("https://'+location.host+'/raw/'+id+'"))()</code></p></div>';
    document.getElementById('s').onclick=()=>{fetch('/api/update',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,owner:token,content:document.getElementById('c').value})}).then(()=>alert('Saved'))};
  }).catch(()=>{app.innerHTML='<div class="denied">ACCESS DENIED<br>SKIDDER DETECTED</div>'});
}
</script></body></html>`,{headers:{'Content-Type':'text/html'}});
}
