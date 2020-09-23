<template>
  <c-pagination :activePage="page"
                :limit="5"
                :pages="pageCount"
                align="center"
                dots
                doubleArrows
                responsive
                @update:activePage="changePage"
  />
</template>

<script>
  import {CPagination} from '@coreui/vue'

  export default {
    name: 'EntityTablePagination',

    components: {
      CPagination
    },

    props: {
      pageCount: {
        type:     Number,
        required: true
      },

      page: {
        type:     Number,
        required: true
      }
    },

    methods: {
      changePage (value) {
        this.$emit('search', value)
      }
    }
  }
</script>
