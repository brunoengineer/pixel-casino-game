# 🎰 Retro Slot Machine Game

A fully responsive, retro-styled slot machine game built with TypeScript, featuring pixel art graphics and smooth animations. Perfect for embedding in casino websites or playing standalone!

![Slot Machine Preview](https://img.shields.io/badge/Status-Ready%20to%20Play-success?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Features

### 🎮 Gameplay
- **5 Reel Slots** with 3 visible symbols per reel
- **5 Unique Symbols**: Coin, Sword, Shield, Axe, and Legendary Book
- **97% RTP** (Return to Player) - Balanced and fair gameplay
- **Dynamic Win Detection** - Matches anywhere on the reels (3+ symbols)
- **Animated Winning Highlights** - Golden glowing borders on winning reels

### 💰 Betting System
- **Flexible Bet Sizes**: 5 to 500 coins
- **Smart Increment**: +5 below 100, +100 above 100
- **Real-time Balance Tracking**
- **Auto-Spin Mode** with start/stop controls

### 🎨 Visual Design
- **Retro Pixel Art Style** with custom symbol images
- **Neon Color Scheme** (Pink, Purple, Gold)
- **Smooth Spin Animations**
- **Responsive Design** for desktop, tablet, and mobile
- **Skip Button** to instantly reveal results

### 📱 Responsive
- **Desktop First** (800px optimal width)
- **Tablet Optimized** (768px and below)
- **Mobile Ready** (480px and below)
- **Landscape Mode Support**
- **Touch-Friendly Controls**

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/casino-game.git

# Navigate to project directory
cd casino-game

# Install dependencies
npm install

# Start development server
npm run dev
```

The game will open at `http://localhost:5173/`

---

## 🎯 How to Play

### Starting the Game
1. **Set Your Bet**: Use the `-` and `+` buttons to adjust your bet
   - Bets from 5 to 100: increments of 5
   - Bets from 100 to 500: increments of 100

2. **Spin the Reels**: Click the `SPIN` button to start

3. **Skip Animation** (Optional): Click `SKIP` to instantly reveal results

4. **Auto Spin**: Enable `AUTO SPIN` to play continuously

### Winning Combinations
Win by matching **3 or more of the same symbol** anywhere on the reels!

| Symbol | Probability | Payout Multiplier | Example Win (10 bet) |
|--------|-------------|-------------------|---------------------|
| 🪙 Coin | 40% | 1x | 3 coins = 10 |
| ⚔️ Sword | 30% | 2x | 3 swords = 20 |
| 🛡️ Shield | 20% | 4x | 3 shields = 40 |
| 🪓 Axe | 8% | 10x | 3 axes = 100 |
| 📖 Book | 2% | 50x | 3 books = 500 |

### Win Multipliers
- **3 Matching Symbols**: 1x payout
- **4 Matching Symbols**: 3x payout
- **5 Matching Symbols**: 8x payout

**Example:** 5 shields with a 10 coin bet = 10 × 4 (shield payout) × 8 (5-match multiplier) = **320 coins**! 💰

---

## 🛠️ Tech Stack

- **TypeScript** - Type-safe game logic
- **Vite** - Lightning-fast build tool
- **HTML5/CSS3** - Modern web standards
- **Vanilla JavaScript** - No framework dependencies

---

## 📦 Build for Production

```bash
# Build optimized production files
npm run build

# Preview production build
npm preview
```

The build output will be in the `dist/` folder, ready for deployment.

---

## 🌐 Deployment Options

### GitHub Pages

1. **Install gh-pages**:
```bash
npm install --save-dev gh-pages
```

2. **Add deployment script** to `package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. **Deploy**:
```bash
npm run deploy
```

Your game will be live at: `https://yourusername.github.io/casino-game/`

### Embedding with iframe

```html
<!-- Responsive iframe embed -->
<div style="position: relative; padding-bottom: 112.5%; height: 0;">
  <iframe 
    src="https://yourusername.github.io/casino-game/"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;">
  </iframe>
</div>

<!-- Fixed size embed -->
<iframe 
  src="https://yourusername.github.io/casino-game/"
  width="800" 
  height="900"
  frameborder="0"
  style="border: none; border-radius: 10px;">
</iframe>
```

---

## 🎨 Customization

### Change Symbol Images
Replace images in `/img/` folder:
- `coin.png`
- `sword.png`
- `shield.png`
- `axe.png`
- `book.png`

### Adjust RTP
Edit symbol weights in `src/types.ts`:
```typescript
export const SYMBOL_WEIGHTS: Record<Symbol, number> = {
  'coin': 40,   // Higher = more common
  'sword': 30,
  'shield': 20,
  'axe': 8,
  'book': 2     // Lower = more rare
};
```

### Modify Payouts
Edit payouts in `src/types.ts`:
```typescript
export const PAYOUTS: Record<Symbol, number> = {
  'coin': 1,
  'sword': 2,
  'shield': 4,
  'axe': 10,
  'book': 50
};
```

### Change Colors
Edit CSS variables in `src/style.css`:
```css
/* Main colors */
background: #0f3460;  /* Dark blue */
border: #e94560;      /* Hot pink */
color: #ffd700;       /* Gold */
```

---

## 📱 Mobile Responsiveness

| Screen Size | Symbol Size | Reel Width | Optimizations |
|-------------|-------------|------------|---------------|
| Desktop (>768px) | 120×120px | 120px | Full experience |
| Tablet (≤768px) | 90×90px | 90px | Reduced spacing |
| Mobile (≤480px) | 60×60px | 60px | Compact layout |
| Tiny (≤360px) | 52×52px | 52px | Minimal mode |

---

## 🎮 Game Controls

### Desktop
- **Mouse Click**: All interactions
- **+/- Buttons**: Adjust bet
- **SPIN**: Start game
- **SKIP**: Instant results
- **AUTO SPIN**: Toggle auto-play

### Mobile/Touch
- **Tap**: All interactions
- Fully touch-optimized interface
- Swipe-friendly (no conflicts)

---

## 🐛 Known Issues

- Images must be loaded before first spin for smooth experience
- Auto-spin stops when balance is insufficient
- Very old browsers may not support CSS Grid/Flexbox

---

## 📄 License

MIT License - feel free to use in personal or commercial projects!

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

Created with ❤️ for learning TypeScript and game development

---

## 🎊 Acknowledgments

- Pixel art style inspired by retro arcade games
- Built as a learning project for TypeScript and responsive design
- Thanks to the open-source community for inspiration!

---

## 📸 Screenshots

### Desktop View
```
┌─────────────────────────────────────┐
│      🎰 RETRO SLOTS 🎰              │
│  Balance: 1000    Bet: 10           │
│  ┌───┬───┬───┬───┬───┐             │
│  │🪙 │⚔️ │🛡️ │🪓 │📖 │             │
│  │🛡️ │🛡️ │🛡️ │⚔️ │🪙 │  ← Win!    │
│  │⚔️ │🪓 │🪙 │🛡️ │🪓 │             │
│  └───┴───┴───┴───┴───┘             │
│      [-]  [SPIN]  [+]               │
│      [AUTO SPIN: OFF]               │
│  🎉 WIN! 3x shield = 40 coins! 🎉  │
└─────────────────────────────────────┘
```

---

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **GitHub Repository**: [Your Repo Link]
- **Report Issues**: [Issues Page]

---

**Happy Spinning! 🎰✨**
