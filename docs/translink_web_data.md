# Translink Website Content (Sections S1 to S10 & 3D Waypoint Overlays)

This document is the verified content map of the TRANSLINK Web application. It lists the main typography, interactive cards/popups, 3D waypoint overlays, and the scroll timeline synchronization ranges (0% → 100% total progress) based on the camera configurations and UI mappings in the codebase.

---

## Section _ 01 // Hero
* **Scroll Range:** 0.00% → 7.14%
* **Vertical Title:** `TELEMATICS`

### Hero Headline & Description
* **Headline:** Advanced Telematics: One-Stop Solution
* **Description:** With reliable hardware, real-time visibility, and proactive support, Translink removes the daily pressure from fleet management with Guaranteed ROI.

### Welcome Notepad (Held by Robot Mascot)
* **Actual Rendered Content:** **Welcome Guest Card**
  * **Header:** TRANSLINK SOLUTIONS
  * **Title:** Welcome Visitor!
  * **Description:** Your One-Stop Solution for Fleet Telematics & IoT across East Africa.
  * **Bullet Points:**
    * ✓ ECA & FTA Certified
    * ✓ GPS & Fuel Monitoring
    * ✓ AI-Driven Video Safety
    * ✓ 24/7 Support Team
  * **Localization:** Renders in the active locale (English, Amharic, or Arabic).
  * **Motion Sequence:** Pops in at the bottom-right home corner on page load, glides elegantly to the exact center of Section S1 with organic pitch/roll tilt, presents the card in center focus, and flies home on scroll.

### Scroll Timeline Table
| Component | Active Range (%) | Codebase / Render Behavior |
| :--- | :--- | :--- |
| **Vertical Title** | 0.00% → 7.14% | Slides in and remains visible throughout S1. |
| **Headline & Description** | 0.00% → 7.14% | Renders via typewriter effect; fades out as S1 ends. |
| **Welcome Notepad** | On Load → Scroll (scrollY > 50px) | Mascot glides to the center of Section S1 to present the Notepad; returns home on scroll. |
| **3D Waypoints** | N/A | None active. |

---

## Section _ 02 // Tracking
* **Scroll Range:** 7.14% → 14.29%
* **Vertical Title:** `ASSETS REAL TIME TRACKING`

