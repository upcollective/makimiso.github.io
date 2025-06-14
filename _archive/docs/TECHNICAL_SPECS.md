# Technical Specifications

## File Structure
```
makimiso-website/
├── index.html
├── about.html
├── services.html
├── contact.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── images/
│   ├── logos/
│   ├── founders/
│   └── icons/
├── README.md
└── .gitignore
```

## Page Requirements

### All Pages
- **HTML5 semantic structure**
- **Responsive design** (mobile-first)
- **Accessible markup** (WCAG 2.1 AA)
- **Meta tags** for SEO
- **Open Graph** tags for social sharing
- **Fast loading** (<3 seconds)
- **Working navigation** between all pages

### index.html (Homepage)
- Hero section with headline and CTA
- Services overview (4 cards)
- About preview with founder stats
- Contact CTA section
- Footer

### about.html
- Our story section
- Individual founder profiles with photos
- Our approach/methodology
- Call-to-action to services

### services.html
- Services introduction
- 4 detailed service sections
- Process overview
- Contact CTA

### contact.html
- Contact form (functional)
- Contact information
- "What happens next" section
- Map or location reference (optional)

## CSS Requirements

### Framework
- **CSS Grid** and **Flexbox** for layouts
- **Custom CSS** (no external frameworks like Bootstrap)
- **CSS Variables** for colors and spacing
- **Media queries** for responsive design

### Performance
- **Minified CSS** for production
- **Optimized images** (WebP with fallbacks)
- **Critical CSS** inlined for above-the-fold content

### Accessibility
- **High contrast ratios** (4.5:1 minimum)
- **Focus indicators** for keyboard navigation
- **Screen reader friendly** markup
- **Scalable text** (rem/em units)

## JavaScript Requirements

### Functionality
- **Mobile navigation** toggle
- **Smooth scrolling** for anchor links
- **Form validation** and submission
- **Loading states** for form submissions
- **Basic animations** (fade-ins, transitions)

### Performance
- **Vanilla JavaScript** (no external libraries)
- **Progressive enhancement**
- **Non-blocking execution**
- **Error handling**

## Form Functionality

### Contact Form
- **Client-side validation**
- **Server-ready** (Netlify Forms compatible)
- **Success/error messaging**
- **Required field indicators**
- **Accessible form labels**

### Fields
- Name (required, text)
- Email (required, email validation)
- Organization (optional, text)
- Project Type (required, dropdown)
- Message (required, textarea)
- Budget Range (optional, dropdown)

## Image Requirements

### Formats
- **WebP** with **JPEG fallbacks**
- **SVG** for icons and logos
- **Optimized file sizes** (<500KB each)

### Needed Images
- Logo (SVG)
- Paolo headshot (professional)
- Jarrett headshot (professional)
- Service icons (4 SVG icons)
- Hero background (optional)

## SEO Requirements

### Meta Tags
- Title tags (unique per page, <60 characters)
- Meta descriptions (<160 characters)
- Canonical URLs
- Language declarations

### Content Structure
- **H1-H6 hierarchy**
- **Alt text** for all images
- **Descriptive link text**
- **Schema markup** for organization

## Browser Support
- **Modern browsers** (Chrome, Firefox, Safari, Edge)
- **Mobile browsers** (iOS Safari, Chrome Mobile)
- **Graceful degradation** for older browsers

## Performance Targets
- **Page Speed Score:** 90+ (mobile and desktop)
- **First Contentful Paint:** <2 seconds
- **Largest Contentful Paint:** <2.5 seconds
- **Cumulative Layout Shift:** <0.1

## Development Notes

### Local Development
- Use **Live Server** or similar for local testing
- **No build process** required (pure HTML/CSS/JS)
- **Cross-browser testing** before deployment

### Deployment Ready
- All paths relative (no absolute URLs)
- Netlify Forms compatible contact form
- Ready for GitHub Pages or Netlify deployment
- Include deployment instructions in README

### Content Management
- **Easy to update** content without technical knowledge
- **Modular CSS** for easy styling changes
- **Clear commenting** in code
- **Documentation** for future updates

## Quality Checklist
- [ ] All links work (no 404s)
- [ ] Forms submit successfully
- [ ] Mobile responsive on all devices
- [ ] Accessible to screen readers
- [ ] Fast loading on slow connections
- [ ] Professional appearance
- [ ] Content matches brand guidelines
- [ ] SEO optimized
- [ ] Cross-browser compatible
- [ ] No placeholder content or Lorem ipsum
