(()=>{"use strict";
const data=window.CYBER_TREE;
const viewport=document.getElementById("treeViewport"),svg=d3.select("#treeSvg"),panel=document.getElementById("detailPanel"),panelTitle=document.getElementById("panelTitle"),panelType=document.getElementById("panelType"),panelBody=document.getElementById("panelBody"),status=document.getElementById("treeStatus");
let root,zoom,baseCollapsed=false,searchTerm="";
const colors={blue:"#4da3ff",green:"#45d483",orange:"#f0a04b",purple:"#b084ff",red:"#ff647c"};
function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function visibleRoot(){return root||d3.hierarchy(data)}
function panelFor(d){
 panelTitle.textContent=d.data.name;
 panelType.textContent=(d.data.type==="branch"||d.data.type==="root")?"SYSTEM NODE":"LEAF NODE";
 let html="";
 if(d.data.description) html+=`<div class="panel-content"><p>${esc(d.data.description)}</p>`;
 if(d.data.content) d.data.content.forEach(x=>html+=`<p>${esc(x)}</p>`);
 if(d.data.tags?.length) html+=`<div class="tag-list">${d.data.tags.map(x=>`<span class="tag">${esc(x)}</span>`).join("")}</div>`;
 if(d.data.ethics) html+=`<div class="ethics"><strong>AUTHORIZED USE:</strong> ${esc(d.data.ethics)}</div>`;
 if(d.data.links?.length) html+=d.data.links.map(x=>`<a class="panel-link" href="${safeUrl(x.url)}" target="_blank" rel="noopener noreferrer">${esc(x.label||x.url)} <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`).join("<br>");
 html+="</div>";
 panelBody.innerHTML=html; panel.classList.add("open"); panel.setAttribute("aria-hidden","false"); document.getElementById("closePanel").focus();
}
function safeUrl(url){try{const u=new URL(url,location.href);return["https:","http:"].includes(u.protocol)?u.href:"#"}catch{return"#"}}
function closePanel(){panel.classList.remove("open");panel.setAttribute("aria-hidden","true")}
function descendants(h){return h.descendants()}
function collapseAll(){root.descendants().filter(d=>d.children&&d.depth>0).forEach(d=>{d._children=d.children;d.children=null});update();status.textContent="Tree collapsed."}
function expandAll(){root.descendants().forEach(d=>{if(d._children){d.children=d._children;d._children=null}});update();status.textContent="Tree expanded."}
function reset(){root=d3.hierarchy(data);root.x0=0;root.y0=0;update();fit();status.textContent="Tree reset."}
function matches(d){return !searchTerm||d.data.name.toLowerCase().includes(searchTerm)||d.data.description?.toLowerCase().includes(searchTerm)}
function update(){
 const w=viewport.clientWidth,h=viewport.clientHeight;
 const tree=d3.tree().nodeSize([58,190]);
 tree(root);
 const nodes=root.descendants(),links=root.links();
 const xs=d3.extent(nodes,d=>d.x),ys=d3.extent(nodes,d=>d.y);
 const g=svg.select("g.scene").empty()?svg.append("g").attr("class","scene"):svg.select("g.scene");
 const link=g.selectAll("path.tree-link").data(links,d=>d.target.data.id);
 link.join(enter=>enter.append("path").attr("class","tree-link").attr("d",elbow),update=>update.attr("d",elbow),exit=>exit.remove());
 const node=g.selectAll("g.tree-node").data(nodes,d=>d.data.id);
 const enter=node.enter().append("g").attr("class","tree-node").attr("role","treeitem").attr("tabindex",0).on("click",(e,d)=>handleNode(e,d)).on("keydown",(e,d)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();handleNode(e,d)}});
 enter.append("rect").attr("x",-70).attr("y",-18).attr("width",140).attr("height",36);
 enter.append("text").attr("text-anchor","middle").attr("dy","3").text(d=>d.data.name.length>21?d.data.name.slice(0,20)+"…":d.data.name);
 enter.append("text").attr("class","node-meta").attr("text-anchor","middle").attr("dy","28").text(d=>d.data.children||d.data._children?"NODE":"OPEN");
 node.merge(enter).attr("class",d=>`tree-node ${d.data.category||"blue"} ${d.depth===0?"root":""} ${d._children?"collapsed":""} ${matches(d)?"match":"dim"}`).attr("transform",d=>`translate(${d.y},${d.x})`).attr("aria-expanded",d=>d.children?"true":d._children?"false":undefined);
 node.exit().remove();
}
function elbow(l){return`M${l.source.y+70},${l.source.x}H${(l.source.y+l.target.y)/2}V${l.target.x}H${l.target.y-70}`}
function handleNode(e,d){e.stopPropagation();if(d.children||d._children){if(d.children){d._children=d.children;d.children=null}else{d.children=d._children;d._children=null}update()}else panelFor(d)}
function fit(){
 const scene=svg.select("g.scene");if(scene.empty())return;
 const box=scene.node().getBBox(),w=viewport.clientWidth,h=viewport.clientHeight;
 if(!box.width||!box.height)return;
 const scale=Math.min(w/(box.width+100),h/(box.height+100),1.15);
 const tx=w/2-(box.x+box.width/2)*scale,ty=h/2-(box.y+box.height/2)*scale;
 svg.transition().duration(450).call(zoom.transform,d3.zoomIdentity.translate(tx,ty).scale(scale));
}
function init(){
 root=d3.hierarchy(data);root.x0=0;root.y0=0;
 zoom=d3.zoom().scaleExtent([.25,2.5]).on("zoom",e=>svg.select("g.scene").attr("transform",e.transform));
 svg.call(zoom).on("dblclick.zoom",null);
 update();requestAnimationFrame(fit);
 document.getElementById("fitBtn").onclick=fit;document.getElementById("homeBtn").onclick=reset;
 document.getElementById("expandBtn").onclick=expandAll;document.getElementById("collapseBtn").onclick=collapseAll;document.getElementById("resetBtn").onclick=reset;
 document.getElementById("closePanel").onclick=closePanel;panel.querySelector("[data-close-panel]").onclick=closePanel;
 document.getElementById("legendBtn").onclick=()=>{const l=document.getElementById("legend");l.hidden=!l.hidden};
 document.getElementById("treeSearch").addEventListener("input",e=>{searchTerm=e.target.value.trim().toLowerCase();update()});
 window.addEventListener("resize",()=>{update();fit()});document.addEventListener("keydown",e=>{if(e.key==="Escape")closePanel()});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();