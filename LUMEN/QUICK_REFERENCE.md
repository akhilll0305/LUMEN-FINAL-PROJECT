# 🎨 Project LUMEN - Quick Reference Guide

## 🚀 Getting Started

Your dev server is running at: **http://localhost:5173/**

## 🎯 Premium Pages Available

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | LandingPagePremium | Hero page with 3D card & features |
| `/dashboard` | DashboardPremium | Main dashboard with stats |
| `/pending` | PendingReviewPagePremium | Transaction review queue |
| `/chat` | ChatPagePremium | AI assistant interface |
| `/analytics` | AnalyticsPage | Analytics (existing) |
| `/auth` | AuthPage | Login/signup (existing) |

## 🧩 Core Components

### GlassCard
```tsx
<GlassCard hoverable glowOnHover>
  Content with premium glass effect
</GlassCard>
```

### Button
```tsx
<Button variant="primary" size="lg" glow>
  <Icon /> Button Text
</Button>
```
**Variants:** `primary` | `secondary` | `ghost` | `outline`

### StatCard
```tsx
<StatCard
  title="Revenue"
  value={12500}
  prefix="$"
  icon={DollarSign}
  trend="up"
  trendValue="+12%"
/>
```

### TransactionCard
```tsx
<TransactionCard
  id="TXN-001"
  amount={-50.00}
  description="Coffee Shop"
  date="2024-11-14"
  status="completed"
  category="Dining"
/>
```

### AnomalyBadge
```tsx
<AnomalyBadge
  type="high"
  label="Critical"
  description="Unusual amount"
  animated
/>
```

## 🎬 Animations

### Stagger Container
```tsx
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  <motion.div variants={itemVariants}>Item 1</motion.div>
  <motion.div variants={itemVariants}>Item 2</motion.div>
</motion.div>
```

### Page Transition
```tsx
<PageTransition>
  <YourPageContent />
</PageTransition>
```

### Custom Animation
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
  Content
</motion.div>
```

## 🎨 Color Classes

### Background
- `bg-bg-primary` - Deep black (#0a0a0a)
- `bg-bg-secondary` - Dark charcoal (#1a1a1a)
- `bg-glass-bg` - Glass effect background

### Text
- `text-luxe-gold` - Premium gold (#d4af37)
- `text-text-primary` - White
- `text-text-secondary` - Gray

### Gradients
- `bg-gradient-gold` - Gold gradient
- `bg-gradient-hero` - Hero background
- `bg-gradient-card` - Card glow effect

### Effects
- `shadow-gold-glow` - Golden glow shadow
- `shadow-glass` - Glass card shadow
- `backdrop-blur-glass` - 20px blur

## ✨ Utility Classes

### Glass Effect
```tsx
<div className="glass-card p-6 rounded-glass">
  Glass morphism card
</div>
```

### Text Gradient
```tsx
<h1 className="gradient-text-premium">
  Premium Golden Text
</h1>
```

### Animations
```tsx
<div className="animate-float">Floating element</div>
<div className="animate-breathe">Breathing effect</div>
<div className="animate-pulse-glow">Pulsing glow</div>
```

## 🎭 Animation Variants

| Variant | Effect |
|---------|--------|
| `containerVariants` | Stagger children |
| `itemVariants` | Fade + slide up |
| `fadeInVariants` | Simple fade in |
| `slideUpVariants` | Slide from bottom |
| `scaleInVariants` | Scale + fade |
| `cardHoverVariants` | Hover lift |
| `glowPulseVariants` | Pulsing glow |
| `pageTransitionVariants` | Page transitions |

## 🔧 Custom Hooks

```tsx
// Scroll animation
const ref = useRef(null);
const isVisible = useScrollAnimation(ref);

// Reduced motion
const prefersReducedMotion = usePrefersReducedMotion();

// Hover state
const [isHovered, hoverProps] = useHover();

