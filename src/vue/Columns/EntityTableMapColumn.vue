<template
  v-once
  functional
>
  <div
    v-if="props.entity[props.column['name']] && props.column['map'].has(props.entity[props.column['name']])"
    v-html="props.column['map'].get(props.entity[props.column['name']])"
  />
</template>

<script>
export default {
  name: 'EntityTableDateColumn',

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
