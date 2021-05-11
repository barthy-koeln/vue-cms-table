<template
  v-once
  functional
>
  <span v-if="props.entity[props.name]">
    {{ $options.methods.formatDate(props.entity, props.name, props.formatter, parent.defaultDateFormatter) }}
  </span>
</template>

<script>
  export default {
    name: 'EntityTableDateColumn',

    props: {
      name: {
        type: String,
        required: true
      },
      formatter: {
        type: Intl.DateTimeFormat,
        default: null
      },
      entity: {
        type: Object,
        required: true
      }
    },

    methods: {
      formatDate (entity, name, formatter, fallback) {
        const date = new Date(entity[name])

        return (formatter || fallback).format(date)
      }
    }
  }
</script>
