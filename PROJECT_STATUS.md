# OpenCAM - Aktuální stav projektu

**Datum aktualizace:** 2026-02-15 20:30 CET  
**Verze:** v0.2.1 - Funkční CAM software  
**Status:** ✅ CORE FUNKCE FUNGUJÍ

---

## ✅ CO FUNGUJE (Ověřeno)

### Základní workflow
1. ✅ **Import DXF** - Přetažení valid.dxf funguje
2. ✅ **3D vizualizace** - Zelený čtverec 100x100mm se zobrazuje
3. ✅ **Ovládání kamery** - Myš rotuje, zoomuje
4. ✅ **Automatický výběr** - Nově importovaný objekt se vybere
5. ✅ **Status bar** - Ukazuje počet entit a ID vybraného objektu
6. ✅ **Změna typu operace** - Tlačítka Vnější/Vnitřní/Kapsa nyní fungují
7. ✅ **Změna barvy podle typu** - Entity mění barvu (zelená/magenta/cyan)
8. ✅ **Export G-Code** - Stahuje .gcode soubor
9. ✅ **macOS vibrancy** - Průhledné okno s blur efektem

### CAM Algoritmy
Implementováno v `geometryUtils.js`:
- calculateLineOffset
- calculatePolygonOffset  
- generatePocketToolpath
- generateTrochoidalPath
- generateDrillPath
- addHoldingTabs
- addLeadInOut
- generateVCarve
- detectPathType
- generateGCode

---

## 🐛 Známé problémy

### CRITICAL
- [ ] **Klikání na objekty v 3D nefunguje** - onClick v Toolpath.jsx není správně propagován
- [ ] **DXF parser podporuje pouze LINE** - CIRCLE, ARC, POLYLINE ignorovány
- [ ] **G-Code offset calculation chybí** - Generuje dráhu po středu, ne s offsetem

### HIGH  
- [ ] **Holding tabs checkbox nefunguje** - Je vizuální, ale nemá efekt na G-kód
- [ ] **Pokročilé checkboxy (Lead-in atd.)** - Nejsou propojeny s logikou
- [ ] **Multi-pass machining** - Pokud depth > safe depth, mělo by udělat více průchodů

### MEDIUM
- [ ] **Žádná validace vstupů** - Můžeš zadat negativní hodnoty
- [ ] **Console warnings** - Missing keys v React lists
- [ ] **FileHandler debug výpisy** - Měly by se odstranit v produkci

---

## 📁 Struktura (Finální)
```
modern-cam/
├── src/
│   ├── components/
│   │   ├── App.jsx              ✅ State + orchestrace (aktualizováno)
│   │   ├── Scene.jsx            ✅ 3D Canvas
│   │   ├── Toolpath.jsx         ✅ Vykreslování drah
│   │   ├── FileHandler.jsx      ✅ DXF import s debug
│   │   ├── Sidebar.jsx          ✅ Klikatelná tlačítka (OPRAVENO)
│   │   └── Toolbar.jsx          ✅ Levý panel
│   ├── utils/
│   │   ├── geometryUtils.js     ✅ CAM algoritmy
│   │   └── dxfHelpers.js        (prázdný)
│   ├── App.jsx                  (symlink)
│   ├── main.jsx                 ✅
│   └── index.css                ✅
├── src-tauri/
│   ├── src/main.rs              ✅ Vibrancy
│   ├── Cargo.toml               ✅
│   └── tauri.conf.json          ✅
├── valid.dxf                    ✅ Funkční testovací soubor
├── PROJECT_STATUS.md            ✅ TENTO SOUBOR
├── CLAUDE_CONTEXT.md            ✅
├── CLAUDE_PROJECTS_UPLOAD.md   ✅
├── README.md                    ✅
└── package.json                 ✅
```

---

## 🎯 Další priority (v pořadí)

1. **Opravit raycasting** - Klikání na objekty v 3D
2. **Implementovat offset v G-Code** - Aktuálně fréza jede středem
3. **Přidat CIRCLE support** - Nejčastější tvar po LINE
4. **Multi-pass machining** - Více průchodů do hloubky
5. **Validace vstupů** - Prevent negative values

---

## 🧪 Test checklist (pro QA)

- [x] Přetažení valid.dxf zobrazí čtverec
- [x] Status bar ukazuje "ENTITIES: 1"
- [x] Kliknutí na "Vnitřní" změní barvu na magenta
- [x] Kliknutí na "Kapsa" změní barvu na cyan
- [x] "Export vybraného" stáhne .gcode soubor
- [ ] Kliknutí na čtverec v 3D ho vybere (TODO)
- [ ] G-Code obsahuje offset podle průměru (TODO)

---

## 📝 Pro Claude AI

**Aktuální stav:**
- Aplikace se kompiluje a spouští bez chyb
- Základní CAM workflow funguje
- UI je responzivní a funkční
- Hlavní blocker: Raycasting a offset calculation

**Typický prompt:**
```
"Podívej se na Toolpath.jsx a Scene.jsx - proč onClick 
nefunguje? Entity se vykreslují, ale kliknutí je neselektuje."
```

**Poslední změny (2026-02-15 20:30):**
- Opravena Sidebar.jsx - tlačítka nyní mění typ entity
- Přidána funkce handleUpdateEntity v App.jsx
- Ověřeno: Import, vizualizace, změna typu, export fungují
