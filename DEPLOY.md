# 🚀 Instrukcja wdrożenia na GitHub

## Krok 1: Utwórz Personal Access Token

1. Przejdź na: https://github.com/settings/tokens
2. Kliknij **"Generate new token"** → **"Generate new token (classic)"**
3. Nadaj nazwę: `HugMeNow`
4. Wybierz zakres: ✅ **repo** (pełny dostęp do repozytoriów)
5. Kliknij **"Generate token"**
6. **SKOPIUJ TOKEN** (będzie widoczny tylko raz!)

## Krok 2: Wypchnij kod na GitHub

```bash
cd /home/verdoomx/Pobrane/Code/HugMeNow
git push -u origin main
```

Gdy poprosi o:
- **Username**: `VerdoomX`
- **Password**: **Wklej token** (nie hasło GitHub!)

## Alternatywa: GitHub CLI

```bash
# Zainstaluj GitHub CLI
sudo apt install gh

# Zaloguj się
gh auth login

# Wypchnij kod
git push -u origin main
```

## ✅ Po udanym push:

1. Przejdź na: https://github.com/VerdoomX/VerdoomX
2. Zobaczysz wszystkie pliki projektu
3. Teraz możesz wdrożyć na Vercel:
   - Przejdź na https://vercel.com
   - Zaloguj się przez GitHub
   - Kliknij "New Project"
   - Wybierz repozytorium "VerdoomX"
   - Kliknij "Deploy"

---

**Status:** ✅ Wszystkie pliki są gotowe i zacommitowane lokalnie!
**Następny krok:** Wykonaj `git push -u origin main` z tokenem.

