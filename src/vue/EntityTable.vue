<template>
  <div class="entity-table d-flex flex-column">
    <c-card>
      <c-card-header class="position-sticky sticky-top mb-0 p-0">
        <entity-table-search-form
          v-model="search"
          :label="searchLabel"
          :placeholder="searchPlaceholder"
          class="p-3"
          @search="loadData"
        >
          <slot name="search-form"/>
        </entity-table-search-form>

        <entity-table-header
          :columns="columns"
          :orderings="orderings"
          @header-clicked="headerClicked"
          @toggle-select-all="onSelectAll"
        />
      </c-card-header>

      <entity-table-results
        :columns="columns"
        :entities="entities"
        :entity-key="entityKey"
        :loading="loading"
        :select-all="selectAll"
        :select-row="selectRow"
        :selected="selected"
        @toggle-select-row="onSelectRow"
      />

      <entity-table-pagination
        :page="page"
        :page-count="pageCount"
        @search="loadPage"
      />
    </c-card>
  </div>
</template>

<script>
  import { CCard, CCardHeader } from '@coreui/vue'
  import EntityTableSearchForm from './EntityTableSearchForm.vue'
  import EntityTableHeader from './EntityTableHeader.vue'
  import EntityTableResults from './EntityTableResults.vue'
  import EntityTablePagination from './EntityTablePagination.vue'
  import { serializeQueryString } from '../utils/SearchParamsUtils.js'

  export default {
    name: 'EntityTable',

    components: {
      CCard,
      CCardHeader,
      EntityTableSearchForm,
      EntityTableHeader,
      EntityTableResults,
      EntityTablePagination
    },

    props: {
      searchPath: {
        type: String,
        required: true
      },

      columns: {
        type: Array,
        required: true
      },

      entityKey: {
        type: String,
        required: true
      },

      searchLabel: {
        type: String,
        required: false,
        default: 'Search'
      },

      searchPlaceholder: {
        type: String,
        required: false,
        default: 'Type here to search'
      },

      defaultOrdering: {
        type: Array,
        required: false,
        default () {
          return []
        }
      },

      filters: {
        type: Object,
        default () {
          return {}
        }
      },

      requestInit: {
        validator (value) {
          return value instanceof Object || typeof value === 'undefined'
        },
        default () {
          return undefined
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
    },

    data () {
      return {
        page: 1,
        pageCount: 0,
        search: '',
        entities: [],
        selected: {},
        lastQueryString: '',
        loading: false,
        orderings: {}
      }
    },

    watch: {
      filters: {
        handler () {
          this.loadData()
        },
        deep: true
      },

      orderings: {
        handler () {
          this.loadData()
        },
        deep: true
      }
    },

    mounted () {
      if (this.defaultOrdering.length === 2) {
        // do not trigger watcher here
        this.$set(this.orderings, this.defaultOrdering[0], this.defaultOrdering[1])
        return
      }

      this.loadData()
    },

    methods: {
      getQueryString () {
        const queryData = {
          search: this.search,
          page: this.page,
          filters: this.filters,
          orderings: this.orderings
        }

        return serializeQueryString(queryData)
      },

      async loadData () {
        const queryString = this.getQueryString()

        if (this.lastQueryString === queryString) {
          return
        }

        this.loading = true
        const response = await fetch(`${this.searchPath}?${queryString}`, this.requestInit)
        if (!response.ok) {
          throw new Error(response.statusText)
        }

        const body = await response.json()
        this.page = body.page
        this.pageCount = body.pageCount
        this.entities = body.entities

        this.lastQueryString = queryString
        this.loading = false
      },

      headerClicked (propertyNames) {
        for (const [currentPropertyName] of Object.entries(this.orderings)) {
          if (propertyNames.includes(currentPropertyName)) {
            continue
          }

          this.$delete(this.orderings, currentPropertyName)
        }

        for (const propertyName of propertyNames) {
          if (Object.prototype.hasOwnProperty.call(this.orderings, propertyName)) {
            this.$set(this.orderings, propertyName, this.orderings[propertyName] === 'asc' ? 'desc' : 'asc')
            continue
          }

          this.$set(this.orderings, propertyName, 'asc')
        }
      },

      loadPage (page) {
        this.page = page
        this.loadData()
      },

      toggleSelection (id) {
        if (Object.prototype.hasOwnProperty.call(this.selected, id)) {
          this.removeSelection(id)
          return
        }

        this.addSelection(id)
      },

      addSelection (id) {
        this.$set(this.selected, id, true)
      },

      removeSelection (id) {
        this.$delete(this.selected, id)
      },

      onSelectAll (allSelected) {
        const callback = allSelected ? this.addSelection : this.removeSelection
        this.entities.map(entity => callback(entity[this.entityKey]))
        this.$emit('selection-changed', Object.keys(this.selected).length)
      },

      onSelectRow (id) {
        this.toggleSelection(id)
        this.$emit('selection-changed', Object.keys(this.selected).length)
      }
    }
  }
</script>

<style lang="scss">
  @import '../scss/base';

  .entity-table-results,
  .entity-table-header {
    .col {
      align-items: flex-start;
      display: flex;
      flex-direction: column;
      justify-content: center;

      &.flex-row {
        align-items: center;
        justify-content: flex-start;
      }

      &.actions {
        align-items: center;
        flex-direction: row;
        justify-content: flex-end;
      }
    }

    .selection-checkbox {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 2rem;

      label {
        margin-bottom: 0;
      }
    }
  }

  .px-gutter {
    padding-left: $grid-gutter-width / 2 !important;
    padding-right: $grid-gutter-width / 2 !important;
  }
</style>
