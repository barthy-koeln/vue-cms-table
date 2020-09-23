<template v-once
          functional
>
  <div v-if="props.entity[props.column['name']] || props.column['fallback']"
       class="avatar my-3"
  >
    <img :src="$options.methods.getImageUrl(props.column, props.entity)"
         alt="entity image"
         class="object-center object-cover"
    >
  </div>
</template>

<script>
  import {replacementMixin} from '../../utils/ReplacementMixin';

  export default {
    name: 'EntityTableImageColumn',

    props: {
      column:  {
        type:     Object,
        required: true
      },
      entity: {
        type:     Object,
        required: true
      }
    },

    methods: {
      getImageUrl(column, entity) {
        const propertyValue = props.entity[props.column['name']]

        if(propertyValue){
          return replacementMixin.methods.replaceAll(column['path'], column['replacements'], entity);
        }

        return props.column['fallback'];
      }
    }
  }
</script>

<style lang="scss"
       scoped
>
  @import '../../scss/base';

  .avatar {
    @include border-radius();

    height: 0;
    overflow: hidden;
    padding-bottom: 100%;
    position: relative;
    width: 100%;

    .object-cover {
      left: 0;
      position: absolute;
      top: 0;
    }
  }
</style>
