// terminal.js — simple typing simulator for the fake Kali terminal
(function(){
  const linesEl = document.getElementById('terminal-lines');
  const inputEl = document.getElementById('terminal-input');
  const cursor = document.querySelector('.terminal-cursor');
  const copyBtn = document.getElementById('terminal-copy');
  const restartBtn = document.getElementById('terminal-restart');
  const terminalRoot = document.getElementById('kali-terminal');
  if(!linesEl || !inputEl || !terminalRoot) return;

  const script = [
    {cmd: 'nmap -sV -Pn 192.168.1.1', out: [
      'Starting Nmap 7.80 ( https://nmap.org ) at 2025-11-18 12:00 UTC',
      'Nmap scan report for 192.168.1.1',
      'PORT    STATE SERVICE VERSION',
      '22/tcp  open  ssh     OpenSSH 7.9p1',
      '80/tcp  open  http    Apache httpd 2.4.29',
      ''
    ]},
    {cmd: 'whoami', out: ['root','']},
    {cmd: 'uname -a', out: ['Linux kali 5.10.0-kali-amd64 #1 SMP Debian 5.10.0-0kali1 x86_64 GNU/Linux','']},
    {cmd: 'echo "End of demo"', out: ['End of demo','']}
  ];

  const BASE_TYPING_SPEED = 30; // ms per char (will slightly increase over cycles)
  const BETWEEN_DELAY = 700; // ms between commands
  const LINE_DELAY = 120; // ms between output lines
  const MAX_LINES = 400; // keep terminal length bounded
  const MAX_HEIGHT = 520; // px, matches CSS max-height

  let lastCommand = '';
  let runId = 0; // used to cancel/restart runs

  function pruneLines(){
    while(linesEl.children.length > MAX_LINES){
      linesEl.removeChild(linesEl.firstChild);
    }
  }

  function appendLine(text, className){
    const div = document.createElement('div');
    if(className) div.className = className;
    div.textContent = text;
    linesEl.appendChild(div);
    pruneLines();
    // try to let the terminal grow until max height then enable scrolling
    requestAnimationFrame(()=>{
      const curH = terminalRoot.clientHeight;
      const scrollH = terminalRoot.scrollHeight;
      if(curH < MAX_HEIGHT && scrollH > curH){
        const next = Math.min(MAX_HEIGHT, curH + 14);
        terminalRoot.style.height = next + 'px';
      }
      linesEl.scrollTop = linesEl.scrollHeight;
    });
  }

  function typeText(targetEl, text, speed, localRun){
    return new Promise(resolve=>{
      let i=0;
      function step(){
        if(runId !== localRun) return resolve('aborted');
        if(i<=text.length){
          targetEl.textContent = text.slice(0,i);
          linesEl.scrollTop = linesEl.scrollHeight;
          i++;
          setTimeout(step, speed);
        } else resolve();
      }
      step();
    });
  }

  async function runScript(){
    const localRun = ++runId;
    // small variation: slightly speed up typing each full cycle until a limit
    let typingSpeed = BASE_TYPING_SPEED;
    while(runId === localRun){
      for(const item of script){
        if(runId !== localRun) return;
        inputEl.textContent = '';
        await typeText(inputEl, item.cmd, typingSpeed, localRun);
        // show command as entered
        appendLine('root@kali:~# ' + item.cmd, 'terminal-command');
        lastCommand = item.cmd;
        inputEl.textContent = '';
        await new Promise(r=>setTimeout(r, 180));
        // output
        for(const out of item.out){
          if(runId !== localRun) return;
          appendLine(out, 'terminal-output');
          await new Promise(r=>setTimeout(r, LINE_DELAY));
        }
        await new Promise(r=>setTimeout(r, BETWEEN_DELAY));
      }
      // final prompt
      appendLine('root@kali:~# ', 'terminal-command');
      inputEl.textContent = '';
      // after each full script cycle slightly reduce typing delay to feel livelier, but stop at a lower bound
      typingSpeed = Math.max(10, Math.floor(typingSpeed * 0.95));
      // short pause before restarting
      await new Promise(r=>setTimeout(r, 1200));
      // auto-clear and restart from the beginning: clear visible lines and reset terminal height
      if(runId === localRun){
        linesEl.innerHTML = '';
        terminalRoot.style.height = '';
        // small visual separator before next run (optional)
        appendLine('--- إعادة التشغيل التلقائي ---', 'terminal-output');
        await new Promise(r=>setTimeout(r, 500));
      }
    }
  }

  // copy last command to clipboard
  if(copyBtn){
    copyBtn.addEventListener('click', async ()=>{
      if(!lastCommand) return;
      try{
        await navigator.clipboard.writeText(lastCommand);
        // show feedback in terminal
        appendLine('> تم نسخ الأمر: ' + lastCommand, 'terminal-output');
      }catch(e){
        appendLine('> فشل النسخ — المتصفح لا يدعم النسخ الآمن', 'terminal-output');
      }
    });
  }

  // restart/clear terminal and restart the loop
  if(restartBtn){
    restartBtn.addEventListener('click', ()=>{
      // increment runId to cancel current run
      runId++;
      // clear lines and reset height
      linesEl.innerHTML = '';
      terminalRoot.style.height = '';
      lastCommand = '';
      // start a fresh run after tiny delay
      setTimeout(()=>{ runScript(); }, 250);
    });
  }

  // start after small delay
  setTimeout(()=>{ runScript(); }, 800);

})();
