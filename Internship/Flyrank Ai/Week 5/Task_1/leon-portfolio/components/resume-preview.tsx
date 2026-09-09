import Link from "next/link";

export default function ResumePreview() {
  return (
    <Link
      href="/pdf/Leon_Infant_B_Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="relative overflow-hidden rounded-2xl border border-gray-700 cursor-pointer">

        <iframe
          src="/pdf/Leon_Infant_B_Resume.pdf"
          className="h-[500px] w-full blur-md pointer-events-none"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white">
            View Resume
          </button>
        </div>

      </div>
    </Link>
  );
}