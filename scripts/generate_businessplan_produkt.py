# -*- coding: utf-8 -*-
"""Generiert Teil 3 des BetterSquad-Businessplans: Produkt / Dienstleistung (Hardware / Software)."""

from docx import Document
from docx.shared import Pt, RGBColor, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

# --- Farbschema (BetterSquad Emerald / Dark) ---
EMERALD = RGBColor(0x0E, 0x96, 0x5A)
DARK = RGBColor(0x0A, 0x0F, 0x1A)
GREY = RGBColor(0x55, 0x5F, 0x6E)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)

doc = Document()

# --- Standard-Schrift ---
style = doc.styles["Normal"]
style.font.name = "Calibri"
style.font.size = Pt(11)
style.paragraph_format.space_after = Pt(6)
style.paragraph_format.line_spacing = 1.25

# Seitenränder
for section in doc.sections:
    section.top_margin = Cm(2.2)
    section.bottom_margin = Cm(2.2)
    section.left_margin = Cm(2.5)
    section.right_margin = Cm(2.5)


def shade_cell(cell, hex_color):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), hex_color)
    tcPr.append(shd)


def h1(text, number=None):
    p = doc.add_heading(level=1)
    p.paragraph_format.space_before = Pt(16)
    p.paragraph_format.space_after = Pt(8)
    run = p.add_run((f"{number}  " if number else "") + text)
    run.font.color.rgb = EMERALD
    run.font.size = Pt(20)
    run.font.bold = True
    return p


def h2(text, number=None):
    p = doc.add_heading(level=2)
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(4)
    run = p.add_run((f"{number}  " if number else "") + text)
    run.font.color.rgb = DARK
    run.font.size = Pt(14)
    run.font.bold = True
    return p


def h3(text, number=None):
    p = doc.add_heading(level=3)
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.space_after = Pt(2)
    run = p.add_run((f"{number}  " if number else "") + text)
    run.font.color.rgb = EMERALD
    run.font.size = Pt(12)
    run.font.bold = True
    return p


def para(text, italic=False, color=None, size=11):
    p = doc.add_paragraph()
    run = p.add_run(text)
    run.italic = italic
    run.font.size = Pt(size)
    if color:
        run.font.color.rgb = color
    return p


def rich(parts):
    """parts: Liste von (text, bold) Tupeln."""
    p = doc.add_paragraph()
    for text, bold in parts:
        run = p.add_run(text)
        run.bold = bold
    return p


def bullet(text, bold_prefix=None):
    p = doc.add_paragraph(style="List Bullet")
    if bold_prefix:
        r = p.add_run(bold_prefix)
        r.bold = True
        r.font.color.rgb = EMERALD
    p.add_run(text)
    return p


def callout(title, text):
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = table.cell(0, 0)
    shade_cell(cell, "ECFDF5")
    cell.paragraphs[0].text = ""
    pt = cell.paragraphs[0]
    rt = pt.add_run(title)
    rt.bold = True
    rt.font.color.rgb = EMERALD
    rt.font.size = Pt(11)
    pb = cell.add_paragraph()
    rb = pb.add_run(text)
    rb.font.size = Pt(10.5)
    return table


# =====================================================================
# TITEL
# =====================================================================
title = doc.add_paragraph()
title.alignment = WD_ALIGN_PARAGRAPH.LEFT
trun = title.add_run("BetterSquad")
trun.font.size = Pt(28)
trun.font.bold = True
trun.font.color.rgb = EMERALD
sub = title.add_run("  |  Businessplan")
sub.font.size = Pt(16)
sub.font.color.rgb = GREY

para("Investiere in deinen Kader. Nicht in einzelne Spieler.", italic=True, color=GREY, size=12)
para("WiSo Köln · Bachelorseminar · Wintersemester 2024/25", color=GREY, size=10)

doc.add_paragraph()

