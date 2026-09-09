import Image from "next/image";
import Link from "next/link";
import ResumePreview from "@/components/resume-preview";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="mx-auto max-w-6xl rounded-xl bg-white p-10 shadow-lg">

        {/* Profile section */}
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <Image
            src="/images/profile.jpg"
            alt="Leon Infant B"
            width={70}
            height={120}
            className="rounded-full"
          />

          <div>
            <h1 className="text-5xl font-bold">Leon Infant B</h1>

            <p className="mt-4 text-lg text-gray-600">
              Computer Science Student | Full-Stack Developer
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-10">
          <ul className="flex flex-wrap gap-6 text-lg font-semibold">
            <li>
              <Link href="/about">About</Link>
            </li>

            <li>
              <Link href="/skills">Skills</Link>
            </li>

            <li>
              <Link href="/projects">Projects</Link>
            </li>

            <li>
              <Link href="/experience">Experience</Link>
            </li>

            <li>
              <Link href="/education">Education</Link>
            </li>

            <li>
              <Link href="/certifications">Certifications</Link>
            </li>

            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        {/* Welcome section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold">Welcome</h2>

          <p className="mt-4 text-gray-700">
            Welcome to my portfolio. I build web applications using React,
            Next.js, Python, and Django.
          </p>
        </div>

        {/* Resume section */}
        <section id="resume" className="mt-16">
          <h2 className="mb-6 text-3xl font-bold">
            Resume
          </h2>

          <p className="mb-6 text-gray-600">
            Click the preview below to view my complete resume.
          </p>

          <ResumePreview />
        </section>
      </div>
    </main>
  );
}