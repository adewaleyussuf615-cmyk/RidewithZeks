# RidewithZeks

Complete standalone website with a scroll-controlled aircraft-window zoom, jet reveal, cabin transition, chauffeur services, luxury rentals, and WhatsApp/email enquiry drafts. The new design is the root homepage.

## Run in Codespaces

```sh
git pull origin main
npm run dev
```

Stop any previous development server with Ctrl+C first. Open port 3000 from the Ports panel. No dependency installation is required; Node.js 18 or newer is sufficient.

## Build and deploy

```sh
npm run build
```

The static website is generated in `dist`. On a static host, use the Other/static framework preset, build command `npm run build`, and publish directory `dist`. A hosting project previously configured as Next.js must change these settings. `npm start` runs the included Node server and supports the PORT environment variable.

## ZIP installation

Back up existing work, preserve the hidden `.git` directory, and extract the ZIP contents directly into the project root. `package.json` and `index.html` must be in the root, not a nested folder. Stop the old server and run `npm run dev` again.

## Files

- `index.html`, `styles.css`, `app.js`: complete responsive website
- `assets/`: all three generated images
- `server.mjs`: local/Node preview server
- `build.mjs`: static hosting export

The site includes reduced-motion support and responsive mobile layouts. This standalone replacement does not include the previous Next.js app's separate fleet, booking, or policy routes.

Enquiries prepare drafts for +234 912 610 5778 on WhatsApp or Adewaleyussuf615@gmail.com by email. Visitors review and send the messages themselves. No booking is automatically confirmed and no form submission is stored. Aircraft, car imagery and cabin layouts are illustrative. Google Fonts supplies typography, with fallback fonts available.
