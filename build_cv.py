"""Rebuilds Gabriel-Philip-Parinas-CV.pdf so it matches the website.

Usage:  pip install reportlab  &&  python build_cv.py
Edit the text below, run the script, and commit the new PDF.
"""
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import HRFlowable, KeepTogether, Paragraph, SimpleDocTemplate, Spacer

OUTPUT = "Gabriel-Philip-Parinas-CV.pdf"
SITE = "https://gpparinas.github.io/mywebsite/"

INK, MUTED, LINE = HexColor("#1d1d1f"), HexColor("#55555a"), HexColor("#d2d2d7")

base = dict(fontName="Helvetica", fontSize=9.2, leading=12.4, textColor=INK, alignment=TA_LEFT)
S = {
    "name":    ParagraphStyle("name", **{**base, "fontName": "Helvetica-Bold", "fontSize": 19, "leading": 23}),
    "role":    ParagraphStyle("role", **{**base, "fontName": "Helvetica-Bold", "fontSize": 10.5, "leading": 14}),
    "contact": ParagraphStyle("contact", **{**base, "textColor": MUTED}),
    "body":    ParagraphStyle("body", **base),
    "h":       ParagraphStyle("h", **{**base, "fontName": "Helvetica-Bold", "fontSize": 10.5, "leading": 13,
                                      "spaceBefore": 11, "spaceAfter": 2}),
    "sub":     ParagraphStyle("sub", **{**base, "fontName": "Helvetica-Bold", "spaceBefore": 4, "spaceAfter": 1}),
    "job":     ParagraphStyle("job", **{**base, "fontName": "Helvetica-Bold", "fontSize": 9.8, "spaceBefore": 7}),
    "meta":    ParagraphStyle("meta", **{**base, "textColor": MUTED}),
    "bullet":  ParagraphStyle("bullet", **{**base, "leftIndent": 11, "bulletIndent": 1, "spaceBefore": 1.5}),
    "note":    ParagraphStyle("note", **{**base, "textColor": MUTED, "spaceBefore": 1.5}),
}


def link(url, text):
    return f'<link href="{url}" color="#1d1d1f">{text}</link>'


def section(title):
    return [Paragraph(title.upper(), S["h"]),
            HRFlowable(width="100%", thickness=0.6, color=LINE, spaceBefore=1, spaceAfter=4)]


def bullets(items):
    return [Paragraph(text, S["bullet"], bulletText="•") for text in items]


def job(title, org, period, points=None, note=None):
    head = [Paragraph(title, S["job"]), Paragraph(f"{org} &nbsp;|&nbsp; {period}", S["meta"])]
    body = bullets(points) if points else [Paragraph(note, S["note"])]
    # keep the heading with its first line so a role never starts at the very bottom of a page
    return [KeepTogether(head + body[:1])] + body[1:]


# ── CONTENT ──────────────────────────────────────────────────
story = [
    Paragraph("Gabriel Philip Pariñas", S["name"]),
    Paragraph("IT Support &amp; Infrastructure", S["role"]),
    Paragraph("Roxas City, Capiz, Philippines &nbsp;·&nbsp; "
              + link("mailto:gabriielpparinas@gmail.com", "gabriielpparinas@gmail.com"), S["contact"]),
    Paragraph(link(SITE, "gpparinas.github.io/mywebsite") + " &nbsp;·&nbsp; "
              + link("https://github.com/gpparinas", "github.com/gpparinas") + " &nbsp;·&nbsp; "
              + link("https://www.credly.com/users/gpparinas", "credly.com/users/gpparinas"), S["contact"]),
    Spacer(1, 6),
    Paragraph(
        "Tier 1 Support Analyst at a US-based managed services provider, with five years in IT support that began in "
        "BPO operations supporting US-based companies. I have closed more than 1,700 tickets since February 2026, and "
        "the move to an MSP widened my stack quickly: Sophos Firewall and OPNsense, Microsoft 365 across multiple "
        "tenants, and the Kaseya tools. I learn new systems fast and use AI assistants, mostly Claude, to work faster. "
        "Working toward a System Administrator, Network Administrator, or Junior Systems Engineer role.", S["body"]),
]

