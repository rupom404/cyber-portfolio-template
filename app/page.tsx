'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Special_Elite } from 'next/font/google';
import {
  Shield,
  Terminal,
  Lock,
  Network,
  ExternalLink,
  Mail,
  Activity,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
} from 'lucide-react';
import HeroAvatar from '@/components/HeroAvatar';
import SmoothScroll from '@/components/SmoothScroll';
import Preloader from '@/components/Preloader';
import CyberCursor from '@/components/CyberCursor';
import CyberBackground from '@/components/CyberBackground';
import CyberControls from '@/components/CyberControls';
import { soundFx } from '@/lib/soundEngine';

const specialElite = Special_Elite({
  weight: '400',
  subsets: ['latin'],
});

function GithubIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function XIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TelegramIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21.5 2 L2 9.5 L9.5 13 L19 5 L12 14.5 L11.5 21 L16 17 L21.5 2 Z" />
    </svg>
  );
}

const navLinks = [
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Labs', href: '#labs', id: 'labs' },
  { label: 'Roadmap', href: '#roadmap', id: 'roadmap' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

const securitySkills = [
  {
    category: 'Security & Analysis',
    icon: Shield,
    items: ['Wireshark', 'Nmap', 'Burp Suite', 'Packet Analysis', 'Vulnerability Assessment'],
  },
  {
    category: 'Networking & Protocols',
    icon: Network,
    items: ['TCP/IP', 'OSI Model', 'DNS/DHCP', 'OpenVPN', 'IPv4/IPv6 Routing', 'Firewalls'],
  },
  {
    category: 'Systems & Scripting',
    icon: Terminal,
    items: ['Linux (Debian/Arch/Kali)', 'Bash Scripting', 'Python Automation', 'Git', 'Virtualization'],
  },
  {
    category: 'Platforms & Labs',
    icon: Lock,
    items: ['TryHackMe', 'Hack The Box', 'PortSwigger Web Academy', 'OverTheWire', 'HomeLab'],
  },
];

const labsAndProjects = [
  {
    title: 'Custom VPN & Encrypted Gateway',
    tag: 'Network Security',
    desc: 'Configured and hardened an OpenVPN gateway on custom router firmware with isolated subnets and traffic logging.',
    tools: ['OpenVPN', 'Routing', 'Network Analysis'],
    link: '#',
  },
  {
    title: 'Automated Network & Port Scanner',
    tag: 'Python Automation',
    desc: 'Lightweight multi-threaded network scanner to identify active hosts, open ports, and banner grab services.',
    tools: ['Python', 'Sockets', 'Bash'],
    link: '#',
  },
  {
    title: 'CTF Challenge Write-ups & Blue/Red Labs',
    tag: 'Practical Security',
    desc: 'Documentation and methodology walkthroughs of solved rooms covering privilege escalation, web vulnerabilities, and OSINT.',
    tools: ['TryHackMe', 'Linux PrivEsc', 'Burp Suite'],
    link: '#',
  },
  {
    title: 'Local Edge Media & Remote File System Mount',
    tag: 'Systems Infrastructure',
    desc: 'Secure automated remote file system mounts utilizing encrypted rclone protocols and background health daemon tracking.',
    tools: ['Linux', 'Rclone', 'Automation'],
    link: '#',
  },
];

const roadmapItems = [
  { status: 'Completed', label: 'Linux & Networking Fundamentals (TCP/IP, Bash, Routing)' },
  { status: 'In Progress', label: 'TryHackMe Pre-Security & Complete Beginner Paths' },
  { status: 'Next Target', label: 'CompTIA Security+ / eJPT (Junior Penetration Tester)' },
  { status: 'Upcoming', label: 'Web Application Security & OWASP Top 10 Deep Dive' },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animEnabled, setAnimEnabled] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY < 200) {
        setActiveSection('');
        return;
      }

      const sectionIds = ['skills', 'labs', 'roadmap', 'contact'];
      let current = '';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240 && rect.bottom >= 80) {
            current = id;
            break;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    soundFx.playClick();

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_ACCESS_KEY_HERE',
          subject: `[Cyber Portfolio] New Transmission from ${formData.name}`,
          from_name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setFormSent(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormSent(false), 5000);
      } else {
        setFormError(result.message || 'Transmission failed. Please check the access key.');
      }
    } catch {
      setFormError('Network communication error during transmission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <CyberCursor />

      {/* Floating HUD Controller */}
      <CyberControls
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        animEnabled={animEnabled}
        setAnimEnabled={setAnimEnabled}
      />

      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <CyberBackground animEnabled={animEnabled} />

      <main className="min-h-screen text-zinc-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200 relative z-10 pb-20 sm:pb-12">
        <SmoothScroll />

        {/* --- STICKY TOP NAVBAR (RESPONSIVE FOR MOBILE) --- */}
        <header className="sticky top-2 sm:top-4 z-40 max-w-5xl mx-auto px-2.5 sm:px-6">
          <div className="flex items-center justify-between gap-1 p-1 sm:p-1.5 rounded-full border border-cyan-900/40 bg-[#04060a]/85 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            {/* Identity Brand */}
            <a
              href="#"
              onClick={() => soundFx.playHover()}
              className="flex items-center gap-1 font-mono text-[11px] sm:text-sm pl-2.5 sm:pl-4 whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity"
            >
              <span className="text-cyan-400 font-bold">~/</span>
              <span className="text-zinc-200 font-semibold tracking-wide hidden xs:inline">iftakhar-ahmed</span>
              <span className="text-zinc-200 font-semibold tracking-wide xs:hidden">iftakhar</span>
              <span className="text-cyan-500/70 text-xs hidden md:inline">[IAR007]</span>
            </a>

            {/* Responsive Pill Nav */}
            <nav className="flex items-center gap-0.5 sm:gap-1 bg-zinc-950/80 p-0.5 sm:p-1 rounded-full border border-zinc-800/80 shrink-0">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => {
                      setActiveSection(link.id);
                      soundFx.playHover();
                    }}
                    className={`relative px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono transition-all duration-200 ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.3)] font-semibold'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-16 sm:space-y-24">
          {/* --- HERO SECTION --- */}
          <section className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-2 sm:pt-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-7 space-y-4 sm:space-y-6 text-left w-full"
            >
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 text-[10px] sm:text-xs font-mono shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>SYSTEM: READY // SECURITY INITIATE</span>
              </div>

              {/* Name */}
              <div className="space-y-2 sm:space-y-3">
                <h1
                  className={`${specialElite.className} text-3xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.15)] leading-tight`}
                >
                  Iftakhar Ahmed
                </h1>
                <h2 className="text-base sm:text-xl lg:text-2xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
                  &gt; Aspiring Cybersecurity Analyst &amp; Ethical Hacker
                </h2>
              </div>

              <p className="text-zinc-300/80 text-xs sm:text-sm lg:text-base max-w-lg leading-relaxed">
                Focused on defensive fundamentals, network packet inspection, Linux hardening, and
                CTF challenges. Actively building hands-on labs and documenting security workflows.
              </p>

              {/* Action Button */}
              <div className="flex items-center gap-4 pt-1">
                <a
                  href="#labs"
                  onClick={() => soundFx.playHover()}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-cyan-500 text-zinc-950 font-semibold font-mono text-xs sm:text-sm hover:bg-cyan-400 transition-all duration-200 flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:scale-105"
                >
                  <Terminal size={15} /> Explore Labs
                </a>
              </div>
            </motion.div>

            {/* Avatar Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center w-full"
            >
              <HeroAvatar />
            </motion.div>
          </section>

          {/* SECURITY STACK BENTO GRID */}
          <section id="skills" className="space-y-5 sm:space-y-6 scroll-mt-20 sm:scroll-mt-28">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
                <Shield size={18} />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Security &amp; Tech Arsenal</h2>
                <p className="text-[11px] sm:text-xs font-mono text-zinc-400">Core competencies, protocols, and toolsets</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {securitySkills.map((stack, idx) => {
                const Icon = stack.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -2 }}
                    className="p-4 sm:p-6 rounded-2xl border border-cyan-900/30 bg-zinc-950/50 backdrop-blur-md relative group overflow-hidden hover:border-cyan-500/40 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                      <div className="p-1.5 sm:p-2 rounded-xl bg-zinc-900/80 border border-cyan-800/40 text-cyan-400">
                        <Icon size={16} />
                      </div>
                      <h3 className="font-semibold text-sm sm:text-base text-zinc-200">{stack.category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {stack.items.map((item, i) => (
                        <span
                          key={i}
                          className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-cyan-900/40 bg-[#06080d]/80 text-cyan-200 text-[11px] sm:text-xs font-mono"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* LABS, CTFs & WRITEUPS */}
          <section id="labs" className="space-y-5 sm:space-y-6 scroll-mt-20 sm:scroll-mt-28">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
                <Terminal size={18} />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Practical Labs &amp; CTF Writeups</h2>
                <p className="text-[11px] sm:text-xs font-mono text-zinc-400">Proof-of-work experiments and scenarios</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {labsAndProjects.map((lab, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  className="p-4 sm:p-6 rounded-2xl border border-cyan-900/30 bg-zinc-950/50 backdrop-blur-md flex flex-col justify-between group hover:border-cyan-500/40 transition-colors"
                >
                  <div className="space-y-2.5 sm:space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40 text-cyan-400">
                        {lab.tag}
                      </span>
                      <ExternalLink size={14} className="text-zinc-500 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <h3 className="font-semibold text-base sm:text-lg text-zinc-100 group-hover:text-cyan-300 transition-colors">
                      {lab.title}
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      {lab.desc}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 sm:pt-4">
                    {lab.tools.map((tool, i) => (
                      <span key={i} className="text-[10px] sm:text-[11px] font-mono text-zinc-400 bg-zinc-900/60 px-2 py-0.5 rounded border border-zinc-800/60">
                        #{tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ROADMAP / PROGRESSION */}
          <section id="roadmap" className="space-y-5 sm:space-y-6 scroll-mt-20 sm:scroll-mt-28">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
                <Activity size={18} />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Certification &amp; Learning Roadmap</h2>
                <p className="text-[11px] sm:text-xs font-mono text-zinc-400">Continuous learning path and milestones</p>
              </div>
            </div>

            <div className="p-4 sm:p-6 rounded-2xl border border-cyan-900/30 bg-zinc-950/50 backdrop-blur-md divide-y divide-zinc-800/60 font-mono text-xs">
              {roadmapItems.map((item, idx) => (
                <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center gap-2.5 sm:gap-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold shrink-0 ${
                      item.status === 'Completed'
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/40'
                        : item.status === 'In Progress'
                        ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-800/40'
                        : 'bg-zinc-800/80 text-zinc-400 border border-zinc-700/40'
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="text-zinc-300 text-[11px] sm:text-xs">{item.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* --- CONTACT & TRANSMISSION SECTION --- */}
          <section id="contact" className="space-y-5 sm:space-y-6 scroll-mt-20 sm:scroll-mt-28">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
                <MessageSquare size={18} />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Secure Communications</h2>
                <p className="text-[11px] sm:text-xs font-mono text-zinc-400">Direct message transmission and social endpoints</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
              {/* Social Channels Panel */}
              <div className="lg:col-span-2 space-y-4">
                <div className="p-4 sm:p-6 rounded-2xl border border-cyan-900/30 bg-zinc-950/50 backdrop-blur-md space-y-3 sm:space-y-4">
                  <h3 className="text-sm sm:text-base font-semibold text-zinc-200">Social Endpoints</h3>
                  <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed font-mono">
                    Connect or follow my security write-ups, code repos, and learning log:
                  </p>

                  <div className="space-y-2 pt-1">
                    {/* GitHub */}
                    <a
                      href="https://github.com/rupom404"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => soundFx.playHover()}
                      className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/40 hover:border-cyan-500/50 hover:bg-cyan-950/20 text-zinc-300 hover:text-cyan-300 transition-all font-mono text-[11px] sm:text-xs group"
                    >
                      <div className="flex items-center gap-2.5">
                        <GithubIcon size={15} className="text-zinc-400 group-hover:text-cyan-400" />
                        <span>rupom404</span>
                      </div>
                      <ExternalLink size={13} className="text-zinc-600 group-hover:text-cyan-400" />
                    </a>

                    {/* X (Twitter) */}
                    <a
                      href="https://x.com/mr_reactors"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => soundFx.playHover()}
                      className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/40 hover:border-cyan-500/50 hover:bg-cyan-950/20 text-zinc-300 hover:text-cyan-300 transition-all font-mono text-[11px] sm:text-xs group"
                    >
                      <div className="flex items-center gap-2.5">
                        <XIcon size={14} className="text-zinc-400 group-hover:text-cyan-400" />
                        <span>mr_reactors</span>
                      </div>
                      <ExternalLink size={13} className="text-zinc-600 group-hover:text-cyan-400" />
                    </a>

                    {/* Telegram */}
                    <a
                      href="https://t.me/ErrorSignal404"
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => soundFx.playHover()}
                      className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/40 hover:border-cyan-500/50 hover:bg-cyan-950/20 text-zinc-300 hover:text-cyan-300 transition-all font-mono text-[11px] sm:text-xs group"
                    >
                      <div className="flex items-center gap-2.5">
                        <TelegramIcon size={15} className="text-zinc-400 group-hover:text-cyan-400" />
                        <span>ErrorSignal404</span>
                      </div>
                      <ExternalLink size={13} className="text-zinc-600 group-hover:text-cyan-400" />
                    </a>

                    {/* ProtonMail */}
                    <a
                      href="mailto:iftakhar404@proton.me"
                      onClick={() => soundFx.playHover()}
                      className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/40 hover:border-cyan-500/50 hover:bg-cyan-950/20 text-zinc-300 hover:text-cyan-300 transition-all font-mono text-[11px] sm:text-xs group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Mail size={15} className="text-zinc-400 group-hover:text-cyan-400" />
                        <span>iftakhar404@proton.me</span>
                      </div>
                      <ExternalLink size={13} className="text-zinc-600 group-hover:text-cyan-400" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Message Transmission Form */}
              <div className="lg:col-span-3">
                <form
                  onSubmit={handleFormSubmit}
                  className="p-4 sm:p-6 rounded-2xl border border-cyan-900/30 bg-zinc-950/50 backdrop-blur-md space-y-3.5"
                >
                  <h3 className="text-sm sm:text-base font-semibold text-zinc-200">Transmit Message</h3>

                  <div className="space-y-2.5 sm:space-y-3">
                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-mono text-zinc-400 mb-1">
                        NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Hunter"
                        className="w-full px-3 py-2 rounded-xl border border-zinc-800 bg-[#06080d]/80 text-zinc-200 text-xs font-mono focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 transition-colors placeholder:text-zinc-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-mono text-zinc-400 mb-1">
                        RETURN EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sender@domain.com"
                        className="w-full px-3 py-2 rounded-xl border border-zinc-800 bg-[#06080d]/80 text-zinc-200 text-xs font-mono focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 transition-colors placeholder:text-zinc-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] sm:text-[11px] font-mono text-zinc-400 mb-1">
                        MESSAGE
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Type your message or inquiry here..."
                        className="w-full px-3 py-2 rounded-xl border border-zinc-800 bg-[#06080d]/80 text-zinc-200 text-xs font-mono focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 transition-colors placeholder:text-zinc-600 resize-none"
                      />
                    </div>
                  </div>

                  {formError && (
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-rose-950/50 border border-rose-800/60 text-rose-300 text-xs font-mono">
                      <AlertCircle size={13} className="text-rose-400" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 sm:py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-900/60 text-zinc-950 font-mono font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.01]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={14} className="animate-spin text-zinc-950" />
                        <span>TRANSMITTING ENCRYPTED Message...</span>
                      </>
                    ) : formSent ? (
                      <>
                        <CheckCircle2 size={15} className="text-emerald-950" />
                        <span>MESSAGE DELIVERED TO INBOX</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>SEND MESSAGE</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="pt-8 sm:pt-12 pb-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-zinc-500 font-mono">
            <div>
              [IAR007] • <span className="text-zinc-400">Iftakhar Ahmed</span> © {new Date().getFullYear()}
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/rupom404"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
              >
                <GithubIcon size={13} /> rupom404
              </a>
              <a
                href="#contact"
                className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
              >
                <Mail size={13} /> Contact
              </a>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}