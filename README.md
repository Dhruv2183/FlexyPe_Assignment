# FlexyPe 🛍️

A modern, premium shopping profile application built with React. FlexyPe provides users with personalized shopping insights, savings analytics, deal recommendations, and a beautiful, eye-catching interface.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat-square&logo=vite)
![Chart.js](https://img.shields.io/badge/Chart.js-4.5.1-FF6384?style=flat-square&logo=chartdotjs)

## ✨ Features

### 🏠 Landing Page
- Modern hero section with animated gradient background
- Feature showcase with glass morphism cards
- Responsive navigation

### 👤 User Profile
- **Overview Dashboard** - Quick stats showing orders, savings, reviews, and wishlist
- **Your Savings DNA** - Visual breakdown of savings by category with interactive doughnut chart
- **Smart Insights** - AI-powered shopping recommendations and restock alerts
- **Achievements** - Gamified rewards for shopping milestones
- **Order Timeline** - Beautiful order history with status tracking
- **Personalized Deals** - Curated product recommendations with one-click ordering

### 📊 Savings Analytics
- Savings-focused dashboard showing "Would Have Paid" vs "Actually Paid"
- Monthly savings growth chart with green theme
- Savings milestones and badges (Saver, Super Saver, Champion)
- Motivational messages and progress tracking

### 🎨 Design System
- **Animated mesh gradient background** with subtle color transitions
- **Glassmorphism** cards with blur and transparency effects
- **Micro-interactions** - Button shimmer, card lift, icon scaling
- **Premium color palette** - Navy blue, accent blue, teal, success green
- Responsive design for all screen sizes

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI Framework |
| Vite | 7.2.4 | Build Tool |
| React Router | 7.11.0 | Client-side Routing |
| Chart.js | 4.5.1 | Data Visualization |
| Lucide React | 0.562.0 | Icon Library |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/flexype.git

# Navigate to project directory
cd flexype

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
flexype/
├── public/
│   └── favicon.svg          # FlexyPe branded favicon
├── src/
│   ├── components/
│   │   └── profile/
│   │       ├── ProfileHeader.jsx    # User info & loyalty
│   │       ├── ShoppingDNA.jsx      # Savings breakdown chart
│   │       ├── SpendingAnalytics.jsx # Savings dashboard
│   │       ├── SmartInsights.jsx    # AI recommendations
│   │       ├── Achievements.jsx     # Rewards & badges
│   │       ├── OrderTimeline.jsx    # Order history
│   │       ├── PersonalizedDeals.jsx # Deal recommendations
│   │       ├── QuickReorder.jsx     # Reorder favorites
│   │       └── Preferences.jsx      # Settings & stats
│   ├── pages/
│   │   ├── Landing.jsx       # Home page
│   │   ├── Login.jsx         # Authentication
│   │   ├── Signup.jsx        # Registration
│   │   └── Profile.jsx       # Main profile dashboard
│   ├── data/
│   │   └── mockApi.js        # Mock data & utilities
│   ├── App.jsx               # Root component & routing
│   ├── index.css             # Global styles & design system
│   └── main.jsx              # Entry point
└── package.json
```

## 🎯 Key Highlights

- **Savings-First Approach** - All analytics focus on money saved, not spent
- **One-Click Ordering** - Order directly from personalized deals
- **Beautiful Animations** - 20s mesh gradient cycle, button shimmer, card lifts
- **Fully Responsive** - Works on desktop, tablet, and mobile
- **No Spending Display** - Positive UX by hiding total spent amounts

## 📄 License

MIT License - feel free to use this project for learning or your own applications.

---

Built with ❤️ using React + Vite
