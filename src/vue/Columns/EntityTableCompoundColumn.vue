<template v-once
          functional
>
    <span v-if="props.field['names']"
          class="text-break"
          v-html="props.field['names'].map(name => props.entity[name]).join(props.field['separator'])"
    />
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
