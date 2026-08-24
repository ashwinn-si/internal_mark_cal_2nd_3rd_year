# Internal Mark Calculator - Application Blueprint

This document specifies the complete styling, logic, features, and architecture of the "St. Joseph's College Internal Mark Calculator" application. This blueprint acts as a comprehensive guide for replicating the application down to the minute details.

## 1. Project Overview & Architecture

The application is a purely client-side static web application with two pages:

1. **Main Page (`index.html`)**: Collects user input (marks, bonuses, categories) and calculates the internal marks.
2. **Result Page (`result_page/result_page.html`)**: Re-displays the user's internal score and calculates possible grades depending on external marks.

**Tech Stack**: HTML5, Vanilla JavaScript, CSS3, Bootstrap (Grid System mostly), Google Fonts (Poppins), and Lottie Animations.

**Data Flow**:

- Computations are performed in memory (on `script.js`).
- The computed `internal_mark` is saved to the browser's `localStorage` (`localStorage.setItem('internal_mark', JSON.stringify(intermal_marl_scored))`).
- The user is navigated to `result_page/result_page.html`.
- `result_script.js` fetches the `internal_mark` from `localStorage` to compute grade limits.

---

## 2. Configuration & Themes (Styling Blueprint)

### Global Typography & Resets

- **Font Family**: 'Poppins', sans-serif
- **Text Transform**: `uppercase` throughout the app (with few exceptions where `capitalize` is used).
- **Box Sizing**: `border-box`

### Theme Variables (`style.css`)

The application supports a Dark (default) and Light mode. The theme is changed dynamically by writing a `data-theme="light"` property to the `<html>` tag triggered by a toggle switch.

**Dark Theme (Default root variables)**:

- `--primary-bg-color`: `#0f0f0f`
- `--secondary-bg-color`: `#1a1a1a`
- `--primary-font-color`: `#ffffff`
- `--secondary-font-color`: `#a0a0a0`
- `--container-bg-color`: `#1a1a1a`
- `--input-bg-color`: `#2c2c2c`
- `--input-font-color`: `#ffffff`
- `--button-bg-color`: `#ff8c00`
- `--highlight-color`: `#ff8c00`
- `--border-color`: `#2d2d2d`
- `--shadow-color`: `rgba(0, 0, 0, 0.4)`
- `--light-green`: `lightgreen`
- `--tomato`: `tomato`
- `--orange-accent`: `#ff8c00`
- `--orange-accent-light`: `#ff7700`
- `--card-bg`: `#1a1a1a`
- `--card-border`: `#2d2d2d`

**Light Theme (`[data-theme='light']`)**:

- `--primary-bg-color`: `#f5f5f5`
- `--secondary-bg-color`: `#ffffff`
- `--primary-font-color`: `#121212`
- `--secondary-font-color`: `#666666`
- `--container-bg-color`: `#f7f7f7`
- `--input-bg-color`: `#ffffff`
- `--input-font-color`: `#121212`
- `--border-color`: `#e0e0e0`
- `--shadow-color`: `rgba(0, 0, 0, 0.15)`
- `--light-green`: `green`
- `--tomato`: `rgb(255, 0, 0)`
- `--card-bg`: `#ffffff`

### Interactive Element States

- **Inputs**: Solid borders (`--border-color`), centered text. Features `:focus:valid` (glows `lightgreen`) and `:focus:invalid`/`:invalid` (glows `tomato`).
- **Radio Buttons**: Hidden default appearance, styled as customized glowing circles that map to `--radio-size: 20px`. The checked state has a linear gradient (`#ff8c00` to `#ff7700`) with an inset pseudo-element to look like an active target.
- **Buttons**: Rendered with an orange gradient background (`#ff8c00` to `#ff7700`). Shadow deepens on hover (`transform: translateY(-2px)`).

---

## 3. Application Components & Logic

### 3.1 Input Models & Form Structure

Users provide marks out of 100 for three model exams (M1, M2, M3).
In addition, users specify their student category:

1. **Hope Elite** (HE)
2. **PEP** (Placement Enhancement Program)
3. **General**

