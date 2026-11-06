# RindgeHacks

A Hack Club hackathon site built with Solid.js, Vite, and GSAP. You fly down the Charles River from Cambridge to Boston Harbor as you scroll.

```bash
npm install
npm run dev
```

## Where things live

- `src/content.ts`: every piece of copy, including the event details, schedule, FAQ, sponsors, venue, and the river stops (their order, landmark bridges, and which bank each card sits on).
- `src/lib/river.ts`: builds the river from where the cards land on the page. It produces the banks, bridges, trees, boats, and landmarks.
- `src/components/Falcon/FalconPilot.tsx`: the falcon. It follows the river while you scroll and lands on any element marked `data-perch`.
- `src/lib/intro.ts`: the opening flight that reveals the title.

To use a real aerial photo, set `riverPhoto` in `src/content.ts`. The drawn river then becomes a translucent overlay on top of the photo.
