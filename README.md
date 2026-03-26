# Array React

App React + TypeScript creada con Vite.

## Requisitos

- Node.js (recomendado: versión LTS)
- npm (incluido con Node)

## Empezar

Instala dependencias:

```bash
npm install
```

Inicia el entorno de desarrollo:

```bash
npm run dev
```

Compila para producción:

```bash
npm run build
```

Previsualiza el build:

```bash
npm run preview
```

## Calidad (ESLint)

Ejecuta el linter:

```bash
npm run lint
```

### Convención importante: **solo arrow functions**

Este repo **evita** declaraciones con `function` (por ejemplo `function Foo() {}`) y prefiere **arrow functions**:

```ts
// ✅ recomendado
export const Foo = () => {
  return null
}
```

La regla está aplicada en `eslint.config.js` (incluye `eslint-plugin-prefer-arrow`).

## Estructura (resumen)

- `src/App.tsx`: componente principal
- `src/components/`: componentes reutilizables
- `eslint.config.js`: reglas de lint

## Estándares del repo (Cursor rules)

Hay reglas de guía para el agente en:

- `.cursor/rules/core-standards.mdc`
- `.cursor/rules/typescript-react-conventions.mdc`

## Troubleshooting

- **El linter falla por “function”**: cambia a una arrow function.
- **Errores raros tras instalar deps**: prueba `npm install` de nuevo y reinicia el dev server.
