<template
  v-once
  functional
>
  <span
    v-if="props.entity[props.name]"
    v-c-tooltip="props.tooltipName ? {content: props.entity[props.tooltipName], appendToBody: true} : false"
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
  import { CTooltip } from '@coreui/vue'

  export default {
    name: 'EntityTableStringColumn',

    directives: {
      CTooltip
    },

    props: {
      name: {
        type: String,
        required: true
      },

      tooltipName: {
        type: String,
        default: null
      },

      entity: {
        type: Object,
        required: true
      }
    }
  }
</script>
