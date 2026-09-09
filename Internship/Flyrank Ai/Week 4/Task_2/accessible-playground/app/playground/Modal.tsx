"use client";

import { useEffect, useRef, useState } from "react";

export default function Modal() {
  const [open, setOpen] = useState(false);

  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Close modal with Escape
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      // Focus trap
      if (event.key === "Tab" && open) {
        const dialog = document.querySelector('[role="dialog"]');

        if (!dialog) return;

        const focusableElements = dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === first) {
            event.preventDefault();
            last.focus();
          }
        } else {
          // Tab
          if (document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      }
    }

    if (open) {
      document.addEventListener("keydown", handleKeyDown);

      // Move focus into the modal
      closeButtonRef.current?.focus();
    } else {
      // Return focus to the Open button
      openButtonRef.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        ref={openButtonRef}
        onClick={() => setOpen(true)}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Open Modal
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="w-96 rounded-lg bg-white p-6 shadow-lg"
          >
            <h2
              id="modal-title"
              className="mb-4 text-2xl font-bold"
            >
              Modal Dialog
            </h2>

            <p className="mb-6">
              This is an accessible modal dialog example.
            </p>

            <div className="flex gap-3">
              <button
                className="rounded bg-gray-600 px-4 py-2 text-white"
              >
                Cancel
              </button>

              <button
                ref={closeButtonRef}
                onClick={() => setOpen(false)}
                className="rounded bg-red-600 px-4 py-2 text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}