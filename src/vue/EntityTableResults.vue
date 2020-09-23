<template>
  <c-card-body class="position-relative entity-table-results">
    <transition appear
                name="fade"
    >
      <div class="spinner-container">
        <c-spinner v-if="loading"
                   class="spinner"
        />
      </div>
    </transition>

    <template v-for="entity in entities">
      <div :key="entity[entityKey]"
           class="row entity"
      >
        <template v-for="column in columns">
          <div :class="[column['type'], ...column['classes']]"
               class="col"
          >
            <component :is="`entity-table-${column['type']}-column`"
                       :key="column['title']"
                       :entity="entity"
                       :column="column"
            />
          </div>
        </template>
      </div>
    </template>
  </c-card-body>
</template>

<script>
  import {CCardBody, CSpinner}     from '@coreui/vue'
  import EntityTableImageColumn    from './Columns/EntityTableImageColumn.vue'
  import EntityTableDateColumn     from './Columns/EntityTableDateColumn.vue'
  import EntityTableBooleanColumn  from './Columns/EntityTableBooleanColumn.vue'
  import EntityTableStringColumn   from './Columns/EntityTableStringColumn.vue'
  import EntityTableCompoundColumn from './Columns/EntityTableCompoundColumn.vue'
  import EntityTableLinkColumn   from './Columns/EntityTableLinkColumn.vue'
  import EntityTableActionsColumn from './Columns/EntityTableActionsColumn.vue'
  import EntityTableToggleColumn from './Columns/EntityTableToggleColumn.vue'
  import EntityTableMapColumn      from './Columns/EntityTableMapColumn.vue'
  import EntityTableInputColumn    from './Columns/EntityTableInputColumn.vue'

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
        type:     Boolean,
        required: true
      },

      columns: {
        type:     Array,
        required: true
      },

      entities: {
        type:     Array,
        required: true
      },

      entityKey: {
        type:     String,
        required: true
      },

      defaultDateFormatter: {
        type: Intl.DateTimeFormat,
        required: false,
        default() {
          return new Intl.DateTimeFormat(
              navigator.language,
              {
                year:  'numeric',
                month: '2-digit',
                day:   '2-digit'
              }
          )
        }
      }
    },
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
