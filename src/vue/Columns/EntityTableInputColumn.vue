<template>
  <div class="input-group">
    <input
      v-model="value"
      :placeholder="title"
      :title="title"
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
    name: 'EntityTableInputColumn',

    components: {
      CSpinner
    },

    mixins: [
      replacementMixin
    ],

    props: {
      name: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      action: {
        type: String,
        required: true
      },
      requestInit: {
        type: Object,
        default: null
      },
      replacements: {
        type: Map,
        required: true
      },
      error: {
        type: Function,
        default: null
      },
      critical: {
        type: Function,
        default: null
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
      this.initialValue = this.entity[this.name]
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
        const url = this.replaceAll(this.action, this.replacements, this.entity)
        const init = Object.assign(
          this.requestInit || {},
          {
            method: 'post',
            body: JSON.stringify({
              value: this.value
            })
          }
        )

        const response = await fetch(url, init)
        if (!response.ok) {
          if (this.critical) {
            this.critical(response, this.entity)
          }

          return
        }

        const body = await response.json()
        if (body.status !== 'success') {
          if (this.error) {
            this.error(body, this.entity)
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
