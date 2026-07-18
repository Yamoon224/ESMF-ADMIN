# ESMF — Dashboard Admin

Tableau de bord d'administration pour **ESMF** (Enagnon Sécurité Mobilité Femme), plateforme de mobilité urbaine sécurisée pour les femmes et étudiantes du Bénin. Construit en Next.js (App Router) + TypeScript + Tailwind CSS v4, avec des données mockées derrière des interfaces de repository — voir la section Architecture.

## Lancer le projet

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de production
npm run start   # sert le build de production
npm run lint    # eslint
```

## Architecture

- `src/lib/repositories/` — interfaces TypeScript (`UsersRepository`, `DriversRepository`, `TripsRepository`, `SosRepository`, `IncidentsRepository`, …) + implémentations `Mock*Repository` associées, exposées via `src/lib/repositories/factory.ts`. Les pages consomment uniquement les interfaces : brancher l'API réelle (`esmf-backend-api`, voir `../backend`) revient à remplacer le contenu de `factory.ts`, pas à réécrire les pages.
- `src/lib/mock-data/` — jeux de données mockées (utilisatrices, conductrices, courses, paiements, incidents, alertes SOS, modules éducatifs).
- `src/lib/rbac/` — matrice de permissions mock pour les 6 profils admin du CDCF (Super Admin, Admin régional, Superviseur, Coordinatrice terrain, Analyste données, Support client) ; `src/context/role-context.tsx` expose le rôle courant et pilote la visibilité de la navigation.
- `src/components/ui/` — composants partagés du design system (boutons, cartes KPI, tableau de données, badges de statut, tiroir latéral, etc.).
- `src/components/layout/dashboard-shell.tsx` — coquille de l'application : sidebar desktop, tiroir + barre d'onglets mobile, barre supérieure (rôle, notifications, bannière SOS).
- `src/features/<section>/ui/` — une vue par section de navigation (utilisatrices, conductrices, courses, paiements, incidents-sos, évaluations, contenus éducatifs, rapports & analyses, paramètres).
- `src/app/(dashboard)/` — routes App Router, une par section.

## Design system

Tokens de couleur et police déclarés dans `src/app/globals.css` (Tailwind v4, bloc `@theme`) :

| Rôle | Token | Valeur |
| --- | --- | --- |
| Marque / sidebar | `esmf-primary` | `#12315C` |
| Marque (dégradé) | `esmf-primary-dark` | `#0A2547` |
| Avertissement / mise en valeur | `esmf-secondary` | `#F4B23E` |
| Alerte / danger / SOS | `esmf-alert` | `#EF6444` |
| Succès | `esmf-success` | `#3FB6B0` |
| Fond app | `esmf-bg` | `#F6F8FB` |
| Surface (cartes) | `esmf-surface` | `#FFFFFF` |
| Bordure | `esmf-border` | `#E3E8F0` |
| Texte principal | `esmf-text` | `#16233A` |
| Texte secondaire | `esmf-text-muted` | `#667389` |

Polices : **Sora** (titres, chiffres clés — classe utilitaire `font-display`) + **Inter** (contenu courant), chargées via `next/font/google`. Les graphiques (Recharts, `src/features/paiements/ui/*-chart.tsx`) reprennent ces mêmes teintes via `src/lib/chart-theme.ts` (les props SVG de Recharts n'acceptent pas les variables CSS, d'où ce miroir en valeurs littérales).

## Responsive

- Desktop (`≥ 768px`) : sidebar fixe.
- Mobile (`< 768px`) : barre d'onglets basse (3 sections principales + « Plus ») et tiroir de navigation complet ; les tableaux de données (`DataTable`) s'affichent en cartes empilées plutôt qu'en défilement horizontal.
- Filet de sécurité global `overflow-x: hidden` sur `html`/`body` (`globals.css`) : la page ne peut pas défiler horizontalement même si un composant venait à mal se contraindre.

## Ce qui est mocké vs réel

Toutes les données (utilisatrices, conductrices, courses, paiements, incidents, alertes SOS, contenus éducatifs, rapports) sont mockées en mémoire côté client — aucune base de données, aucun appel réseau réel. L'authentification par rôle (`RoleProvider`) est un sélecteur de démonstration, pas un vrai contrôle d'accès. Le contrat REST prévu pour brancher ces données sur un vrai backend est documenté dans `../backend`.
