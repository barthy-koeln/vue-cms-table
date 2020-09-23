<template v-once
          functional
>
  <div class="icon-wrapper">
    <!-- Icons are imported globally -->
    <!--suppress HtmlUnknownTag -->
    <c-icon :class="props.entity[props.field['name']] === true ? 'icon-success' : 'icon-danger'"
            :name="props.entity[props.field['name']] === true ? 'cil-check' : 'cil-x'"
            size="sm"
    />
  </div>
</template>

<script>
  export default {
    name: 'EntityTableBooleanColumn',

    props: {
      field: {
        type: Object,
        required: true
      },
      entity: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss"
       scoped
>
  .icon-wrapper {
    height: 2rem;
    width: 2rem;
  }
</style>
