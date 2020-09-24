<template
  v-once
  functional
>
  <span
    v-if="props.entity[props.column['name']]"
    class="text-break py-2"
  >
    {{
      props.entity[props.column['name']] instanceof Array
        ? props.entity[props.column['name']].join(', ')
        : props.entity[props.column['name']]
    }}
  </span>
</template>

<script>
  export default {
    name: 'EntityTableStringColumn',

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
