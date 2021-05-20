<template>
  <div class="form-group">
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
          @click="$emit('button-action')"
        >
          <!-- Icons are imported globally -->
          <!--suppress HtmlUnknownTag -->
          <c-icon
            class="m-0"
            fill="white"
            :name="iconButton"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EntityTableSearchForm',

    props: {
      label: {
        type: String,
        required: true
      },

      placeholder: {
        type: String,
        default: null
      },

      value: {
        type: String,
        required: true
      },

      iconButton: {
        type: String,
        required: true
      }
    },

    data () {
      return {
        timeout: null
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
        clearTimeout(this.timeout)
        this.timeout = setTimeout(this.search, 300)
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
