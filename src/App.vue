<template>
  <div id="app">
    <navigation></navigation>
    <Controller :direction-value="directionValue" 
                :speed-value="speedValue" />
    <div class="stats">
      <div>
        Direction <br> 
        {{ directionValue }}
      </div>
      <div>
        Speed <br> 
        {{ speedValue }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navigation from './components/Navigation'
import Controller from './components/Controller'

export default {
  name: 'app',
  components: {
    Navigation,
    Controller
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
  padding: 0;
  margin: 0;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.stats {
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
}

</style>
