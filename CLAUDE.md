# Makimiso.com - Assistant Instructions

## 🔴 CRITICAL: This is the LIVE WEBSITE
**Any changes pushed to this repository go live on makimiso.com within 2-3 minutes**

## 📁 Repository Information
- **Local Path**: `/Users/jarrettdavis/Documents/Work Projects/Makimiso Projects/Makimiso.com.backup/`
- **GitHub Remote**: https://github.com/upcollective/makimiso.github.io.git
- **Live URL**: https://makimiso.com
- **Deployment**: GitHub Pages (automatic)

## 🏗️ Site Architecture

### Pages Structure
```
├── index.html           # Homepage
├── about.html          # About/Founders page
├── services.html       # Services offerings
├── blog.html          # Blog listing (CMS-powered)
├── blog-post.html     # Individual blog posts (CMS-powered)
└── contact.html       # Contact form
```

### Assets Structure
```
├── assets/
│   ├── images/
│   │   ├── logos/          # Makimiso logos
│   │   └── founders/       # Team photos
│   └── icons/              # Service icons (SVG)
├── css/
│   ├── styles.css          # Main stylesheet (includes blog styles)
│   ├── enhanced-scripts.css
│   ├── about-enhanced.css
│   └── services-enhanced-fixed.css
└── js/
    ├── script.js           # Main JavaScript
    ├── script-enhanced.js
    └── api.js
```

## 🎨 Brand Guidelines

### Colors (CSS Variables)
```css
--primary-orange: #e8851e    /* Makimiso orange */
--dark-navy: #01245e         /* Dark navy blue */
--bright-blue: #3d58f2       /* Bright blue */
--text-dark: #333333         /* Dark text */
--text-light: #666666        /* Light text */
```

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Headings**: Bold, navy or orange
- **Body**: Regular, dark gray

## 📝 Content Management

### Static Content
- Edit HTML files directly for:
  - Homepage content
  - About page information
  - Services descriptions
  - Contact information

### Dynamic Content (Blog)
- **CMS URL**: https://makimiso-cms-production.up.railway.app/admin
- **API Endpoint**: https://makimiso-cms-production.up.railway.app/api
- Blog content is managed through Strapi CMS
- Changes appear on website immediately

## 🔧 Development Workflow

### Making Changes
1. **Edit files** in this directory
2. **Test locally** (optional but recommended)
3. **Commit changes**:
   ```bash
   cd "/Users/jarrettdavis/Documents/Work Projects/Makimiso Projects/Makimiso.com.backup"
   git add .
   git commit -m "Description of changes"
   git push
   ```
4. **Wait 2-3 minutes** for deployment

### Testing Locally
```bash
# Simple HTTP server
python -m http.server 8000
# OR
npx serve .
```

### Git Workflow
- **Branch**: main (auto-deploys)
- **Remote**: origin
- **Always commit with descriptive messages**
- **Include Claude Code attribution in commits**

## 🧩 Key Components

### Navigation
- All pages share the same navigation structure
- Update navigation in ALL files when adding new pages
- Current structure: Home > About > Services > Blog > Contact

### Footer
- Consistent across all pages
- Structure: About Makimiso | Services | Contact
- Update in ALL files when making changes

### Blog Integration
- **blog.html**: Lists all blog posts from CMS
- **blog-post.html**: Individual post view
- **API Integration**: Fetches content from Railway CMS
- **Error Handling**: Graceful fallbacks for API issues

## 🔌 External Integrations

### CMS (Strapi on Railway)
- **URL**: https://makimiso-cms-production.up.railway.app
- **Purpose**: Blog content management
- **API**: RESTful, returns JSON
- **Auth**: Admin panel login required

### Forms
- Contact form submissions (check implementation)
- Newsletter signup (if implemented)

## 🐛 Troubleshooting

### Common Issues
1. **Changes not appearing**: Wait 3-5 minutes for GitHub Pages
2. **Blog posts not loading**: Check CMS API status
3. **Images not showing**: Verify file paths and case sensitivity
4. **CSS not applying**: Clear browser cache, check file references

### Console Debugging
- Blog pages include console logging for debugging
- Open browser dev tools (F12) to see detailed logs

### CMS Issues
- Check Railway deployment status
- Verify API endpoints are responding
- Check blog post structure in CMS admin

## 📋 Common Tasks

### Adding New Pages
1. Create HTML file following existing structure
2. Add navigation links to ALL existing pages
3. Add footer to new page
4. Update sitemap if needed

### Updating Blog Styles
- Edit styles in `css/styles.css` (blog styles are at the bottom)
- Test with existing blog posts
- Ensure responsive design works

### Content Updates
1. **Text changes**: Edit HTML directly
2. **Images**: Add to `assets/images/`, update HTML references
3. **Styling**: Update `css/styles.css`

### Emergency Fixes
1. Identify the issue
2. Make minimal changes to fix
3. Commit with clear "Fix: [issue]" message
4. Monitor live site after deployment

## 🚫 Important Warnings

### DO NOT
- Delete or rename core files without testing
- Edit `.git/` directory or files
- Make major structural changes without backup
- Remove CSS variables (used throughout site)
- Break responsive design (test mobile views)

### ALWAYS
- Test changes before pushing
- Commit with descriptive messages
- Maintain consistent navigation across pages
- Follow brand guidelines
- Include fallbacks for dynamic content

## 📞 Emergency Contacts

- **Paolo Austria**: paolo@makimiso.com (Design decisions)
- **Jarrett Davis**: jarrett@makimiso.com (Content/technical)

---

## Recent Major Changes

### Blog Integration (June 2025)
- Added blog.html and blog-post.html
- Integrated with Strapi CMS on Railway
- Added blog styles to main CSS file
- Updated navigation on all pages

### Brand Styling
- Implemented Makimiso color scheme
- Added Inter font family
- Created responsive design
- Enhanced mobile experience

---

**Last Updated**: June 2025
**Assistant Note**: This site is live. Test thoroughly and deploy carefully.