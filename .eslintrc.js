module.exports = {
    root: true,
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "react-app",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
    },
    env: {
        browser: true,
        node: true,
    },
    plugins: ["@typescript-eslint"],
    rules: {
        "react/react-in-jsx-scope": "off",
        "no-nested-ternary": "error",
        "no-else-return": "off",
        "no-nested-ternary": "error",
        overrides: [
            {
                files: ["**/*.ts", "**/*.tsx"],
                rules: {
                    "@typescript-eslint/explicit-module-boundary-types": "off",
                    "@typescript-eslint/adjacent-overload-signatures": "warn",
                    "@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
                    "@typescript-eslint/explicit-member-accessibility": "off",
                    "@typescript-eslint/no-empty-interface": "warn",
                    "@typescript-eslint/no-explicit-any": "error",
                    "@typescript-eslint/no-misused-new": "error",
                    "@typescript-eslint/no-namespace": "error",
                    "@typescript-eslint/no-non-null-assertion": "error",
                    "no-unused-vars": "off",
                    "@typescript-eslint/no-unused-vars": [
                        "error",
                        {
                            vars: "all",
                            args: "all",
                            ignoreRestSiblings: false,
                            argsIgnorePattern: "^_",
                            caughtErrors: "all",
                            caughtErrorsIgnorePattern: "^_",
                        },
                    ],
                    "@typescript-eslint/no-use-before-define": [
                        "error",
                        { functions: false, classes: true, variables: false, typedefs: true },
                    ],
                    "@typescript-eslint/no-useless-constructor": "warn",
                    "@typescript-eslint/ban-ts-comment": "off",
                    "@typescript-eslint/unbound-method": "off",
                    "@typescript-eslint/strict-boolean-expressions": [
                        "error",
                        {
                            allowString: false,
                            allowNumber: false,
                            allowNullableObject: false,
                        },
                    ],
                    "@typescript-eslint/no-base-to-string": "error",
                    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
                    "@typescript-eslint/no-unnecessary-condition": "error",
                    "@typescript-eslint/prefer-nullish-coalescing": [
                        "error",
                        {
                            ignoreConditionalTests: false,
                            ignoreMixedLogicalExpressions: false,
                        },
                    ],
                },
            },
            {
                files: ["**/*.stories.ts", "**/*.stories.tsx"],
                rules: {
                    "@typescript-eslint/no-unsafe-assignment": "off",
                    "@typescript-eslint/no-unsafe-member-access": "off",
                    "import/no-anonymous-default-export": "off",
                },
            },
        ],
    },

    overrides: [
        {
            files: ["**/*.ts", "**/*.tsx"],
            rules: {
                "@typescript-eslint/explicit-module-boundary-types": "off",
                "@typescript-eslint/adjacent-overload-signatures": "warn",
                "@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
                "@typescript-eslint/explicit-member-accessibility": "off",
                "@typescript-eslint/no-empty-interface": "warn",
                "@typescript-eslint/no-explicit-any": "error",
                "@typescript-eslint/no-misused-new": "error",
                "@typescript-eslint/no-namespace": "error",
                "@typescript-eslint/no-non-null-assertion": "error",
                "no-unused-vars": "off",
                "@typescript-eslint/no-unused-vars": [
                    "error",
                    {
                        vars: "all",
                        args: "all",
                        ignoreRestSiblings: false,
                        argsIgnorePattern: "^_",
                        caughtErrors: "all",
                        caughtErrorsIgnorePattern: "^_",
                    },
                ],
                "@typescript-eslint/no-use-before-define": [
                    "error",
                    { functions: false, classes: true, variables: false, typedefs: true },
                ],
                "@typescript-eslint/no-useless-constructor": "warn",
                "@typescript-eslint/ban-ts-comment": "off",
                "@typescript-eslint/unbound-method": "off",
                "@typescript-eslint/strict-boolean-expressions": [
                    "error",
                    {
                        allowString: false,
                        allowNumber: false,
                        allowNullableObject: false,
                    },
                ],
                "@typescript-eslint/no-base-to-string": "error",
                "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
                "@typescript-eslint/no-unnecessary-condition": "error",
                "@typescript-eslint/prefer-nullish-coalescing": [
                    "error",
                    {
                        ignoreConditionalTests: false,
                        ignoreMixedLogicalExpressions: false,
                    },
                ],
            },
        },
        {
            files: ["**/*.stories.ts", "**/*.stories.tsx"],
            rules: {
                "@typescript-eslint/no-unsafe-assignment": "off",
                "@typescript-eslint/no-unsafe-member-access": "off",
                "import/no-anonymous-default-export": "off",
            },
        },
    ],
}
