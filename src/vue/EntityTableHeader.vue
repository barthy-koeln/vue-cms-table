<template>
  <div class="row bg-dark text-light entity-table-header p-3 m-0">
    <template v-for="field in fields">
      <div :key="field['title']"
           :class="[field['type'], ...field['classes']]"
           class="col column-header flex-row"
           @click="$emit('header-clicked', field['name'])"
      >
        <strong>{{ field['title'] }}</strong>
        <div v-if="field['name'] in orderings"
             class="icon-wrapper"
        >
          <!-- Icons are imported globally -->
          <!--suppress HtmlUnknownTag -->
          <c-icon :name="orderings[field['name']] === 'asc' ? 'cil-sort-ascending' : 'cil-sort-descending'"
                  class="icon icon-light"
                  size="md"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'EntityTableHeader',

    props: {
      fields: {
        type: Array,
        required: true
      },
      orderings: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss"
       scoped
>
  .column-header {
    cursor: pointer;
  }

  .icon-wrapper {
    height: 24px;
    margin-left: 24px;
    width: 1rem;
  }
</style>
