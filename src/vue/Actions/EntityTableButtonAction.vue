<template
  v-once
  functional
>
  <div class="action d-inline-flex ml-2">
    <button
      :href="$options.methods.replaceAll(props.path, props.replacements, props.entity)"
      class="btn btn-primary"
      type="button"
      @click="event => props.click(props.entity, event)"
    >
      <!-- Icons are imported globally -->
      <!--suppress HtmlUnknownTag -->
      <c-icon
        v-if="props.icon"
        :name="props.icon"
        class="mr-2"
        fill="white"
      />

      <span class="d-none d-md-inline">{{ props.title }}</span>
    </button>
  </div>
</template>

<script>
  import { replacementMixin } from '../../utils/ReplacementMixin.js'

  export default {
    name: 'EntityTableButtonAction',

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
        required: true
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
