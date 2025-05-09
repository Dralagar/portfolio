<template>
  <div class="podcast-page">
    <div v-if="isLoading" class="loading-state">
      <font-awesome-icon icon="spinner" spin />
      <p>Loading podcasts...</p>
    </div>
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
    </div>
    <PodcastSection v-else :episodes="episodes" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
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
import { YouTubeService, YouTubeVideo } from '@/services/youtube';

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
  },
  setup() {
    const episodes = ref<YouTubeVideo[]>([]);
    const isLoading = ref(true);
    const error = ref<string | null>(null);

    const fetchPodcasts = async () => {
      try {
        isLoading.value = true;
        error.value = null;
        const youtubeService = new YouTubeService(
          import.meta.env.VITE_YOUTUBE_API_KEY,
          import.meta.env.VITE_YOUTUBE_CHANNEL_ID
        );
        const fetchedEpisodes = await youtubeService.getPodcastEpisodes(10);
        episodes.value = fetchedEpisodes;
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to fetch podcasts';
        console.error('Error fetching podcasts:', err);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(fetchPodcasts);

    return {
      episodes,
      isLoading,
      error
    };
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

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px);
  gap: 1rem;
  font-size: 1.2rem;
  color: var(--text-secondary);
}

.error-state {
  color: var(--error);
}

/* Ensure proper scrolling behavior */
.podcast-page :deep(section) {
  scroll-margin-top: 80px;
  min-height: 100vh;
}
</style> 