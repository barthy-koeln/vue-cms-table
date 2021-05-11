<template
  v-once
  functional
>
  <div
    v-if="props.entity[props.name] && props.map.has(props.entity[props.name])"
  >
    {{ props.map.get(props.entity[props.name]) }}
  </div>
</template>

<script>
  export default {
    name: 'EntityTableMapColumn',

    props: {
      map: {
        type: Map,
        required: true
      },
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