story += section("Skills")
story += bullets([
    "<b>System Administration &amp; Cloud:</b> Windows Server, Active Directory, Azure AD, Microsoft 365, "
    "Exchange Admin, Group Policy, Virtualization, Google Admin",
    "<b>Networking &amp; Infrastructure:</b> Fortinet, Sophos Firewall, OPNsense, SonicWall, Cisco IOS, UniFi AP, "
    "VLANs, VPNs, DNS, DHCP, TCP/IP",
    "<b>RMM, Ticketing &amp; Documentation:</b> Datto RMM, Kaseya Autotask, Auvik, Zabbix, ITGlue, Freshdesk",
    "<b>Security &amp; Endpoint Protection:</b> Access Control, Vulnerability Analysis, RocketCyber, Sophos, "
    "Sentinel, Endpoint Lifecycle",
    "<b>AI &amp; Automation:</b> Claude (most used), Claude Code, ChatGPT, Copilot, Gemini, Make, PowerShell, "
    "Shell/Batch Scripting, Python",
])

story += section("Professional Experience")
story += job("Support Analyst I (Tier 1)",
             "<b>Premium Care Solutions Philippines Inc.</b> (Client: Klik Solutions LLC) | Roxas City · Remote",
             "February 2026 – Present", [
    "Closed more than 1,700 tickets since February 2026 across multiple MSP client environments.",
    "Serve as first point of contact for MSP clients, handling inbound calls, emails, and voicemails and triaging "
    "incidents and service requests in Autotask PSA.",
    "Troubleshoot and resolve Tier 1 issues on first contact using remote support tools and Datto RMM, covering "
    "Windows and macOS endpoints, connectivity, and business applications.",
    "Support Microsoft 365 administration tasks, including user onboarding and offboarding, license assignment, "
    "group management, and shared mailboxes.",
    "Handle day-to-day network troubleshooting in client environments that include Sophos Firewall and OPNsense.",
    "Escalate issues beyond Tier 1 scope to NOC, SOC, and Engineering teams following documented procedures, with "
    "clear handoffs and timely customer updates within SLA.",
    "Document troubleshooting steps and resolutions in Autotask and ITGlue, and take part in the on-call support rotation.",
])
story += job("Professional development", "Certificates in IT support, security, and networking",
             "September 2025 – January 2026",
             note="Completed the Google IT Support and Google Cybersecurity Professional Certificates, Cisco's Network "
                  "Technician Career Path, and Google AI Essentials before joining Premium Care Solutions.")
story += job("IT Support", "<b>Rubixcare Ltd.</b> | London, United Kingdom · Remote",
             "March 2025 – August 2025", [
    "Managed the complete user lifecycle in the Google Admin Console and conducted regular security audits of "
    "Google Drive to enforce data protection policies.",
    "Performed scheduled maintenance, security updates, and automated full backups of company web platforms.",
    "Handled network connectivity diagnostics and application troubleshooting to minimize downtime for a remote workforce.",
    "Took part in planning sessions to improve processes and evaluate new software (e.g., RotaCloud) for team efficiency.",
])
story += job("Career transition", "Upskilling and the move to remote work", "October 2024 – February 2025",
             note="Left Nearsol to look for my next role. Completed Coursera's CompTIA A+ Network course in October "
                  "2024, then moved into remote IT support with Rubixcare in March 2025.")
story += job("IT Support Specialist",
             "<b>Nearsol Philippines Inc.</b> | Iloilo Business Park, Mandurriao, Iloilo City",
             "April 2022 – September 2024", [
    "Supported Windows Servers, Active Directory/Azure AD, Fortinet firewalls, and Cisco routing and switching for a "
    "large-scale BPO operation, working alongside the network engineers and assisting them on projects.",
    "Supported over 200 monthly infrastructure and user requests via Freshdesk, maintaining 90% SLA compliance.",
    "As one of the tenured members of the team, trained teammates on the site's infrastructure.",
    "Led IT asset procurement and vendor negotiations to reduce infrastructure costs.",
])
story += job("Career break", "Family care during the pandemic", "March 2021 – March 2022",
             note="Returned home during the COVID-19 pandemic to take care of my family, then went back to "
                  "full-time IT work in April 2022.")
