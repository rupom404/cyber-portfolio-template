'use client';

import { useEffect, useRef } from 'react';

interface CodeLine {
  x: number;
  y: number;
  originalText: string;
  currentText: string;
  type: 'cmd' | 'cve' | 'err' | 'url' | 'code';
  speed: number;
  scrambleTimer: number;
}

const CYBER_DATA = [
  // Live Commands & Tool Executions
  { text: '$ nmap -sC -sV -p- -T4 10.10.11.24', type: 'cmd' },
  { text: '$ burpsuite --project-file=audit_sec.burp', type: 'cmd' },
  { text: '$ wireshark -k -i eth0 -f "tcp port 443"', type: 'cmd' },
  { text: '$ gobuster dir -u https://lab.target -w sec_lists.txt', type: 'cmd' },
  { text: '$ hydra -L users.txt -P rockyou.txt ssh://192.168.1.1', type: 'cmd' },
  { text: '$ sqlmap -u "https://api.box/v1/auth" --batch --dbs', type: 'cmd' },
  { text: '$ msfconsole -q -x "use exploit/multi/handler"', type: 'cmd' },
  { text: '$ hashcat -m 1000 -a 0 ntlm.hashes wordlist.txt', type: 'cmd' },
  { text: '$ airmon-ng start wlan0mon && airodump-ng wlan0mon', type: 'cmd' },
  { text: '$ binwalk -Me firmware_v2.bin', type: 'cmd' },

  // CVEs, Exploits & Warnings
  { text: '[!] CVE-2024-3094: Critical liblzma backdoor injection detected', type: 'cve' },
  { text: '[!] CVE-2023-38606: Kernel memory validation privilege escalation', type: 'cve' },
  { text: '[!] CVE-2021-44228: Log4Shell JNDI injection vulnerability active', type: 'cve' },
  { text: '[+] Shellcode: \\x31\\xc0\\x50\\x68\\x2f\\x2f\\x73\\x68\\x68\\x2f\\x62\\x69\\x6e', type: 'cve' },
  { text: '[ALERT] Snort IDS: Potential SQL Injection pattern in GET /query', type: 'cve' },

  // Errors, Headers & Network Logs
  { text: '[-] 403 Forbidden: WAF Cloudflare Challenge Triggered', type: 'err' },
  { text: '[+] 200 OK: JWT signature bypass verified (alg: none)', type: 'err' },
  { text: '[ERR] Connection reset by peer: TCP RST received on port 8080', type: 'err' },
  { text: '[INFO] Handshake: TLS_AES_256_GCM_SHA384 / ECDHE-RSA', type: 'err' },
  { text: '[+] Reverse TCP shell opened: 10.10.14.5:4444 -> 10.10.11.24:52134', type: 'err' },
  { text: '[-] DNS_PROBE_FINISHED_NXDOMAIN (Resolver: 127.0.0.53)', type: 'err' },

  // Platforms, Academies & Portals
  { text: 'https://tryhackme.com/p/IAR007 [Rank: Top 5%]', type: 'url' },
  { text: 'https://app.hackthebox.com/profile/iar007', type: 'url' },
  { text: 'https://portswigger.net/web-security/academy', type: 'url' },
  { text: 'https://owasp.org/www-project-top-ten/', type: 'url' },
  { text: 'https://cve.mitre.org/cgi-bin/cvename.cgi', type: 'url' },
  { text: 'https://github.com/rupom404/personal-pages.dev', type: 'url' },

  // Hardening Scripts, Sockets & Rules
  { text: 'iptables -A INPUT -p tcp --dport 22 -s 10.0.0.0/8 -j ACCEPT', type: 'code' },
  { text: 'chmod 600 ~/.ssh/id_ed25519 && chown root:root /etc/shadow', type: 'code' },
  { text: 'import socket; s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)', type: 'code' },
  { text: 'subprocess.run(["nmap", "-sV", target_ip], capture_output=True)', type: 'code' },
  { text: 'export PATH="/opt/metasploit-framework/bin:$PATH"', type: 'code' },
  { text: 'echo 0 > /proc/sys/net/ipv4/ip_forward', type: 'code' },
] as const;

const SCRAMBLE_CHARS = '0123456789ABCDEF!@#$%^&*<>[]_/~{}';

