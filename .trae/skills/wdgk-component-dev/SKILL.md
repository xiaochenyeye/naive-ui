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

## Component Development Workflow

### 1. Create Component Structure

Create the directory `src/<component-name>` with the following structure:

```
src/
  <component-name>/
    src/
      <ComponentName>.tsx   # Component implementation
      styles/
        index.cssr.ts       # Styles using css-render
    index.ts                # Public export (export { ... } from './src/...')
    demos/
      enUS/
        index.demo-entry.md # English documentation entry
        basic.demo.vue      # Basic usage demo
      zhCN/
        index.demo-entry.md # Chinese documentation entry
        basic.demo.vue      # Basic usage demo
    __tests__/              # Tests
      <ComponentName>.spec.ts
```

### 2. Implement Logic & Styles

- **Logic**: Use `defineComponent` and `setup`. Use `useTheme`, `useConfig`, `useThemeClass` mixins for theming support.
- **Styles**: Define styles in `src/styles/index.cssr.ts` using `c`, `cB`, `cE`, `cM`.
- **Export**: In `src/<component-name>/index.ts`, export the component and its props type.
- **Global Export**: Add `export * from './<component-name>'` to `src/components.ts`.

### 3. Add Documentation & Demos

- **Demos**: Create `basic.demo.vue` in `demos/zhCN` and `demos/enUS`.
- **Doc Entry**: Create `index.demo-entry.md` in both languages.
  - Structure: Title, Description, `## Demos`, `\`\`\`demo basic.vue \`\`\``, `## API`.
- **Register Routes**:
  - Add route to `demo/routes/routes.js` in `enComponentRoutes` and `zhComponentRoutes`.
  - Path should be `<component-name>`.
  - Component import: `() => import('../../src/<component-name>/demos/<lang>/index.demo-entry.md')`.

### 4. Configure Menu

- **Menu Options**: Edit `demo/store/menu-options.js`.
- Add the new component to the **"WDGK 组件 (WDGK Components)"** group (create if not exists) at the top of `createComponentMenuOptions`.
- Ensure `path` matches the route (e.g., `/<component-name>`).
- Add `isNew: true` if applicable.

### 5. Testing & Verification

- **Unit Tests**: Create and run tests in `__tests__`.
- **Manual Verification**: Run `pnpm dev` to check the documentation site.
- Verify the component appears in the menu, the route works, and demos render correctly.

## Common Tasks

### Creating a New Component

1. Scaffold files.
2. Implement logic/styles.
3. Register in `src/components.ts`.
4. Add docs/demos.
5. Register routes in `demo/routes/routes.js`.
6. Add menu item in `demo/store/menu-options.js`.

### Modifying Existing Components

- Respect existing patterns.
- Run tests to ensure no regressions: `pnpm test`.

### Debugging

- Use the playground or a demo app to verify changes.
- Check `console` for prop validation warnings.
