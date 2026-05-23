# Pinklet Frontend

React + Vite frontend for Pinklet.

## Layout

- `src/` - application code
- `public/` - static public assets
- `dist/` - production build output
- `vite.config.js` - Vite configuration
- `.env.example` - sample runtime config

## Run

1. Copy `.env.example` to `.env`.
2. Set `VITE_API_BASE_URL` and `VITE_GOOGLE_CLIENT_ID`.
3. Run `npm install`.
4. Run `npm run dev`.

## Notes

- The frontend now lives directly in `frontend/`.
- The old `pinklet-shop/` nesting has been flattened away.
