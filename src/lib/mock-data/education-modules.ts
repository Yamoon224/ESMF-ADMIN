import type { EducationModule } from "@/types/entities";

/**
 * Catalogue de modules éducatifs (ESMF_SPEC.md §3/§4) : EF (éducation
 * financière), SA (santé), VBG (anti-violences basées sur le genre).
 */
export const MOCK_EDUCATION_MODULES: EducationModule[] = [
  {
    id: "edu-001",
    code: "EF-01",
    title: "Gérer son budget au quotidien",
    category: "financeEducation",
    format: "Vidéo + quiz",
    durationMin: 12,
    pointsRequired: 10,
    status: "published",
  },
  {
    id: "edu-002",
    code: "EF-02",
    title: "Épargner grâce à la mobilité",
    category: "financeEducation",
    format: "Vidéo + quiz",
    durationMin: 15,
    pointsRequired: 20,
    status: "published",
  },
  {
    id: "edu-003",
    code: "EF-03",
    title: "Introduction au micro-crédit",
    category: "financeEducation",
    format: "Audio",
    durationMin: 10,
    pointsRequired: 50,
    status: "draft",
  },
  {
    id: "edu-004",
    code: "SA-01",
    title: "Santé reproductive : les bases",
    category: "health",
    format: "Vidéo",
    durationMin: 18,
    pointsRequired: 30,
    status: "published",
  },
  {
    id: "edu-005",
    code: "SA-02",
    title: "Prévention et premiers secours",
    category: "health",
    format: "Vidéo + fiche PDF",
    durationMin: 20,
    pointsRequired: 40,
    status: "published",
  },
  {
    id: "edu-006",
    code: "VBG-01",
    title: "Reconnaître et signaler les violences basées sur le genre",
    category: "antiVbg",
    format: "Vidéo + contacts utiles",
    durationMin: 25,
    pointsRequired: 100,
    status: "published",
  },
  {
    id: "edu-007",
    code: "VBG-02",
    title: "Accompagnement juridique des victimes",
    category: "antiVbg",
    format: "Audio",
    durationMin: 14,
    pointsRequired: 100,
    status: "draft",
  },
];
