# -*- coding: utf-8 -*-
"""Generiert Teil 3 des BetterSquad-Businessplans: Produkt / Dienstleistung (Hardware / Software).

Stil und Positionierung sind an die bestehende Wettbewerbsanalyse angeglichen:
- Normal-Style, fette (unnummerierte) Überschriften, Blocksatz
- Prosalastig, akademischer Ton, gendergerechte Doppelpunkt-Schreibweise
- Fokus auf Amateur-/Semi-Pro-Frauenfußball (DACH) und female-informed Decision Layer
- Literaturverzeichnis im APA-Stil
"""

from docx import Document
from docx.shared import Pt, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING

doc = Document()

# --- Standard-Schrift / Layout an Referenzdokument angelehnt ---
normal = doc.styles["Normal"]
normal.font.name = "Calibri"
normal.font.size = Pt(11)
pf = normal.paragraph_format
pf.space_after = Pt(8)
pf.line_spacing = 1.08
pf.line_spacing_rule = WD_LINE_SPACING.MULTIPLE

for section in doc.sections:
    section.top_margin = Cm(2.5)
    section.bottom_margin = Cm(2.5)
    section.left_margin = Cm(2.5)
    section.right_margin = Cm(2.5)


def heading(text, top_space=14):
    """Fette Überschrift im Normal-Style, Blocksatz – wie im Referenzdokument."""
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p.paragraph_format.space_before = Pt(top_space)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    run.bold = True
    return p


def body(text):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p.add_run(text)
    return p


def rich_body(parts):
    """parts: Liste von (text, bold)."""
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    for text, bold in parts:
        r = p.add_run(text)
        r.bold = bold
    return p


def lead_bullet(lead, text):
    """List-Paragraph mit fettem Lead-in, Zeilenumbruch, dann Fließtext – wie im Referenzdokument."""
    p = doc.add_paragraph(style="List Paragraph")
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    r = p.add_run(lead)
    r.bold = True
    r.add_break()
    p.add_run(text)
    return p


def ref(text):
    p = doc.add_paragraph(style="List Paragraph")
    p.paragraph_format.space_after = Pt(8)
    p.add_run(text)
    return p


# =====================================================================
# PRODUKT / DIENSTLEISTUNG
# =====================================================================
title = doc.add_paragraph()
trun = title.add_run("Produkt / Dienstleistung")
trun.bold = True
trun.font.size = Pt(15)

# ---------------------------------------------------------------------
heading("Produktüberblick und Wertversprechen", top_space=10)
body(
    "BetterSquad ist ein integriertes Belastungssteuerungs-System für den Amateur- und "
    "Semi-Pro-Frauenfußball im DACH-Raum. Das Produkt verbindet vereinseigene Sensor-Hardware "
    "im Pool-Modell mit einer Software-Plattform, die rohe Mess- und Befindlichkeitsdaten nicht "
    "als Performance-Dashboard ausgibt, sondern zu einer konkreten, individuell auf die "
    "Spielerin kalibrierten Trainingsempfehlung verdichtet. Der inhaltliche Kern ist damit kein "
    "Tracking-Gadget, sondern ein female-informed Decision Layer: eine Entscheidungsschicht, die "
    "die äußere Belastung (GPS), die innere Belastung (Herzfrequenz und HRV) und das subjektive "
    "Befinden (Hooper-Index) auf Basis individueller Baselines jeder Spielerin auswertet."
)
body(
    "Das Leistungsangebot adressiert eine strukturelle Lücke: Etablierte Hardware-Anbieter "
    "richten sich mit Pro-Spieler:in-Preislogik und überwiegend aus Männermessungen abgeleiteten "
    "Referenzwerten an Elite- und Profistrukturen, während female-spezifische Software-"
    "Plattformen zwar die Frauenphysiologie adressieren, aber weder Vereins-Hardware noch eine "
    "objektive, belastungsbasierte Steuerung bieten. BetterSquad besetzt genau die Schnittstelle "
    "beider Welten – zu einem Preis, der für eine Regionalliga- oder Oberliga-Frauenabteilung "
    "tragbar ist (ab 219 € pro Monat statt vier- bis fünfstelliger Jahresaufwände bei "
    "Pro-Gerät-Modellen)."
)
rich_body([
    ("Das Produkt besteht aus drei aufeinander abgestimmten Bausteinen: ", False),
    ("(1) einer vereinseigenen Hardware ", True),
    ("im geteilten Sensor-Pool, ", False),
    ("(2) einer Software-Plattform ", True),
    ("aus Trainer:innen-Dashboard und Spieler:innen-App sowie ", False),
    ("(3) einem female-informed Decision Layer ", True),
    (
        "mit datenschutzfreundlicher Architektur. Die folgenden Abschnitte beschreiben "
        "Hardware und Software entlang dieser Bausteine.",
        False,
    ),
])

