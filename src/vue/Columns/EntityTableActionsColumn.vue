<template
  v-once
  functional
>
  <div class="entityTableActionsColumn py-2">
    <template v-for="action in props.actions">
      <component
        :is="typeof action['type'] === 'string' ? $options.components[`entity-table-${action['type']}-action`] : action['type']"
        v-if="!action['condition'] || (typeof action['condition'] === 'function' && action['condition'](props.entity))"
        :key="action['title']"
        v-bind="action"
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
      actions: {
        type: Array,
        required: true
      },
      entity: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss">
  @import '../../scss/base';

  .entityTableActionsColumn {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: map-get($spacers, 2);
    justify-content: flex-end;
  }
</style>
