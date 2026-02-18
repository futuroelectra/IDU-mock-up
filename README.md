# IDU Landing Page

A high-end, modern SaaS landing page built with Next.js, Tailwind CSS, Framer Motion, and Three.js.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Font Setup

You need to add the following font files to `app/fonts/`:

- `Panchang-Variable.ttf` - For headers (H1, H2, bold accents)
- `Manrope-VariableFont_wght.ttf` - For body text

Once the fonts are in place, the application will automatically load them via `next/font/local`.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## Features

- **Interactive Three.js Hero**: Glassmorphic 3D geometries that respond to mouse movement
- **Smooth Animations**: Framer Motion scroll-into-view animations throughout
- **Responsive Design**: Fully responsive layout for all screen sizes
- **Modern Typography**: Custom Panchang and Manrope fonts
- **Brand Colors**: Gradient primary (#46024F to #0145B3) and brand blue (#0145B3)

## Project Structure

```
├── app/
│   ├── fonts.ts          # Font configuration
│   ├── globals.css       # Global styles and Tailwind
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page
├── components/
│   ├── Navigation.tsx    # Top navigation
│   ├── Hero.tsx          # Hero section
│   ├── HeroCanvas.tsx    # Three.js canvas component
│   ├── PainPoint.tsx     # Pain point section
│   ├── ThreePillars.tsx  # Three pillars section
│   ├── IntegrationBar.tsx # Integration logos
│   ├── FooterCTA.tsx     # Footer CTA section
│   └── Footer.tsx        # Footer
└── public/
    └── IDU new.svg       # Logo
```

## Build for Production

```bash
npm run build
npm start
```
