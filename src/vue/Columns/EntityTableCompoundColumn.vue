<template v-once>
  <span
    v-if="column['names']"
    class="text-break"
  >
    <template v-for="(item, index) in filteredAndSeparatedValues">
      <span :key="index">
        <template v-if="item === '__nbsp__'">&nbsp;</template>
        <template v-else-if="item === '__br__'"><br></template>
        <template v-else>{{ item }}</template>
      </span>
    </template>
  </span>
</template>

<script>
  export default {
    name: 'EntityTableCompoundColumn',

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
        const final = []
        const filtered = this.column.names
          .map(name => this.entity[name])
          .filter(x => x)

        for (const value of filtered) {
          final.push(value)
          final.push(this.parsedSeparator)
        }

        final.pop()
        return final
      },

      parsedSeparator () {
        switch (this.column.separator) {
        case '&nbsp;':
          return '__nbsp__'
        case '<br>':
          return '__br__'
        default:
          return this.column.separator
        }
      }
    }
  }
</script>
