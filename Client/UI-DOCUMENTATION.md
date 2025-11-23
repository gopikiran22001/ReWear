# ReWear UI Documentation

## Design System Overview

ReWear features an eco-friendly design system centered around sustainable fashion and environmental consciousness. The design uses fresh green tones, soft earth colors, and subtle gradients to create a modern, approachable interface.

## 1. Typography

### Font Stack
- **Font Family**: System default (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`)
- **Default Text**: Browser default rendering

### Heading Typography

#### Main Hero Heading: "Give Your Clothes A Second Life"
- **Element**: `h1`
- **Font Size**: 
  - Mobile: `2.25rem` (36px)
  - Tablet: `3.75rem` (60px) 
  - Desktop: `4.5rem` (72px)
- **Font Weight**: `700` (bold)
- **Line Height**: `tight` (1.25)
- **Color**: `hsl(160 8% 15%)` (--foreground)
- **Special Effect**: Gradient text on "A Second Life" using `bg-gradient-to-r from-primary via-success to-primary bg-clip-text text-transparent`

#### Section Headings (h2)
- **Font Size**: `1.875rem` (30px)
- **Font Weight**: `700` (bold)
- **Color**: `hsl(160 8% 15%)` (--foreground)
- **Margin Bottom**: `1rem` (16px)
- **Usage**: "Featured Items", "Our Environmental Impact", "Ready to Make a Difference?"

#### Card Titles (h3)
- **Font Size**: `1.5rem` (24px)
- **Font Weight**: `600` (semi-bold)
- **Line Height**: `none` (1)
- **Letter Spacing**: `tight` (-0.025em)
- **Color**: `hsl(160 8% 15%)` (--foreground)

#### Impact Stat Labels
- **Font Size**: `0.875rem` (14px)
- **Font Weight**: `500` (medium)
- **Color**: `hsl(160 6% 45%)` (--muted-foreground)
- **Text Transform**: None

### Body Typography

#### Primary Body Text
- **Font Size**: 
  - Mobile: `1.125rem` (18px)
  - Desktop: `1.25rem` (20px)
- **Color**: `hsl(160 6% 45%)` (--muted-foreground)
- **Line Height**: `relaxed` (1.625)
- **Usage**: Hero subtitle, section descriptions

#### Secondary Body Text
- **Font Size**: `1rem` (16px)
- **Color**: `hsl(160 6% 45%)` (--muted-foreground)
- **Line Height**: `normal` (1.5)

#### Impact Statistics Numbers
- **Font Size**: 
  - Mobile: `1.5rem` (24px)
  - Desktop: `1.875rem` (30px)
- **Font Weight**: `700` (bold)
- **Color**: `hsl(160 8% 15%)` (--foreground)

#### Impact Statistics Units
- **Font Size**: `0.875rem` (14px)
- **Font Weight**: `400` (normal)
- **Color**: `hsl(160 6% 45%)` (--muted-foreground)
- **Margin Left**: `0.25rem` (4px)

### Button Typography

#### Primary Button Text
- **Font Size**: `0.875rem` (14px)
- **Font Weight**: `500` (medium)
- **Color**: `hsl(0 0% 98%)` (--primary-foreground)

#### Large Button Text
- **Font Size**: `1.125rem` (18px)
- **Font Weight**: `500` (medium)
- **Padding**: `1.5rem 2rem` (24px 32px)

## 2. Color Palette

### Primary Colors
- **Primary**: `hsl(142 76% 36%)` - Fresh eco-green
- **Primary Foreground**: `hsl(0 0% 98%)` - Almost white
- **Primary Light**: `hsl(142 50% 85%)` - Light eco-green
- **Primary Dark**: `hsl(142 76% 28%)` - Dark eco-green

### Secondary Colors  
- **Secondary**: `hsl(140 20% 92%)` - Soft sage
- **Secondary Foreground**: `hsl(160 8% 15%)` - Dark green-gray

### Accent Colors
- **Accent**: `hsl(35 40% 88%)` - Warm earth tone
- **Accent Foreground**: `hsl(160 8% 15%)` - Dark green-gray
- **Eco Accent**: `hsl(35 40% 65%)` - Richer earth tone

### Status Colors
- **Success**: `hsl(120 60% 40%)` - Forest green
- **Warning**: `hsl(45 100% 60%)` - Golden yellow
- **Destructive**: `hsl(0 70% 50%)` - Red
- **Destructive Foreground**: `hsl(0 0% 98%)` - Almost white

### Neutral Colors
- **Background**: `hsl(0 0% 99%)` - Off-white
- **Foreground**: `hsl(160 8% 15%)` - Dark green-gray
- **Muted**: `hsl(40 20% 95%)` - Light earth tone
- **Muted Foreground**: `hsl(160 6% 45%)` - Medium gray-green
- **Border**: `hsl(140 15% 88%)` - Light sage border
- **Card**: `hsl(0 0% 100%)` - Pure white
- **Card Foreground**: `hsl(160 8% 15%)` - Dark green-gray

### Special ReWear Colors
- **Eco Primary**: `hsl(142 76% 36%)` - Main eco-green
- **Eco Light**: `hsl(142 50% 85%)` - Light eco-green

## 3. Gradients

### Background Gradients
- **Gradient Eco**: `linear-gradient(135deg, hsl(142 76% 36%), hsl(120 60% 40%))`
- **Gradient Hero**: `linear-gradient(135deg, hsl(142 50% 85%), hsl(140 20% 92%))`
- **Gradient Card**: `linear-gradient(145deg, hsl(0 0% 100%), hsl(140 20% 96%))`

### Text Gradients
- **Hero Text Gradient**: `linear-gradient(to right, primary, success, primary)`

## 4. Shadows

### Shadow System
- **Soft Shadow**: `0 2px 8px -2px hsl(142 20% 20% / 0.1)`
- **Eco Shadow**: `0 4px 16px -4px hsl(142 76% 36% / 0.2)`
- **Hover Shadow**: `0 8px 25px -5px hsl(142 20% 20% / 0.15)`

## 5. Component Documentation

### Navigation Bar
- **Background**: `hsl(0 0% 99% / 0.95)` with backdrop blur
- **Border**: Bottom border using `--border` color
- **Height**: Auto with `1rem` (16px) padding top/bottom
- **Logo**: 
  - Icon: Leaf icon, `2rem` (32px) size, primary color
  - Text: `1.5rem` (24px), `700` weight, foreground color
- **Links**: 
  - Color: `hsl(160 8% 15% / 0.8)` default
  - Hover: `hsl(160 8% 15%)` full opacity
  - Transition: `colors` transition

### Button Components

#### Default Button
- **Background**: `hsl(142 76% 36%)` (primary)
- **Text Color**: `hsl(0 0% 98%)` (primary-foreground)
- **Padding**: `0.5rem 1rem` (8px 16px)
- **Border Radius**: `0.375rem` (6px)
- **Font Weight**: `500` (medium)
- **Font Size**: `0.875rem` (14px)
- **Hover**: Darker primary shade with eco shadow
- **Shadow**: Soft shadow on default, eco shadow on hover

#### Hero Button Variant
- **Background**: `linear-gradient(to right, primary, primary-dark)`
- **Text Color**: `hsl(0 0% 98%)` (primary-foreground)
- **Shadow**: `shadow-xl` default, `shadow-2xl` on hover
- **Transform**: `scale(1.02)` on hover
- **Transition**: `all 0.3s`

#### Eco Button Variant
- **Background**: `linear-gradient(to right, eco-primary, success)`
- **Text Color**: `hsl(0 0% 98%)` (primary-foreground)
- **Transform**: `scale(1.02)` on hover
- **Shadow**: Eco shadow on hover

#### Soft Button Variant
- **Background**: `hsl(142 50% 85%)` (eco-light)
- **Text Color**: `hsl(160 8% 15%)` (foreground)
- **Border**: `1px solid hsl(140 15% 88%)` (border)
- **Hover**: `hsl(142 50% 85%)` (primary-light)

#### Outline Button
- **Background**: Transparent
- **Border**: `1px solid hsl(140 15% 88%)` (border)
- **Text Color**: `hsl(160 8% 15%)` (foreground)
- **Hover Background**: `hsl(35 40% 88%)` (accent)
- **Hover Text**: `hsl(160 8% 15%)` (accent-foreground)

#### Ghost Button
- **Background**: Transparent
- **Text Color**: `hsl(160 8% 15%)` (foreground)
- **Hover Background**: `hsl(35 40% 88%)` (accent)
- **Hover Text**: `hsl(160 8% 15%)` (accent-foreground)

### Card Components

#### Base Card
- **Background**: `hsl(0 0% 100%)` (card)
- **Text Color**: `hsl(160 8% 15%)` (card-foreground)
- **Border Radius**: `0.5rem` (8px)
- **Border**: `1px solid hsl(140 15% 88%)`
- **Shadow**: `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`

#### Card Header
- **Padding**: `1.5rem` (24px)
- **Display**: Flex column
- **Gap**: `0.375rem` (6px)

#### Card Title
- **Font Size**: `1.5rem` (24px)
- **Font Weight**: `600` (semi-bold)
- **Line Height**: `none` (1)
- **Letter Spacing**: `tight` (-0.025em)

#### Card Description
- **Font Size**: `0.875rem` (14px)
- **Color**: `hsl(160 6% 45%)` (muted-foreground)

#### Card Content
- **Padding**: `1.5rem 1.5rem 0` (24px 24px 0)

### Badge Components

#### Default Badge
- **Background**: `hsl(142 76% 36%)` (primary)
- **Text Color**: `hsl(0 0% 98%)` (primary-foreground)
- **Padding**: `0.125rem 0.625rem` (2px 10px)
- **Border Radius**: `9999px` (full)
- **Font Size**: `0.75rem` (12px)
- **Font Weight**: `600` (semi-bold)
- **Border**: Transparent

#### Secondary Badge
- **Background**: `hsl(140 20% 92%)` (secondary)
- **Text Color**: `hsl(160 8% 15%)` (secondary-foreground)
- **Border**: Transparent

#### Outline Badge
- **Background**: Transparent
- **Text Color**: `hsl(160 8% 15%)` (foreground)
- **Border**: `1px solid current`

### ItemCard Component
- **Container**: Base Card with `shadow-soft`
- **Image**: Aspect ratio 1:1, rounded corners, object-cover
- **Content Padding**: `1rem` (16px)
- **Badge Spacing**: `0.5rem` (8px) gap
- **Title**: `1rem` (16px), `600` weight, `--foreground` color
- **Uploader**: `0.875rem` (14px), `--muted-foreground` color
- **Impact Stats**: Flex layout with icons and text
- **Button**: Full width at bottom

### ImpactTracker Component
- **Container**: Section with eco-light gradient background
- **Grid**: 2 columns on mobile, 4 on desktop
- **Cards**: Border-none, soft shadow
- **Icons**: 
  - Container: `3rem` (48px) circle with colored background at 10% opacity
  - Size: `1.5rem` (24px)
  - Colors: Success, Primary, Eco-accent, Foreground
- **Numbers**: Large bold text (24px-30px)
- **Labels**: Small muted text (14px)

### Input Component
- **Height**: `2.5rem` (40px)
- **Padding**: `0.5rem 0.75rem` (8px 12px)
- **Border**: `1px solid hsl(140 15% 88%)` (input color)
- **Border Radius**: `0.375rem` (6px)
- **Background**: `hsl(0 0% 99%)` (background)
- **Text Color**: `hsl(160 8% 15%)` (foreground)
- **Placeholder**: `hsl(160 6% 45%)` (muted-foreground)
- **Focus**: 2px ring with `hsl(142 76% 36%)` (ring color)

## 6. Layout & Spacing

### Container System
- **Max Width**: `1200px` (varies by screen size)
- **Padding**: `1rem` (16px) on mobile, `2rem` (32px) on larger screens
- **Margin**: Auto centered

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px
- **Large Desktop**: > 1400px (max container width)

### Section Spacing
- **Section Padding**: `4rem 0` (64px) vertical
- **Component Margin**: `1.5rem` (24px) bottom for most components
- **Card Gap**: `1.5rem` (24px) in grids

### Grid Systems
- **Featured Items**: 1 column mobile, 2 tablet, 4 desktop
- **Impact Stats**: 2 columns mobile, 4 desktop  
- **General Cards**: Responsive with `gap-6` (24px)

## 7. Interactive Elements

### Animations & Transitions
- **Default Transition**: `all 0.2s ease-out`
- **Button Hover**: `all 0.3s` with transform scale
- **Color Transitions**: `colors` transition for links and text
- **Transform Effects**: `scale(1.02)` on button hover

### Hover States
- **Buttons**: Background color change + shadow enhancement + optional scale
- **Links**: Color opacity change from 80% to 100%
- **Cards**: Subtle shadow increase (where applicable)

### Focus States
- **Inputs**: 2px ring with primary color
- **Buttons**: 2px ring with primary color + offset
- **Interactive Elements**: Visible focus indicators for accessibility

## 8. Accessibility Features

### Color Contrast
- All text/background combinations meet WCAG AA standards
- Primary green (#22c55e) on white backgrounds provides sufficient contrast
- Muted text uses appropriate contrast ratios

### Focus Management
- All interactive elements have visible focus states
- Focus rings use the primary color for consistency
- Tab order follows logical page flow

### Typography
- Font sizes are large enough for readability (minimum 14px)
- Line heights provide adequate spacing for readability
- Color-only information is avoided; icons supplement color coding

## 9. Usage Guidelines

### Brand Colors
- Use primary green for main actions and branding elements
- Use eco-light for subtle backgrounds and highlights  
- Reserve success green for positive environmental impact stats
- Use earth tones (accent colors) for supporting elements

### Button Hierarchy
1. **Hero/Eco buttons**: Primary actions, hero sections
2. **Default buttons**: Standard actions  
3. **Outline buttons**: Secondary actions
4. **Ghost buttons**: Tertiary actions, utility functions

### Typography Hierarchy  
1. **Hero heading**: Main page title (h1)
2. **Section headings**: Major sections (h2)
3. **Card titles**: Component titles (h3)
4. **Body text**: Descriptions and content
5. **Labels**: Form labels, metadata

This documentation provides a complete reference for maintaining visual consistency across the ReWear application while supporting the eco-friendly, sustainable fashion theme.