h1("Produkt / Dienstleistung", number="3")
para(
    "Dieses Kapitel beschreibt das Leistungsangebot von BetterSquad entlang der beiden "
    "untrennbaren Bausteine Hardware und Software. BetterSquad ist die erste integrierte "
    "GPS- und Recovery-Plattform, die professionelle Bundesliga-Methodik der "
    "Belastungssteuerung für den Amateur- und Nachwuchsfußball verfügbar macht – als "
    "schlüsselfertiges Komplettsystem aus tragbarer Sensorik und cloudbasierter "
    "Analysesoftware."
)

# ---------------------------------------------------------------------
h2("Produktüberblick", number="3.1")
para(
    "BetterSquad kombiniert die objektive Messung der äußeren Belastung (GPS-Tracking) "
    "und der inneren Belastung (Herzfrequenz / HRV) mit der subjektiven Befindlichkeit "
    "der Spieler (Hooper-Index). Aus diesen drei Datenquellen errechnet die Plattform die "
    "Acute:Chronic Workload Ratio (ACWR) und übersetzt sie in eine sofort verständliche "
    "Ampel-Logik (Grün / Gelb / Rot). Trainerinnen und Trainer erhalten damit ohne "
    "sportwissenschaftliches Personal vor Ort eine fundierte, individuelle Entscheidungs"
    "grundlage für jede Trainingseinheit."
)
rich([
    ("Das Angebot besteht aus drei aufeinander abgestimmten Komponenten: ", False),
    ("(1) tragbare Hardware ", True),
    ("im Vereinspool, ", False),
    ("(2) eine Software-Plattform ", True),
    ("aus Trainer-Dashboard und Spieler-App sowie ", False),
    ("(3) eine analytische Engine ", True),
    ("mit KI-gestützten Trainingsempfehlungen.", False),
])
callout(
    "Kernversprechen",
    "Bundesliga-Methodik zum Amateur-Preis: 219 €/Monat statt rund 15.000 $/Jahr bei "
    "etablierten Profi-Anbietern – DSGVO-konform und mit Serverstandort in Deutschland.",
)

# =====================================================================
# HARDWARE
# =====================================================================
h2("Hardware", number="3.2")
para(
    "Die Hardware bildet die Datengrundlage des Systems. Bewusst setzt BetterSquad auf "
    "erprobte, kalibrierte Standardkomponenten statt auf teure Eigenentwicklungen. Das "
    "senkt Stückkosten und Ausfallrisiko, verkürzt die Time-to-Market und garantiert "
    "validierte Messqualität. Die Geräte werden nicht einzeln pro Spieler, sondern als "
    "geteilter Vereinspool bereitgestellt (Pool-Modell)."
)

h3("GPS-Tracker (äußere Belastung)", number="3.2.1")
para(
    "Der GPS-Tracker wird in einer leichten Trageweste zwischen den Schulterblättern "
    "getragen und erfasst die äußere Belastung in Echtzeit:"
)
bullet("Zurückgelegte Distanz und Distanz in Hochintensitäts-Zonen", bold_prefix="Laufleistung: ")
bullet("Anzahl der Sprints sowie Höchstgeschwindigkeit (km/h)", bold_prefix="Sprints & Speed: ")
bullet("High-Intensity-Runs als Indikator azyklischer Belastung", bold_prefix="HI-Runs: ")
bullet("Beschleunigungs- und Abbrems-Lasten zur Erkennung von Asymmetrien", bold_prefix="Acc/Dec: ")
para(
    "Aus diesen Rohdaten wird die externe Tageslast (Load) berechnet, die als Grundgröße "
    "in das ACWR-Modell einfließt.",
    color=GREY, size=10,
)

h3("Polar-H10-Pulsgurte (innere Belastung & Recovery)", number="3.2.2")
para(
    "Der medizinisch validierte Brustgurt Polar H10 misst die innere Belastung und liefert "
    "die Datenbasis für das Recovery-Monitoring:"
)
bullet("Herzfrequenz in Echtzeit zur Steuerung der Trainingsintensität", bold_prefix="HR: ")
bullet("Herzfrequenzvariabilität (HRV) als sensibler Frühindikator der Regeneration", bold_prefix="HRV: ")
bullet("Trendanalyse über Tage, um Übertraining 5–10 Tage früher zu erkennen", bold_prefix="Recovery: ")
para(
    "Der Polar H10 ist ein etablierter Industriestandard mit hoher EKG-Genauigkeit und "
    "Bluetooth-Konnektivität – das reduziert Beschaffungs- und Wartungsaufwand erheblich.",
    color=GREY, size=10,
)

