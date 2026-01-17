---
name: 'wdgk-component-dev'
description: 'Develops and extends components for wdgk-ui (based on naive-ui). Invoke when user wants to create, modify, or test custom UI components.'
---

# WDGK Component Developer

This skill assists in developing and extending UI components for the `wdgk-ui` library, which is based on `naive-ui`.

## Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Language**: TypeScript
- **Build Tool**: Vite
- **Testing**: Vitest
- **Styling**: `css-render` (Naive UI's styling system), avoid plain CSS/LESS/SASS if possible to maintain theme capabilities.

## Component Development Guidelines

### 1. File Structure

When creating a new component (e.g., `MyComponent`), follow the standard directory structure:

```
src/
  my-component/
    src/
      MyComponent.tsx   # Component implementation
      styles/
        index.cssr.ts   # Styles using css-render
    index.ts            # Public export
    README.md           # Documentation
    __tests__/          # Tests
```

### 2. Styling with CSS-Render

Naive UI uses `css-render` for performant, theme-aware styles.

- Define styles in `.cssr.ts` files.
- Use `c`, `cB` (block), `cE` (element), `cM` (modifier) helpers from `naive-ui/src/_utils/cssr`.
- Ensure styles support the theme system (light/dark mode).

### 3. Testing

- Use `Vitest` for unit testing.
- Place tests in `__tests__` directory within the component folder.
- Run tests using `pnpm test` or specific component test.

### 4. Conventions

- Use `defineComponent` from `vue`.
- Props should be typed using `PropType`.
- Export a named installable component.
- Keep `src/index.ts` clean, exporting the component and types.

## Common Tasks

### Creating a New Component

1. Create the folder structure in `src/`.
2. Implement the logic in `src/MyComponent.tsx`.
3. Add styles in `src/styles/index.cssr.ts`.
4. Export in `index.ts`.
5. Register in the main entry point if necessary.

### Modifying Existing Components

- Respect existing patterns.
- Run tests to ensure no regressions: `pnpm test`.

### Debugging

- Use the playground or a demo app to verify changes.
- Check `console` for prop validation warnings.
