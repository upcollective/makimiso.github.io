# SEO & Meta Content

## Page-Specific SEO

### Homepage (index.html)
**Title:** Makimiso Digital Solutions | Research-Informed Design for Nonprofits & Education
**Meta Description:** Experienced designers and researchers helping nonprofits and educational institutions transform data into compelling impact stories. 30+ years combined expertise.
**Keywords:** nonprofit web design, data visualization, social impact design, research-informed UX, educational technology design

### About Page
**Title:** About Makimiso | Paolo Austria & Jarrett Davis - Design & Research Experts
**Meta Description:** Meet Paolo Austria (15+ years UX design) and Jarrett Davis (15+ years social research). Founders combining design excellence with evidence-based research.
**Keywords:** Paolo Austria designer, Jarrett Davis researcher, nonprofit design team, social impact design agency

### Services Page
**Title:** Services | Data Visualization, UX Design & AI Consulting for Social Impact
**Meta Description:** Research-informed design, data visualization, digital strategy, and ethical AI consulting for nonprofits and educational institutions.
**Keywords:** nonprofit data visualization, social impact UX design, ethical AI consulting, digital strategy nonprofits

### Contact Page
**Title:** Contact Makimiso | Get In Touch for Design & Research Services
**Meta Description:** Ready to transform your digital impact? Contact Paolo and Jarrett to discuss research-informed design solutions for your mission-driven organization.
**Keywords:** nonprofit design consultation, social impact design contact, data visualization services

## Open Graph & Social Media Tags

### Universal Tags (All Pages)
```html
<meta property="og:site_name" content="Makimiso Digital Solutions">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@makimiso">
```

### Homepage Specific
```html
<meta property="og:title" content="Makimiso Digital Solutions | Research-Informed Design">
<meta property="og:description" content="Experienced designers and researchers helping nonprofits transform data into compelling impact stories.">
<meta property="og:image" content="/images/social/og-homepage.jpg">
```

## Schema Markup

### Organization Schema (Homepage)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Makimiso Digital Solutions",
  "url": "https://makimiso.com",
  "logo": "https://makimiso.com/images/logos/makimiso-logo.svg",
  "description": "Design and data solutions for purpose-driven organizations",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "New York",
    "addressRegion": "NY",
    "addressCountry": "US"
  },
  "email": ["paolo@makimiso.com", "jarrett@makimiso.com"],
  "foundingDate": "2025",
  "founders": [
    {
      "@type": "Person",
      "name": "Paolo Austria",
      "jobTitle": "Design Lead"
    },
    {
      "@type": "Person", 
      "name": "Jarrett Davis",
      "jobTitle": "Research Lead"
    }
  ],
  "serviceArea": "United States",
  "areaServed": "Global"
}
```

### Service Schema (Services Page)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Web Design and Data Analytics",
  "provider": {
    "@type": "Organization",
    "name": "Makimiso Digital Solutions"
  },
  "areaServed": "Global",
  "audience": {
    "@type": "Audience",
    "audienceType": "Nonprofits and Educational Institutions"
  }
}
```

## Analytics Setup

### Google Analytics 4
- Property setup for makimiso.com
- Goal tracking for contact form submissions
- Event tracking for service page visits
- Conversion tracking for email clicks

### Recommended Events to Track
- Contact form submissions
- Email link clicks
- Service page visits
- About page engagement
- Document downloads (if added later)

## Performance Optimization

### Critical Metrics
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.0s
- Cumulative Layout Shift: <0.1
- First Input Delay: <100ms

### Image Optimization
- Hero images: 1920x1080px, <200KB
- Founder headshots: 400x400px, <100KB
- Service icons: SVG preferred, 64x64px fallback
- All images: WebP with JPEG fallback
- Lazy loading for below-fold images
