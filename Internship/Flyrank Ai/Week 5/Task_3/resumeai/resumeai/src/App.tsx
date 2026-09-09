import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UploadResume from "./components/UploadResume";
import ScoreCard from "./components/ScoreCard";
import SuggestionList from "./components/SuggestionList";
import { extractTextFromPdf } from "./utils/pdfExtractor";
import { analyzeResume } from "./utils/analyzer";
import type { AnalysisResult } from "./utils/types";

function App() {
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelected = async (file: File) => {
    setError(null);
    setResult(null);
    try {
      setLoadingMessage("Reading your PDF...");
      const text = await extractTextFromPdf(file);
      setLoadingMessage("Analyzing resume...");
      const analysis = analyzeResume(text);
      setResult(analysis);
    } catch (err) {
      console.error(err);
      setError("Failed to process the PDF. Please try another file.");
    } finally {
      setLoadingMessage(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-textmain">
      <Header />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-10 space-y-8">
        <UploadResume onFileSelected={handleFileSelected} loadingMessage={loadingMessage} />

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        {result && (
          <div className="space-y-6">
            <ScoreCard result={result} />
            <SuggestionList suggestions={result.suggestions} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
