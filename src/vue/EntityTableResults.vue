<template>
  <c-card-body class="position-relative entity-table-results px-gutter">
    <transition
      appear
      name="fade"
    >
      <div class="spinner-container">
        <c-spinner
          v-if="loading"
          class="spinner"
        />
      </div>
    </transition>

    <template v-for="entity in entities">
      <div
        :key="entity[entityKey]"
        class="row entity"
      >
        <template v-if="selectRow">
          <div class="selection-checkbox">
            <label>
              <input
                :name="entity[entityKey]"
                type="checkbox"
                :checked="Object.prototype.hasOwnProperty.call(selected, entity[entityKey])"
                @click="$emit('toggle-select-row', entity[entityKey])"
              >
            </label>
          </div>
        </template>
        <template v-for="column in columns">
          <div
            :key="column['title']"
            :class="[column['type'], ...column['classes'], column['align'] ? `align-items-${column['align']}` : null]"
            class="col"
          >
            <component
              :is="column['type'] === 'custom' ? column['component'] : `entity-table-${column['type']}-column`"
              :column="column"
              :entity="entity"
            />
          </div>
        </template>
      </div>
    </template>
  </c-card-body>
</template>

<script>
  import { CCardBody, CSpinner } from '@coreui/vue'
  import EntityTableImageColumn from './Columns/EntityTableImageColumn.vue'
  import EntityTableDateColumn from './Columns/EntityTableDateColumn.vue'
  import EntityTableBooleanColumn from './Columns/EntityTableBooleanColumn.vue'
  import EntityTableStringColumn from './Columns/EntityTableStringColumn.vue'
  import EntityTableCompoundColumn from './Columns/EntityTableCompoundColumn.vue'
  import EntityTableLinkColumn from './Columns/EntityTableLinkColumn.vue'
  import EntityTableActionsColumn from './Columns/EntityTableActionsColumn.vue'
  import EntityTableToggleColumn from './Columns/EntityTableToggleColumn.vue'
  import EntityTableMapColumn from './Columns/EntityTableMapColumn.vue'
  import EntityTableInputColumn from './Columns/EntityTableInputColumn.vue'

  export default {
    name: 'EntityTableResults',

    components: {
      CCardBody,
      CSpinner,
      EntityTableImageColumn,
      EntityTableDateColumn,
      EntityTableBooleanColumn,
      EntityTableStringColumn,
      EntityTableCompoundColumn,
      EntityTableLinkColumn,
      EntityTableActionsColumn,
      EntityTableToggleColumn,
      EntityTableMapColumn,
      EntityTableInputColumn
    },

    props: {
      loading: {
        type: Boolean,
        required: true
      },

      columns: {
        type: Array,
        required: true
      },

      entities: {
        type: Array,
        required: true
      },

      selected: {
        type: Object,
        required: true
      },

      entityKey: {
        type: String,
        required: true
      },

      defaultDateFormatter: {
        type: Intl.DateTimeFormat,
        required: false,
        default () {
          return new Intl.DateTimeFormat(
            navigator.language,
            {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            }
          )
        }
      },

      selectAll: {
        type: Boolean,
        default: true
      },

      selectRow: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="scss"
       scoped
>
  @import '../scss/base';

  .row {
    &:nth-child(even) {
      background-color: $white;
    }

    &:nth-child(odd) {
      background-color: $gray-100;
    }
  }

  .card-body {
    min-height: 2 * $spinner-height;
  }

  .spinner-container {
    height: $spinner-height;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: $spinner-height;
    z-index: 1000;
  }
</style>
