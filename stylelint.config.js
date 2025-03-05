/** @type {import('stylelint').Config} */
export default {
    extends: ['stylelint-config-standard-scss'],
    rules: {
        'declaration-no-important': true,
        'selector-class-pattern': [
            '^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)?(_[a-z0-9]([_]?[-]?[a-z0-9]+)*)?$',
            {
                resolveNestedSelectors: true,
                message: 'Class names should follow the BEM naming convention',
            },
        ],
    },
};
