interface SuggestionListProps {
  suggestions: string[];
}

export default function SuggestionList({ suggestions }: SuggestionListProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-xl font-semibold mb-4">Suggestions</h2>
      <ul className="space-y-2">
        {suggestions.map((suggestion, i) => (
          <li key={i} className="flex gap-2 text-sm text-white/80">
            <span className="text-primary">•</span>
            <span>{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
