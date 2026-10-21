const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const path=require("node:path");
const root=path.resolve(__dirname,"..");
const file=name=>fs.readFileSync(path.join(root,name),"utf8");
function load(name){
 const ctx={window:{}};vm.runInNewContext(file(name),ctx);return ctx.window;
}
const data=load("data/scenes.js").JINGCAI_DATA;
const stage=load("data/presence.js").JINGCAI_STAGE;
const poses=load("data/character-poses.js").JINGCAI_POSES;
test("國中版共23幕含首頁；內頁22幕，包含11題與11個知識回饋",()=>{
 assert.equal(data.pages.length,22);
 assert.deepEqual(Array.from(data.pages,p=>p.page),Array.from({length:22},(_,i)=>i+2));
 assert.equal(data.pages.filter(p=>p.kind==="quiz").length,11);
 assert.equal(data.pages.filter(p=>p.kind==="reward").length,11);
 assert.deepEqual(Array.from(data.characters,c=>c.speaker),["青青","大春","小芯","護理師"]);
});
test("11道三選一的正確選項符合劇本文稿",()=>{
 const q=data.pages.filter(p=>p.kind==="quiz");
 assert.deepEqual(Array.from(q,p=>p.correct),[2,1,1,0,1,1,0,1,2,2,0]);
 for(let i=0;i<q.length;i++){
  assert.equal(q[i].qid,i+1);
  assert.ok(q[i].question.length>9);
  assert.equal(q[i].options.length,3);
  assert.ok(q[i].options.every(x=>x.length>3));
  assert.equal(data.pages[i*2+1].kind,"reward");
  assert.equal(data.pages[i*2+1].qid,q[i].qid);
 }
});
test("場景與角色涵蓋每個劇情節點；知識回饋保持完整",()=>{
 assert.equal(Object.keys(stage.pages).length,22);
 for(const p of data.pages){
  assert.ok(p.lines.length>=1);
  assert.ok(p.lines.every(l=>l.speaker && l.text.length>0));
  const v=stage.pages[p.page];
  assert.ok(v);
  assert.ok(stage.locations[v.location]);
  assert.ok(v.cast.length>=1);
  assert.ok(v.focus.every(n=>v.cast.includes(n)));
  if(p.kind==="reward")assert.ok(p.lines[0].text.length>30);
 }
 assert.ok(poses.default["青青"]);
 assert.ok(poses.default["小芯"]);
});
test("HTML與互動腳本符合國中版題數，通關密碼0451",()=>{
 const html=file("index.html"),app=file("assets/app.js");
 assert.ok(html.includes("國中青春心日記"));
 assert.ok(html.includes("11 題互動挑戰"));
 assert.ok(html.includes('aria-valuemax="23"'));
 assert.ok(html.includes('id="unlockCode">0451'));
 assert.ok(!html.includes("樂樂怎麼了"));
 assert.ok(app.includes("data.pages.length!==22"));
 assert.ok(app.includes("state.solved.size!==11"));
 assert.ok(app.includes("sessionStorage"));
 assert.doesNotThrow(()=>new vm.Script(app));
 assert.equal(data.ending.code,"0451");
 assert.equal(data.ending.meaning,"你是唯一");
});
