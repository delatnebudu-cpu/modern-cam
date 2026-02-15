# OpenCAM - Modern CAM Software

Moderní, open-source CAM software pro macOS, inspirovaný Estlcamem.

![Platform](https://img.shields.io/badge/platform-macOS-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Hlavní funkce

- ✅ Moderní dark mode UI s macOS vibrancy efekty
- ✅ Drag & Drop import DXF souborů
- ✅ 3D vizualizace dráhy nástroje (Three.js)
- ✅ Výpočet offsetů pro vnější/vnitřní frézování
- ✅ Export do G-Code
- ✅ Nativní M1/Apple Silicon podpora

## 🛠 Tech Stack

- **Frontend:** React 18 + Tailwind CSS
- **3D Engine:** Three.js (@react-three/fiber, @react-three/drei)
- **Desktop:** Tauri (Rust + WebKit)
- **Parsing:** dxf-parser

## 📦 Instalace

### Prerekvizity

- Node.js 18+
- Rust (instalace přes rustup)
- macOS 11+

### Kroky

1. **Naklonuj repozitář:**
```bash
   git clone https://github.com/TVOJUZIVATEL/modern-cam.git
   cd modern-cam
```

2. **Nainstaluj závislosti:**
```bash
   npm install
```

3. **Spusť vývojový režim:**
```bash
   npm run tauri dev
```

## 🚀 Build pro produkci

### Vytvoření .dmg pro macOS:
```bash
npm run tauri build
```

Výsledný soubor najdeš v: `src-tauri/target/release/bundle/dmg/`

### Build pro Apple Silicon (M1/M2/M3):
```bash
rustup target add aarch64-apple-darwin
npm run tauri build -- --target aarch64-apple-darwin
```

### Build pro Intel Mac:
```bash
rustup target add x86_64-apple-darwin
npm run tauri build -- --target x86_64-apple-darwin
```

### Univerzální build (obě architektury):
```bash
npm run tauri build -- --target universal-apple-darwin
```

## 📁 Struktura projektu
```
modern-cam/
├── src/                    # React frontend
│   ├── components/         # UI komponenty
│   │   ├── FileHandler.jsx # Drag & Drop a DXF parsing
│   │   ├── Scene.jsx       # 3D Canvas
│   │   ├── Sidebar.jsx     # Pravý panel nastavení
│   │   └── Toolbar.jsx     # Levý panel nástrojů
│   ├── utils/              # CAM logika
│   │   ├── geometryUtils.js # Výpočet offsetů a G-kód
│   │   └── dxfHelpers.js   # DXF utility
│   ├── App.jsx             # Hlavní komponenta
│   ├── main.jsx            # React entry point
│   └── index.css           # Tailwind styly
├── src-tauri/              # Rust backend
│   ├── src/main.rs         # Tauri entry point
│   ├── Cargo.toml          # Rust dependencies
│   └── tauri.conf.json     # Tauri konfigurace
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Použití

1. **Import DXF:** Přetáhni .dxf soubor do černého okna
2. **Nastavení nástroje:** Pravý panel - nastav průměr frézy
3. **Výběr objektu:** Klikni na čáru v 3D prostoru
4. **Export G-Code:** Tlačítko "Export G-Code" v pravém panelu

## 🤝 Přispívání

1. Fork projektu
2. Vytvoř feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit změny (`git commit -m 'Add some AmazingFeature'`)
4. Push do branch (`git push origin feature/AmazingFeature`)
5. Otevři Pull Request

## 📝 Roadmap

- [ ] Podpora kruhových oblouků (ARC entities)
- [ ] Multi-tool podpora
- [ ] Simulace dráhy v reálném čase
- [ ] Export do různých post-procesorů (GRBL, Marlin, LinuxCNC)
- [ ] 2.5D frézování (kapsy, vrtání)

## 📄 License

MIT License - viz [LICENSE](LICENSE)

## 🙏 Poděkování

- Inspirováno [Estlcam](https://www.estlcam.de/)
- Three.js komunita
- Tauri framework

---

**Vytvořeno s ❤️ pro open-source CNC komunitu**
