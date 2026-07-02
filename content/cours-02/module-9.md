# Module 9 · 10 workflows business clés-en-main

> **Durée lecture** : 18 min · **Durée vidéo NotebookLM cible** : 25-30 min

## Pourquoi ce module

Tout ce qu'on a vu (Make, agents, MCPs) appliqué à **10 cas business standards**. Chaque workflow est livré comme template Make/n8n importable + system prompts associés.

Pour chacun : qui est concerné, gain typique, setup time.

---

## Workflow 01 · Lead-to-booking

**Pour qui** : sales B2B, SaaS, freelance qui prend des RDV qualifiés.

**Pipeline** : Formulaire web → scoring IA → séquence mail perso → insertion Calendly → confirmation → follow-up auto.

**Setup time** : 1 après-midi (template livré).

**Gain typique** : 3-5× plus de RDV qualifiés à temps égal vs manuel. ROI mesurable sous 30 jours.

**Stack** : Typeform/site form + Claude API + Make + Gmail MCP + Calendly + HubSpot/Pipedrive.

---

## Workflow 02 · Support client tier-1

**Pour qui** : SaaS, e-commerce qui scale.

**Pipeline** : Inbox support → triage IA → 80 % résolu par agent (FAQ + history) → 20 % escalade humaine avec contexte préparé.

**Setup time** : 2 jours.

**Gain typique** : équipe support divisée par 2 à charge constante, ou 3-5× la charge à effectif constant.

**Stack** : Intercom/Zendesk + Claude API + base de connaissances Notion + escalade Slack.

**Garde-fou critique** : escalade obligatoire sur tout mot-clé sensible (remboursement, scandale, légal, RGPD, mineur).

---

## Workflow 03 · Content engine (réseaux sociaux)

**Pour qui** : marques, agences, freelance qui doit publier régulièrement.

**Pipeline** : Brainstorm IA hebdo → validation éditorial → génération visuels Midjourney → scheduling + cross-posting.

**Setup time** : 1 jour.

**Gain typique** : 5 posts/semaine à 30 min vs 8 h avant.

**Stack** : Claude (idées) + Midjourney (visuels) + Buffer/Publer (scheduling) + Make orchestrateur.

**Garde-fou** : validation humaine systématique avant publication. Pas d'auto-post sans relecture.

---

## Workflow 04 · Devis dynamique

**Pour qui** : freelance, agence, studio avec catalogue services structuré.

**Pipeline** : Brief client → IA matche catalogue services → génère devis Markdown → PDF auto → envoi + suivi.

**Setup time** : 1 demi-journée.

**Gain typique** : 30 sec vs 30 min par devis.

**Stack** : Custom GPT/Projet Claude avec votre catalogue + Make + DocSpring/PDFMonkey + Gmail.

---

## Workflow 05 · Veille concurrentielle

**Pour qui** : Product, Marketing, Strategy.

**Pipeline** : 10-20 sources (web, RSS, X, LinkedIn) → scrape → résumé IA filtré → stockage Notion timeline → brief hebdo.

**Setup time** : 1 jour.

**Gain typique** : 4-8 h/mois récupérées sur la veille.

**Stack** : Make + Apify/Octoparse (scraping) + Claude (résumé) + Notion (storage) + Slack (brief).

---

## Workflow 06 · Reporting client mensuel

**Pour qui** : agences marketing, consultants data.

**Pipeline** : Sources data (GA4, Search Console, Meta Ads) → agent extrait + commente + 3 insights + génère PDF → envoi client.

**Setup time** : 1 jour.

**Gain typique** : 2 h/client/mois → 5 min/client/mois.

**Stack** : MCP GA4 + MCP Meta Ads + Claude + DocSpring + Gmail.

**Format final** : PDF cleané avec graphes (via DocSpring/PDFMonkey templates).

---

## Workflow 07 · Transcription + minutes de réunion

**Pour qui** : tout le monde qui passe 5+ h en meetings par semaine.

**Pipeline** : Otter/Fireflies/Whisper → transcript → agent extrait décisions/actions/owners → push dans Notion (compte rendu) + Linear (tickets).

**Setup time** : 2 h.

**Gain typique** : 1 h de meeting = 5 min de post-traitement vs 30-60 min avant.

**Stack** : Otter/Fireflies + Claude + MCP Notion + MCP Linear.

---