# =====================================================================
# HARDWARE
# =====================================================================
heading("Hardware: vereinseigener Sensor-Pool")
body(
    "Die Hardware bildet die objektive Datengrundlage des Systems. Bewusst setzt BetterSquad "
    "auf erprobte, kalibrierte Standardkomponenten statt auf teure Eigenentwicklungen. Das senkt "
    "Stückkosten und Ausfallrisiko, verkürzt die Time-to-Market und sichert eine validierte "
    "Messqualität. Die Geräte werden nicht – wie im Pro-Spieler:in-Modell der etablierten "
    "Anbieter – einzeln pro Athletin beschafft, sondern der Frauenabteilung als geteilter Pool "
    "zur Verfügung gestellt. Eine typische Abteilung mit drei bis fünf Teams und 60 bis 80 "
    "Spielerinnen wird so mit einem überschaubaren Gerätebestand abgedeckt."
)

heading("GPS-Tracker (äußere Belastung)", top_space=8)
body(
    "Der GPS-Tracker wird in einer leichten Trageweste zwischen den Schulterblättern getragen "
    "und erfasst die äußere Belastung in Echtzeit: zurückgelegte Distanz und Distanz in "
    "Hochintensitäts-Zonen, Anzahl der Sprints, Höchstgeschwindigkeit sowie Beschleunigungs- und "
    "Abbrems-Lasten. Aus diesen Rohdaten wird die externe Tageslast (Load) berechnet, die als "
    "Grundgröße in das ACWR-Modell einfließt."
)

heading("Polar-H10-Pulsgurte (innere Belastung und Recovery)", top_space=8)
body(
    "Der medizinisch validierte Brustgurt Polar H10 misst die innere Belastung und liefert die "
    "Datenbasis für das Recovery-Monitoring: die Herzfrequenz in Echtzeit zur Steuerung der "
    "Trainingsintensität sowie die Herzfrequenzvariabilität (HRV) als sensiblen Frühindikator der "
    "Regeneration. Über eine Trendanalyse lassen sich Überlastungstendenzen mehrere Tage früher "
    "erkennen, als sie sich in der reinen Leistung zeigen. Als etablierter Industriestandard mit "
    "hoher EKG-Genauigkeit reduziert der Polar H10 zugleich den Beschaffungs- und Wartungsaufwand."
)

heading("Tracker-Dock und QR-Checkout", top_space=8)
body(
    "Die Geräte lagern und laden in einem zentralen Tracker-Dock. Vor dem Training scannt jede "
    "Spielerin über die App einen QR-Code am Dock und erhält automatisch einen freien Tracker und "
    "Pulsgurt zugewiesen. Das löst zwei zentrale Probleme des Amateurbetriebs: Es macht eine feste "
    "1:1-Zuordnung überflüssig (Voraussetzung des Pool-Modells) und stellt die korrekte, "
    "verwechslungsfreie Datenzuordnung sicher, ohne dass Personal die Geräte manuell verteilen "
    "muss. Eine Live-Übersicht zeigt jederzeit, welche Geräte verfügbar, ausgegeben oder in "
    "Wartung sind."
)

