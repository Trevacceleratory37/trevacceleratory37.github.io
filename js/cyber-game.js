(()=>{"use strict";
const questions=[
["Which OSI layer is responsible for routing packets?","Network","Physical","Session","Presentation",0],
["Which HTTP status usually means Not Found?","200","301","404","500",2],
["What does MFA add to authentication?","Multiple independent factors","More passwords only","Faster DNS","Encryption only",0],
["Which protocol is used for secure web traffic?","HTTP","FTP","HTTPS","Telnet",2],
["What does least privilege mean?","Give every user admin access","Give only required access","Disable logging","Share credentials",1],
["Which tool is commonly used for packet analysis?","Wireshark","Gobuster","Hashcat","Amass",0],
["What does DNS translate?","Domains to network addresses","Passwords to hashes","Files to HTML","Ports to users",0],
["What is phishing?","A social-engineering attack","A routing protocol","A database","A Linux permission",0],
["Which command searches text in Linux?","grep","chmod","mkdir","pwd",0],
["What is SQL injection primarily about?","Manipulating database queries","Breaking Wi-Fi physically","Changing screen resolution","Compressing files",0]
];
function open(){let m=document.getElementById("cyberGame");if(m){m.classList.add("open");start();return}
m=document.createElement("div");m.id="cyberGame";m.className="lab-modal open";m.innerHTML='<div class="lab-modal-backdrop"></div><div class="lab-modal-sheet game-sheet"><div class="lab-modal-head"><div><span class="lab-kicker">TRAINING / KNOWLEDGE</span><h2>CYBER DEFENDER QUIZ</h2></div><button class="lab-close">×</button></div><div id="gameArea"></div></div>';document.body.appendChild(m);m.querySelector(".lab-close").onclick=()=>m.classList.remove("open");m.querySelector(".lab-modal-backdrop").onclick=()=>m.classList.remove("open");start()}
function start(){const area=document.querySelector("#gameArea");let i=0,score=0;function render(){if(i>=questions.length){area.innerHTML='<div class="game-result"><span class="lab-kicker">SESSION COMPLETE</span><h3>'+score+' / '+questions.length+'</h3><p>'+ (score===questions.length?"Perfect run.":"Review the missed topics and try again.")+'</p><button id="restartGame">PLAY AGAIN</button></div>';area.querySelector("#restartGame").onclick=start;return}const q=questions[i];area.innerHTML='<div class="game-meta">QUESTION '+(i+1)+' / '+questions.length+' <span>SCORE '+score+'</span></div><h3>'+q[0]+'</h3><div class="game-options">'+q.slice(1,5).map((x,n)=>'<button data-a="'+n+'">'+x+'</button>').join("")+'</div><p class="game-foot">Choose an answer. Correct answers advance the mission.</p>';area.querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>{const ok=+b.dataset.a===q[5];if(ok)score++;b.classList.add(ok?"correct":"wrong");setTimeout(()=>{i++;render()},420)})}render()}
window.CyberGame={open};
})();