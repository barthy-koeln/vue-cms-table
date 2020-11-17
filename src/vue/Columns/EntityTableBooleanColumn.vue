<template
  v-once
  functional
>
  <!-- Icons are imported globally -->
  <!--suppress HtmlUnknownTag -->
  <c-icon
    :class="!!props.entity[props.column['name']] === true ? 'icon-success' : 'icon-danger'"
    :name="!!props.entity[props.column['name']] === true ? 'cil-check' : 'cil-x'"
    size="xl"
  />
</template>

<script>
  export default {
    name: 'EntityTableBooleanColumn',

    props: {
      column: {
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
