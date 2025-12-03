import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import perfectionist from "eslint-plugin-perfectionist";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    plugins: {
      perfectionist,
    },
    settings: {
      perfectionist: {
        type: "alphabetical",
        partitionByComment: true,
      },
    },
    rules: {
      // Enable all key sorting features
      "perfectionist/sort-imports": [
        "error",
        {
          customGroups: [],
          environment: "node",
          fallbackSort: { type: "unsorted" },
          groups: [
            "import",
            ["value-builtin", "value-external"],
            "type-internal",
            "value-internal",
            ["type-parent", "type-sibling", "type-index"],
            ["value-parent", "value-sibling", "value-index"],
            "ts-equals-import",
            "unknown",
            "type-import",
          ],
          ignoreCase: true,
          internalPattern: ["^@/.+"],
          maxLineLength: undefined,
          newlinesBetween: 1,
          order: "asc",
          partitionByComment: false,
          partitionByNewLine: false,
          specialCharacters: "keep",
          type: "alphabetical",
        },
      ],
      "perfectionist/sort-objects": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
          partitionByNewLine: true,
        },
      ],
      "perfectionist/sort-modules": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
          fallbackSort: { type: "unsorted" },
          ignoreCase: true,
          specialCharacters: "keep",
          partitionByComment: false,
          partitionByNewLine: false,
          newlinesBetween: "ignore",
          groups: [
            "declare-enum",
            "export-enum",
            "enum",
            ["declare-interface", "declare-type"],
            ["export-interface", "export-type"],
            ["interface", "type"],
            "declare-class",
            "class",
            "export-class",
            "declare-function",
            "export-function",
            "function",
          ],
          customGroups: [],
        },
      ],
      "perfectionist/sort-array-includes": [
        "error",
        {
          groups: ["r", "g", "b"], // Sort colors by RGB
          customGroups: [
            {
              elementNamePattern: "^r$",
              groupName: "r",
            },
            {
              elementNamePattern: "^g$",
              groupName: "g",
            },
            {
              elementNamePattern: "^b$",
              groupName: "b",
            },
          ],
          useConfigurationIf: {
            allNamesMatchPattern: "^r|g|b$",
          },
        },
        {
          type: "alphabetical", // Fallback configuration
        },
      ],
      "perfectionist/sort-enums": "error",
      "perfectionist/sort-union-types": "error",
      "perfectionist/sort-interfaces": "error",
      "perfectionist/sort-named-exports": "error",
      "perfectionist/sort-named-imports": "error",
      "perfectionist/sort-jsx-props": [
        "error",
        {
          type: "alphabetical", // Fallback configuration
        },
      ],
      "perfectionist/sort-intersection-types": [
        "error",
        {
          customGroups: [],
          fallbackSort: { type: "unsorted" },
          groups: [],
          ignoreCase: true,
          newlinesBetween: "ignore",
          order: "asc",
          partitionByComment: false,
          partitionByNewLine: false,
          specialCharacters: "keep",
          type: "alphabetical",
        },
      ],
      "perfectionist/sort-switch-case": [
        "error",
        {
          fallbackSort: { type: "unsorted" },
          ignoreCase: true,
          order: "asc",
          specialCharacters: "keep",
          type: "alphabetical",
        },
      ],
      "perfectionist/sort-classes": "error",
      "perfectionist/sort-variable-declarations": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
          fallbackSort: { type: "unsorted" },
          ignoreCase: true,
          specialCharacters: "keep",
          partitionByNewLine: false,
          partitionByComment: false,
          newlinesBetween: "ignore",
          groups: [],
          customGroups: [],
        },
      ],
      "perfectionist/sort-object-types": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
          fallbackSort: { type: "unsorted" },
          ignoreCase: true,
          specialCharacters: "keep",
          sortBy: "name",
          ignorePattern: [],
          partitionByComment: false,
          partitionByNewLine: false,
          newlinesBetween: "ignore",
          useConfigurationIf: {},
          groups: [],
          customGroups: [],
        },
      ],
    },
  },
  {
    ignores: ["dist/**"],
  },
];
