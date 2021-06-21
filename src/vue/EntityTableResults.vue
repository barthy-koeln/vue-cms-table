<template>
  <div>
    <template v-if="entities.length === 0">
      <slot name="no-results"/>
    </template>
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
              :is="typeof column['type'] === 'string' ? `entity-table-${column['type']}-column` : column['type']"
              v-bind="column"
              :entity="entity"
            />
          </div>
        </template>
      </div>
    </template>
  </div>
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
