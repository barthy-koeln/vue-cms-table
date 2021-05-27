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
    <template v-for="(column, index) in columns">
      <entity-table-header-column
        :key="index"
        :order-icons="orderIcons"
        :orderings="orderings"
        :column="column"
        @header-clicked="$emit('header-clicked', $event)"
      />
    </template>
  </div>
</template>

<script>
  import { CTooltip } from '@coreui/vue'
  import EntityTableHeaderColumn from './EntityTableHeaderColumn'

  export default {
    name: 'EntityTableHeader',
    components: { EntityTableHeaderColumn },
    directives: { CTooltip },

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
      },

      orderIcons: {
        type: Object,
        default () {
          return undefined
        }
      }
    },

    data () {
      return {
        allSelected: false
      }
    }
  }
</script>

<style
  lang="scss"
  scoped
>
  .column-header {
    position: relative;

    &.-sortable {
      cursor: pointer;
    }
  }

  .icon-wrapper {
    height: 24px;
    left: -.7rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 1rem;
  }
</style>