h3("Tracker-Dock & QR-Checkout", number="3.2.3")
para(
    "Die Geräte lagern und laden in einem zentralen Tracker-Dock. Vor dem Training scannt "
    "jeder Spieler über die App einen QR-Code am Dock und bekommt automatisch einen freien "
    "Tracker sowie einen Pulsgurt zugewiesen. Das löst zwei zentrale Praxisprobleme des "
    "Amateurbetriebs: Es macht eine feste 1:1-Zuordnung überflüssig (Pool-Modell) und stellt "
    "die korrekte Datenzuordnung sicher, ohne dass Personal Geräte manuell verteilen muss."
)
bullet("Automatische Zuweisung von Tracker- und Gurt-Nummer per QR-Scan", bold_prefix="Self-Checkout: ")
bullet("Live-Übersicht über verfügbare, ausgegebene und in Wartung befindliche Geräte", bold_prefix="Pool-Transparenz: ")
bullet("Geführte Schritt-für-Schritt-Anlage (Weste, Gurt befeuchten, Bluetooth prüfen)", bold_prefix="Onboarding: ")

h3("Pool-Modell & Lieferumfang", number="3.2.4")
para(
    "Statt jeden Spieler einzeln auszustatten, erhält der Verein einen geteilten Gerätepool "
    "samt Ersatzbändern. Eine Vereinslizenz deckt alle Mannschaften ab – Herren, Frauen und "
    "Jugend. Der Hardware-Umfang skaliert mit dem gewählten Paket:"
)

tbl = doc.add_table(rows=4, cols=4)
tbl.style = "Light Grid Accent 1"
tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
hdr = tbl.rows[0].cells
for i, t in enumerate(["Paket", "GPS-Tracker", "Polar H10", "Mannschaften"]):
    hdr[i].paragraphs[0].text = ""
    r = hdr[i].paragraphs[0].add_run(t)
    r.bold = True
    r.font.color.rgb = WHITE
    shade_cell(hdr[i], "0E965A")
rows_data = [
    ("Starter", "15", "15", "bis zu 2"),
    ("Pro", "25", "25", "bis zu 4"),
    ("Elite", "35", "35", "unbegrenzt"),
]
for ri, row in enumerate(rows_data, start=1):
    for ci, val in enumerate(row):
        cell = tbl.rows[ri].cells[ci]
        cell.paragraphs[0].text = ""
        run = cell.paragraphs[0].add_run(val)
        if ci == 0:
            run.bold = True
para(
    "Zusätzlich sind im Lieferumfang Trageschutzwesten, Ersatzbänder (z. B. 48 Stück) sowie "
    "das Lade- und Checkout-Dock enthalten. Die Hardware wird über eine einmalige Anzahlung "
    "(2.200–4.200 €) und die laufende Lizenz finanziert.",
    color=GREY, size=10,
)

# =====================================================================
# SOFTWARE
# =====================================================================
h2("Software", number="3.3")
para(
    "Die Software ist das eigentliche Wertschöpfungszentrum und der zentrale Differenzierungs"
    "faktor von BetterSquad. Sie verwandelt rohe Sensordaten in handlungsleitende Empfehlungen. "
    "Die Plattform besteht aus einem Trainer-Dashboard (Web), einer Spieler-App (Mobile) und "
    "einer dahinterliegenden Analyse- und KI-Engine. Als Software-as-a-Service ist sie "
    "wartungsfrei für den Verein und wird kontinuierlich weiterentwickelt."
)

