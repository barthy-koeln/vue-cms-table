/**
 * Serializes query strings taking arrays into account
 * @param {object} obj
 * @param {?string} prefix
 * @return {string}
 */
export function serializeQueryString (obj, prefix = null) {
  const str = []
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? prefix + '[' + p + ']' : p
      const v = obj[p]

      str.push(
        typeof v === 'object'
          ? serializeQueryString(v, k)
          : encodeURIComponent(k) + '=' + encodeURIComponent(v)
      )
    }
  }

  return str.join('&')
}