## Workflow 08 · CRM auto-update

**Pour qui** : équipes sales qui détestent remplir le CRM.

**Pipeline** : Après chaque interaction (mail/call/meeting) → agent extrait info clé (next step, pain, budget, timing) → met à jour le contact dans HubSpot.

**Setup time** : 1 jour.

**Gain typique** : CRM enfin tenu à jour, commerciaux content, données fiables pour les rapports.

**Stack** : Gmail MCP + Fireflies + Claude (extraction) + HubSpot MCP.

---

## Workflow 09 · Facturation conforme FR

**Pour qui** : freelance FR + SaaS européens.

**Pipeline** : Devis signé → agent génère facture conforme (TVA, Siret, mentions légales, Factur-X en 2026) → envoi + programme relances J+30/J+45.

**Setup time** : 1 jour.

**Gain typique** : trésorerie healthy, zéro oubli de facturation, conformité Factur-X garantie.

**Stack** : Notion (catalog devis) + Claude (génération) + Pennylane/Tiime (compta) + Gmail.

**Note 2026** : Factur-X obligatoire pour les B2B. Templates conformes livrés.

---

## Workflow 10 · SEO content factory

**Pour qui** : marketing teams qui veulent scaler le contenu organique.

**Pipeline** : Keyword research → brief IA → outline → rédaction IA → review humain → publication WordPress → monitoring ranking sous 30 jours.

**Setup time** : 2 jours.

**Gain typique** : 10-15 articles/mois publiés durable, ranking mesurable.

**Stack** : Ahrefs/Semrush API + Claude (rédaction longue) + WordPress MCP + monitoring custom.

**Garde-fou** : review humain OBLIGATOIRE avant publication. Pas de contenu IA pur en SEO en 2026 (Google détecte et pénalise).

---

## Workflow 11 (bonus) · Social listening

**Pour qui** : brand managers, comms teams.

**Pipeline** : Sources (X, LinkedIn, Reddit, news) → détection mention de marque → sentiment IA → alerte ou réponse selon score.

**Setup time** : 1 jour.

**Gain typique** : surveillance temps réel, gestion proactive des crises (et des opportunités).

**Stack** : Mention.com/Brand24 + Claude (sentiment) + Slack alertes.

---

## Workflow 12 (bonus) · Recrutement first-screen

**Pour qui** : HR avec volume CV.

**Pipeline** : Réception CV → extraction IA (skills, expérience) → scoring vs job description → shortlist + premier mail.

**Setup time** : 1 jour.

**Gain typique** : 200 CVs traités en 30 min vs 2 jours. Shortlist focused pour interview humain.

**Stack** : Greenhouse/Welcome to the Jungle + Claude + Notion ATS + Gmail.

**Garde-fou éthique** : transparence avec candidats sur l'utilisation de l'IA. Pas de décision finale IA, juste pre-screen.

---

## Comment choisir lequel implémenter en premier

**Critères de priorisation** :

1. **ROI mesurable** : combien de temps économisé/mois ?
2. **Complexité technique** : combien de jours setup ?
3. **Risque** : qu'est-ce qui se passe si l'agent foire ?
4. **Apprentissage** : qu'est-ce que ça vous apprend pour le suivant ?

**Mon conseil** : démarrez par **Triage email** (faible risque, gain immédiat visible, apprentissage transférable) ou **Reporting client** (gain visible côté client, vous justifiez la facture).

---

## Conclusion

10 workflows. Tous testés. Tous livrés avec templates Make + system prompts.

À votre rythme :
- Semaine 1-2 : implémentez 1 workflow
- Semaine 3-4 : un deuxième
- Mois 2 : un troisième

D'ici 3 mois, vous avez 3-5 workflows qui tournent, libérant 10-25 h/semaine.

**Prochaine étape** : Module 10. Production, monitoring, sécurité.

---

## Variables NotebookLM

- **Audience** : pros qui veulent un catalogue de cas concrets
- **Ton** : business value, ROI-focus, peu de tech
- **Format** : video 10 capsules (1 workflow par capsule de 2-3 min)
- **Durée cible** : 25-30 min
- **Prompt customization** : *"Vidéo qui passe en revue 10 workflows business. Pour chaque : pour qui, pipeline en 1 phrase, setup time, gain typique. Insiste sur le critère de priorisation et le démarrage par 'triage email' ou 'reporting client'."*
