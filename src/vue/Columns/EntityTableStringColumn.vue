<template v-once
          functional
>
    <span v-if="props.entity[props.field['name']]"
          class="text-break py-2"
    >
      {{
        props.entity[props.field['name']] instanceof Array
            ? props.entity[props.field['name']].join(', ')
            : props.entity[props.field['name']]
      }}
    </span>
</template>

<script>
  export default {
    name: 'EntityTableStringColumn',

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
