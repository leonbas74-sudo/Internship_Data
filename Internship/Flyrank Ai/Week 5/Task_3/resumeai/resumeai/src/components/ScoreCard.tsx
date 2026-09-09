import type { AnalysisResult } from "../utils/types";

interface ScoreCardProps {
  result: AnalysisResult;
}

const ROWS: { label: string; key: keyof AnalysisResult["score"]; max: number }[] = [
  { label: "Name", key: "name", max: 10 },
  { label: "Email", key: "email", max: 10 },
  { label: "Phone", key: "phone", max: 10 },
  { label: "Skills", key: "skills", max: 20 },
  { label: "Education", key: "education", max: 15 },
  { label: "Experience", key: "experience", max: 15 },
  { label: "Projects", key: "projects", max: 10 },
  { label: "Certifications", key: "certifications", max: 10 },
];

export default function ScoreCard({ result }: ScoreCardProps) {
  const { score, sections } = result;

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-xl font-semibold">Resume Score</h2>
        <span className="text-3xl font-bold text-primary">{Math.round(score.total)}/100</span>
      </div>

      <div className="space-y-2 mb-6">
        {ROWS.map((row) => (
          <div key={row.key} className="flex items-center gap-3 text-sm">
            <span className="w-32 text-white/70">{row.label}</span>
            <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{ width: `${(score[row.key] / row.max) * 100}%` }}
              />
            </div>
            <span className="w-14 text-right text-white/60">
              {Math.round(score[row.key])}/{row.max}
            </span>
          </div>
        ))}
      </div>

      <div className="text-sm space-y-1 text-white/70">
        <p>
          <span className="text-white/50">Name:</span> {sections.name ?? "Not found"}
        </p>
        <p>
          <span className="text-white/50">Email:</span> {sections.email ?? "Not found"}
        </p>
        <p>
          <span className="text-white/50">Phone:</span> {sections.phone ?? "Not found"}
        </p>
        <p>
          <span className="text-white/50">Skills:</span>{" "}
          {sections.skills.length > 0 ? sections.skills.join(", ") : "None detected"}
        </p>
      </div>
    </div>
  );
}
