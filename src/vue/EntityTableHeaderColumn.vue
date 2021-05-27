<template>
  <div
    :class="[
      column['type'],
      ...column['classes'],
      column['align'] ? `justify-content-${column['align']}` : null,
      sortableName ? '-sortable' : null
    ]"
    class="col column-header flex-row"
    @click="headerClicked"
  >
    <div
      v-if="sortableName"
      class="icon-wrapper"
    >
      <!-- Icons are imported globally -->
      <!--suppress HtmlUnknownTag -->
      <c-icon
        :name="orderIcons[orderings[sortableName]]"
        class="icon icon-light"
        size="sm"
      />
    </div>
    <strong>{{ column['title'] }}</strong>
  </div>
</template>

<script>
  export default {
    name: 'EntityTableHeaderColumn',

    props: {
      column: {
        type: Object,
        required: true
      },

      orderIcons: {
        type: Object,
        default () {
          return {
            asc: 'cil-sort-ascending',
            desc: 'cil-sort-descending',
            undefined: ''
          }
        }
      },

      orderings: {
        type: Object,
        required: true
      }
    },

    computed: {
      sortableName () {
        if (['actions', 'image'].includes(this.column.type)) {
          return null
        }

        if (Object.prototype.hasOwnProperty.call(this.column, 'sortable')) {
          if (this.column.sortable === false) {
            return null
          }

          if (Array.isArray(this.column.sortable) && this.column.sortable.length === 0) {
            return null
          }

          return this.column.sortable[0]
        }

        if (this.column.type === 'compound') {
          return this.column.names[0]
        }

        return this.column.name
      }
    },

    methods: {

      headerClicked () {
        if (['actions', 'image'].includes(this.column.type)) {
          return
        }

        if (Object.prototype.hasOwnProperty.call(this.column, 'sortable')) {
          if (this.column.sortable === false) {
            return
          }

          this.emitHeaderClicked(this.column.sortable)
          return
        }

        if (this.column.type === 'compound') {
          this.emitHeaderClicked(this.column.names)
          return
        }

        this.emitHeaderClicked([this.column.name])
      },

      emitHeaderClicked (columnNames) {
        this.$emit('header-clicked', columnNames)
      }
    }
  }
</script>
