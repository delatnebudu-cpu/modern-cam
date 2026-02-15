# Claude AI Context - OpenCAM Project

Tento dokument slouží jako kontext pro AI asistenty (Claude, ChatGPT, atd.) při práci na projektu.

## 🎯 Cíl projektu

Vytvořit moderní, open-source CAM software jako náhradu za Estlcam, optimalizovaný pro macOS M1/M2/M3.

## 🏗 Architektura

### Frontend (React + Three.js)
- **App.jsx**: Hlavní komponenta, drží globální state (entities, selectedId, toolSettings)
- **Scene.jsx**: 3D Canvas s Three.js - zobrazuje mřížku, dráhy nástroje, osy
- **FileHandler.jsx**: Drag & Drop + DXF parsing pomocí dxf-parser
- **Sidebar.jsx**: Pravý panel - nastavení nástroje a export G-kódu
- **Toolbar.jsx**: Levý panel - výběr nástrojů (Select, Offset, Pocket, Drill)

### Backend (Tauri/Rust)
- **main.rs**: Vytváří okno s macOS vibrancy efektem
- **Cargo.toml**: Rust dependencies (window-vibrancy pro průhlednost)
- **tauri.conf.json**: Konfigurace okna (1400x900, transparent: true)

### Utilities
- **geometryUtils.js**: 
  - `calculateLineOffset(p1, p2, distance, side)` - Výpočet offsetu čáry
  - `generateGCode(points, safeZ, cutZ, feedRate)` - Generování G-kódu

## 🔑 Klíčové koncepty

### State Management
```javascript
entities: [
  {
    id: timestamp,
    points: [{x, y, z}, ...],
    depth: 3.0,
    type: 'outside' | 'inside' | 'center'
  }
]
```

### DXF Parsing workflow
1. User táhne .dxf soubor do okna
2. FileHandler zachytí událost (react-dropzone)
3. DxfParser přečte soubor
4. Extrahují se LINE entity
5. Vytvoří se nový entity objekt
6. Přidá se do state (setEntities)
7. Scene.jsx vykreslí čáru

### Offset logika
- **Vnější řez:** offset doprava (right)
- **Vnitřní řez:** offset doleva (left)
- **Střed:** bez offsetu

## 🚧 Known Issues & TODO

### Critical
- [ ] Scene.jsx zatím nevykresluje entity z state (chybí Toolpath komponenta)
- [ ] FileHandler.jsx neparsuje CIRCLE, ARC, POLYLINE entity
- [ ] G-Code export není napojený na UI tlačítko

### High Priority
- [ ] Přidat raycasting pro klikání na čáry v 3D
- [ ] Implementovat highlight vybraného objektu
- [ ] Propojit offset calculation s UI

### Medium Priority
- [ ] Přidat podporu pro různé jednotky (mm, inch)
- [ ] Implementovat undo/redo
- [ ] Přidat zoom to fit funkci

## 📝 Konvence kódu

### React komponenty
- Použij funkční komponenty (ne class)
- Props destructuring v parametrech
- State vždy přes useState hook

### Tailwind CSS
- Preferuj utility classes
- Dark mode: `bg-[#141414]`, `text-gray-300`
- Borders: `border-white/5` (5% opacity)

### Rust
- Následuj Rust conventions (rustfmt)
- Komentuj unsafe bloky
- Používej Result<T, E> pro error handling

## 🔧 Typické úkoly

### Přidání nové 3D entity
1. Rozšiř DXF parser v FileHandler.jsx
2. Přidej nový typ entity do state
3. Vytvoř komponentu pro vykreslení (např. CirclePath.jsx)
4. Zaregistruj v Scene.jsx

### Přidání nového nástroje
1. Přidej ikonu do Toolbar.jsx
2. Vytvoř handler pro onClick
3. Implementuj logiku v App.jsx
4. Aktualizuj state při změně nástroje

### Změna vzhledu
- Všechny barvy jsou v Tailwind classes
- Vibrancy efekt v main.rs (NSVisualEffectMaterial)
- Layout v App.jsx (flex, grid)

## 🐛 Debugging tipy

### React Dev Tools
```bash
# V prohlížeči:
Components tab -> najdi App -> zkontroluj state
```

### Rust console
```bash
# main.rs
println!("Debug: {:?}", variable);
```

### Three.js debug
```javascript
// Scene.jsx - přidej do Canvas
<Stats />  // FPS monitor
<axesHelper args={[100]} />  // Viditelné osy
```

## 📚 Dokumentace závislostí

- [Tauri Docs](https://tauri.app/v1/guides/)
- [Three.js Docs](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [dxf-parser](https://github.com/gdsestimating/dxf-parser)

## 💡 Prompt template pro AI
```
Kontext: Pracuji na projektu OpenCAM (viz CLAUDE_CONTEXT.md)
Úkol: [popis úkolu]
Relevantní soubory: [seznam souborů]
Požadavek: [co přesně potřebuji]
```

---

**Last updated:** 2026-02-15
**Maintainer:** @TVOJUZIVATEL
