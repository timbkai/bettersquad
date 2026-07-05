# BetterSquad - App Prototyp

Frontend-Prototyp fuer den Bachelorseminar-Pitch.

GitHub-Repo: https://github.com/timbkai/bettersquad

## Start

```bash
git clone https://github.com/timbkai/bettersquad.git
cd bettersquad
npm ci
npm run dev
```

Dann http://localhost:3000 oeffnen.

Falls ihr im gleichen WLAN schnell auf eine lokale Version schauen wollt:

```bash
npm run dev:lan
```

Danach kann ein zweiter Rechner ueber `http://<deine-ip>:3000` zugreifen. Fuer Arbeiten von verschiedenen PCs ausserhalb desselben Netzwerks ist die Netlify-Version der richtige Weg.

## Gemeinsam arbeiten

1. Der Code muss committed und zu GitHub gepusht sein, sonst sieht der andere Rechner die Aenderungen nicht.
2. Lesender Zugriff ist oeffentlich. Fuer Schreibzugriff muss der Partner in GitHub unter `Settings -> Collaborators` eingeladen werden und die Einladung annehmen.
3. Vor eigener Arbeit immer `git pull --rebase` ausfuehren.
4. Danach Aenderungen committen und pushen:

```bash
git status
git add .
git commit -m "Update dashboard"
git push
```

Wenn ihr wirklich gleichzeitig im gleichen Editor arbeiten wollt, nutzt VS Code Live Share oder GitHub Codespaces. GitHub + Netlify teilen Code und Deployments, ersetzen aber keinen gemeinsamen Live-Editor.

## Hosting mit Netlify

Dieses Repo enthaelt `netlify.toml`. Netlify soll dadurch automatisch:

- `npm run build` ausfuehren
- den statischen Export aus `out/` veroeffentlichen

Empfohlenes Netlify-Setup:

1. New site from Git
2. Repo `timbkai/bettersquad` auswaehlen
3. Production branch: `main`
4. Build command und Publish directory aus `netlify.toml` uebernehmen lassen
5. Jeden Push auf `main` als neues Deployment veroeffentlichen lassen

Wenn die gehostete Seite alt wirkt oder nicht erreichbar ist, zuerst pruefen, ob die lokalen Aenderungen wirklich gepusht wurden und ob Netlify auf dieses Repo und den Branch `main` zeigt.

## Seiten

| URL | Beschreibung |
|-----|-------------|
| `/` | Landing Page mit Pitch-Übersicht |
| `/trainer` | Trainer Dashboard - Squad-Ampel + ACWR-Chart |
| `/trainer/player/p1` | Spieler-Detail (p1–p20 wählbar) |
| `/trainer/session` | Session Planner - Kader-Verfügbarkeit |
| `/player` | Spieler App - Home |
| `/player/checkin` | Wellness Check-in (Hooper-Skala) |
| `/player/scan` | QR Scanner Simulation |
| `/player/stats` | Persönliche Statistiken |
