# Translink Background Watermark Animation — Scroll Timeline

## Source of Truth
- **CSS Height Registry**: `src/translink/styles/translink-flow.css` (Lines 79–92)
- **Scroll Indicator**: `GlobalNavIndicator.ts` → `endTrigger: '#s10'` (excludes #s1-clone)
- **Total Real Content**: 1400dvh (S1–S10)
- **Scrollable Distance**: 1400dvh (endTrigger = #s10 bottom)
- **Progress Formula**: `scrollY / 1400dvh`

## Section Height Registry (Verified from CSS)

| Section | Height | Global Start % | Global End % |
| :--- | :--- | :--- | :--- |
| **S1** (Hero) | 100dvh | 0.00% | 7.14% |
| **S2** | 100dvh | 7.14% | 14.28% |
| **S3** | 100dvh | 14.28% | 21.42% |
| **S4** | 100dvh | 21.42% | 28.57% |
| **S5** (Tracking) | 400dvh | 28.57% | 57.14% |
| **S6** | 100dvh | 57.14% | 64.28% |
| **S7** | 100dvh | 64.28% | 71.42% |
| **S8** | 100dvh | 71.42% | 78.57% |
| **S9** | 100dvh | 78.57% | 85.71% |
| **S10** (Footer) | 200dvh | 85.71% | 100.00% |
| *#s1-clone* | *100dvh* | *Loop structural clone — excluded from indicator* | |

## 5-Phase Scrubbed Watermark Timeline

Each section's ScrollTrigger runs from `start: "top top"` to `end: "bottom top"` with `scrub: 1`.
The timeline is divided into 5 phases (total 100 duration units):

| Phase | Duration | Local % | Action |
| :--- | :--- | :--- | :--- |
| 1. Hidden | 26 | 0%–26% | Off-screen right (`x: 100vw`) |
| 2. Enter | 10 | 26%–36% | Ease in from right (`power2.out`) |
| 3. Hold | 8 | 36%–44% | Centered and readable (`x: 0vw`) |
| 4. Exit | 10 | 44%–54% | Ease out to right (`power2.in`) |
| 5. Hidden | 46 | 54%–100% | Off-screen right (`x: 100vw`) |

## Global Watermark Visibility Map

| Section | Section Range | Enters (Global) | Centered (Global) | Exits (Global) |
| :--- | :--- | :--- | :--- | :--- |
| **S2** | 7.14%–14.28% | **9.0%** | 9.7%–10.3% | **11.0%** |
| **S3** | 14.28%–21.42% | **16.1%** | 16.8%–17.4% | **18.1%** |
| **S4** | 21.42%–28.57% | **23.3%** | 24.0%–24.6% | **25.3%** |
| **S5** *(400dvh)* | 28.57%–57.14% | **36.0%** | 38.9%–41.1% | **44.0%** |
| **S6** | 57.14%–64.28% | **59.0%** | 59.7%–60.3% | **61.0%** |
| **S7** | 64.28%–71.42% | **66.1%** | 66.8%–67.4% | **68.1%** |
| **S8** | 71.42%–78.57% | **73.3%** | 74.0%–74.6% | **75.3%** |
| **S9** | 78.57%–85.71% | **80.4%** | 81.1%–81.7% | **82.4%** |
| **S10** *(200dvh)* | 85.71%–100.0% | **89.4%** | 90.9%–91.9% | **93.4%** |