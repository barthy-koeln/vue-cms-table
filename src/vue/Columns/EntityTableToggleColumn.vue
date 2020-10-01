<template>
  <label
    :class="{loading: loading, checked: checked}"
    class="c-switch c-switch-pill c-switch-lg c-switch-primary my-2"
    @click.prevent.stop="toggleChecked"
  >
    <input
      :checked="checked"
      class="c-switch-input"
      type="checkbox"
    >
    <span class="c-switch-slider">
      <span
        v-if="loading"
        class="spinner-wrapper"
      >
        <c-spinner
          color="dark"
          grow
          size="sm"
        />
      </span>
    </span>
  </label>
</template>

<script>
  import { replacementMixin } from '../../utils/ReplacementMixin.js'
  import { CSpinner } from '@coreui/vue'

  export default {
    name: 'EntityTableToggleColumn',

    components: {
      CSpinner
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
    },

    data () {
      return {
        checked: false,
        loading: false
      }
    },

    mounted () {
      this.checked = this.entity[this.column.name]
    },

    methods: {
      async toggleChecked () {
        this.loading = true
        await this.sendRequest()
        this.loading = false
      },

      async sendRequest () {
        const url = this.replaceAll(this.column.action, this.column.replacements, this.entity)
        const init = Object.assign(
          this.column.requestInit || {},
          {
            method: 'post'
          }
        )

        const response = await fetch(url, init)
        if (!response.ok) {
          const criticalHandler = this.column.critical
          if (typeof criticalHandler !== 'undefined') {
            criticalHandler(response, this.column, this.entity)
          }
          return
        }

        const body = await response.json()
        if (body.status !== 'success') {
          const errorHandler = this.column.error
          if (typeof errorHandler !== 'undefined') {
            errorHandler(body, this.column, this.entity)
          }
          return
        }

        this.checked = body.checked
      }
    }
  }
</script>

<style lang="scss"
       scoped
>
  @import '../../scss/base';

  .c-switch-input {
    pointer-events: none;
  }

  .spinner-wrapper {
    left: 6px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    transition: transform 0.15s ease-out;
  }

  .checked {
    .spinner-wrapper {
      transform: translate(18px, -50%);
    }
  }
</style>
