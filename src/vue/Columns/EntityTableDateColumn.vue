<template v-once
          functional
>
    <span v-if="props.entity[props.column['name']]">
        {{ $options.methods.formatDate(props.entity, props.column, parent.defaultDateFormatter) }}
    </span>
</template>

<script>
  export default {
    name: 'EntityTableDateColumn',

    props: {
      column:  {
        type:     Object,
        required: true
      },
      entity: {
        type:     Object,
        required: true
      }
    },

    methods: {
      formatDate (entity, column, fallback) {
        const date = new Date(entity[column['name']])
        const formatter = column['formatter']
        if (formatter && formatter instanceof Intl.DateTimeFormat) {
          return formatter.format(date)
        }

        return fallback.format(date)
      }
    }
  }
</script>