heading("Pool-Modell und Pakete", top_space=8)
body(
    "Eine Vereinslizenz deckt die gesamte Frauenabteilung ab; der Hardware-Umfang skaliert mit dem "
    "gewählten Paket. Das Einstiegspaket Starter umfasst 15 GPS-Tracker und 15 Polar-H10-Gurte für "
    "bis zu zwei Teams (219 € pro Monat), das Paket Pro 25 Geräte-Sets für bis zu vier Teams "
    "(349 € pro Monat) und das Paket Elite 35 Geräte-Sets für eine unbegrenzte Zahl an Teams "
    "(459 € pro Monat). Hinzu kommen Trageschutzwesten, Ersatzbänder und das Lade- und Checkout-"
    "Dock. Die Hardware wird über eine einmalige Anzahlung (2.200 bis 4.200 €) und die laufende "
    "Lizenz finanziert; sie verbleibt im Nutzungsrecht der Abteilung. Diese geteilte Nutzung ist "
    "nicht nur ein Preisvorteil, sondern erzeugt zugleich Wechselkosten: Konfiguration und "
    "individuelle Baselines der Spielerinnen entstehen über Monate und gingen bei einem "
    "Anbieterwechsel verloren."
)

# =====================================================================
# SOFTWARE
# =====================================================================
heading("Software: Decision Layer statt Rohdaten-Dashboard")
body(
    "Die Software ist das Wertschöpfungszentrum und der zentrale Differenzierungsfaktor. Während "
    "der direkte Wettbewerb vor allem Rohdaten- und Performance-Dashboards für sportwissen"
    "schaftliche Stäbe liefert, übersetzt BetterSquad die Daten in handlungsleitende Empfehlungen, "
    "die auch ohne Sportwissenschaftler:in vor Ort verständlich sind. Als Software-as-a-Service "
    "ist die Plattform für den Verein wartungsfrei und wird kontinuierlich weiterentwickelt. Sie "
    "besteht aus dem Trainer:innen-Dashboard, der Spieler:innen-App und der dahinterliegenden "
    "Analyse-Engine mit dem female-informed Decision Layer."
)

heading("Trainer:innen-Dashboard und Session Planner", top_space=8)
body(
    "Das Web-Dashboard ist die Kommandozentrale für das Funktionsteam. Eine Squad-Ampel zeigt je "
    "Spielerin auf einen Blick den Status (Grün / Gelb / Rot), ergänzt um den Verlauf der "
    "durchschnittlichen und maximalen Team-ACWR über 21 Tage und Live-Kennzahlen zur Zahl fitter, "
    "gefährdeter und Risiko-Spielerinnen. Eine Detailansicht je Spielerin bündelt Last-, HRV- und "
    "Hooper-Historie; ein Equipment-Monitor zeigt den Pool-Status. Der integrierte Session Planner "
    "überführt die Analyse unmittelbar in die Trainingsplanung: Er stellt eine Kaderverfügbarkeits-"
    "Matrix mit ACWR, Hooper-Score, Status und empfohlener individueller Intensität (etwa „Pause“, "
    "„Leicht −20 %“ oder „Voll“) bereit und lässt sich als Sessionplan exportieren."
)

heading("Spieler:innen-App", top_space=8)
body(
    "Die mobile App bindet die Athletin aktiv in den Steuerungskreislauf ein. Sie zeigt eine "
    "tägliche Readiness-Karte mit persönlicher ACWR und Hooper-Score, ermöglicht den Wellness-"
    "Check-in über die vier Dimensionen Schlaf, Muskelkater, Energie und Stimmung, steuert den "
    "QR-Equipment-Checkout mit geführter Geräteanlage und stellt persönliche Statistiken zu "
    "Distanz, Sprints, Höchstgeschwindigkeit und HRV-Trend bereit. Über die App erfolgt zudem die "
    "freiwillige Eingabe der Zyklusinformation – ausschließlich durch die Spielerin selbst."
)

