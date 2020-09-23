<template v-once>
  <c-switch :checked.sync="checked"
            class="my-2"
            color="primary"
            shape="pill"
            size="lg"
            @update:checked="toggleChecked"
  />
</template>

<script>
  import { CSwitch }          from '@coreui/vue'
  import { replacementMixin } from '../../utils/ReplacementMixin.js'

  export default {
    name: 'EntityTableToggleColumn',

    mixins: [
      replacementMixin
    ],

    components: {
      CSwitch
    },

    props: {
      field: {
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
      this.checked = this.entity[this.field['name']]
    },

    methods: {
      async toggleChecked (checked) {
        const url = this.replaceAll(this.field['action'], this.field['replacements'], this.entity)

        const response = await fetch(url)
        if (response.status !== 200) {
          console.error(`[${response.status}] ${response.statusText}`)
          // TODO error toast
          this.checked = !checked
          return
        }

        const body = await response.json()
        if (body.status !== 'success') {
          console.error(`[${body.status}] ${body.reason}`)
          // TODO error toast
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
