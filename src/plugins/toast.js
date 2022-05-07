export default {
  install(Vue, options) {
    Vue.prototype.$toast = function (type, text) {
      this.$store.commit('showToast', {type, text});
    }
  }
}
