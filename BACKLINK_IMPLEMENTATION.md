# Backlink Implementation Guide

## Overview

This document explains the automatic backlink system implemented for the Morse Code Translator website. The system ensures that when the site is deployed on Vercel preview URLs, it automatically creates backlinks to the main production domain (`https://morsecodeholistic.com`).

## Features Implemented

### 1. **Vercel Banner Component** (`src/components/VercelBacklinkBanner.tsx`)
- **Purpose**: Displays a prominent banner at the top of the page when viewing a Vercel preview deployment
- **Detection**: Automatically detects if the site is running on:
  - `*.vercel.app` domains
  - Any domain other than `morsecodeholistic.com` or `www.morsecodeholistic.com`
  - Not on localhost (for development convenience)
- **Features**:
  - Eye-catching gradient design (blue to purple)
  - Clear call-to-action: "Go to Official Site →"
  - Dismissible (saved in sessionStorage)
  - Mobile-responsive
  - Sticky positioning at top of viewport
  - High z-index (100) to ensure visibility

### 2. **Centralized Environment Configuration** (`src/lib/env.ts`)
- **Purpose**: Centralized management of domain URLs and environment detection
- **Functions**:
  - `getPublicUrl()`: Returns the main production domain for canonical URLs
  - `isVercelPreview()`: Detects if running on Vercel preview deployment
  - `getCurrentUrl()`: Gets the current deployment URL (for reference only)
- **Constants**:
  - `MAIN_DOMAIN`: "https://morsecodeholistic.com"
  - `MAIN_DOMAIN_WWW`: "https://www.morsecodeholistic.com"

### 3. **Footer Backlinks** (`src/components/home/Footer.tsx`)
- **Purpose**: Additional backlinks in the footer for SEO
- **Implementation**:
  - Copyright text links to main domain
  - "Official website" link prominently displayed
  - Uses `rel="noopener"` for security
  - Hover effects for better UX

### 4. **Updated All Layouts**
Updated the following files to use centralized environment configuration:
- `src/app/layout.tsx` (main layout)
- `src/app/fr/layout.tsx` (French)
- `src/app/de/layout.tsx` (German)
- `src/app/es/layout.tsx` (Spanish)
- `src/app/it/layout.tsx` (Italian)
- `src/app/pt/layout.tsx` (Portuguese)
- `src/app/tr/layout.tsx` (Turkish)
- `src/app/vi/layout.tsx` (Vietnamese)
- `src/app/ru/layout.tsx` (Russian)
- `src/app/robots.ts`
- `src/app/sitemap.ts`

## SEO Benefits

### 1. **Canonical URLs**
All pages have canonical URLs pointing to the production domain:
```html
<link rel="canonical" href="https://morsecodeholistic.com/page-path" />
```

### 2. **Visible Backlinks**
- Top banner (on Vercel deployments)
- Footer links (on all deployments)
- Both provide strong backlink signals to search engines

### 3. **Proper Link Attributes**
- `rel="noopener"` for security
- Descriptive anchor text
- Prominent placement for better click-through rate

### 4. **Domain Authority**
Every Vercel preview deployment now acts as a backlink source, potentially improving:
- Domain authority
- Link equity
- Search engine rankings

## How It Works

### On Production (morsecodeholistic.com)
- Banner: **Not displayed** (domain matches production)
- Footer: Shows links to production domain
- Canonical URLs: Point to production domain

### On Vercel Preview (*.vercel.app)
- Banner: **Displayed** (domain doesn't match production)
- Footer: Shows links to production domain
- Canonical URLs: Point to production domain
- All internal navigation works normally

### On Localhost
- Banner: **Not displayed** (for developer convenience)
- Footer: Shows links to production domain
- Canonical URLs: Point to production domain

## Testing the Implementation

### Local Testing
```bash
npm run dev
# Visit http://localhost:3000
# Banner should NOT appear
```

### Vercel Preview Testing
1. Push your branch to GitHub
2. Vercel will automatically create a preview deployment
3. Visit the preview URL (e.g., `https://your-project-abc123.vercel.app`)
4. Banner should appear at the top with link to main domain

### Banner Behavior
- **First visit**: Banner is visible
- **Click dismiss**: Banner hides and saves state to sessionStorage
- **Refresh page**: Banner stays hidden (until session ends)
- **New tab/session**: Banner appears again

## Configuration

### Change Main Domain
Edit `src/lib/env.ts`:
```typescript
export const MAIN_DOMAIN = "https://your-new-domain.com";
```

### Customize Banner Appearance
Edit `src/components/VercelBacklinkBanner.tsx`:
- Colors: Modify the gradient classes
- Text: Update the message content
- Behavior: Adjust detection logic or dismissal behavior

### Disable Banner
Remove or comment out in `src/app/layout.tsx`:
```typescript
// <VercelBacklinkBanner />
```

## Additional SEO Recommendations

1. **Structured Data**: Already implemented in layout.tsx with Organization schema
2. **Alt Links**: Already implemented for language versions
3. **Robots.txt**: Already configured to allow all and reference sitemap
4. **Sitemap**: Already configured and dynamically generated

## Maintenance

### When Adding New Language Versions
1. Create new layout in `src/app/[lang]/layout.tsx`
2. Import: `import { getPublicUrl } from "@/lib/env";`
3. Use: `const PUBLIC_URL = getPublicUrl();`
4. Set canonical URL in metadata

### When Changing Domain
Update only one file: `src/lib/env.ts`
All layouts, robots.txt, and sitemap will automatically use the new domain.

## Troubleshooting

### Banner Not Appearing on Vercel Preview
- Check browser console for errors
- Verify deployment URL contains `.vercel.app`
- Clear sessionStorage: `sessionStorage.removeItem('backlink-banner-dismissed')`

### Canonical URLs Wrong
- Verify `src/lib/env.ts` has correct MAIN_DOMAIN
- Check that all layouts import and use `getPublicUrl()`

### Footer Links Not Working
- Verify `MAIN_DOMAIN` is exported from `src/lib/env.ts`
- Check that Footer component imports `MAIN_DOMAIN`

## Files Created/Modified

### New Files
- `src/components/VercelBacklinkBanner.tsx` - Banner component
- `src/lib/env.ts` - Environment configuration
- `BACKLINK_IMPLEMENTATION.md` - This documentation

### Modified Files
- `src/app/layout.tsx` - Added banner and centralized config
- `src/app/*/layout.tsx` - All language layouts updated
- `src/app/robots.ts` - Uses centralized config
- `src/app/sitemap.ts` - Uses centralized config
- `src/components/home/Footer.tsx` - Added backlinks

## Conclusion

This implementation provides a comprehensive backlink strategy that:
- ✅ Works automatically on Vercel deployments
- ✅ Provides strong SEO signals
- ✅ Maintains clean code with centralized configuration
- ✅ Is mobile-responsive and user-friendly
- ✅ Can be easily customized or disabled
- ✅ Follows SEO best practices

When deployed to Vercel, every preview deployment will now automatically create backlinks to your main domain, potentially improving your site's SEO performance and search engine rankings.