h3("Trainer-Dashboard (Web)", number="3.3.1")
para("Das Web-Dashboard ist die Kommandozentrale für Trainer- und Funktionsteam:")
bullet("Squad-Ampel mit Grün/Gelb/Rot-Status je Spieler auf einen Blick", bold_prefix="Squad-Ampel: ")
bullet("Verlauf der durchschnittlichen und maximalen Team-ACWR über 21 Tage", bold_prefix="ACWR-Chart: ")
bullet("Live-KPIs: Ø Squad-ACWR sowie Anzahl fitter, gefährdeter und Risiko-Spieler", bold_prefix="KPI-Board: ")
bullet("Detailansicht pro Spieler mit Last-, HRV- und Hooper-Historie", bold_prefix="Spieler-Detail: ")
bullet("Live-Status des Gerätepools (verfügbar / in Wartung)", bold_prefix="Equipment-Monitoring: ")

h3("Session Planner", number="3.3.2")
para(
    "Der Session Planner überführt die Analyse direkt in die Trainingsplanung. Er zeigt eine "
    "Kaderverfügbarkeits-Matrix mit ACWR, Hooper-Score, Status und empfohlener individueller "
    "Trainingsintensität (z. B. „Pause“, „Leicht −20 %“, „Voll“) für die nächste Einheit. Die "
    "Empfehlung lässt sich als Sessionplan exportieren und in den Trainingsalltag übernehmen."
)

h3("Spieler-App (Mobile)", number="3.3.3")
para("Die Spieler-App bindet den Athleten aktiv in den Steuerungskreislauf ein:")
bullet("Tägliche Readiness-Karte mit persönlicher ACWR und Hooper-Score", bold_prefix="Readiness: ")
bullet("Wellness-Check-in über die vier Dimensionen Schlaf, Muskelkater, Energie, Stimmung", bold_prefix="Check-in: ")
bullet("QR-Equipment-Checkout mit geführter Geräteanlage", bold_prefix="Scan: ")
bullet("Persönliche Statistiken: Distanz, Sprints, Höchstgeschwindigkeit, HRV-Trend", bold_prefix="Stats: ")

h3("Analyse- & KI-Engine", number="3.3.4")
para(
    "Im Kern der Plattform verarbeitet die Analyse-Engine externe Last, interne Last und "
    "subjektives Befinden zu konkreten, priorisierten Handlungsempfehlungen:"
)
bullet(
    "Acute:Chronic Workload Ratio aus 7-Tage-Akut- und 28-Tage-Chronik-Last; "
    "Schwellen: > 1,3 = erhöht (Gelb), > 1,49 = kritisch (Rot).",
    bold_prefix="ACWR-Berechnung: ",
)
bullet(
    "HRV-Trendanalyse und Asymmetrie-Erkennung als Frühwarnsystem für Übertraining "
    "und Verletzungsrisiko (5–10 Tage Vorlauf).",
    bold_prefix="Recovery-Monitoring: ",
)
bullet(
    "Verständliche Klartext-Empfehlungen je Spieler und für das Gesamtteam – ohne dass "
    "ein Sportwissenschaftler die Rohdaten interpretieren muss.",
    bold_prefix="KI-Empfehlungen: ",
)
callout(
    "Kundennutzen der Software",
    "Aus Zahlen werden Entscheidungen: Die Plattform sagt nicht nur, dass ein Spieler "
    "gefährdet ist, sondern auch, was zu tun ist – z. B. „Intensität um 20 % reduzieren, "
    "Fokus Taktik + Regeneration“. Das ersetzt teures Fachpersonal vor Ort.",
)

# =====================================================================
# USP
# =====================================================================
h2("Kundennutzen & Alleinstellungsmerkmale", number="3.4")
para(
    "BetterSquad ist die erste Lösung, die GPS-Tracking und Recovery-Monitoring in einem "
    "einzigen, für den Amateurbereich bezahlbaren System verbindet. Die wesentlichen "
    "Alleinstellungsmerkmale sind:"
)
bullet(
    "Externe und interne Last plus subjektives Befinden in einer Plattform statt drei "
    "getrennter Insellösungen.",
    bold_prefix="Integration: ",
)
bullet(
    "219 €/Monat statt ~15.000 $/Jahr – Profi-Methodik wird erstmals für Amateur- und "
    "Nachwuchsvereine erschwinglich.",
    bold_prefix="Preis: ",
)
bullet(
    "Eine Vereinslizenz und ein Gerätepool für alle Teams (Herren, Frauen, Jugend) statt "
    "Einzelausstattung.",
    bold_prefix="Pool-Modell: ",
)
bullet(
    "Bedienbar ohne Sportwissenschaftler – Ampel-Logik und Klartext-Empfehlungen statt "
    "Rohdaten-Tabellen.",
    bold_prefix="Einfachheit: ",
)
bullet(
    "DSGVO-konform, Serverstandort Deutschland, „Made in Germany“ – ein echter "
    "Vertrauensvorteil bei sensiblen Gesundheitsdaten.",
    bold_prefix="Datenschutz: ",
)

