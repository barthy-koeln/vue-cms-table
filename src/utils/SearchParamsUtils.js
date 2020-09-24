/**
 * Serializes query strings taking arrays into account
 * @param {object} data
 * @param {?string} prefix
 * @return {string}
 */
export function serializeQueryString (data, prefix = null) {
  const str = []
  for (const property in data) {
    if (Object.prototype.hasOwnProperty.apply(data, property)) {
      const key = prefix ? prefix + '[' + property + ']' : property
      const value = data[property]

      str.push(
        typeof value === 'object'
          ? serializeQueryString(value, key)
          : encodeURIComponent(key) + '=' + encodeURIComponent(value)
      )
    }
  }

  return str.join('&')
}
