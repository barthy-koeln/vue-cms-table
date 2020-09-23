<template v-once
          functional
>
    <span v-if="props.column['names']"
          class="text-break"
          v-html="props.column['names'].map(name => props.entity[name]).join(props.column['separator'])"
    />
</template>

<script>
  export default {
    name: 'EntityTableStringColumn',

    props: {
      column:  {
        type:     Object,
        required: true
      },
      entity: {
        type:     Object,
        required: true
      }
    }
  }
</script>
