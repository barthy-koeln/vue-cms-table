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
          <slot name="search-form" />
        </entity-table-search-form>

        <entity-table-header
          :columns="columns"
          :orderings="orderings"
          @header-clicked="headerClicked"
        />
      </c-card-header>

      <entity-table-results
        :columns="columns"
        :entities="entities"
        :entity-key="entityKey"
        :loading="loading"
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
      type: Object,
      default () {
        return {}
      }
    }
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

  beforeMount () {
    if (this.defaultOrdering.length === 2) {
      // do not trigger watcher here
      this.$set(this.orderings, this.defaultOrdering[0], this.defaultOrdering[1])
    }
  },

  mounted () {
    if (!this.loading) {
      this.loadData()
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

      return serializeQueryString(queryData)
    },

    async loadData () {
      const queryString = this.getQueryString()

      if (this.lastQueryString === queryString) {
        return
      }

      this.loading = true
      const response = await fetch(`${this.searchPath}?${queryString}`, this.requestInit)
      if (response.status !== 200) {
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
        if (this.orderings.hasOwnProperty(propertyName)) {
          this.$set(this.orderings, propertyName, this.orderings[propertyName] === 'asc' ? 'desc' : 'asc')
          continue
        }

        this.$set(this.orderings, propertyName, 'asc')
      }
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
