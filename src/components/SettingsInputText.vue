<template>
  <form class="settings-input-text" @submit="submitForm">
    <input :type="type" :name="name" v-model="value"/>
    <input type="submit" :value="submitValue" />
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../store'

export default {
  name: "settings-input-text",
  props: {
    type: String,
    name: String,
    submitValue: String,
  },
  data() {
    return {
      value: this.getIP
    }
  },
  computed: {
    ...mapGetters([
      'getIP'
    ])
  },
  methods: {
    submitForm(event) {
      store.commit('changeIP', this.value);
      // eslint-disable-next-line
      console.log(this);
      // store.commit(change)
      event.preventDefault();
    }
  }
}
</script>

<style scoped>

</style>