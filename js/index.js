const commands = [
    { cmd: 'whoami', output: 'aria' },
    { cmd: 'echo "About me"', output: "I'm Aria, a front-end web developer and cybersecurity student with a passion for doing things I'm not meant to." },
    { 
      cmd: 'cat skills.txt', 
      output: `
- Linux: Arch, Debian, Alpine
- Languages: HTML/CSS, Python, Bash, Markdown
- Tools: Kali Linux, Git, VSCode, tmux
      `.trim()
    },
    { 
      cmd: 'cat projects.txt',
      output: `
- Terminal-style portfolio website (link)
- My Old Website (link)
- Russian Roulette with your PC (link)
- Potato Checker (link)
      `.trim()
    }
  ];

  const terminal = document.getElementById('terminal');
  let currentIndex = 0;
  let typingInterval;
  let charIndex = 0;
  let isTyping = false;

  function typeCommand(text, callback) {
    isTyping = true;
    const line = document.createElement('pre');
    line.className = 'terminal-line cursor';
    terminal.appendChild(line);

    function typeChar() {
      if (charIndex < text.length) {
        line.textContent += text[charIndex];
        charIndex++;
        setTimeout(typeChar, 50);
      } else {
        line.classList.remove('cursor');
        charIndex = 0;
        isTyping = false;
        if (callback) callback();
      }
    }
    typeChar();
  }

  function showOutput(text, callback) {
    const output = document.createElement('p');
    output.style.marginLeft = '1.5rem';
    output.style.whiteSpace = 'pre-wrap';

    // Replace links placeholder with real anchor tags (optional)
    output.innerHTML = text
      .replace(/\(link\)/g, '<a href="#" target="_blank" rel="noopener noreferrer">[link]</a>');
    
    terminal.appendChild(output);
    if (callback) callback();
  }

  function next() {
    if (isTyping) return;
    if (currentIndex >= commands.length) return;

    const { cmd, output } = commands[currentIndex];
    typeCommand(`> aria@cv:~$ ${cmd}`, () => {
      // Wait for user input to show output
      function onUserTrigger() {
        document.removeEventListener('keydown', onKey);
        document.removeEventListener('click', onClick);
        showOutput(output);
        currentIndex++;
        // Automatically start next command after short delay
        setTimeout(next, 500);
      }
      function onKey(e) {
        if (e.key === 'Enter') onUserTrigger();
      }
      function onClick() {
        onUserTrigger();
      }
      document.addEventListener('keydown', onKey);
      document.addEventListener('click', onClick);
    });
  }

  next();