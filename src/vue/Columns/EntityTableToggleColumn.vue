<template v-once>
  <c-switch
    :checked.sync="checked"
    class="my-2"
    color="primary"
    shape="pill"
    size="lg"
    @update:checked="toggleChecked"
  />
</template>

<script>
  import { CSwitch } from '@coreui/vue'
  import { replacementMixin } from '../../utils/ReplacementMixin.js'

  export default {
    name: 'EntityTableToggleColumn',

    components: {
      CSwitch
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
        checked: false
      }
    },

    mounted () {
      this.checked = this.entity[this.column.name]
    },

    methods: {
      async toggleChecked (checked) {
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

          this.checked = !checked
          return
        }

        const body = await response.json()
        if (body.status !== 'success') {
          const errorHandler = this.column.error
          if (typeof errorHandler !== 'undefined') {
            errorHandler(body, this.column, this.entity)
          }

          this.checked = !checked
          return
        }

        this.checked = body.checked
      }
    }
  }
</script>

<style scoped>

</style>
