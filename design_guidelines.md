# Made in Algeria - Design Guidelines

## Design Approach
**Cultural Identity System**: Blend modern directory UX (inspired by Airbnb's clarity + LinkedIn's professionalism) with strong Algerian national identity. This platform celebrates local manufacturing, so visual pride and credibility are paramount.

## Core Design Elements

### Typography
- **Arabic Primary**: Cairo (headings: Bold 700, body: Regular 400, Medium 500)
- **Latin Secondary**: Inter or similar for readability
- **Hierarchy**: 
  - Hero titles: text-4xl to text-6xl font-bold
  - Section headers: text-2xl to text-3xl font-semibold
  - Factory names: text-xl font-semibold
  - Body text: text-base
  - Captions/metadata: text-sm text-gray-600

### Layout System
**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 (p-4, gap-6, my-8, py-12, etc.)

**Grid Structure**:
- Factory cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Stats section: grid-cols-2 lg:grid-cols-4
- Search filters: 2-column layout on desktop
- Max container width: max-w-7xl mx-auto

### Color Palette (Algerian Identity)
User specified: Green, White, Red with elegant gray tones

### Component Library

**Navigation**:
- Sticky header with logo, search shortcut, language toggle (AR/FR), auth button
- Desktop: horizontal nav with dropdowns for categories
- Mobile: hamburger menu with slide-in drawer
- Breadcrumbs on factory detail pages

**Homepage Hero**:
- Full-width hero section (70vh) with background image showing Algerian industrial landscape (factory skyline, manufacturing facilities)
- Centered overlay with blurred background card containing:
  - Bold headline: "اكتشف المصانع الجزائرية" 
  - Search bar (prominent, rounded, with wilaya and category dropdowns)
  - Quick stats beneath (Total Factories | Wilayas Covered | Industrial Sectors)

**Factory Cards**:
- Card with factory logo/image (aspect-ratio-video)
- Factory name (bold, large)
- Category badge (colored pill with icon)
- Wilaya tag
- Short description (2 lines max, truncated)
- Contact icons (phone, email, location)
- "View Details" button

**Search & Filters**:
- Prominent search bar with three fields: text search, wilaya dropdown (48 wilayas), category dropdown
- Active filter chips below search (dismissible)
- Results count display

**Factory Detail Page**:
- Hero image gallery (main image + thumbnail strip)
- Factory info card: logo, name, category, established date, certification badges
- Tabbed sections: About | Products/Services | Gallery | Contact
- Contact form with blurred card overlay on map background
- Embedded Google Maps location

**Stats Section** (Homepage):
- Four-column grid with animated counters
- Icons representing: Total Factories, Wilayas, Product Categories, Monthly Inquiries
- Each stat in a subtle card with Algerian pattern watermark

**Category Showcase**:
- Icon-based grid showing industrial sectors
- Hoverable cards with category name, factory count, representative icon
- Link to filtered results

**Admin Dashboard**:
- Sidebar navigation (collapsed on mobile)
- Data tables with search, sort, pagination
- Form layouts with clear sections
- Upload zones for images/documents with preview

**Footer**:
- Three-column layout: About | Quick Links | Contact Info
- Newsletter signup section
- Social media icons
- Algerian map watermark
- Trust badges (if applicable)

### Cultural Elements
- Subtle geometric Algerian patterns as background textures (not overwhelming)
- Icons incorporating traditional motifs where appropriate
- Factory categories illustrated with locally-relevant imagery
- Pride-driven messaging: "صنع في الجزائر" prominently featured

### Images
**Required Images**:
1. **Hero**: Wide industrial landscape - Algerian factories, modern manufacturing (bright, professional, inspiring)
2. **Category Icons**: Industrial sector illustrations (food processing, textiles, chemicals, etc.)
3. **Factory Placeholders**: Professional factory/warehouse imagery
4. **About Section**: Algerian industrial growth imagery, workers, production lines
5. **Map Background**: Stylized Algeria map for stats/contact sections

### Interactions
- Smooth page transitions
- Hover states: subtle scale (1.02) on cards, underline on links
- Loading states for search results (skeleton screens)
- Image galleries with lightbox functionality
- Minimal animations - focus on content

### Accessibility
- RTL support for Arabic content
- High contrast for readability
- Keyboard navigation throughout
- ARIA labels in both languages
- Form validation with clear error messages

### Mobile Considerations
- Touch-friendly button sizes (min-h-12)
- Simplified navigation drawer
- Stackable search filters
- Swipeable factory image galleries
- Click-to-call/email buttons on factory cards