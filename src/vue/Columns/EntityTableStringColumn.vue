<template
  v-once
  functional
>
  <span
    v-if="props.entity[props.name]"
    class="py-2"
  >
    {{
      props.entity[props.name] instanceof Array
        ? props.entity[props.name].join(', ')
        : props.entity[props.name]
    }}
  </span>
</template>

<script>
  export default {
    name: 'EntityTableStringColumn',

    props: {
      name: {
        type: String,
        required: true
      },
      entity: {
        type: Object,
        required: true
      }
    }
  }
</script>
