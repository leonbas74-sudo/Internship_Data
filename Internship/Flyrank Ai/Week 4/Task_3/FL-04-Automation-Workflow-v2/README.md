# FL-04 – Automation Workflow v2

## Project Overview

This project demonstrates a no-code AI automation workflow that converts study material into structured, exam-ready study notes.

The workflow combines NotebookLM and ChatGPT to automate research, note creation, and quality review while maintaining source-grounded outputs.

---

## Objective

Build an end-to-end automation workflow with three or more distinct steps that:

* Processes a new input document
* Produces structured study notes
* Reviews and improves the output
* Reduces manual effort

---

## Tools Used

* **NotebookLM** – Research and source-grounded summarization
* **ChatGPT** – Study note generation
* **ChatGPT** – Quality review and formatting
* **GitHub** – Documentation and version control

---

## Workflow

```text
Study PDF / Notes
        │
        ▼
NotebookLM
(Gather & Summarize)
        │
        ▼
ChatGPT
(Create Study Notes)
        │
        ▼
ChatGPT
(Review & Improve)
        │
        ▼
Final Study Notes
```

---

## Workflow Steps

### Step 1 – Gather

* Upload a study document to NotebookLM.
* Generate a structured summary using only the uploaded source.

### Step 2 – Draft

* Send the NotebookLM summary to ChatGPT.
* Generate organized study notes with headings, definitions, flashcards, and quiz questions.

### Step 3 – Review

* Review the generated notes.
* Improve formatting, readability, grammar, and completeness.

---

## Outputs

Each workflow run produces:

* Structured study notes
* Quick revision section
* Flashcards
* Multiple-choice questions
* Reviewed final version

---

## Time Comparison

| Task          | Manual     | Workflow   |
| ------------- | ---------- | ---------- |
| Research      | 20 min     | 4 min      |
| Writing Notes | 25 min     | 5 min      |
| Review        | 10 min     | 2 min      |
| **Total**     | **55 min** | **11 min** |

**Estimated Time Saved:** Approximately 44 minutes per document.

---

## Human Review Required

Even with automation, a human should verify:

* Technical accuracy
* Missing concepts
* Formatting
* Code examples
* Final readability

---

## Known Limitations

* Depends on the quality of uploaded documents.
* Diagrams and images may not be fully interpreted.
* OCR errors in scanned PDFs can affect summaries.
* Human verification is recommended before sharing or studying.

---

## Repository Structure

```text
FL-04-Automation-Workflow-v2
│
├── README.md
├── prompts.md
├── walkthrough.md
├── workflow-diagram.png
│
├── runs
│   ├── run1.md
│   ├── run2.md
│   ├── run3.md
│   ├── run4.md
│   └── run5.md
│
└── screenshots
```

---

## Assignment Status

* ✅ Three-step workflow
* ✅ Source-grounded research
* ✅ AI-assisted drafting
* ✅ Quality review stage
* ✅ Documentation included
* ⏳ Remaining workflow runs to be completed