# =====================================================================
# WISSENSCHAFT
# =====================================================================
h2("Wissenschaftliche Fundierung", number="3.5")
para(
    "Alle Kennzahlen des Systems beruhen auf etablierten sportwissenschaftlichen Methoden. "
    "Das schafft Glaubwürdigkeit gegenüber Vereinen und Verbänden und grenzt BetterSquad von "
    "rein technikgetriebenen Tracking-Gadgets ab:"
)
bullet(
    "ACWR-Belastungssteuerung nach Gabbett et al. als validiertes Modell zur "
    "Verletzungsprävention.",
    bold_prefix="Gabbett et al.: ",
)
bullet(
    "Der Wellness-Check-in folgt der nach Saw et al. (2016) validierten Hooper-Skala zur "
    "Erfassung der subjektiven Befindlichkeit.",
    bold_prefix="Saw et al. (2016): ",
)
bullet(
    "HRV als anerkannter physiologischer Marker für Regeneration und autonome "
    "Erholungsfähigkeit.",
    bold_prefix="HRV-Forschung: ",
)

# =====================================================================
# ENTWICKLUNGSSTAND
# =====================================================================
h2("Entwicklungsstand & Roadmap", number="3.6")
para(
    "Der funktionsfähige Frontend-Prototyp aus Trainer-Dashboard und Spieler-App bildet den "
    "vollständigen Nutzungsablauf bereits ab und dient als Grundlage für Pilotvereine und "
    "Pitch. Die weitere Entwicklung gliedert sich in nachvollziehbare Schritte:"
)
bullet("Validierter, klickbarer Prototyp des End-to-End-Nutzerflusses.", bold_prefix="Status quo: ")
bullet("Hardware-Anbindung (Live-Datenstrom GPS + Polar H10), Cloud-Backend, Pilotbetrieb in 1–2 Vereinen.", bold_prefix="Phase 1: ")
bullet("Schärfung der KI-Empfehlungen auf realen Saisondaten, Reporting-Export, Verbandsschnittstellen.", bold_prefix="Phase 2: ")
bullet("Skalierung auf 85 Vereine bis Jahr 3, weitere Sportarten, Liga-Benchmarks.", bold_prefix="Phase 3: ")

# =====================================================================
# DATENSCHUTZ
# =====================================================================
h2("Datenschutz & rechtliche Aspekte", number="3.7")
para(
    "Da BetterSquad sensible Gesundheits- und Leistungsdaten verarbeitet, ist Datenschutz "
    "ein integraler Produktbestandteil und kein nachgelagertes Thema. Die gesamte Daten"
    "verarbeitung erfolgt DSGVO-konform mit Serverstandort in Deutschland. Daten werden "
    "verschlüsselt übertragen, Zugriffe sind rollenbasiert (Trainer / Spieler) getrennt. "
    "Dieser klare Datenschutzfokus ist zugleich ein vertrieblicher Wettbewerbsvorteil "
    "gegenüber internationalen Anbietern."
)

doc.add_paragraph()
foot = doc.add_paragraph()
fr = foot.add_run("BetterSquad · Businessplan Teil 3: Produkt / Dienstleistung")
fr.italic = True
fr.font.size = Pt(9)
fr.font.color.rgb = GREY

out = "/home/user/bettersquad/BetterSquad_Businessplan_3_Produkt.docx"
doc.save(out)
print("Gespeichert:", out)
