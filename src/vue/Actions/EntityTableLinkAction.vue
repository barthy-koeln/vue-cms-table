<template v-once
          functional
>
  <div class="action d-inline-flex ml-2">
    <a :href="$options.methods.replaceAll(props.action['path'], props.action['replacements'], props.entity)"
       class="btn btn-primary"
       target="_blank"
    >
      <!-- Icons are imported globally -->
      <!--suppress HtmlUnknownTag -->
      <c-icon v-if="props.action['icon']"
              :name="props.action['icon']"
              class="mr-2"
              fill="white"
      />
      <span class="d-none d-md-inline">{{ props.action['title'] }}</span>
    </a>
  </div>
</template>

<script>
  import {replacementMixin} from '../../utils/ReplacementMixin.js'

  export default {
    name: 'entity-table-link-action',

    mixins: [
      replacementMixin
    ],

    props: {
      action:  {
        type:     Object,
        required: true
      },
      entity: {
        type:     Object,
        required: true
      }
    }
  }
</script>