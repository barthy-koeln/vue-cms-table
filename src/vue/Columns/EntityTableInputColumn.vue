<template>
  <div class="input-group">
    <input
      v-model="value"
      :placeholder="column['title']"
      :title="column['title']"
      autocomplete="off"
      class="form-control text-dark"
      type="text"
    >
    <span class="input-group-append">
      <button
        :class="[{'d-none': buttonDisabled}, `btn-${buttonColor}`]"
        :disabled="buttonDisabled"
        class="btn btn-addon"
        type="button"
        @click="persist"
      >
        <c-spinner
          v-if="loading"
          color="white"
          grow
          tag="span"
          size="sm"
        />
        <!-- Icons are imported globally -->
        <!--suppress HtmlUnknownTag -->
        <c-icon
          v-else
          class="m-0"
          fill="white"
          name="cil-check"
        />
      </button>
    </span>
  </div>
</template>

<script>
  import { replacementMixin } from '../../utils/ReplacementMixin.js'
  import { CSpinner } from '@coreui/vue'

  export default {
    name: 'EntityTableDateColumn',

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
        initialValue: null,
        value: null,
        buttonColor: 'primary',
        loading: false
      }
    },

    computed: {
      buttonDisabled () {
        return this.value === this.initialValue || this.value.length <= 0
      }
    },

    mounted () {
      this.initialValue = this.entity[this.column.name]
      this.value = this.initialValue
    },

    methods: {
      async persist () {
        if (this.value === this.initialValue) {
          return
        }

        this.loading = true
        await this.sendRequest()
        this.loading = false
      },

      async sendRequest () {
        const url = this.replaceAll(this.column.action, this.column.replacements, this.entity)
        const init = Object.assign(
          this.column.requestInit || {},
          {
            method: 'post',
            body: JSON.stringify({
              value: this.value
            })
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

        this.buttonColor = 'success'
        setTimeout(this.reset, 1000)
      },

      reset () {
        this.buttonColor = 'primary'
        this.initialValue = this.value
      }
    }
  }
</script>

<style scoped>
  .btn-addon {
    width: 3rem;
  }
</style>
