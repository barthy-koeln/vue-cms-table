<template v-once
          functional
>
  <div class="py-2">
    <template v-for="action in props.field['actions']">
      <template v-if="action['type'] === 'link' && (!action['ifField'] || props.entity[action['ifField']]) && (!action['ifNotField'] || !props.entity[action['ifNotField']])">
        <div class="action d-inline-flex ml-2">
          <a :href="$options.methods.replaceAll(action['path'], action['replacements'], props.entity)"
             class="btn btn-primary"
             target="_blank"
          >
            <!-- Icons are imported globally -->
            <!--suppress HtmlUnknownTag -->
            <c-icon v-if="action['icon']"
                    :name="action['icon']"
                    class="mr-2"
                    fill="white"
            />
            <span class="d-none d-md-inline">{{ action['title'] }}</span>
          </a>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
  import { replacementMixin } from '../../utils/ReplacementMixin.js'

  export default {
    name: 'EntityTableActionColumn',

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
