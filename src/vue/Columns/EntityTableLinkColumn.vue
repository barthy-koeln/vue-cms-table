<template
  v-once
  functional
>
  <a
    :href="$options.methods.replaceAll(props.column['path'], props.column['replacements'], props.entity)"
    target="_blank"
  >
    {{ props.entity[props.column['name']] }}
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
