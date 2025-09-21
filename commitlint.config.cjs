// commitlint.config.js
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Allow commits with only type (no scope required)
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],

    // Disable scope requirement
    'scope-case': [0],

    // Subject rules
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],

    // Header length
    'header-max-length': [2, 'always', 100],

    // Optional body/footer rules
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 120],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 120],
  },
};
