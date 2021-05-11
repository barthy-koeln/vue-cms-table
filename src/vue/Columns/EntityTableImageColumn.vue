<template
  v-once
  functional
>
  <div
    v-if="props.entity[props.name] || props.fallback"
    class="avatar my-3"
  >
    <img
      :src="$options.methods.getImageUrl(props.path, props.replacements, props.fallback, props.entity)"
      alt="entity image"
      class="object-center object-cover"
      @error="event => event.target.src = props.fallback"
    >
  </div>
</template>

<script>
  import { replacementMixin } from '../../utils/ReplacementMixin'

  export default {
    name: 'EntityTableImageColumn',

    props: {
      name: {
        type: String,
        required: true
      },
      fallback: {
        type: String,
        default: null
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
    },

    methods: {
      getImageUrl (path, replacements, fallback, entity) {
        try {
          return replacementMixin.methods.replaceAll(path, replacements, entity)
        } catch (error) {
          return fallback
        }
      }
    }
  }
</script>

<style
  lang="scss"
  scoped
>
  @import '../../scss/base';

  .avatar {
    height: 0;
    overflow: hidden;
    padding-bottom: 100%;
    position: relative;
    width: 100%;

    @include border-radius();

    .object-cover {
      left: 0;
      position: absolute;
      top: 0;
    }
  }
</style>
