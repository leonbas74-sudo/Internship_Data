"use client";

import { useState } from "react";

export default function Disclosure() {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-xl">
      <button
        aria-expanded={open}
        aria-controls="disclosure-content"
        onClick={() => setOpen(!open)}
        className="w-full rounded bg-blue-600 px-4 py-2 text-left text-white"
      >
        What is Accessibility?
      </button>

      {open && (
        <div
          id="disclosure-content"
          className="mt-3 rounded border p-4"
        >
          Accessibility ensures that websites and applications can be used by everyone, including people who rely on assistive technologies such as screen readers and keyboard navigation.
        </div>
      )}
    </div>
  );
}