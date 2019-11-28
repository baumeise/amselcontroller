<template>
  <nav class="navigation">
    <img class="logo"
         src="../assets/logo.svg"
         alt="Amsel">
    <slot></slot>
    <div class="ip_input">
      <form class="ip_input_form" @submit.prevent>
        <input v-model="value"
               :class="{ 'input_empty' : !this.value, 
                         'input_connected' : status == 'connected',
                         'input_error' : status == 'error' }" 
               type="text" name="ip" 
               placeholder="Your Amsels adress" />
        <div :class="status">
        </div>
      </form>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import { debounce } from 'lodash'

export default {
  name: 'navigation',
  data() {
    return {
      value: ''
    }
  },
  computed: {
    status () {
      return this.getConnectionStatus
    },
    ...mapGetters([
      'getIP',
      'getConnectionStatus'
    ])
  },
  watch: {
    value: function() {
      this.value
      ? this.setStatus('pending')
      : this.setStatus('undefined')
      this.validateConnection();
    }
  },
  methods: {
    setIP() {
      this.$store.commit('changeIP', this.value)
    },
    setStatus(payload) {
      this.$store.commit('changeConnectionStatus', payload)
    },
    makeRequest: function() {
      let vue = this;
      fetch('http://' + this.value + '/steer')
        .then((response) => {
          if (response) {
            vue.setStatus('connected');
            vue.setIP();
          }
        })
        .catch((error) => {
          vue.setStatus('error');
          // eslint-disable-next-line
          console.error(error + '\n\nA M S E L\nMake sure your Amsels address is correct and is reachable within your network.\n\nFor more information visit https://moritzgvt.github.io/amsel/ \n ');
        })
    },
    validateConnection: debounce( function () { 
      this.value 
        ? this.makeRequest() 
        : this.setStatus(undefined)
    }, 700),
  }
}
</script>

<style scoped>
.navigation {
  width: 100%;
  height: 3.6rem;
  box-sizing: border-box;
  padding: 0.7rem 1.5rem;
  line-height: 2.2rem;
  background: linear-gradient(90deg, rgba(0,43,80,1) 10%, rgba(0,125,121,1) 90%);
}

.logo {
  position: absolute;
  left: 1.5rem;
  height: 2.2rem;
}

.ip_input {
  position: absolute;
  right: 1.5rem;
}

.ip_input_form input[type=text] {
  position: relative;
  appearance: none;
  width: 160px;
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
  padding: 0 15px 0 30px;
  border: 1px solid #f3f3f3;
  color: #f3f3f3;
  font-size: 14px;
  outline: none;
  border-radius: 15px;
  margin-right: 10px;
  background-color: transparent;
  vertical-align: middle !important;
  transition: border-color 0.2s ease;
  cursor: text;
  z-index: 95;
}

.ip_input_form input[type=text]::placeholder {
  color: #f3f3f3;
  opacity: 0.6;
}

.ip_input_form input[type=text]:-webkit-autofill,
.ip_input_form input[type=text]:-webkit-autofill:hover, 
.ip_input_form input[type=text]:-webkit-autofill:focus, 
.ip_input_form input[type=text]:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0px 1000px #007d79 inset;
  -webkit-text-fill-color: #f3f3f3;
}

.input_connected {
  border: 1px solid #4CAF50 !important;
}

.input_error {
  border: 1px solid #da1e28 !important;
}

.input_empty {
  padding-left: 15px !important;
}

.connected {
  position: relative;
  top: -21px;
  margin-left: 11px;
  width: 14px;
  height: 14px;
  background: url(../assets/tick.svg) no-repeat;
  background-size: 14px;
  z-index: 96;
}

.pending {
  position: relative;
  top: -23px;
  margin-left: 10px;
  width: 14px;
  height: 14px;
  background: url(../assets/loader.svg) no-repeat;
  background-size: 14px;
  animation: rotate linear 1s infinite;
  z-index: 96;
}

.error {
  position: relative;
  top: -23px;
  margin-left: 10px;
  width: 14px;
  height: 14px;
  background: url(../assets/alert.svg) no-repeat;
  background-size: 14px;
  z-index: 96;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>