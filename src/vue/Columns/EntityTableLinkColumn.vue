<template v-once
          functional
>
  <a :href="$options.methods.replaceAll(props.field['path'], props.field['replacements'], props.entity)"
     target="_blank"
  >
    {{ props.entity[props.field['name']] }}
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
