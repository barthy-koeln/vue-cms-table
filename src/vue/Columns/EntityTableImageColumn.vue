<template v-once
          functional
>
  <div class="avatar my-3"
  >
    <img :src="props.entity[props.field['name']] ? props.field['processor'].replace('__PATH__', props.entity[props.field['name']]) : props.field['fallback']"
         alt="entity image"
         class="object-center object-cover"
    >
  </div>
</template>

<script>
  export default {
    name: 'EntityTableImageColumn',

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
