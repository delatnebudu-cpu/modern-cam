# Project: OpenCAM (Modern CNC/CAM Software)

## Project Overview
Moderní, open-source reimplementace CAM softwaru (inspirováno Estlcam). 
Cílová platforma: macOS (M1/Apple Silicon) jako .dmg aplikace.

## Tech Stack
- **Framework:** Tauri (Rust backend + React frontend)
- **Styling:** Tailwind CSS
- **3D Engine:** Three.js (@react-three/fiber, @react-three/drei)
- **Parsing:** dxf-parser (pro import DXF souborů)
- **Target OS:** macOS (native via Tauri/WebKit)

## Application Structure
1. **Sidebar (Left):** Tool selection
2. **Main View (Center):** 3D Canvas with Three.js grid
3. **Properties (Right):** Settings for Tool Diameter, Cut Depth, Feed Rate
4. **Bottom Bar:** Real-time coordinates (X, Y, Z)

## Next Goals
- Offset Calculation
- G-Code Generation  
- Visual Feedback
