/**
 * Vue mixin that provides a smart string building function via regular expression replacements.
 *
 * @type {Object}
 */
export const replacementMixin = {
  methods: {
    /**
     * Replace all occurrences of the keys in "replacements" with the values of "data"
     *
     * @param {string} template string that has placeholders matching the keys of "replacements"
     * @param {Object} replacements Map of strings to replace with data keys to replace them with
     * @param {Object} data object that has keys matching the values of "replacements"
     * @return {string}
     */
    replaceAll (template, replacements, data) {
      return template.replace(
        new RegExp(Object.keys(replacements).join('|'), 'gi'),
        function (matched) {
          return data[replacements[matched]]
        }
      )
    }
  }
}
