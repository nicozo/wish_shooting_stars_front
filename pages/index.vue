<template>
  <div>
    <button
      type="button"
      @click="getMessage"
    >
      Get Message
    </button>

    message: {{ message }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  data () {
    return {
      message: ''
    }
  },
  methods: {
    getMessage () {
      this.$axios.$get(
        '/api/v1/hello'
      )
        .then(res => this.message = res)
    }
  }
})
</script>