heading("Female-informed Decision Layer", top_space=8)
body(
    "Der Decision Layer ist das eigentliche Alleinstellungsmerkmal der Software. Die Analyse-Engine "
    "verarbeitet äußere Last, innere Last und subjektives Befinden zu einer priorisierten, "
    "individuellen Empfehlung. Grundlage ist die Acute:Chronic Workload Ratio aus 7-Tage-Akut- und "
    "28-Tage-Chroniklast (Schwellen: über 1,3 erhöht, über 1,49 kritisch), eingebettet in eine "
    "individuelle Baseline jeder Spielerin – nicht in aus Männermessungen abgeleitete "
    "Referenzwerte. Genau diese individuelle, auf weibliche Physiologie kalibrierte Auswertung "
    "fehlt sowohl beim direkten als auch beim indirekten Wettbewerb."
)
body(
    "Die freiwillige Zyklusangabe fließt dabei als ein Faktor unter mehreren in den individuellen "
    "Score ein und kontextualisiert insbesondere die Interpretation der HRV-Werte. Das Ergebnis ist "
    "für die Trainer:innen eine verständliche Ampel mit Begründungstext und einer konkreten "
    "Handlungsempfehlung je Spielerin und für das Gesamtteam (etwa „Intensität um 20 % reduzieren, "
    "Fokus Taktik und Regeneration“). Damit ersetzt die Software die Interpretationsleistung, die "
    "im Profibereich teures Fachpersonal erbringt."
)

# =====================================================================
# DATENSCHUTZ
# =====================================================================
heading("Datenschutz-Architektur: ein Belastungs-Tool mit Zykluskontext, keine Zyklus-App")
body(
    "Da BetterSquad besondere Kategorien personenbezogener Daten im Sinne des Art. 9 DSGVO "
    "(Gesundheitsdaten) verarbeitet, ist Datenschutz integraler Produktbestandteil und zugleich "
    "vertrieblicher Wettbewerbsvorteil. Die gesamte Verarbeitung erfolgt DSGVO-konform mit "
    "Serverstandort in Deutschland, verschlüsselter Übertragung und rollenbasiert getrennten "
    "Zugriffen für Trainer:innen und Spielerinnen."
)
body(
    "Entscheidend ist die bewusst gegenläufige Architektur gegenüber zyklusbasierten Software-"
    "Plattformen, die Trainer:innen bei Einwilligung weitreichende Einsicht in Zyklusphase und "
    "Symptomhistorie der Athletinnen gewähren. Bei BetterSquad ist die freiwillige Zyklusangabe "
    "ausschließlich ein interner Score-Faktor der Spielerin und zu keinem Zeitpunkt für "
    "Trainer:innen sichtbar; diese sehen ausschließlich Ampel und Begründungstext. BetterSquad ist "
    "damit ausdrücklich keine Zyklus-App, sondern ein Belastungs-Tool mit Zykluskontext. Diese "
    "Trennung ist datenschutzrechtlich (Art. 9 DSGVO), akzeptanzpsychologisch (überwiegend "
    "männlicher Trainerstab im Amateurfußball) und positionierungsstrategisch ein wesentlicher "
    "Unterschied – und schützt zugleich die individuelle Baseline als zentralen Werttreiber."
)

# =====================================================================
# WISSENSCHAFT
# =====================================================================
heading("Wissenschaftliche Fundierung")
body(
    "Alle Kennzahlen des Systems beruhen auf etablierten sportwissenschaftlichen Methoden; das "
    "grenzt BetterSquad von rein technikgetriebenen Tracking-Gadgets ab und schafft Glaubwürdigkeit "
    "gegenüber Vereinen und Verbänden. Die Belastungssteuerung folgt dem von Gabbett (2016) "
    "validierten ACWR-Modell zur Verletzungsprävention. Der Wellness-Check-in basiert auf der nach "
    "Saw et al. (2016) bestätigten Aussagekraft subjektiver Selbstauskünfte (Hooper-Index). Die "
    "HRV-gestützte Recovery-Analyse stützt sich auf Befunde zur Trainingsadaptation und "
    "Herzfrequenzvariabilität (Plews et al., 2013), und die geschlechtsspezifische Kalibrierung "
    "trägt der Evidenz zum Einfluss des Menstruationszyklus auf die Leistungsfähigkeit Rechnung "
    "(McNulty et al., 2020)."
)

