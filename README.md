# HugMeNow 💕

Portal randkowy z mapowaniem lokalizacji i inteligentnym dopasowywaniem partnerów.

## 🚀 Wdrożenie na Vercel

### Metoda 1: Przez Vercel CLI (Zalecane)

1. **Zainstaluj Vercel CLI:**
```bash
npm i -g vercel
```

2. **Zaloguj się:**
```bash
vercel login
```

3. **Wdróż projekt:**
```bash
vercel
```

4. **Dla produkcji:**
```bash
vercel --prod
```

### Metoda 2: Przez GitHub

1. **Utwórz repozytorium GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TWOJA_NAZWA/hugmenow.git
git push -u origin main
```

2. **Połącz z Vercel:**
   - Przejdź na [vercel.com](https://vercel.com)
   - Zaloguj się przez GitHub
   - Kliknij "New Project"
   - Wybierz repozytorium
   - Vercel automatycznie wykryje projekt i wdroży

### Metoda 3: Przez Drag & Drop

1. Przejdź na [vercel.com](https://vercel.com)
2. Zaloguj się
3. Kliknij "New Project"
4. Wybierz "Upload" i przeciągnij folder projektu

## 📁 Struktura projektu

```
HugMeNow/
├── index.html          # Główny plik HTML
├── styles.css          # Style CSS
├── app.js              # Główna logika aplikacji
├── config.js           # Konfiguracja
├── js/
│   ├── components.js   # Komponenty UI
│   ├── map.js          # Integracja z mapą
│   ├── matching.js     # Algorytm dopasowywania
│   ├── mockData.js     # Przykładowe dane
│   └── questionnaire.js # Ankieta
└── assets/
    └── images/         # Obrazy użytkowników
```

## 🛠️ Lokalny rozwój

```bash
# Uruchom lokalny serwer
python3 -m http.server 8000

# Lub przez npm
npm start
```

Otwórz http://localhost:8000 w przeglądarce.

## ✨ Funkcje

- 🗺️ Mapa z lokalizacjami użytkowników
- 🎯 Inteligentne dopasowywanie oparte na ankietach
- 🔒 Prywatność z fuzzingiem lokalizacji (500-750m)
- 📱 Responsywny design
- 🌙 Dark/Light mode
- ✨ Płynne animacje i efekty wizualne

## 📝 Licencja

MIT

