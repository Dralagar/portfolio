import './assets/main.css'
import './assets/base.css';
import 'aos/dist/aos.css'
import AOS from 'aos'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { 
  faCode, 
  faBlog, 
  faPodcast, 
  faEnvelope 
} from '@fortawesome/free-solid-svg-icons';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Initialize AOS
AOS.init({
  duration: 800,
  once: true,
  offset: 50
})

library.add(
  faCode,
  faBlog,
  faPodcast,
  faEnvelope
);

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