export default function CyberBackground({ animEnabled = true }: { animEnabled?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = -1000;
    let mouseY = -1000;
    let smoothMouseX = width / 2;
    let smoothMouseY = height / 3;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initLines();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let lines: CodeLine[] = [];

    function initLines() {
      lines = [];
      const colWidth = 480;
      const numCols = Math.max(Math.floor(width / colWidth), 2);
      const rowHeight = 38;
      const numRows = Math.floor(height / rowHeight) + 4;

      for (let c = 0; c < numCols; c++) {
        for (let r = 0; r < numRows; r++) {
          const item = CYBER_DATA[(c * numRows + r) % CYBER_DATA.length];
          lines.push({
            x: c * (width / numCols) + 24,
            y: r * rowHeight + (c % 2 === 0 ? 0 : rowHeight / 2),
            originalText: item.text,
            currentText: item.text,
            type: item.type,
            speed: (0.18 + Math.random() * 0.12) * (c % 2 === 0 ? 1 : 0.85),
            scrambleTimer: 0,
          });
        }
      }
    }

    initLines();

    const render = () => {
      smoothMouseX += (mouseX - smoothMouseX) * 0.1;
      smoothMouseY += (mouseY - smoothMouseY) * 0.1;

      // Deep Obsidian Terminal Base
      ctx.fillStyle = '#030509';
      ctx.fillRect(0, 0, width, height);

      // --- LAYER 1: AMBIENT RADIAL TOP SPOTLIGHT ---
      const ambientRadial = ctx.createRadialGradient(
        width * 0.5,
        height * 0.1,
        0,
        width * 0.5,
        height * 0.1,
        width * 0.6
      );
      ambientRadial.addColorStop(0, 'rgba(6, 182, 212, 0.05)');
      ambientRadial.addColorStop(1, 'transparent');
      ctx.fillStyle = ambientRadial;
      ctx.fillRect(0, 0, width, height);

      // --- LAYER 2: INTERACTIVE FLASHLIGHT AURA ---
      const torchGrad = ctx.createRadialGradient(
        smoothMouseX,
        smoothMouseY,
        0,
        smoothMouseX,
        smoothMouseY,
        320
      );
      torchGrad.addColorStop(0, 'rgba(6, 182, 212, 0.14)');
      torchGrad.addColorStop(0.5, 'rgba(14, 165, 233, 0.04)');
      torchGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = torchGrad;
      ctx.fillRect(0, 0, width, height);

      // --- LAYER 3: CODE, TOOLS & ERROR MATRIX ---
      ctx.font = '11px "Courier New", monospace';

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Smooth upward slow scroll
        if (animEnabled) {
          line.y -= line.speed;
          if (line.y < -30) {
            line.y = height + 30;
          }
        }

        const dist = Math.hypot(smoothMouseX - (line.x + 120), smoothMouseY - line.y);
        const isNear = dist < 240;

        // Dynamic Scrambler on Proximity
        if (isNear) {
          line.scrambleTimer++;
          if (line.scrambleTimer % 4 === 0) {
            const chars = line.originalText.split('');
            const scrambleIdx = Math.floor(Math.random() * chars.length);
            chars[scrambleIdx] = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            line.currentText = chars.join('');
          }
        } else {
          line.currentText = line.originalText;
          line.scrambleTimer = 0;
        }

        // Color & Opacity Styling based on Type and Distance
        const intensity = isNear ? 1 - dist / 240 : 0;
        let baseColor = 'rgba(255, 255, 255, 0.11)'; // Default subtle code tint

        if (line.type === 'cve') {
          baseColor = isNear
            ? `rgba(248, 113, 113, ${0.4 + intensity * 0.6})` // Warning Red
            : 'rgba(239, 68, 68, 0.15)';
        } else if (line.type === 'cmd') {
          baseColor = isNear
            ? `rgba(34, 211, 238, ${0.4 + intensity * 0.6})` // Terminal Cyan
            : 'rgba(6, 182, 212, 0.16)';
        } else if (line.type === 'err') {
          baseColor = isNear
            ? `rgba(251, 191, 36, ${0.4 + intensity * 0.6})` // Amber/Yellow
            : 'rgba(245, 158, 11, 0.14)';
        } else if (line.type === 'url') {
          baseColor = isNear
            ? `rgba(56, 189, 248, ${0.4 + intensity * 0.6})` // Sky Blue
            : 'rgba(14, 165, 233, 0.16)';
        } else {
          baseColor = isNear
            ? `rgba(228, 228, 231, ${0.4 + intensity * 0.55})` // Bright White/Zinc
            : 'rgba(161, 161, 170, 0.12)';
        }

        ctx.fillStyle = baseColor;

        if (isNear && intensity > 0.4) {
          ctx.shadowColor = line.type === 'cve' ? '#ef4444' : '#06b6d4';
          ctx.shadowBlur = intensity * 8;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillText(line.currentText, line.x, line.y);
      }

      ctx.shadowBlur = 0;

      // --- LAYER 4: FAINT HUD COORDINATE MARKERS ---
      ctx.fillStyle = 'rgba(6, 182, 212, 0.25)';
      ctx.font = '9px monospace';
      ctx.fillText(`SYS.POS: [${Math.floor(smoothMouseX)}, ${Math.floor(smoothMouseY)}]`, 24, height - 20);
      ctx.fillText('STATUS: TELEMETRY_STREAM_ACTIVE', width - 240, height - 20);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [animEnabled]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
}