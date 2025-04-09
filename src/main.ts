import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faCode, 
  faBlog, 
  faMicrophone, 
  faEnvelope,
  faCalendar,
  faClock,
  faEye,
  faArrowUp,
  faArrowDown,
  faCoins,
  faCrown,
  faThumbsUp,
  faFlag,
  faStar,
  faImage,
  faPaperPlane,
  faReply,
  faChartLine,
  faSpinner,
  faCheckCircle,
  faPalette,
  faServer,
  faMobileAlt,
  faDatabase,
  faCloud,
  faArrowRight,
  faLock
} from '@fortawesome/free-solid-svg-icons'
import { 
  faGithub,
  faLinkedin,
  faTwitter,
  faInstagram
} from '@fortawesome/free-brands-svg-icons'

// Add all icons to the library
library.add(
  faCode,
  faBlog,
  faMicrophone,
  faEnvelope,
  faCalendar,
  faClock,
  faEye,
  faArrowUp,
  faArrowDown,
  faCoins,
  faCrown,
  faThumbsUp,
  faFlag,
  faStar,
  faImage,
  faPaperPlane,
  faReply,
  faChartLine,
  faSpinner,
  faCheckCircle,
  faPalette,
  faServer,
  faMobileAlt,
  faDatabase,
  faCloud,
  faArrowRight,
  faLock,
  faGithub,
  faLinkedin,
  faTwitter,
  faInstagram
)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app') 