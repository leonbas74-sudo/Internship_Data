"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main
      className="
        min-h-screen
        bg-[#020617]
        text-white
        flex
        items-center
        justify-center
        p-6
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          shadow-2xl
          p-8
          text-center
        "
      >
        <div
          className="
            mx-auto
            w-16
            h-16
            rounded-2xl
            bg-red-500/10
            border
            border-red-400/20
            flex
            items-center
            justify-center
            text-3xl
          "
        >
          ❌
        </div>

        <h1 className="mt-5 text-2xl font-bold">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm text-gray-400">
          We couldn't load this page correctly.
          Please try again.
        </p>

        <button
          onClick={() => reset()}
          className="
            mt-6
            rounded-xl
            bg-blue-600
            px-6
            py-3
            text-sm
            font-medium
            text-white
            hover:bg-blue-500
            transition
          "
        >
          Try again
        </button>
      </div>
    </main>
  );
}