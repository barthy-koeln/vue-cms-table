<template
  v-once
  functional
>
  <div
    v-if="props.entity[props.name] && props.map.has(props.entity[props.name])"
    v-c-tooltip="props.tooltipMap ? {content: props.tooltipMap.get(props.entity[props.name]), appendToBody: true} : false"
  >
    {{ props.map.get(props.entity[props.name]) }}
  </div>
</template>

<script>
  import { CTooltip } from '@coreui/vue'

  export default {
    name: 'EntityTableMapColumn',

    directives: {
      cTooltip: CTooltip
    },

    props: {
      map: {
        type: Map,
        required: true
      },

      tooltipMap: {
        type: Map,
        default: null
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
