# 📦 Soubory k nahrání do Claude Projects

Pro optimální práci s Claude AI v Projects nahraj tyto soubory **v tomto pořadí**:

## 1. Základní kontext (⭐ Povinné)
- `PROJECT_STATUS.md` - Aktuální stav projektu
- `CLAUDE_CONTEXT.md` - Kontext pro AI
- `MASTER_PLAN.md` - Původní plán

## 2. Konfigurace (⭐ Povinné)
- `package.json` - Dependencies
- `src-tauri/Cargo.toml` - Rust deps

## 3. Core soubory (⭐ Povinné)
- `src/App.jsx` - Hlavní logika
- `src/utils/geometryUtils.js` - CAM algoritmy
- `src/components/Scene.jsx` - 3D rendering
- `src/components/Toolpath.jsx` - Vykreslování drah

## 4. UI komponenty (Volitelné)
- `src/components/Sidebar.jsx`
- `src/components/Toolbar.jsx`
- `src/components/FileHandler.jsx`

## 5. Testovací data (Volitelné)
- `test.dxf` - Pro rychlé testování

---

## 📝 Custom Instructions pro Claude Projects

Zkopíruj toto do pole "Project Instructions":
```
# OpenCAM CAM Software Project

Jsi senior full-stack vývojář specializující se na:
- React 18 + Three.js (3D vizualizace)
- Tauri (Rust desktop apps pro macOS)
- CAM algoritmy (toolpath generation, offsetting)

## Tvůj úkol:
Pomáhat s vývojem OpenCAM - moderního CAM softwaru pro macOS.

## Vždy když dostaneš úkol:
1. Přečti si PROJECT_STATUS.md pro aktuální stav
2. Zkontroluj CLAUDE_CONTEXT.md pro kontext
3. Analyzuj relevantní soubory (geometryUtils.js, App.jsx, atd.)
4. Navrhni řešení s kódem
5. Vysvětli, proč je tvé řešení správné

## Code Style:
- React: Funkční komponenty, hooks
- Tailwind: Utility-first classes
- Rust: Standard formatting (rustfmt)
- Comments: Pouze pro složité algoritmy

## Priorita:
1. Funkčnost > Vzhled
2. Čitelnost > Optimalizace
3. Jednoduchost > Komplexita

## Red flags (vždy upozorni):
- Změny v API bez backward compatibility
- Performance problémy (>100ms render)
- Security issues (XSS, injection)
- Breaking changes v dependencies

## Testing mindset:
Před odesláním kódu se zeptej sám sebe:
- Projde npm run tauri dev bez chyb?
- Funguje to s test.dxf?
- Je to kompatibilní se stávající code base?

Pamatuj: Vyvíjíme pro open-source komunitu, 
kód musí být srozumitelný i pro začátečníky.
```

---

## 🎯 První prompt po nahrání souborů:
```
Přečti si PROJECT_STATUS.md a řekni mi:
1. Co už je implementováno
2. Jaké jsou aktuální known issues
3. Co bys doporučil řešit jako první

Pak navrhni konkrétní kroky pro implementaci podpory 
CIRCLE entit v DXF parseru (je to v Critical issues).
```

---

## ✅ Ověření, že je vše nahrané správně:

Po nahrání zkus tento test prompt:
```
Podle PROJECT_STATUS.md a geometryUtils.js:
Kolik CAM operací je aktuálně implementováno 
a jaké mají názvy funkcí?
```

**Správná odpověď:**
```
9 CAM operací:
1. calculateLineOffset
2. calculatePolygonOffset
3. generatePocketToolpath
4. generateTrochoidalPath
5. generateDrillPath
6. addHoldingTabs
7. addLeadInOut
8. generateVCarve
9. detectPathType
```

Pokud Claude odpoví správně, máš vše správně nahráno! 🎉
