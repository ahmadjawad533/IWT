# Page Animations Added ✅

## Unique Animation for Each Page

### 1. **index.html (Home Page)**
- **Animation**: Fade and Zoom
- **Effect**: Page fades in while slightly zooming from 95% to 100%
- **Duration**: 1 second

### 2. **about.html (About Page)**
- **Animation**: Slide from Left
- **Effect**: Page slides in from the left side
- **Duration**: 0.8 seconds

### 3. **cases.html (Cases Page)**
- **Animation**: Slide from Right
- **Effect**: Page slides in from the right side
- **Duration**: 0.8 seconds

### 4. **donate.html (Donate Page)**
- **Animation**: Bounce and Fade
- **Effect**: Page bounces up from bottom with a slight overshoot
- **Duration**: 1 second

### 5. **reports.html (Reports Page)**
- **Animation**: Slide from Top
- **Effect**: Page slides down from the top
- **Duration**: 0.8 seconds

### 6. **contact.html (Contact Page)**
- **Animation**: Rotate and Fade
- **Effect**: Page rotates slightly while fading in
- **Duration**: 1 second

## Additional Element Animations (All Pages)

- **Hero Sections**: Slide up from bottom
- **Cards**: Fade and scale with staggered delays
- **Section Headers**: Slide from left
- **Images**: Slide from right
- **Buttons**: Bounce in
- **Icons**: Rotate and fade

## Donation Types Layout Fix

### Current Status:
- **Desktop (1200px+)**: 4 boxes side-by-side (23% width each)
- **Tablet (769-1199px)**: 2 boxes per row (48% width each)
- **Mobile (≤768px)**: 2 boxes per row (48% width each)
- **Small Mobile (≤480px)**: 1 box per row (100% width)

### CSS Used:
```css
display: flex !important;
flex-direction: row !important;
flex-wrap: nowrap !important; /* On desktop */
flex: 0 0 23%; /* Fixed width on desktop */
```

The boxes should now appear **horizontally (left to right)** on desktop screens!
