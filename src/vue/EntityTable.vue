<template>
  <div class="entity-table d-flex flex-column">
    <c-card>
      <c-card-header class="position-sticky sticky-top mb-0 p-0">
        <entity-table-search-form v-model="search"
                                  :label="searchLabel"
                                  :placeholder="searchPlaceholder"
                                  class="p-3"
                                  @search="loadData"
        >
          <slot name="search-form"/>
        </entity-table-search-form>

        <entity-table-header :fields="fields"
                             :orderings="orderings"
                             @header-clicked="headerClicked"
        />
      </c-card-header>

      <entity-table-results :entities="entities"
                            :entity-key="entityKey"
                            :fields="fields"
                            :loading="loading"
      />

      <entity-table-pagination :page="page"
                               :page-count="pageCount"
                               @search="loadPage"
      />
    </c-card>
  </div>
</template>

<script>
  import { CCard, CCardHeader }   from '@coreui/vue'
  import EntityTableSearchForm    from './EntityTableSearchForm.vue'
  import EntityTableHeader        from './EntityTableHeader.vue'
  import EntityTableResults       from './EntityTableResults.vue'
  import EntityTablePagination    from './EntityTablePagination.vue'
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

      fields: {
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
    },

    data () {
      return {
        page: 1,
        pageCount: 0,
        search: '',
        entities: [],
        lastQueryString: '',
        loading: false,
        orderings: {}
      }
    },

    mounted () {
      if (this.defaultOrdering.length === 2) {
        this.$set(this.orderings, this.defaultOrdering[0], this.defaultOrdering[1])
      }
      this.loadData()
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

    methods: {
      getQueryString () {
        const queryData = {
          search: this.search,
          page: this.page,
          filters: this.filters,
          orderings: this.orderings
        }

        return serializeQueryString(Object.assign(queryData, this.extraQueryData))
      },

      async loadData () {
        const queryString = this.getQueryString()

        if (this.lastQueryString === queryString) {
          return
        }

        this.loading   = true
        const response = await fetch(`${this.searchPath}?${queryString}`)
        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        const body     = await response.json()
        this.page      = body.page
        this.pageCount = body.pageCount
        this.entities  = body.entities

        this.lastQueryString = queryString
        this.loading         = false
      },

      headerClicked (fieldName) {
        if (this.fields[fieldName]['sortable'] === false) {
          return
        }

        for (const [currentFieldName] of Object.entries(this.orderings)) {
          if (fieldName === currentFieldName) {
            continue
          }

          this.$delete(this.orderings, currentFieldName)
        }

        if (fieldName in this.orderings) {
          this.$set(this.orderings, fieldName, this.orderings[fieldName] === 'asc' ? 'desc' : 'asc')
          return
        }

        this.$set(this.orderings, fieldName, 'asc')
      },

      loadPage (page) {
        this.page = page
        this.loadData()
      }
    }
  }
</script>

<style lang="scss">
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
  }
</style>
