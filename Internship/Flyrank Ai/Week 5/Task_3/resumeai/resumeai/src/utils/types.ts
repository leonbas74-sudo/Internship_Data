export interface ResumeSections {
  name: string | null;
  email: string | null;
  phone: string | null;
  skills: string[];
  education: boolean;
  experience: boolean;
  projects: boolean;
  certifications: boolean;
}

export interface ScoreBreakdown {
  name: number;
  email: number;
  phone: number;
  skills: number;
  education: number;
  experience: number;
  projects: number;
  certifications: number;
  total: number;
}

export interface AnalysisResult {
  sections: ResumeSections;
  score: ScoreBreakdown;
  suggestions: string[];
}
