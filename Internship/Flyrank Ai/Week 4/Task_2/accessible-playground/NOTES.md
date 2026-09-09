# NOTES

## Comparison with shadcn/ui

### Modal Dialog

1. My modal uses React `useRef` and `useEffect` to manage focus manually, while shadcn uses `@base-ui/react/dialog` to handle focus management automatically.

2. My focus trap is a simple custom implementation. shadcn provides a more complete and reliable focus trap that handles more edge cases.

3. shadcn separates the dialog into reusable components such as `Dialog`, `DialogTrigger`, `DialogContent`, `DialogOverlay`, `DialogTitle`, and `DialogDescription`, making the code easier to maintain.

4. shadcn includes built-in accessibility support for screen readers through components like `DialogTitle` and `DialogDescription`.

5. shadcn includes built-in animations, overlay handling, and reusable styling, while my implementation is more basic.

### Tabs

1. My tabs support basic keyboard navigation using the Left and Right Arrow keys.

2. shadcn provides reusable tab components with accessibility already built in.

3. shadcn manages ARIA attributes, focus handling, and keyboard interactions in a more robust and reusable way.

## What I Learned

- How to build accessible components using React and TypeScript.
- How ARIA roles (`dialog`, `tablist`, `tab`, and `tabpanel`) improve accessibility.
- Why keyboard navigation and focus management are important for users.
- How component libraries like shadcn implement accessibility best practices.