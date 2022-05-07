import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        secondary: '#C4C4C4',
        primary: '#004976',
        accent1: '#454747',
      }
    }
  }
});