### Telemetry Popup Content
* **Actual Rendered Content:** **GPS Tracking** (S1's Card 1)
  * **Title:** GPS Tracking
  * **Description:** Real-time tracking and operational visibility for fleets, assets, and personnel powered by advanced GNSS devices.
  * **Tags:** Vehicle, Asset, Fixed, Portable

### Scroll Timeline Table
| Component | Active Range (%) | Codebase / Render Behavior |
| :--- | :--- | :--- |
| **Vertical Title** | 7.14% → 14.29% | Displays vertically on the left edge. |
| **Telemetry Popup** | 7.14% → 14.29% | Opened via telemetry button; renders S1's Card 1 (GPS Tracking) data. |
| **3D Waypoints** | N/A | None active (Sensor Head waypoint starts at 14%). |

---

## Section _ 03 // Fuel
* **Scroll Range:** 14.29% → 21.43%
* **Vertical Title:** `REAL TIME FUEL MONITORING`

### Telemetry Popup Content
* **Actual Rendered Content:** **Fuel Management** (S1's Card 2)
  * **Title:** Fuel Management
  * **Description:** High accuracy fuel monitoring with level visibility, alerts & reports on filling, draining & consumption to reduce fuel cost.
  * **Tags:** Level, Filling, Drain, Economy

### 3D Waypoint Overlays
#### Waypoint: SENSOR HEAD (`fuel-head`)
* **Active Range:** 14.00% → 22.00%
* **Subtitle/Focus:** PRECISION TRACKING
* **Overlay Description:** Military-grade GNSS tracking with sub-meter accuracy. 24/7 visibility and geofencing.
* **Key Stats/Labels:** SUB-METER, 24/7, GLOBAL

### Scroll Timeline Table
| Component | Active Range (%) | Codebase / Render Behavior |
| :--- | :--- | :--- |
| **Vertical Title** | 14.29% → 21.43% | Displays vertically on the left edge. |
| **Telemetry Popup** | 14.29% → 21.43% | Opened via telemetry button; renders S1's Card 2 (Fuel Management) data. |
| **Waypoint: SENSOR HEAD** | 14.00% → 22.00% | Renders in 3D scene pointing to the model's fuel head. |

---

## Section _ 04 // Analytics
* **Scroll Range:** 21.43% → 28.57%
* **Vertical Title:** `VEHICLE HEALTH & DIAGNOSTICS`

### Telemetry Popup Content
* **Actual Rendered Content:** **CAN Intelligence** (S6's Card 1)
  * **Title:** CAN Intelligence
  * **Description:** Realtime data from CAN & OBD, providing FMS insights, trouble codes, driving performance & maintenance alerts.
  * **Tags:** FMS, OBD, DTC, Tacho

### 3D Waypoint Overlays
#### Waypoint: WIRING HARNESS (`harness`)
* **Active Range:** 24.00% → 32.00%
* **Subtitle/Focus:** SECURE CONNECTIVITY
* **Overlay Description:** Industrial-shielded harness for harsh environments. Real-time diagnostic reporting.
* **Key Stats/Labels:** IP69K, STAINLESS, SHIELDED

### Scroll Timeline Table
| Component | Active Range (%) | Codebase / Render Behavior |
| :--- | :--- | :--- |
| **Vertical Title** | 21.43% → 28.57% | Displays vertically on the left edge. |
| **Telemetry Popup** | 21.43% → 28.57% | Opened via telemetry button; renders S6's Card 1 (CAN Intelligence) data. |
| **Waypoint: WIRING HARNESS** | 24.00% → 32.00% | Renders in 3D scene pointing to the model's harness connector. |

---

## Section _ 05 // AI
* **Scroll Range:** 28.57% → 57.14%
* **Vertical Title:** `AI-DRIVEN VIDEO`

### Telemetry Popup Content
* **Actual Rendered Content:** **Video AI** (S2's Card 1)
  * **Title:** Video AI
  * **Description:** AI-powered driver monitoring with ADAS and DMS alerts, real-time video streaming, and behavior analytics for safer operations.
  * **Tags:** ADAS, DMS, Video, Advisor

### 3D Waypoint Overlays
#### Waypoint: MOUNTING BASE (`base-mount`)
* **Active Range:** 40.00% → 50.00%
* **Subtitle/Focus:** FLANGE SYSTEM
* **Overlay Description:** High-durability aluminum flange with universal mounting pattern for all tank types.
* **Key Stats/Labels:** AL-6061, UNIVERSAL, PATENTED

#### Waypoint: PRECISION PROBE (`precision-tracking`)
* **Active Range:** 55.00% → 65.00%
* **Subtitle/Focus:** CAPACITIVE SENSING
* **Overlay Description:** Solid-state probe with no moving parts. Ultra-precise level detection across all terrain.
* **Key Stats/Labels:** ±0.1%, SOLID-STATE, ANODIZED

### Scroll Timeline Table
| Component | Active Range (%) | Codebase / Render Behavior |
| :--- | :--- | :--- |
| **Vertical Title** | 28.57% → 57.14% | Displays vertically on the left edge. |
| **Telemetry Popup** | 28.57% → 57.14% | Opened via telemetry button; renders S2's Card 1 (Video AI) data. |
| **Waypoint: MOUNTING BASE** | 40.00% → 50.00% | Renders in 3D scene pointing to the sensor's mounting base. |
| **Waypoint: PRECISION PROBE** | 55.00% → 65.00% | Renders in 3D scene pointing to the probe body. |

---

## Section _ 06 // IoT
* **Scroll Range:** 57.14% → 64.29%
* **Vertical Title:** `SMART IOT SOLUTIONS`

### Telemetry Popup Content
* **Actual Rendered Content:** **RFID & BLE IoT** (S4's Card 2)
  * **Title:** RFID & BLE IoT
  * **Description:** Enables wireless identification & tracking of people, documents & assets, delivering real-time location and status visibility.
  * **Tags:** RTLS, Asset Tracking, ID, NFC

### Scroll Timeline Table
| Component | Active Range (%) | Codebase / Render Behavior |
| :--- | :--- | :--- |
| **Vertical Title** | 57.14% → 64.29% | Displays vertically on the left edge. |
| **Telemetry Popup** | 57.14% → 64.29% | Opened via telemetry button; renders S4's Card 2 (RFID & BLE IoT) data. |
| **3D Waypoints** | N/A | None (Precision Probe waypoint exits at 65.00%). |

---

## Section _ 07 // Vision
* **Scroll Range:** 64.29% → 71.43%
* **Vertical Title:** `AI-DRIVEN VIDEO`

### Telemetry Popup Content
* **Actual Rendered Content:** **Vision Telematics** (S9's Popup Info)
  * **Title:** Vision Telematics
  * **Description:** AI-powered video telematics (ADAS & DMS) to transform your windshield into a safety shield.
  * **Tags:** VISION, AI, ADAS, DMS

### Scroll Timeline Table
| Component | Active Range (%) | Codebase / Render Behavior |
| :--- | :--- | :--- |
| **Vertical Title** | 64.29% → 71.43% | Displays vertically on the left edge. |
| **Telemetry Popup** | 64.29% → 71.43% | Opened via telemetry button; renders S9's Popup Info (Vision Telematics) data. |
| **3D Waypoints** | N/A | None active (Precision Filter starts at 68%). |

---

## Section _ 08 // Solutions
* **Scroll Range:** 71.43% → 78.57%
* **Vertical Title:** `ONE-STOP IoT SOLUTIONS`

### Telemetry Popup Content
* **Actual Rendered Content:** **AI / IoT Intelligence** (S8's Popup Info)
  * **Title:** AI / IoT Intelligence
  * **Description:** Edge intelligence network bridging the gap between physical operations and digital strategy.
  * **Tags:** AI, EDGE, DIGITAL, STRATEGY

### 3D Waypoint Overlays
#### Waypoint: PRECISION FILTER (`precision-filter`)
* **Active Range:** 68.00% → 82.00%
* **Subtitle/Focus:** ADVANCED FILTRATION
* **Overlay Description:** Integrated high-performance filter that protects the capacitive probe from contaminants and sediment within the fuel tank, ensuring ultra-accurate fuel level readings.
* **Key Stats/Labels:** MULTI-STAGE, SEDIMENT-FREE, PROTECTIVE

### Scroll Timeline Table
| Component | Active Range (%) | Codebase / Render Behavior |
| :--- | :--- | :--- |
| **Vertical Title** | 71.43% → 78.57% | Displays vertically on the left edge. |
| **Telemetry Popup** | 71.43% → 78.57% | Opened via telemetry button; renders S8's Popup Info (AI / IoT Intelligence) data. |
| **Waypoint: PRECISION FILTER** | 68.00% → 82.00% | Renders in 3D scene pointing to the filter base. |

---

## Section _ 09 // Support
* **Scroll Range:** 78.57% → 85.71%
* **Vertical Title:** `24/7 SUPPORT`

### Typography Content
* **Content Header:** · V · I · D · E · O   · T · E · L · E · M · A · T · I · C · S ·
* **Headline:** Transform your windshield into a safety shield.
* **Stats Rows:**
  * **5CH:** Video Channels
  * **1080P:** HD Resolution
  * **24/7:** Live Streaming
  * **AI+:** ADAS & DMS

### Telemetry Popup Content
* **Actual Rendered Content:** **Contact Support** (S10's Popup Info)
  * **Title:** Contact Support
  * **Description:** Connect with the Translink support team for expert assistance and technical guidance.
  * **Tags:** SUPPORT, CONNECT, TECH, CONTACT

### 3D Waypoint Overlays
#### Waypoint: SECURITY BOLT (`security-bolt`)
* **Active Range:** 81.00% → 86.00%
* **Subtitle/Focus:** FASTENING SYSTEM
* **Overlay Description:** High-tensile security bolt that securely fastens and tightens the fuel level sensor to the tank via the base plate, ensuring a tamper-proof seal.
* **Key Stats/Labels:** SECURITY, TAMPER-PROOF, STAINLESS

### Scroll Timeline Table
| Component | Active Range (%) | Codebase / Render Behavior |
| :--- | :--- | :--- |
| **Vertical Title** | 78.57% → 85.71% | Displays vertically on the left edge. |
| **Telemetry Popup** | 78.57% → 85.71% | Opened via telemetry button; renders S10's Popup Info (Contact Support) data. |
| **Waypoint: SECURITY BOLT** | 81.00% → 86.00% | Renders in 3D scene pointing to the tank security bolt. |

---

## Section _ 10 // Connect
* **Scroll Range:** 85.71% → 100.00%
* **Vertical Title:** `24/7 CONNECT`

### Telemetry Popup Content
* **Actual Rendered Content:** **Safety & Security** (S2's Card 2)
  * **Title:** Safety & Security
  * **Description:** Secure driver identification, emergency alerting, immobilization & speed regulation for fleet protection.
  * **Tags:** ID, Immobilizer, SOS, Speed Limiter

### 3D Waypoint Overlays
#### Waypoint: CONTACT US (`contact`)
* **Active Range:** 92.00% → 96.00%
* **Subtitle/Focus:** GET STARTED
* **Overlay Description:** Connect with our team to transform your fleet data into a competitive advantage.
* **Key Stats/Labels:** +251 944-33-4344, hello@translink.et

#### Waypoint: VISIT US (`visit-us`)
* **Active Range:** 92.00% → 96.00%
* **Subtitle/Focus:** ADDIS ABEBA
* **Overlay Description:** Kera, SD Bldg. Office 404
* **Key Stats/Labels:** None

### Scroll Timeline Table
| Component | Active Range (%) | Codebase / Render Behavior |
| :--- | :--- | :--- |
| **Vertical Title** | 85.71% → 100.00% | Displays vertically on the left edge. |
| **Telemetry Popup** | 85.71% → 100.00% | Opened via telemetry button; renders S2's Card 2 (Safety & Security) data. |
| **Waypoint: CONTACT US** | 92.00% → 96.00% | Displays contact info overlay anchored to the fuel head. |
| **Waypoint: VISIT US** | 92.00% → 96.00% | Displays location info overlay anchored to the harness connector. |
