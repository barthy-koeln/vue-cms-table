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
     * @param {Map<String|RegExp, String>} replacements Map of strings to replace with data keys to replace them with
     * @param {Object} data object that has keys matching the values of "replacements"
     * @return {string}
     */
    replaceAll (template, replacements, data) {
      for (const [search, replace] of replacements) {
        template = template.replace(search, data[replace])
      }

      return template
    }
  }
}
