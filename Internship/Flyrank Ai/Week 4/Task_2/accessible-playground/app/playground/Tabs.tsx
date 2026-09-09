"use client";

import { useState } from "react";

const tabs = [
  {
    id: "tab1",
    label: "React",
    content: "React is a JavaScript library for building user interfaces.",
  },
  {
    id: "tab2",
    label: "TypeScript",
    content: "TypeScript adds static typing to JavaScript.",
  },
  {
    id: "tab3",
    label: "Next.js",
    content: "Next.js is a React framework for production applications.",
  },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowRight") {
      setActiveTab((prev) => (prev + 1) % tabs.length);
    }

    if (event.key === "ArrowLeft") {
      setActiveTab((prev) => (prev - 1 + tabs.length) % tabs.length);
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Programming Tabs"
        className="flex gap-2"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            role="tab"
            id={tab.id}
            aria-selected={activeTab === index}
            aria-controls={`${tab.id}-panel`}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => setActiveTab(index)}
            onKeyDown={handleKeyDown}
            className={`rounded px-4 py-2 ${
              activeTab === index
                ? "bg-blue-600 text-white"
                : "bg-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${tabs[activeTab].id}-panel`}
        aria-labelledby={tabs[activeTab].id}
        className="mt-4 rounded border p-4"
      >
        {tabs[activeTab].content}
      </div>
    </div>
  );
}