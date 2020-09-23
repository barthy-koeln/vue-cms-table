<template>
  <div class="input-group">
    <label class="col-form-label w-100">
      <input v-model="value"
             :placeholder="field['title']"
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
        initialValue: null,
        value: null,
        buttonColor: 'primary'
      }
    },

    mounted () {
      this.initialValue = this.entity[this.field['name']]
      this.value        = this.initialValue
    },

    methods: {
      async persist () {
        if (this.value === this.initialValue) {
          return
        }

        const url = this.replaceAll(this.field['action'], this.field['replacements'], this.entity)

        console.info(JSON.stringify({
          value: this.value
        }))

        const response = await fetch(url, {
          method: 'post',
          body: JSON.stringify({
            value: this.value
          })
        })

        if (response.status !== 200) {
          console.error(`[${response.status}] ${response.statusText}`)
          // TODO error toast
          return
        }

        const body = await response.json()
        if (body.status !== 'success') {
          console.error(`[${body.status}] ${body.reason}`)
          // TODO error toast
          return
        }

        this.buttonColor = 'success'
        setTimeout(() => {
          this.buttonColor  = 'primary'
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
