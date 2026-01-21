# v0 Project Rules

## Core Principles

### 1. Minimal by Default
- Every generation should be as lean as possible
- Solve the immediate problem without overengineering
- Leave room for iteration and refinement
- When in doubt, do less

### 2. No New Dependencies
- Do NOT add npm packages or libraries without explicit approval
- Use native browser APIs, React built-ins, and Next.js features first
- If a dependency seems necessary, ask for confirmation and explain why existing tools cannot solve the problem

### 3. No Custom Code When Existing Solutions Exist
- Always search the codebase first for existing patterns, components, and utilities
- Reuse and extend what exists rather than creating new abstractions
- If creating something new is unavoidable, ask for confirmation before proceeding

---

## Component & Styling Rules

### Use Established Components Only
- Use shadcn/ui components from `components/ui/*`
- Use existing custom components in `components/*`
- Do NOT create new component files without explicit approval
- Do NOT override shadcn component internals unless fixing a specific bug

### Styling Constraints
- Use Tailwind CSS utility classes only
- Use the project's existing color tokens and design system
- Do NOT add custom CSS unless vanilla animations are required
- Do NOT use arbitrary values (e.g., `w-[347px]`) when Tailwind scale values exist
- Prefer `gap-*` over margins for spacing in flex/grid layouts

### Typography & Colors
- Use existing font configurations from `globals.css`
- Use semantic color tokens: `text-foreground`, `bg-background`, `text-muted-foreground`, `bg-primary`, etc.
- Do NOT introduce new colors without approval

---

## Code Quality Rules

### React Best Practices
- Prefer Server Components by default
- Use `"use client"` only when client interactivity is required
- Avoid `useEffect` for data fetching - use Server Components or SWR
- Keep components small and focused
- Extract repeated logic into existing utility files, not new ones

### State Management
- Use React's built-in state (`useState`, `useReducer`) for local state
- Use SWR for server state and caching
- Avoid creating new context providers without approval

### File Organization
- Do NOT create new directories or reorganize file structure
- Place new pages in `app/*` following existing patterns
- Place shared logic in existing `lib/*` files

---

## Before Every Change

### Required Checklist
1. Search the codebase for existing solutions
2. Check if shadcn/ui has a component that solves the need
3. Verify if the feature can be built with existing code
4. If new code is needed, ask: "Can this be simpler?"

### Ask for Confirmation When
- Adding any new npm dependency
- Creating a new component file
- Adding new CSS or overriding existing styles
- Introducing a new pattern not already in the codebase
- The change requires more than ~50 lines of new code

---

## Response Format

### When Proposing Changes
1. State what existing code/components will be used
2. Identify any new code that must be created
3. If new code is needed, explain why existing solutions don't work
4. Wait for approval before proceeding with new patterns

### After Making Changes
- Summarize changes in 2-4 sentences
- Note any technical debt or follow-up items
- Do NOT over-explain or add unnecessary context

---

## Prohibited Actions

- Adding animation libraries (use vanilla CSS with `prefers-reduced-motion`)
- Adding icon libraries beyond what's installed (use Lucide icons)
- Adding form libraries (use native HTML + existing patterns)
- Adding date libraries unless complex date math is required
- Creating wrapper components that don't add meaningful functionality
- Adding TypeScript types that duplicate existing interfaces
- Creating utility functions that exist in `lib/utils.ts` or native JS

---

## Summary

**Default stance:** Use what exists. Ask before creating anything new. Keep it minimal.
