# Asset Requirements & Placeholders

## Logo Requirements

### Primary Logo
**File:** `images/logos/makimiso-logo.svg`
**Specifications:**
- SVG format for scalability
- Horizontal layout preferred
- Clean, modern typography
- Works on both light and dark backgrounds
- Minimum size: 120px wide

### Favicon
**Files Needed:**
- `favicon.ico` (32x32px)
- `apple-touch-icon.png` (180x180px)
- `favicon-16x16.png`
- `favicon-32x32.png`

### Logo Placeholder
Since actual logo doesn't exist yet, use text-based logo:
```css
.logo {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: #2B4C7E;
  text-decoration: none;
}
```

## Founder Photography

### Requirements for Future Photos
**Paolo Austria Headshot:**
- Professional business casual style
- Clean background (white or light gray)
- Square crop (400x400px minimum)
- Natural lighting
- Smiling, approachable expression

**Jarrett Davis Headshot:**
- Professional business casual style  
- Clean background (white or light gray)
- Square crop (400x400px minimum)
- Natural lighting
- Smiling, approachable expression

### Temporary Placeholders
For now, use professional placeholder services or initials-based avatars:
- Background: #F7FAFC (light gray)
- Initials: PA (Paolo), JD (Jarrett)
- Font: Inter, bold
- Color: #2B4C7E

## Service Icons

### Required Icons (SVG)
1. **Research-Informed Design**: Magnifying glass + design elements
2. **Data Visualization**: Chart/graph icon
3. **Digital Strategy**: Connected nodes/network
4. **Ethical AI**: Brain + shield/checkmark

### Icon Style Guidelines
- Line-based illustrations
- 2px stroke width
- 48x48px artboard
- Scalable to 24px minimum
- Color: #4A5568 (slate gray)
- Consistent visual weight

### Placeholder Implementation
Use simple CSS-based icons or Unicode symbols until custom icons are created:
```css
.service-icon {
  font-size: 2rem;
  color: #4A5568;
  text-align: center;
}
```

## Social Media Assets

### Open Graph Images
**Homepage:** 1200x630px
- Makimiso logo
- Tagline: "Research-Informed Design for Organizations That Matter"
- Clean background with brand colors

**Services:** 1200x630px
- Service icons layout
- "Design + Data Solutions"
- Professional background

### Social Media Profiles
**Placeholder social links:**
- LinkedIn: Company page (create later)
- Twitter/X: @makimiso (register later)
- Instagram: @makimiso (optional)

## Image Optimization Settings

### WebP Settings
- Quality: 85%
- Compression: Lossless for logos, lossy for photos
- Fallback: JPEG at 90% quality

### Responsive Images
```html
<!-- Example for founder photos -->
<picture>
  <source srcset="paolo-400.webp 400w, paolo-800.webp 800w" type="image/webp">
  <img src="paolo-400.jpg" alt="Paolo Austria, Design Lead" loading="lazy">
</picture>
```

## Temporary Asset Strategy

Until professional assets are created:

1. **Logo**: Text-based styling with clean typography
2. **Photos**: Professional placeholder services or avatar initials
3. **Icons**: Unicode symbols or simple CSS shapes
4. **Social Images**: Text-based graphics with brand colors

This ensures the website is fully functional and professional-looking while planning for future asset creation.

## Asset Creation Priority

**Phase 1 (Launch):**
- Text-based logo styling
- Placeholder founder photos
- Simple icon implementation

**Phase 2 (Post-launch):**
- Professional logo design
- Founder photography session
- Custom service icons
- Social media graphics

**Phase 3 (Optimization):**
- Additional brand assets
- Marketing materials
- Presentation templates
