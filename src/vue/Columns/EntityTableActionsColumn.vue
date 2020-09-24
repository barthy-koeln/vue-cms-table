<template
  v-once
  functional
>
  <div class="py-2">
    <template v-for="action in props.column['actions']">
      <component
        :is="$options.components[`entity-table-${action['type']}-action`]"
        v-if="!action['condition'] || (typeof action['condition'] === 'function' && action['condition'](props.entity))"
        :key="action['title']"
        :action="action"
        :entity="props.entity"
      />
    </template>
  </div>
</template>

<script>
import { replacementMixin } from '../../utils/ReplacementMixin.js'
import EntityTableLinkAction from '../Actions/EntityTableLinkAction'
import EntityTableButtonAction from '../Actions/EntityTableButtonAction'

export default {
  name: 'EntityTableActionsColumn',

  components: {
    'entity-table-link-action': EntityTableLinkAction,
    'entity-table-button-action': EntityTableButtonAction
  },

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
