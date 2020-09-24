<template>
  <div class="row justify-content-start">
    <div class="form-group mb-0 mb-0 col-12 col-md-6">
      <label for="entity-table-search-form">{{ label }}</label>
      <div class="input-group">
        <input
          id="entity-table-search-form"
          v-model="localState"
          :placeholder="placeholder"
          autocomplete="off"
          class="form-control"
          type="text"
          @keyup.passive="debounceSearch"
        >
        <div class="input-group-append">
          <button
            class="btn btn-primary input-group-addon"
            type="button"
            @click="clear"
          >
            <!-- Icons are imported globally -->
            <!--suppress HtmlUnknownTag -->
            <c-icon
              class="m-0"
              fill="white"
              name="cil-x"
            />
          </button>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
let timeout = null

export default {
  name: 'EntityTableSearchForm',

  props: {
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },

  computed: {
    localState: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },

  methods: {
    debounceSearch () {
      clearTimeout(timeout)
      timeout = setTimeout(this.search, 300)
    },

    search () {
      this.$emit('search')
    },

    clear () {
      this.$emit('input', '')
      this.search()
    }
  }
}
</script>
