<template>
  <div class="input-group">
    <label class="col-form-label w-100">
      <input v-model="value"
             :placeholder="column['title']"
             autocomplete="off"
             class="form-control text-dark"
             type="text"
      >
    </label>
    <div class="input-group-append">
      <button :class="[{'d-none': buttonDisabled}, `btn-${buttonColor}`]"
              :disabled="buttonDisabled"
              class="btn btn-primary input-group-addon"
              type="button"
              @click="persist"
      >
        <!-- Icons are imported globally -->
        <!--suppress HtmlUnknownTag -->
        <c-icon class="m-0"
                fill="white"
                name="cil-check"
        />
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EntityTableDateColumn',

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

    data () {
      return {
        initialValue: null,
        value:        null,
        buttonColor:  'primary'
      }
    },

    mounted () {
      this.initialValue = this.entity[this.column['name']]
      this.value = this.initialValue
    },

    methods: {
      async persist () {
        if (this.value === this.initialValue) {
          return
        }

        const url = this.replaceAll(this.column['action'], this.column['replacements'], this.entity)
        const init = Object.assign(
            this.column['requestInit'] || {},
            {
              method: 'post',
              body:   JSON.stringify({
                value: this.value
              })
            }
        )

        const response = await fetch(url, init)
        if (!response.ok) {
          const criticalHandler = this.column['critical']
          if (typeof criticalHandler !== 'undefined') {
            criticalHandler(response, this.column, this.entity)
          }
          return
        }

        const body = await response.json()
        if (body.status !== 'success') {
          const errorHandler = this.column['error']
          if (typeof errorHandler !== 'undefined') {
            errorHandler(body, this.column, this.entity)
          }
          return
        }

        this.buttonColor = 'success'
        setTimeout(() => {
          this.buttonColor = 'primary'
          this.initialValue = this.value
        }, 1000)
      }
    },

    computed: {
      buttonDisabled () {
        return this.value === this.initialValue || this.value.length <= 0
      }
    }
  }
</script>
