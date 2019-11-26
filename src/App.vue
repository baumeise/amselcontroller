<template>
  <div id="app">
    <settings-input-text type="text" name="ip" submitValue="Update IP"></settings-input-text>
    <Controller :direction-value="directionValue" 
                :speed-value="speedValue" />
    Direction {{ directionValue }} <br>
    Speed {{ speedValue }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Controller from './components/Controller.vue'
import SettingsInputText from './components/SettingsInputText.vue'

export default {
  name: 'app',
  components: {
    Controller,
    SettingsInputText
  },
  computed: {
    ...mapGetters([
      'getSpeed',
      'getDirection'
    ]),
    directionValue: function() {
      let val = this.getDirection;
      return parseInt(val);
    },
    speedValue: function() {
      let val = this.getSpeed;
      return parseInt(val);
    }
  },
}
</script>

<style>
body {
  overflow: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
