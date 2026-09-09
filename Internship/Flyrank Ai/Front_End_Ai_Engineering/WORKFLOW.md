# AI-Assisted Workflow Drill

## Overview

For this assignment, I implemented the same React Settings Page using two different AI workflows.

### Round 1 – Vague Prompt

I used a simple prompt: "Create a React Settings page."

The generated output was usable, but it lacked several important features. There was no form validation, accessibility considerations, unit testing, or structured verification. The code mainly focused on the UI and required additional review before it could be considered production-ready.

### Round 2 – Detailed Prompt

In the second round, I used a much more detailed prompt with clear requirements. I specified validation, reusable components, responsive design, accessibility, unit tests, and asked the AI to review its own output.

The generated code was significantly better. It included proper validation, improved structure, testing, and a self-review section. The overall code quality was much higher and required less manual correction.

## Comparison

| Feature | Round 1 | Round 2 |
|---------|---------|---------|
| Prompt Quality | Very vague | Detailed specification |
| Validation | No | Yes |
| Accessibility | Minimal | Included |
| Unit Tests | No | Yes |
| Self Review | No | Yes |
| Review Effort | High | Low |

## AI Mistake I Caught

In the first version, the AI focused mainly on the visual interface and did not include validation or accessibility improvements. This would require additional manual work before deployment.

## What I Learned

Providing detailed requirements produces significantly better AI-generated code. Asking the AI to verify its own work, generate tests, and consider accessibility results in higher quality output and reduces review effort.