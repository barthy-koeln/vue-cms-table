<template v-once>
  <span
    v-if="names"
    v-safe-html="filteredAndSeparatedValues"
  />
</template>

<script>
  export default {
    name: 'EntityTableCompoundColumn',

    directives: {
      safeHtml: {
        inserted (element, binding) {
          element.innerHTML = binding.value
            .replace(/(<([^>]+)>)/gi, '')
            .replace('\n', '<br>')
        }
      }
    },

    props: {
      names: {
        type: Array,
        required: true
      },
      separator: {
        type: String,
        default: ', '
      },
      entity: {
        type: Object,
        required: true
      }
    },

    computed: {
      filteredAndSeparatedValues () {
        return this.names
          .map(name => this.entity[name])
          .filter(x => x)
          .join(this.separator)
      }
    }
  }
</script>
