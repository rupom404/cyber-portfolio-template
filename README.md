# ⚡ Cyber Tactical Portfolio Template

A futuristic, high-performance portfolio tailored for cybersecurity analysts, ethical hackers, and security researchers. Built with **Next.js (App Router)**, **Tailwind CSS**, **Framer Motion**, and procedural **Web Audio SFX**.

---

## ✨ Features

* **Procedural Cyber SFX:** Zero-dependency audio feedback engine using Web Audio API oscillators.
* **Live Telemetry Background:** Canvas matrix streaming real-time security logs, terminal outputs, and CVE strings.
* **Tactical Circular HUD Avatar:** Face-tracking 3D scroll tilt, counter-rotating radar rings, and operator status tags.
* **Serverless Contact Form:** End-to-end encrypted dispatch to your personal email inbox via Web3Forms API.
* **Live Event Countdown Widget:** Persistent HUD timer for anticipated releases (pre-configured for GTA VI).
* **100% Static & Free Hosting:** Optimized for Cloudflare Pages with zero server upkeep.

---

## 🚀 Quickstart

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.17 or later)
* Git installed on your system

### 1. Clone the Repository
Click **"Use this template"** on GitHub, or clone it locally:

```bash
git clone [https://github.com/YOUR_USERNAME/cyber-portfolio-template.git](https://github.com/YOUR_USERNAME/cyber-portfolio-template.git)
cd cyber-portfolio-template
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view your site live.

---

## 🛠️ Personalization Guide

### 1. Change Profile Picture
Place your portrait into the `public/` directory:
* File path: `public/profile.jpg`
* Best aspect ratio: Square or portrait (the circular HUD auto-centers on your face).

### 2. Update Personal Details & Bio
Open **`app/page.tsx`** and update the following fields:

| Element | Location in `app/page.tsx` | Description |
| :--- | :--- | :--- |
| **Name** | `<h1>` heading | Your full name |
| **Callsign / Handle** | Top navigation bar | e.g. `~/ your-callsign` |
| **Target Role** | `<h2>` heading | Your specialization or desired role |
| **Bio Description** | `<p>` under role | Your security focus, certs, or domains |

### 3. Update Skills, Labs & Milestones
In **`app/page.tsx`**, modify the pre-built arrays:
* `securitySkills`: Add or remove technical competencies (Wireshark, Burp Suite, Python, etc.).
* `labsAndProjects`: Add your personal CTF writeups, GitHub repos, and network labs.
* `roadmapItems`: Adjust your current learning trajectory and target certifications (Security+, eJPT, OSCP).

### 4. Update Social Endpoints
In **`app/page.tsx`**, locate the **Social Endpoints** block and replace links with your profiles:
* GitHub: `https://github.com/your-username`
* X (Twitter): `https://x.com/your-username`
* Telegram: `https://t.me/your-username`
* Direct Mail: `mailto:your-email@example.com`

---

## 📬 Contact Form Configuration (Web3Forms)

This template receives messages directly into your personal email without needing an Express server or database.

1. Go to [Web3Forms](https://web3forms.com/) and enter your personal email.
2. Check your inbox and copy your generated **Access Key**.
3. Create a `.env.local` file in your project root:
   ```env
   NEXT_PUBLIC_WEB3FORMS_KEY=your-actual-access-key-here
   ```
4. Verify that `app/page.tsx` references the environment variable:
   ```tsx
   access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '',
   ```

---

## 🌐 Free Production Deployment (Cloudflare Pages)

This project uses static exports (`output: 'export'` in `next.config.ts`), which deploy globally on Cloudflare's CDN for free.

### Deployment Steps:

1. Push your customized project to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: customize portfolio details"
   git push origin main
   ```

2. Open the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to:
   **Compute (Workers & Pages)** > **Create** > **Pages** > **Connect to Git**.

3. Select your GitHub repository and enter these build settings:

| Setting | Value |
| :--- | :--- |
| **Framework preset** | `Next.js (Static HTML Export)` |
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Root directory** | `/` |

4. *(Optional)* Add your Web3Forms key under **Environment variables**:
   * Variable name: `NEXT_PUBLIC_WEB3FORMS_KEY`
   * Value: Your Web3Forms access key

5. Click **Save and Deploy**. Your site will be live at `https://<your-project>.pages.dev` in less than a minute.

---

## 📦 Project Directory Layout

```text
├── app/
│   ├── globals.css          # Base theme, scanline styles, animations
│   ├── icon.svg             # Cyber shield browser tab favicon
│   ├── layout.tsx           # SEO metadata and root layout wrapper
│   └── page.tsx             # Main interactive portfolio interface
├── components/
│   ├── CyberBackground.tsx  # Dynamic canvas matrix telemetry stream
│   ├── CyberControls.tsx   # Minimal floating SFX and motion toggle dock
│   ├── CyberCursor.tsx      # Smooth crosshair reticle cursor & click ripple
│   ├── GtaCountdown.tsx     # Persistent HUD event timer
│   ├── HeroAvatar.tsx       # 3D tilt circular HUD profile frame
│   └── Preloader.tsx        # Terminal system boot loading sequence
├── lib/
│   └── soundEngine.ts       # Procedural audio oscillator synthesis
├── public/
│   └── profile.jpg          # Operator profile picture asset
└── next.config.ts           # Next.js static export build configuration
```

---

## 📜 License

Distributed under the MIT License. Feel free to use, modify, and distribute this template for your own personal portfolio.
