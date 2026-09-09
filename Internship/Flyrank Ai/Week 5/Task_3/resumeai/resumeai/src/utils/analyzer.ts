import type { AnalysisResult, ResumeSections, ScoreBreakdown } from "./types";

const SKILL_LIST = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Python",
  "Java",
  "SQL",
  "MongoDB",
  "Git",
  "GitHub",
];

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const PHONE_REGEX = /(\+?\d{1,3}[-.\s]?)?\(?\d{3,5}\)?[-.\s]?\d{3}[-.\s]?\d{3,4}/;

const SECTION_KEYWORDS: Record<
  "education" | "experience" | "projects" | "certifications",
  string[]
> = {
  education: ["education", "academic background", "qualification"],
  experience: ["experience", "employment", "work history", "internship"],
  projects: ["projects", "personal projects", "academic projects"],
  certifications: ["certifications", "certificates", "licenses"],
};

function detectName(lines: string[]): string | null {
  for (const line of lines.slice(0, 5)) {
    const trimmed = line.trim();
    if (
      trimmed.length > 1 &&
      trimmed.length < 40 &&
      !EMAIL_REGEX.test(trimmed) &&
      !PHONE_REGEX.test(trimmed) &&
      /^[A-Za-z.\s]+$/.test(trimmed)
    ) {
      return trimmed;
    }
  }
  return null;
}

function detectSection(text: string, keywords: string[]): boolean {
  const lower = text.toLowerCase();
  return keywords.some((keyword) => lower.includes(keyword));
}

function detectSkills(text: string): string[] {
  const lower = text.toLowerCase();
  return SKILL_LIST.filter((skill) => lower.includes(skill.toLowerCase()));
}

export function analyzeResume(text: string): AnalysisResult {
  const lines = text.split("\n").filter((l) => l.trim().length > 0);

  const emailMatch = text.match(EMAIL_REGEX);
  const phoneMatch = text.match(PHONE_REGEX);

  const sections: ResumeSections = {
    name: detectName(lines),
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch ? phoneMatch[0] : null,
    skills: detectSkills(text),
    education: detectSection(text, SECTION_KEYWORDS.education),
    experience: detectSection(text, SECTION_KEYWORDS.experience),
    projects: detectSection(text, SECTION_KEYWORDS.projects),
    certifications: detectSection(text, SECTION_KEYWORDS.certifications),
  };

  const score: ScoreBreakdown = {
    name: sections.name ? 10 : 0,
    email: sections.email ? 10 : 0,
    phone: sections.phone ? 10 : 0,
    skills: Math.min(20, sections.skills.length * (20 / SKILL_LIST.length) * 2),
    education: sections.education ? 15 : 0,
    experience: sections.experience ? 15 : 0,
    projects: sections.projects ? 10 : 0,
    certifications: sections.certifications ? 10 : 0,
    total: 0,
  };
  score.skills = sections.skills.length > 0 ? Math.min(20, sections.skills.length * 2) : 0;
  score.total =
    score.name +
    score.email +
    score.phone +
    score.skills +
    score.education +
    score.experience +
    score.projects +
    score.certifications;

  const suggestions: string[] = [];
  if (!sections.name) suggestions.push("Add a clear name at the top of your resume.");
  if (!sections.email) suggestions.push("Include a valid email address.");
  if (!sections.phone) suggestions.push("Include a valid phone number.");
  if (sections.skills.length === 0)
    suggestions.push("Add a skills section listing relevant technical skills.");
  if (!sections.education) suggestions.push("Add an education section.");
  if (!sections.experience) suggestions.push("Add a work experience section.");
  if (!sections.projects) suggestions.push("Add a projects section to showcase your work.");
  if (!sections.certifications)
    suggestions.push("Consider adding relevant certifications.");
  if (suggestions.length === 0)
    suggestions.push("Great job! Your resume covers all key sections.");

  return { sections, score, suggestions };
}
