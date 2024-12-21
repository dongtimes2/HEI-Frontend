module.exports = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: {
    parserOpts: {
      headerPattern: /^\[(?<type>\w+)\]:\s(?<subject>.*)/,
      headerCorrespondence: ["type", "subject"],
    },
  },
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "style", "refactor", "file", "design", "comment", "chore", "docs", "hotfix"],
    ],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "scope-empty": [2, "always"],
    "subject-empty": [2, "never"],
    "body-leading-blank": [2, "always"],
    "subject-full-stop": [2, "never", "."],
  },
  defaultIgnores: true,
};
