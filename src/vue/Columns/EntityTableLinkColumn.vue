<template
  v-once
  functional
>
  <a
    :href="$options.methods.replaceAll(props.path, props.replacements, props.entity)"
    target="_blank"
  >
    {{ props.entity[props.name] }}
  </a>
</template>

<script>
  import { replacementMixin } from '../../utils/ReplacementMixin.js'

  export default {
    name: 'EntityTableLinkColumn',

    mixins: [
      replacementMixin
    ],

    props: {
      name: {
        type: String,
        required: true
      },
      path: {
        type: String,
        required: true
      },
      replacements: {
        type: Map,
        required: true
      },
      entity: {
        type: Object,
        required: true
      }
    }
  }
</script>