Each category yields up to 3 extra activities/components evaluated to enhance the total 40-mark weight:

- **Hope Elite Component Max Values**: Certification (`7`), Assessment (`6`), Performance (`7`).
- **PEP Component Max Values**: Certification/Course (`7`), Assessment (`6`), NPTEL (`7`).
- **General Component Max Values**: NPTEL (`8`), Course (`7`), Extra (`5`).

**Input Validation**: Handled by `input_box_error_handler(mark, element_id, max_val)`:

- Range checked: `[0, max_val]`.
- Invalid inputs trigger an error UI response: `navigator.vibrate(200)` and adding `.vibrate` CSS class animating horizontally.

### 3.2 Calculation Formulas (`script.js`)

**1. Model Exams Scale-down**:

- `bonus_mark` multiplier applied to test inputs: If bonus is `true`, multiplier is `1.5`, otherwise `1`.
- `first_10 = (M1 * bonus_mark + M2 * bonus_mark) * 0.05`
  - _Hard Cap_: `first_10` cannot exceed 10.
- `second_10 = M3 * bonus_mark * 0.1`
  - _Hard Cap_: `second_10` cannot exceed 10.

**2. Internal Marks Total**:

- `result = first_10 + second_10 + Extra_Activity_1 + Extra_Activity_2 + Extra_Activity_3`
- Total is stored up to two decimal scales inside `result_mark.final_result`.

**3. External Mark Requirement (`external_mark_calculation()`)**:

- Max scale external mark needed out of 100: `external_mark = 91`.
- If `final_result >= 23`: minimum external passing criteria drops to `45`.
- Else: `external_mark = (50 - final_result) * 1.667`
- _Note: Result undergoes `Math.floor(external_mark)`_

### 3.3 Dynamic User Interfaces

- **Category Changer (`category_changer()`)**: Dynamically shows/hides specific input form containers based on the chosen category radio button status (`display: block` or `display: none`).
- **Celebration Effect**: Appears for 3 seconds overlaying the screen using a Lottie component inside `#congrs-lottie-animation` upon successful calculation.
- **Result & Special Case Container**:
  - Standard results substitute DOM inside `.result-mark-container`.
  - If internal constraints change (total sum inputted for marks < 100 scenario), it triggers a "Special Case" dialogue explicitly warning the user that "No bonus marks will be added", passing external criteria based strictly on `M1 + M2 + M3` conversions without bonuses.
- Analytics: Sent via a GET request to `api.ashwinsi.in` via `sendAnalyticsRequest()` and `dbStore()`.

---

## 4. Result Page Spec (`result_page/result_script.js`)

Upon submission on the main page, `window.location.href` directs to `result_page/result_page.html`.

### Result Interface Features

- Retrieves internal mark through `JSON.parse(localStorage.getItem('internal_mark'))`.
- Computes different grade limits sequentially against hardcoded thresholds.
- **Grades Configuration** Array calculation limits (adds standard university grading jumps respectively):
  Target external scores added to current internal mark: `[60, 54, 48, 42, 36, 30, 27]`.
  - Cap constraint: Total score cannot exceed `100`.

### Custom Draggable Slider (`result_page.html`)

The result page includes a touch-friendly, vanilla JS implemented custom slider.

- **Interactions**: Tracks `mousedown`/`mousemove`/`mouseup` and equivalently `<touch>` events.
- **Output Syncing**: Value `val` spans `0` to `40`. Slider adjusts percentage width logic natively, continuously rounding off updates precisely to `1 decimal place`, firing `update_display(new_val)` and updating graded targets on-the-fly dynamically.

## 5. Summary Check for Reproduction

To perfectly reproduce the internal calculation architecture:

1. Ensure the `style.css` accurately implements variable definitions enabling dark/light toggling.
2. Mirror the formula boundaries strictly: Max M1+M2 constraint (10 points via 5%), Max M3 constraint (10 points via 10%). Bonus is a 1.5x coefficient limit!
3. Form validations MUST feature API vibration hooks and visual `.vibrate` classes on inputs for UI integrity.
4. Setup `localStorage` key names strictly as `'internal_mark'`.
