<template>
  <div class="controller">
    <input type="range" 
           min="-50" max="50" 
           step="1"
           :value="directionValue" 
           class="slider" 
           id="slider-direction">
    <input type="range" 
           min="-50" max="50" 
           step="10"
           :value="speedValue" 
           class="slider" 
           id="slider-speed">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../store'

export default {
  name: 'controller',
  props: {
    directionValue: Number,
    speedValue: Number,
    val: Number
  },
  computed: {
    ...mapGetters([
      'getSpeed',
      'getDirection',
      'getIP'
    ]),
  },
  methods: {
    registerEventListeners() {
      var component = this;
      var direction = document.getElementById('slider-direction');
      var speed = document.getElementById('slider-speed');

      direction.oninput = function(event) {
        let value = event.target.value
        store.commit('changeDirection', value);
        component.sendControllerData();
      }
      speed.oninput = function(event) {
        let value = event.target.value
        store.commit('changeSpeed', value);
        component.sendControllerData();
      }
    },
    sendControllerData: async function() {
      let normalisedSpeedValue = (this.getSpeed / 50);

      let normalisedDirectionValue = (this.getDirection / 50) * 100;
      let left = normalisedDirectionValue > 0 ? 1 : 1 + (normalisedDirectionValue / 100);
      let right = normalisedDirectionValue < 0 ? 1 : 1 - (normalisedDirectionValue / 100);
      
      // eslint-disable-next-line
      console.log(' l' + left + ' r' + right + ' s' + normalisedSpeedValue);
      let response = await fetch('http://' + this.getIP + '/steer?l=' 
                                + left + '&r=' 
                                + right + '&s=' 
                                + normalisedSpeedValue);

      // eslint-disable-next-line
      console.log(response);
    }
  },
  mounted() {
    this.registerEventListeners();
  }
}
</script>

<style scoped>
.controller {
  position: relative;
  top: 50vh;
  transform: translateY(-50%);
}

.slider {
  -webkit-appearance: none;
  height: 10px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px; 
  border-radius: 10px;
  background: #4CAF50;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  appearance: none;
  width: 20px; 
  height: 20px; 
  border-radius: 10px;
  background: #4CAF50; 
  cursor: pointer; 
}

#slider-direction {
  width: 200px;
}

#slider-speed {
  width: 100px;
  transform: rotate(-90deg);
}

</style>