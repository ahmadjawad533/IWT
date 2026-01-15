# Volunteer Form Setup Instructions

## How to Add Your Google Form Link

1. **Open the file:** `js/script.js`

2. **Find this line** (near the bottom of the file):
   ```javascript
   const VOLUNTEER_FORM_URL = 'YOUR_GOOGLE_FORM_URL_HERE';
   ```

3. **Replace** `YOUR_GOOGLE_FORM_URL_HERE` with your actual Google Form URL

   Example:
   ```javascript
   const VOLUNTEER_FORM_URL = 'https://forms.gle/your-form-id-here';
   ```

4. **Save the file**

## How to Get Your Google Form URL

1. Go to [Google Forms](https://forms.google.com)
2. Create or open your volunteer application form
3. Click the "Send" button (top right)
4. Click the link icon (🔗)
5. Click "Shorten URL" for a cleaner link
6. Copy the URL
7. Paste it in the `script.js` file as shown above

## What Happens Now

- All "Volunteer With Us" and "Apply Now" buttons across your website will open your Google Form in a new tab
- This includes buttons on:
  - index.html (main CTA section)
  - about.html (join section)
  - reports.html (multiple locations)

## Testing

Before adding your form URL, clicking volunteer buttons will show an alert message. After adding your URL, the buttons will open your Google Form.
