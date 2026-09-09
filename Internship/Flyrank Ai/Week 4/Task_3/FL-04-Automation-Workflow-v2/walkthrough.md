# Automation Workflow v2 – Walkthrough

## Project Information

**Assignment:** FL-04 – Ship an Automation Workflow v2

**Workflow Name:** Source-Grounded Study Notes Automation Workflow

---

# Objective

The goal of this workflow is to automate the process of creating exam-ready study notes from academic documents using no-code AI tools.

Instead of manually reading an entire document, identifying important concepts, writing notes, and reviewing them, the workflow automates these tasks while keeping a human review step.

---

# Tools Used

| Tool       | Purpose                                    |
| ---------- | ------------------------------------------ |
| NotebookLM | Research and source-grounded summarization |
| ChatGPT    | Study note generation                      |
| ChatGPT    | Quality review and formatting              |
| GitHub     | Documentation and version control          |

---

# Workflow Diagram

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

# Step 1 – Gather

### Input

A study PDF or lecture notes are uploaded into NotebookLM.

### Action

NotebookLM reads the uploaded document and generates a structured summary containing:

* Main concepts
* Definitions
* Important examples
* Frequently repeated topics
* Possible exam questions

### Output

A source-grounded summary used for the next step.

---

# Step 2 – Draft

### Input

The NotebookLM summary.

### Action

ChatGPT converts the summary into structured study notes including:

* Headings
* Subheadings
* Bullet points
* Quick revision section
* Flashcards
* Multiple-choice questions

### Output

Complete study notes suitable for exam preparation.

---

# Step 3 – Review

### Input

The generated study notes.

### Action

ChatGPT reviews the notes for:

* Grammar
* Readability
* Duplicate information
* Missing concepts
* Formatting consistency

### Output

A polished final version of the study notes.

---

# Example Workflow Run

**Input Document**

Python Programming Notes (PDF)

↓

NotebookLM generated a structured summary.

↓

ChatGPT created organized study notes.

↓

ChatGPT reviewed and improved the notes.

↓

Final study notes produced.

---

# Time Comparison

| Activity  | Manual     | Workflow   |
| --------- | ---------- | ---------- |
| Research  | 20 min     | 4 min      |
| Drafting  | 25 min     | 5 min      |
| Review    | 10 min     | 2 min      |
| **Total** | **55 min** | **11 min** |

**Estimated Time Saved:** 44 minutes per document.

---

# Human Review Required

Although the workflow automates most tasks, human review is still necessary to:

* Verify technical accuracy
* Check important concepts
* Confirm formatting
* Validate code examples
* Ensure completeness

---

# Known Failure Points

* Poor-quality PDFs
* OCR errors in scanned documents
* Missing diagrams or images
* Over-summarization of complex topics
* Requires human validation before final use

---

# Conclusion

This workflow successfully automates the research, drafting, and review process using free no-code AI tools. It produces structured, source-grounded study notes while significantly reducing the time required compared to a manual process.
