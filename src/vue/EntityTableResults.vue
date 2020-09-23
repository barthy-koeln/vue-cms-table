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
        <template v-for="field in fields">
          <div :class="[field['type'], ...field['classes']]"
               class="col"
          >
            <component :is="columnComponent(field['type'])"
                       :key="field['title']"
                       :entity="entity"
                       :field="field"
            />
          </div>
        </template>
      </div>
    </template>
  </c-card-body>
</template>

<script>
  import { CCardBody, CSpinner }   from '@coreui/vue'
  import EntityTableImageColumn    from './Columns/EntityTableImageColumn.vue'
  import EntityTableDateColumn     from './Columns/EntityTableDateColumn.vue'
  import EntityTableBooleanColumn  from './Columns/EntityTableBooleanColumn.vue'
  import EntityTableStringColumn   from './Columns/EntityTableStringColumn.vue'
  import EntityTableCompoundColumn from './Columns/EntityTableCompoundColumn.vue'
  import EntityTableLinkColumn     from './Columns/EntityTableLinkColumn.vue'
  import EntityTableActionColumn   from './Columns/EntityTableActionColumn.vue'
  import EntityTableToggleColumn   from './Columns/EntityTableToggleColumn.vue'
  import EntityTableMapColumn      from './Columns/EntityTableMapColumn.vue'
  import EntityTableInputColumn    from './Columns/EntityTableInputColumn.vue'

  export default {
    name: 'EntityTableResults',

    components: {
      CCardBody,
      CSpinner
    },

    props: {
      loading: {
        type: Boolean,
        required: true
      },

      fields: {
        type: Array,
        required: true
      },

      entities: {
        type: Array,
        required: true
      },

      entityKey: {
        type: String,
        required: true
      }
    },

    data () {
      return {
        dateFormatter: null
      }
    },

    created () {
      // TODO configurable
      this.dateFormatter = new Intl.DateTimeFormat(
          'de-DE',
          {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }
      )
    },

    methods: {
      // TODO simplify
      columnComponent (type) {
        switch (type) {
          case 'image':
            return EntityTableImageColumn
          case 'date':
            return EntityTableDateColumn
          case 'boolean':
            return EntityTableBooleanColumn
          case 'toggle':
            return EntityTableToggleColumn
          case 'compound':
            return EntityTableCompoundColumn
          case 'actions':
            return EntityTableActionColumn
          case 'link':
            return EntityTableLinkColumn
          case 'map':
            return EntityTableMapColumn
          case'input':
            return EntityTableInputColumn
          case 'string':
          default:
            return EntityTableStringColumn
        }
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