// Window size
const { width, height } = useWindowSize();
```

## 📱 Responsive Breakpoints

```tsx
// Mobile first
<div className="
  px-4           // Mobile
  md:px-6        // Tablet (640px+)
  lg:px-8        // Desktop (1024px+)
  xl:px-12       // Large (1280px+)
">
```

## 🎨 Theme Customization

### Tailwind Config
`tailwind.config.cjs`
```js
colors: {
  luxe: {
    gold: '#d4af37',    // Change to your color
    amber: '#c9a961',
  }
}
```

### Global CSS
`src/index.css`
```css
.glass-card {
  backdrop-filter: blur(20px);  // Adjust blur
  background: rgba(45, 45, 45, 0.6);  // Adjust opacity
}
```

## 🚨 Common Patterns

### Dashboard Stat Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {stats.map((stat) => (
    <StatCard key={stat.title} {...stat} />
  ))}
</div>
```

### Transaction List
```tsx
<div className="space-y-4">
  {transactions.map((tx, i) => (
    <TransactionCard key={tx.id} {...tx} index={i} />
  ))}
</div>
```

### Two-Column Layout
```tsx
<div className="grid lg:grid-cols-3 gap-8">
  <div className="lg:col-span-2">Main Content</div>
  <div>Sidebar</div>
</div>
```

## 🎯 Best Practices

✅ **DO:**
- Use `GlassCard` for containers
- Apply consistent spacing (gap-4, gap-6, gap-8)
- Use semantic colors (success, warning, error)
- Add loading states to async operations
- Include hover effects on interactive elements

❌ **DON'T:**
- Mix old and new components on same page
- Override glass effects manually
- Use inline styles (use Tailwind classes)
- Forget accessibility attributes
- Disable animations globally

## 🔍 Debugging

### Animation not working?
```tsx
// Check reduced motion preference
const prefersReducedMotion = usePrefersReducedMotion();
{!prefersReducedMotion && <AnimatedComponent />}
```

### Card not showing glass effect?
```tsx
// Ensure backdrop-filter support
// Use this class: backdrop-blur-glass
<div className="glass-card backdrop-blur-glass">
```

### Text not visible?
```tsx
// Use proper text colors
<p className="text-text-primary">Visible text</p>
<p className="text-text-secondary">Secondary text</p>
```

## 📊 Performance Tips

1. **Limit particles** - Reduce ParticleField count on mobile
2. **Lazy load** - Use React.lazy() for heavy components
3. **Debounce** - Debounce scroll/resize handlers
4. **Optimize images** - Use WebP and proper sizes
5. **Code split** - Keep bundle size under 500KB

## 🎨 Design Tokens

### Spacing Scale
```
4  = 1rem  = 16px
6  = 1.5rem = 24px
8  = 2rem  = 32px
12 = 3rem  = 48px
16 = 4rem  = 64px
```

### Border Radius
```
glass     = 16px
glass-lg  = 24px
```

### Font Sizes
```
text-sm  = 0.875rem (14px)
text-base = 1rem    (16px)
text-lg  = 1.125rem (18px)
text-xl  = 1.25rem  (20px)
text-2xl = 1.5rem   (24px)
text-3xl = 1.875rem (30px)
```

## 🚀 Production Checklist

- [ ] Test all routes
- [ ] Check mobile responsiveness
- [ ] Verify animations at 60fps
- [ ] Test keyboard navigation
- [ ] Run accessibility audit
- [ ] Optimize images
- [ ] Remove console.logs
- [ ] Test in Chrome, Firefox, Safari
- [ ] Check loading states
- [ ] Verify error handling

## 📚 Resources

- **Theme Docs:** `THEME_DOCUMENTATION.md`
- **Implementation:** `IMPLEMENTATION_SUMMARY.md`
- **Components:** `src/components/`
- **Pages:** `src/pages/`
- **Utils:** `src/utils/animations.ts` & `hooks.ts`

---

**Happy coding with Project LUMEN!** ✨
