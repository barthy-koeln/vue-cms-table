<template
  v-once
  functional
>
  <div class="action d-inline-flex ml-2">
    <a
      v-c-tooltip="props.tooltip"
      :href="$options.methods.replaceAll(props.path, props.replacements, props.entity)"
      class="btn btn-primary text-nowrap"
      target="_blank"
    >
      <template v-if="props.icon">
        <!-- Icons are imported globally -->
        <!--suppress HtmlUnknownTag -->
        <c-icon
          :name="props.icon"
          fill="white"
        />
      </template>
      <template v-if="props.icon && props.title">&nbsp;</template>
      <template v-if="props.title">
        <span class="d-none d-md-inline">{{ props.title }}</span>
      </template>
    </a>
  </div>
</template>

<script>
  import { replacementMixin } from '../../utils/ReplacementMixin.js'
  import { CTooltip } from '@coreui/vue'

  export default {
    name: 'EntityTableLinkAction',

    directives: {
      cTooltip: CTooltip
    },

    mixins: [
      replacementMixin
    ],

    props: {
      path: {
        type: String,
        required: true
      },
      title: {
        type: String,
        default: null
      },
      tooltip: {
        type: String,
        default: null
      },
      icon: {
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