story += job("IT Admin / Support",
             "<b>World Source Pettigrew Philippines Inc.</b> | General Luna Street, Iloilo City",
             "December 2019 – February 2021", [
    "Architected and maintained Windows Terminal Servers, Active Directory, and physical security (CCTV) systems.",
    "Configured and maintained SonicWall firewalls and enforced security compliance across the local network.",
    "Monitored newly deployed Windows server environments through regular health checks and configuration tuning.",
])
story += job("IT Intern", "<b>PLDT Site Office – La Paz Branch</b> | Iloilo City",
             "November 2018 – March 2019", [
    "Assisted enterprise engineers in structured cabling, network hardware testing, and infrastructure troubleshooting.",
])

story += section("Projects")
story += [Paragraph("Daily IT news briefing and weekly jobs roundup", S["job"]),
          Paragraph("Personal automation &nbsp;|&nbsp; Make, Gemini, Claude, Gmail", S["meta"])]
story += bullets([
    "Built a Make scenario that reads IT news feeds, has Gemini summarize them, and emails the briefing to my Gmail "
    "every morning.",
    "Set up a scheduled Claude task that searches new job listings each week and sends me the best matches.",
])

story += section("Certifications &amp; Training")
DS = "https://app.diplomasafe.com/en-US/certificates/"
CR = "https://www.credly.com/badges/"
story.append(Paragraph("Certifications", S["sub"]))
story += bullets([
    "<b>" + link(DS + "d7c1ae816c19d510cd18836e0442e32caf31108b8", "Kaseya Certified Technician in RocketCyber")
    + "</b> | Kaseya (Feb 2026, valid to Feb 2028)",
    "<b>" + link(DS + "d79d9af119d949af4ffd5b22a1cf56f7e54c7429c", "Kaseya Certified Technician in IT Glue")
    + "</b> | Kaseya (Feb 2026, valid to Feb 2028)",
    "<b>" + link(DS + "d093d3bbf2e25175eed5eedef5c2a2c124f1bf205", "Kaseya Certified Technician in Datto RMM")
    + "</b> | Kaseya (Feb 2026, valid to Feb 2028)",
    "<b>" + link(DS + "d05b339048303e9e617b6e0ec5387c5dd901565c7", "Kaseya Certified Technician in Autotask PSA")
    + "</b> | Kaseya (Feb 2026, valid to Feb 2028)",
])
story.append(Paragraph("Certificates &amp; training", S["sub"]))
story += bullets([
    "<b>" + link(CR + "5232d492-48cb-4a36-be68-636badd63b53", "Google AI Essentials")
    + "</b> | Google via Coursera (Dec 2025)",
    "<b>" + link(CR + "c87fa725-dc87-40db-a001-bb7aaf8d7a9a", "Google Cybersecurity Professional Certificate")
    + "</b> | Google via Coursera (Oct 2025)",
    "<b>" + link(CR + "95ebce15-c2f6-400b-b5e6-38e9d2bca5fd", "Google IT Support Professional Certificate")
    + "</b> | Google via Coursera (Oct 2025)",
    "<b>" + link(CR + "42430fe3-65b2-4432-b512-94fb41e7809b", "Network Technician Career Path")
    + "</b> | Cisco (Oct 2025)",
    "<b>" + link("https://www.coursera.org/account/accomplishments/verify/L04YSR7S4PM7", "CompTIA A+ Network")
    + "</b> | Coursera course (Oct 2024)",
])
story.append(Paragraph("Every credential can be verified online: " + link(SITE + "#credentials",
                       "gpparinas.github.io/mywebsite/#credentials"), S["note"]))

story += section("Education")
story += [Paragraph("Bachelor of Science in Information Technology", S["job"]),
          Paragraph("University of San Agustin, Iloilo &nbsp;|&nbsp; 2014 – 2018", S["meta"])]

SimpleDocTemplate(
    OUTPUT, pagesize=A4, leftMargin=19 * mm, rightMargin=19 * mm, topMargin=16 * mm, bottomMargin=15 * mm,
    title="Gabriel Philip Pariñas — CV", author="Gabriel Philip Pariñas",
    subject="IT Support & Infrastructure",
).build(story)
print("wrote", OUTPUT)
