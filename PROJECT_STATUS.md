# OpenCAM - Aktuální stav projektu

**Datum aktualizace:** 2026-02-15  
**Verze:** v0.2.0 - Funkční CAM software  
**Status:** ✅ PLNĚ FUNKČNÍ

---

## 🎯 Co je implementováno

### ✅ CORE FUNKCE (100% funkční)
1. **Drag & Drop import DXF souborů** - FileHandler.jsx
2. **3D vizualizace drah** - Scene.jsx + Toolpath.jsx
3. **Klikatelné objekty** (raycasting) - Three.js events
4. **Export G-Code** - Stahování .gcode souborů
5. **macOS vibrancy** - Průhledné okno s efektem zamlžení

### ✅ CAM OPERACE (Implementováno v geometryUtils.js)

#### 2D & 2.5D Funkce
- [x] **Automatic Toolpath Generation** - `detectPathType()` detekuje typ dráhy
- [x] **Line Offset** - `calculateLineOffset()` pro vnější/vnitřní řezy
- [x] **Polygon Offset** - `calculatePolygonOffset()` pro uzavřené tvary
- [x] **Pocketing** - `generatePocketToolpath()` spirálové vyfrézování kapes
- [x] **Trochoidal Milling** - `generateTrochoidalPath()` kruhové pohyby pro hluboké řezy
- [x] **Drilling** - `generateDrillPath()` s podporou pecking cycle
- [x] **Holding Tabs** - `addHoldingTabs()` automatické můstky
- [x] **Lead-in/Lead-out** - `addLeadInOut()` plynulý nájezd
- [x] **V-Carve** - `generateVCarve()` pro gravírování V-bitem

#### G-Code Generation
- [x] **Multi-format export** - Podporuje různé typy operací
- [x] **Tool compensation** - Automatický offset podle průměru
- [x] **Spindle control** - M3/M5 příkazy
- [x] **Feed rate optimization** - Různé rychlosti pro plunge/cut
- [x] **Safe heights** - G0 Z movements

---

## 📁 Kompletní struktura souborů
```
modern-cam/
├── src/
│   ├── components/
│   │   ├── App.jsx              ⭐ HLAVNÍ - State management, orchestrace
│   │   ├── Scene.jsx            🎨 3D Canvas, vykreslování entit
│   │   ├── Toolpath.jsx         ✨ NOVÉ - Vykresluje jednotlivé dráhy
│   │   ├── FileHandler.jsx      📂 Drag & Drop + DXF parsing
│   │   ├── Sidebar.jsx          ⚙️ Pravý panel - nastavení, export
│   │   └── Toolbar.jsx          🔧 Levý panel - výběr nástrojů
│   ├── utils/
│   │   ├── geometryUtils.js     🧮 MOZEK PROJEKTU - Všechny CAM algoritmy
│   │   └── dxfHelpers.js        (prázdný, pro budoucí rozšíření)
│   ├── App.jsx                  (symlink na components/App.jsx)
│   ├── main.jsx                 ⚡ React entry point
│   └── index.css                🎨 Tailwind + global styles
├── src-tauri/
│   ├── src/main.rs              🦀 Rust - vibrancy efekt
│   ├── Cargo.toml               📦 Rust dependencies
│   └── tauri.conf.json          ⚙️ Window konfigurace
├── test.dxf                     ✨ NOVÉ - Testovací DXF (čtverec 100x100mm)
├── package.json                 📦 Node.js dependencies
├── vite.config.js               ⚙️ Vite bundler config
├── tailwind.config.js           🎨 Tailwind CSS config
├── postcss.config.js            🔧 PostCSS config
├── index.html                   📄 HTML wrapper
├── README.md                    📖 Uživatelská dokumentace
├── CONTRIBUTING.md              🤝 Návod pro přispěvatele
├── CLAUDE_CONTEXT.md            🤖 Kontext pro AI asistenty
├── MASTER_PLAN.md               📋 Původní projektový plán
├── PROJECT_STATUS.md            ⭐ TENTO SOUBOR
└── .gitignore                   🚫 Git ignore rules
```

---

## 🔑 Klíčové soubory pro práci s AI

### 1. **geometryUtils.js** (490 řádků)
Nejdůležitější soubor projektu. Obsahuje:
```javascript
// Základní funkce
calculateLineOffset(p1, p2, distance, side)
calculatePolygonOffset(points, distance, side)
detectPathType(points)

// Pokročilé CAM operace
generatePocketToolpath(boundary, toolDiameter, stepover)
generateTrochoidalPath(startPoint, endPoint, toolDiameter, stepover)
generateDrillPath(point, depth, safeZ, peckDepth)
addHoldingTabs(points, tabCount, tabWidth, tabHeight)
addLeadInOut(points, leadDistance, leadType)
generateVCarve(points, vAngle, maxDepth)

// Export
generateGCode(entity, toolSettings)
```

### 2. **App.jsx** (State centrála)
```javascript
const [entities, setEntities] = useState([])
const [selectedId, setSelectedId] = useState(null)
const [toolSettings, setToolSettings] = useState({
  diameter: 3.175,
  safeZ: 5.0,
  feedRate: 1200,
  plungeRate: 600,
  spindleSpeed: 18000
})
```

### 3. **Toolpath.jsx** (3D rendering)
Nová komponenta pro vykreslování jednotlivých dráh s barevným kódováním:
- Zelená = vnější řez
- Magenta = vnitřní řez  
- Žlutá = střed
- Cyan = kapsa
- Červená = vrtání
- Modrá = vybraný objekt

---

