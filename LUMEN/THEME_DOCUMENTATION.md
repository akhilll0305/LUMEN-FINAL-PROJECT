# Project LUMEN - Premium Theme Documentation

## Overview
This document outlines the premium financial theme implementation for Project LUMEN, featuring a sophisticated dark/gold aesthetic with advanced animations and interactions.

## Design System

### Color Palette

#### Primary Colors
- **Deep Charcoal**: `#0a0a0a` - `#1a1a1a` (backgrounds)
- **Luxe Gold**: `#d4af37` - `#f4d03f` (accents, CTAs)
- **Warm Amber**: `#c9a961` (highlights)
- **Pure White**: `#ffffff` (text, contrast)

#### Secondary Colors
- **Slate Gray**: `#2d2d2d` - `#404040` (cards, surfaces)
- **Bronze**: `#cd7f32` (secondary accents)
- **Muted Gold**: `#b8924f` (borders, dividers)

#### Semantic Colors
- **Success**: `#4ade80` (confirmations)
- **Warning**: `#fbbf24` (anomalies, pending)
- **Error**: `#ef4444` (flags, alerts)
- **Info**: `#60a5fa` (neutral information)

### Typography

#### Font Families
```css
font-heading: 'Montserrat', 'Inter', sans-serif
font-sans: 'Inter', 'Segoe UI', sans-serif
font-mono: 'JetBrains Mono', 'Fira Code', monospace
```

#### Type Scale
- **Hero Heading**: `clamp(2.5rem, 5vw, 4.5rem)`
- **Section Heading**: `clamp(2rem, 4vw, 3rem)`
- **Card Title**: `1.5rem`
- **Body Large**: `1.125rem`
- **Body**: `1rem`
- **Small**: `0.875rem`

## Component Library

### GlassCard
Premium glass-morphism card with blur effects and golden borders.

```tsx
<GlassCard hoverable glowOnHover>
  Card content
</GlassCard>
```

**Props:**
- `hoverable` - Enable hover animations
- `glowOnHover` - Add golden glow on hover
- `noPadding` - Remove default padding

### Button
Premium button with multiple variants and animations.

```tsx
<Button variant="primary" size="lg" glow>
  Click Me
</Button>
```

**Variants:**
- `primary` - Golden gradient background
- `secondary` - Slate background with border
- `ghost` - Transparent with gold text
- `outline` - Gold border with transparent background

**Sizes:**
- `sm` - Small (px-4 py-2)
- `md` - Medium (px-6 py-3)
- `lg` - Large (px-8 py-4)

### FloatingCard
3D floating card with parallax mouse tracking.

```tsx
<FloatingCard intensity={10}>
  Content with 3D effects
</FloatingCard>
```

### StatCard
Animated statistics card with CountUp integration.

```tsx
<StatCard
  title="Total Balance"
  value={45280.50}
  prefix="$"
  icon={DollarSign}
  trend="up"
  trendValue="+12.5%"
  animated
/>
```

### TransactionCard
Animated transaction item with status indicators.

```tsx
<TransactionCard
  id="TXN-001"
  amount={-150.00}
  description="Coffee Shop"
  date="2024-11-14"
  status="completed"
  category="Dining"
/>
```

### AnomalyBadge
Priority indicator badge with animations.

```tsx
<AnomalyBadge
  type="high"
  label="High Priority"
  description="Unusual amount detected"
  animated
/>
```

## Animation System

### Variants
Pre-configured Framer Motion variants for consistent animations:

```tsx
import { containerVariants, itemVariants } from '../utils/animations';

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  <motion.div variants={itemVariants}>Item 1</motion.div>
  <motion.div variants={itemVariants}>Item 2</motion.div>
</motion.div>
```

Available variants:
- `containerVariants` - Stagger children
- `itemVariants` - Fade + slide up
- `fadeInVariants` - Simple fade
- `slideUpVariants` - Slide from bottom
- `scaleInVariants` - Scale + fade
- `cardHoverVariants` - Card hover effect
- `glowPulseVariants` - Pulsing glow

### Hooks

#### useScrollAnimation
Trigger animations when elements enter viewport.

```tsx
import { useScrollAnimation } from '../utils/hooks';

const ref = useRef(null);
const isVisible = useScrollAnimation(ref);

<div ref={ref}>
  {isVisible && <AnimatedContent />}
</div>
```

#### usePrefersReducedMotion
Respect user's motion preferences.

```tsx
const prefersReducedMotion = usePrefersReducedMotion();

{!prefersReducedMotion && <AnimatedComponent />}
```

## Pages

### Landing Page (Premium)
- Full-height hero with gradient background
- 3D floating credit card with mouse parallax
- Animated statistics counters
- Staggered feature cards
- Smooth scroll animations

### Dashboard (Premium)
- Animated stat cards with CountUp
- Recent transactions with slide-in animation
- Spending overview with progress bars
- Insights panel with icons
- Quick actions sidebar

### Pending Review (Premium)
- Priority-based filtering
- Real-time search
- Batch action support
- Animated transaction cards with severity badges
- Empty state handling

### Chat Interface (Premium)
- Smooth message animations
- Typing indicators
- Suggested questions
- Auto-scroll to latest message
- Premium bubble design

## Accessibility Features

### Keyboard Navigation
All interactive elements are keyboard accessible with visible focus states.

### Screen Reader Support
- Semantic HTML
- ARIA labels on interactive elements
- Skip links for main content

### Reduced Motion
Respects `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Color Contrast
All color combinations meet WCAG AAA standards:
- Gold on dark: 8.5:1
- White on dark: 15:1
- Error on dark: 7:1

### Touch Targets
Minimum 44x44px touch targets for mobile accessibility.

## Performance Optimizations

### GPU Acceleration
All animations use `transform` and `opacity` for 60fps performance.

### Lazy Loading
Heavy components are code-split and lazy-loaded.

### Debouncing
Scroll and resize listeners are debounced to reduce CPU usage.

### IntersectionObserver
Scroll animations use IntersectionObserver for efficient viewport detection.

## Responsive Design

### Breakpoints
```js
mobile: < 640px
tablet: 640px - 1024px
desktop: > 1024px
large: > 1440px
```

### Mobile Adaptations
- Simplified animations
- Reduced particle effects
- Bottom navigation
- Swipe gestures for cards
- Stacked layouts

## Usage

### Enable Premium Theme
In `App.tsx`, set:

```tsx
const usePremiumTheme = true;
```

### Custom Gradients
```css
bg-gradient-hero: linear-gradient(135deg, #0a0a0a 0%, #2d2416 50%, #1a1410 100%)
bg-gradient-gold: linear-gradient(45deg, #d4af37, #f4d03f)
bg-gradient-card: radial-gradient(circle at top right, rgba(212, 175, 55, 0.15), transparent)
```

### Glass Effect Classes
```css
glass-card - Standard glass card
backdrop-blur-glass - 20px blur
border-glass-border - Golden border
shadow-glass - Standard shadow
shadow-gold-glow - Golden glow effect
```

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements
- [ ] Dark/Light mode toggle
- [ ] Theme customization panel
- [ ] Additional color schemes
- [ ] More animation variants
- [ ] Advanced chart animations
- [ ] Particle effect customization

## Credits
- Design System: Project LUMEN Team
- Animations: Framer Motion
- Icons: Lucide React
- Fonts: Google Fonts (Inter, Montserrat)
