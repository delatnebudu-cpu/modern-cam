# Přispívání do OpenCAM

Děkujeme za zájem o přispění! 🎉

## 🐛 Hlášení chyb

1. Zkontroluj, jestli chyba již nebyla nahlášena v [Issues](https://github.com/TVOJUZIVATEL/modern-cam/issues)
2. Pokud ne, vytvoř nový issue s:
   - Popisem chyby
   - Kroky k reprodukci
   - Očekávané chování vs. skutečné chování
   - Screenshot (pokud relevantní)
   - Verze macOS a aplikace

## ✨ Návrhy nových funkcí

1. Otevři [Discussion](https://github.com/TVOJUZIVATEL/modern-cam/discussions)
2. Popiš svůj nápad
3. Vysvětli use case
4. Počkej na feedback komunity

## 🔧 Pull Requesty

### Setup
```bash
git clone https://github.com/TVOJUZIVATEL/modern-cam.git
cd modern-cam
npm install
npm run tauri dev
```

### Proces

1. Vytvoř novou branch: `git checkout -b feature/moje-nova-funkce`
2. Proveď změny
3. Otestuj: `npm run tauri dev`
4. Commit: `git commit -m "feat: přidána nová funkce"`
5. Push: `git push origin feature/moje-nova-funkce`
6. Otevři Pull Request

### Commit konvence

Používáme [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` nová funkce
- `fix:` oprava chyby
- `docs:` změny v dokumentaci
- `style:` formátování kódu
- `refactor:` refaktoring
- `test:` přidání testů
- `chore:` ostatní (build, dependencies)

### Code Style

- **JavaScript/React:** Používej ESLint
- **Rust:** Používej `rustfmt`
- **Tailwind:** Používej utility classes

## 🧪 Testování

Před odesláním PR se ujisti:

- [ ] Aplikace se spouští bez chyb
- [ ] DXF import funguje
- [ ] 3D vizualizace se zobrazuje správně
- [ ] G-Code export funguje
- [ ] Žádné console.error v dev tools

## 📚 Dokumentace

Pokud měníš API nebo přidáváš nové komponenty:

1. Aktualizuj JSDoc komentáře
2. Updatuj README.md
3. Přidej příklady použití

## ❓ Potřebuješ pomoc?

- Discord: [link]
- Discussions: [GitHub Discussions]
- Email: your@email.com

Děkujeme! 🙌
