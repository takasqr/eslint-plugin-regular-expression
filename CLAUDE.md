# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Build**: `npm run build` - Compiles TypeScript files from `src/` to `dist/` using ES6 modules
- **Test**: `npm run test` - Runs Vitest test suite
- **Test single file**: `npm run test tests/rules/banned.test.ts` - Run specific test file
- **Lint**: `npm run lint` - Runs ESLint on `src` and `tests` directories
- **Publish preparation**: `npm run prepublishOnly` - Runs build before publishing

## Architecture Overview

This is an ESLint plugin that enables rule definitions using regular expressions. The plugin follows ESLint's standard plugin architecture:

### Core Structure

1. **Entry Point** (`src/index.ts`):
   - Exports the plugin object with meta information and rules
   - Imports all rule modules and maps them to rule names
   - Reads package.json for version information

2. **Rules** (`src/rules/`):
   - Each rule is a separate module exporting a `Rule.RuleModule`
   - Six rules available:
     - `banned` - Bans patterns in both identifiers and literals
     - `banned-identifier` - Bans patterns only in identifiers  
     - `banned-literal` - Bans patterns only in string literals
     - `required` - Requires patterns in identifiers or literals
     - `required-identifier` - Requires patterns only in identifiers
     - `required-literal` - Requires patterns only in literals

3. **Utilities** (`src/utils/`):
   - `createRegexes.ts` - Converts string patterns to RegExp objects
   - `checkNodeAgainstPatterns.ts` - Tests nodes against regex patterns and reports violations
   - `matchPatterns.ts` - Checks if any token matches required patterns
   - `filterTokens.ts` - Filters AST tokens by type

### Rule Implementation Pattern

Rules follow this general pattern:
```typescript
{
  meta: {
    type: "problem" | "suggestion",
    schema: [{ patterns: { type: "array", items: { type: "string" } } }]
  },
  create(context) {
    const patterns = context.options[0]?.patterns || [];
    const regexes = createRegexes(patterns, context);
    
    return {
      // AST visitor methods
    };
  }
}
```

### Testing Structure

- Tests use Vitest with ESLint's `RuleTester`
- Test files mirror source structure in `tests/` directory
- Each test file tests valid and invalid cases for the rule

### Build Configuration

- TypeScript with ES6 modules (`"module": "NodeNext"`)
- Strict type checking enabled
- Output to `dist/` directory
- Excludes `node_modules` and `dist` from compilation