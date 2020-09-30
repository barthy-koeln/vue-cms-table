<template
  v-once
  functional
>
  <span
    v-if="props.column['names']"
    class="text-break"
  >
    {{
      props.column['names']
        .map(name => props.entity[name])
        .filter(x => x)
        .join(props.column['separator'])
    }}
  </span>
</template>

<script>
  export default {
    name: 'EntityTableCompoundColumn',

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