# =====================================================================
# KUNDENNUTZEN
# =====================================================================
heading("Kundennutzen und Alleinstellung")
body(
    "Der Kundennutzen ergibt sich aus dem Zusammenspiel der Bausteine und lässt sich entlang "
    "weniger struktureller Vorteile zusammenfassen:"
)
lead_bullet(
    "Integration statt Insellösungen",
    "Äußere und innere Last sowie subjektives Befinden laufen in einer Plattform zusammen, statt "
    "auf getrennte Hardware-, Performance- und Wellness-Tools verteilt zu sein.",
)
lead_bullet(
    "Bezahlbarkeit durch das Pool-Modell",
    "Eine Vereinslizenz und ein geteilter Gerätepool decken die gesamte Frauenabteilung ab; die "
    "Pro-Gerät- bzw. Pro-Spieler:in-Logik des Wettbewerbs entfällt.",
)
lead_bullet(
    "Female-informed Decision Layer",
    "Individuelle, auf weibliche Physiologie kalibrierte Baselines statt aus Männermessungen "
    "abgeleiteter Referenzwerte – mit Zyklusangabe als kontextualisierendem Score-Faktor.",
)
lead_bullet(
    "Entscheidungsunterstützung statt Rohdaten",
    "Ampel-Logik und Klartext-Empfehlungen machen das System ohne Sportwissenschaftler:in vor Ort "
    "bedienbar.",
)
lead_bullet(
    "Datenschutz als Vertrauensvorteil",
    "DSGVO-konform, Serverstandort Deutschland und eine Architektur, die Zyklusdaten konsequent "
    "vor dem Trainerstab verbirgt.",
)

# =====================================================================
# ENTWICKLUNGSSTAND
# =====================================================================
heading("Entwicklungsstand und Roadmap")
body(
    "Der funktionsfähige Frontend-Prototyp aus Trainer:innen-Dashboard und Spieler:innen-App bildet "
    "den vollständigen Nutzungsablauf bereits ab und dient als Grundlage für Pilotvereine und "
    "Pitch. In Phase 1 folgen die Hardware-Anbindung (Live-Datenstrom aus GPS und Polar H10), das "
    "Cloud-Backend sowie ein Pilotbetrieb in einer bis zwei Frauenabteilungen. Phase 2 schärft den "
    "Decision Layer auf realen Saisondaten, ergänzt Reporting-Export und Verbandsschnittstellen. "
    "Phase 3 skaliert über die DACH-Landesverbände auf rund 85 Vereine bis Jahr 3."
)

# =====================================================================
# LITERATURVERZEICHNIS
# =====================================================================
heading("Literaturverzeichnis")
ref(
    "Gabbett, T. J. (2016). The training—injury prevention paradox: Should athletes be training "
    "smarter and harder? British Journal of Sports Medicine, 50(5), 273–280. "
    "https://doi.org/10.1136/bjsports-2015-095788"
)
ref(
    "McNulty, K. L., Elliott-Sale, K. J., Dolan, E., Swinton, P. A., Ansdell, P., Goodall, S., "
    "Thomas, K., & Hicks, K. M. (2020). The effects of menstrual cycle phase on exercise "
    "performance in eumenorrheic women: A systematic review and meta-analysis. Sports Medicine, "
    "50(10), 1813–1827. https://doi.org/10.1007/s40279-020-01319-3"
)
ref(
    "Plews, D. J., Laursen, P. B., Stanley, J., Kilding, A. E., & Buchheit, M. (2013). Training "
    "adaptation and heart rate variability in elite endurance athletes: Opening the door to "
    "effective monitoring. Sports Medicine, 43(9), 773–781. "
    "https://doi.org/10.1007/s40279-013-0071-8"
)
ref(
    "Polar Electro. (n.d.). Polar H10 heart rate sensor [Product page]. Polar Electro. "
    "https://www.polar.com/de/sensoren/h10-herzfrequenz-sensor"
)
ref(
    "Saw, A. E., Main, L. C., & Gastin, P. B. (2016). Monitoring the athlete training response: "
    "Subjective self-reported measures trump commonly used objective measures – A systematic "
    "review. British Journal of Sports Medicine, 50(5), 281–291. "
    "https://doi.org/10.1136/bjsports-2015-094758"
)

out = "/home/user/bettersquad/BetterSquad_Businessplan_3_Produkt.docx"
doc.save(out)
print("Gespeichert:", out)
