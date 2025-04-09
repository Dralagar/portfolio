<template>
  <div class="podcast-page">
    <PodcastSection />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faPlay, 
  faPause, 
  faClock, 
  faCalendar, 
  faSpinner, 
  faTimes, 
  faImage, 
  faPaperPlane, 
  faReply,
  faMicrophone,
  faVolumeUp,
  faVolumeMute,
  faForward,
  faBackward,
  faStepForward,
  faStepBackward
} from '@fortawesome/free-solid-svg-icons';
import { 
  faTwitter, 
  faLinkedin, 
  faYoutube, 
  faInstagram,
  faSpotify,
  faApple,
  faSoundcloud,
  faGooglePlay
} from '@fortawesome/free-brands-svg-icons';
import PodcastSection from '@/components/PodcastSection.vue';

library.add(
  faPlay,
  faPause,
  faClock,
  faCalendar,
  faSpinner,
  faTimes,
  faImage,
  faPaperPlane,
  faReply,
  faMicrophone,
  faVolumeUp,
  faVolumeMute,
  faForward,
  faBackward,
  faStepForward,
  faStepBackward,
  faTwitter,
  faLinkedin,
  faYoutube,
  faInstagram,
  faSpotify,
  faApple,
  faSoundcloud,
  faGooglePlay
);

export default defineComponent({
  name: 'PodcastView',
  components: {
    PodcastSection
  }
});
</script>

<style scoped>
.podcast-page {
  min-height: 100vh;
  padding-top: 80px; /* Account for fixed header */
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
  z-index: 1;
}

/* Ensure proper scrolling behavior */
.podcast-page :deep(section) {
  scroll-margin-top: 80px;
  min-height: 100vh;
}
</style> 