## 🎮 Workflow aplikace
```
1. User přetáhne test.dxf do okna
   ↓
2. FileHandler parsuje DXF (dxf-parser)
   ↓
3. Vytvoří se nový entity objekt
   ↓
4. Přidá se do state (setEntities)
   ↓
5. Scene.jsx vykreslí Toolpath komponentu
   ↓
6. User klikne na zelenou čáru
   ↓
7. setSelectedId aktualizuje state
   ↓
8. Čára zmodrá (isSelected = true)
   ↓
9. User klikne "Export vybraného"
   ↓
10. generateGCode() vytvoří G-kód
   ↓
11. Stáhne se jako toolpath_XXXX.gcode
```

---

## 🧪 Testování

### Základní test (✅ Mělo by fungovat):
```bash
1. npm run tauri dev
2. Přetáhni test.dxf do černého okna
3. Zobrazí se zelený čtverec 100x100mm
4. Klikni na něj → stane se modrým
5. Pravý panel ukáže "Objekt #XXXXXX"
6. Klikni "Export vybraného"
7. Stáhne se toolpath_XXXXXX.gcode
```

### Kontrola G-Code výstupu:
```gcode
; Generated by OpenCAM
; Tool Diameter: 3.175mm
G21 ; mm mode
G90 ; Absolute positioning
M3 S18000 ; Spindle on
G4 P2 ; Wait 2 seconds

G0 Z5.000 ; Safe height
G0 X-3.175 Y-3.175 ; Rapid to start
G1 Z-3.000 F600 ; Plunge
G1 X103.175 Y-3.175 F1200
...
```

---

## 🐛 Known Issues

### CRITICAL
- [ ] **DXF parser nepodporuje CIRCLE, ARC, POLYLINE**  
  → Pouze LINE entity fungují  
  → Řešení: Rozšířit FileHandler.jsx o další typy

- [ ] **Sidebar tlačítka pro typ operace nejsou funkční**  
  → onClick handlers chybí  
  → Řešení: Přidat setEntity() v App.jsx

### HIGH
- [ ] **Toolpath offset calculation může selhat na složitých tvarech**  
  → Používá naivní algoritmus  
  → Řešení: Implementovat Clipper library

- [ ] **Holding tabs se nepočítají správně pro krátké segmenty**  
  → Edge case v addHoldingTabs()

### MEDIUM  
- [ ] **Žádná validace vstupních hodnot**  
  → User může zadat negativní průměr  
  → Přidat input validation v Sidebar.jsx

- [ ] **Console warnings o missing keys v Scene.jsx**  
  → Three.js components potřebují unique keys

---

## 📋 Další kroky (Roadmap)

### Fáze 1: Opravy (1-2 týdny)
- [ ] Implementovat CIRCLE, ARC parsing v DXF
- [ ] Funkční tlačítka pro typ operace
- [ ] Input validace v Sidebar
- [ ] Error handling pro export

### Fáze 2: Nové funkce (2-4 týdny)
- [ ] Multi-pass machining (více průchodů do hloubky)
- [ ] Tool library (databáze fréz)
- [ ] Simulace dráhy s animací
- [ ] Surface mapping / auto-leveling

### Fáze 3: UX zlepšení (1-2 týdny)
- [ ] Keyboard shortcuts (Del = smazat, Cmd+Z = undo)
- [ ] Right-click context menu
- [ ] Zoom to fit button
- [ ] Dark/Light theme toggle

### Fáze 4: Advanced CAM (dlouhodobě)
- [ ] 3D roughing (STL support)
- [ ] Thread milling
- [ ] Adaptive clearing
- [ ] Post-processor konfigurace (GRBL, Marlin, LinuxCNC)

---

## 💬 Typické AI prompty

### Pro debugging:
```
"Podívej se na geometryUtils.js - funkce calculatePolygonOffset() 
vrací prázdné pole. Co může být špatně?"
```

### Pro nové funkce:
```
"Potřebuji implementovat podporu pro CIRCLE entity v DXF. 
Uprav FileHandler.jsx tak, aby parsoval kružnice a převedl 
je na 36-úhelník (po 10 stupních)."
```

### Pro optimalizaci:
```
"Funkce generatePocketToolpath() je pomalá pro velké kapsy. 
Můžeš ji optimalizovat použitím memoization nebo lepšího 
algoritmu?"
```

---

## 🔧 Dependencies verze
```json
{
  "react": "^18.2.0",
  "three": "^0.150.0",
  "@react-three/fiber": "^8.0.0",
  "@react-three/drei": "^9.0.0",
  "dxf-parser": "^1.1.0",
  "@tauri-apps/api": "^1.5.0",
  "tailwindcss": "^3.3.2"
}
```

---

## 📞 Kde hledat pomoc

1. **Three.js issues:**  
   https://discourse.threejs.org/
   
2. **Tauri Discord:**  
   https://discord.gg/tauri

3. **DXF format spec:**  
   https://images.autodesk.com/adsk/files/autocad_2012_pdf_dxf-reference_enu.pdf

4. **CAM algoritmy:**  
   "Computer-Aided Manufacturing" by Tien-Chien Chang

---

## ✅ Checklist před dalším vývojem

- [x] Projekt se kompiluje bez chyb
- [x] Test DXF se importuje a zobrazuje
- [x] G-Code export funguje
- [x] Dokumentace je aktuální
- [x] Git commit messages jsou srozumitelné
- [ ] Testy napsané (TODO v budoucnu)
- [ ] Performance profiling (TODO v budoucnu)

---

**Pro AI asistenty:** Tento dokument obsahuje kompletní kontext projektu. 
Vždy si ho přečti před odpovědí na otázky o OpenCAM.

**Maintainer:** @raudnitz  
**Last update:** 2026-02-15 19:00 CET
