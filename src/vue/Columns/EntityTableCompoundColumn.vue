<template v-once>
  <span
    v-if="column['names']"
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
      column: {
        type: Object,
        required: true
      },
      entity: {
        type: Object,
        required: true
      }
    },

    computed: {
      filteredAndSeparatedValues () {
        return this.column.names
          .map(name => this.entity[name])
          .filter(x => x)
          .join(this.column.separator)
      }
    }
  }
</script>
