# Copilot Instructions for Internal Mark Calculator

## Project Overview
- This is a web-based calculator to help students estimate their internal marks and required external marks to pass university exams.
- The app consists of a main input page (`index.html` + `script.js`) and a result display page (`result_page/result_page.html` + `result_script.js`).
- Animations and UI enhancements are handled by `animation.js`, `animation.css`, and Lottie assets in `assets/`.

## Architecture & Data Flow
- User inputs marks and criteria on the main page. Calculations are performed in `script.js`.
- Results are stored in `localStorage` and passed to the result page, which reads and displays them using `result_script.js`.
- Styling is split between `style.css` (main), `animation.css`, and `result_page/result_page.css`.
- Bootstrap and Google Fonts are used for layout and typography (see `assets/bootstrap/`).
- Lottie animations are loaded via `assets/lottie_ani.js` and external CDN.

## Key Patterns & Conventions
- All mark calculations and validation logic are in `script.js`. The `result_mark` array structure is documented in comments at the top of the file.
- Use `localStorage` for cross-page data transfer (internal marks).
- Animations are modular: main page uses `animation.js`/`animation.css`, result page uses `result_page/animation.js`/`animation.css`.
- UI feedback (e.g., input errors) uses CSS classes and vibration (see `input_box_error_handler`).
- All user-facing text and logic are in English.

## Developer Workflows
- No build step: edit HTML/CSS/JS directly and reload in browser.
- No formal test suite; manual testing is expected.
- To debug, use browser dev tools and `console.log`.
- To add new criteria or mark logic, update `script.js` and ensure the result page logic matches.

## Integration Points
- External dependencies: Bootstrap, Google Fonts, Lottie (CDN), Microsoft Clarity (analytics).
- No backend or server-side code; all logic is client-side.

## Examples
- To add a new bonus type, extend the `result_mark` array and update both calculation and display logic in `script.js` and `result_script.js`.
- To change the UI theme, edit `style.css` and root variables.

## Key Files
- `index.html`, `script.js`, `style.css`, `animation.js`, `animation.css`
- `result_page/result_page.html`, `result_script.js`, `result_page.css`, `animation.js`, `animation.css`
- `assets/bootstrap/`, `assets/lottie_ani.js`

---
If any conventions or workflows are unclear, please ask for clarification or check the README for project intent.
