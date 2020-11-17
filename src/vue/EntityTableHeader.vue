<template>
  <div class="row bg-dark text-light entity-table-header py-3 m-0">
    <template v-if="selectRow || selectAll">
      <div class="selection-checkbox">
        <label v-if="selectAll">
          <input
            v-model="allSelected"
            name="all"
            type="checkbox"
            @change="$emit('toggle-select-all', allSelected)"
          >
        </label>
      </div>
    </template>
    <template v-for="column in columns">
      <div
        :key="column['title']"
        :class="[column['type'], ...column['classes'], column['align'] ? `justify-content-${column['align']}` : null]"
        class="col column-header flex-row"
        @click="headerClicked(column)"
      >
        <div
          v-if="Object.prototype.hasOwnProperty.call(orderings, sortedColumnName(column))"
          class="icon-wrapper"
        >
          <!-- Icons are imported globally -->
          <!--suppress HtmlUnknownTag -->
          <c-icon
            :name="orderings[sortedColumnName(column)] === 'asc' ? 'cil-sort-ascending' : 'cil-sort-descending'"
            class="icon icon-light"
            size="sm"
          />
        </div>
        <strong>{{ column['title'] }}</strong>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'EntityTableHeader',

    props: {
      columns: {
        type: Array,
        required: true
      },

      orderings: {
        type: Object,
        required: true
      },

      selectAll: {
        type: Boolean,
        default: true
      },

      selectRow: {
        type: Boolean,
        default: true
      }
    },

    data () {
      return {
        allSelected: false
      }
    },

    methods: {
      headerClicked (column) {
        if (['actions', 'image'].includes(column.type)) {
          return
        }

        if (Object.prototype.hasOwnProperty.call(column, 'sortable') && column.sortable === false) {
          return
        }

        if (column.type === 'compound') {
          this.emitHeaderClicked(column.names)
          return
        }

        this.emitHeaderClicked([column.name])
      },

      emitHeaderClicked (columnNames) {
        this.$emit('header-clicked', columnNames)
      },

      sortedColumnName (column) {
        if (column.type === 'compound') {
          return column.names[0]
        }

        return column.name
      }
    }
  }
</script>

<style lang="scss"
       scoped
>
  .column-header {
    cursor: pointer;
    position: relative;
  }

  .icon-wrapper {
    height: 24px;
    left: -0.7rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 1rem;
  }
</style>
