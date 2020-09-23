<template v-once
          functional
>
    <span v-if="props.entity[props.field['name']] && props.field['map'].has(props.entity[props.field['name']])">
        {{ props.field['map'].get(props.entity[props.field['name']]) }}
    </span>
</template>

<script>
  export default {
    name: 'EntityTableDateColumn',

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
