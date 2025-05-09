<template>
  <section class="podcast-section" id="podcast">
    <div class="container">
      <h2 class="section-title animate-fade-in">
        <span class="highlight">Digital</span> Conversations
      </h2>
      <p class="section-subtitle animate-fade-in-delay">Exploring Technology, Innovation & Social Impact</p>
      
      <div class="podcast-grid">
        <div class="podcast-block featured-episode animate-slide-up">
          <div class="episode-badge">Latest Episode</div>
          <div class="video-container">
            <iframe
              v-if="isPlaying && videoSrc"
              :src="videoSrc"
              class="podcast-video"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <div v-else class="video-overlay" @click="playVideo">
              <img :src="thumbnailUrl" :alt="currentEpisode?.title" class="thumbnail-preview">
              <button class="play-btn">
                <font-awesome-icon icon="play" />
              </button>
            </div>
          </div>
          <div v-if="currentEpisode" class="episode-info">
            <h3 class="episode-title">{{ currentEpisode.title }}</h3>
            <p class="episode-description">{{ currentEpisode.description }}</p>
            <div class="episode-meta">
              <span class="meta-item"><font-awesome-icon icon="clock" /> {{ currentEpisode.duration }}</span>
              <span class="meta-item"><font-awesome-icon icon="calendar" /> {{ formatDate(currentEpisode.publishedAt) }}</span>
            </div>
            <div class="episode-stats">
              <span class="stat"><font-awesome-icon icon="eye" /> {{ currentEpisode.viewCount }}</span>
              <span class="stat"><font-awesome-icon icon="thumbs-up" /> {{ currentEpisode.likeCount }}</span>
            </div>
          </div>
          <div v-else class="episode-info loading">
            <div class="skeleton-loader"></div>
          </div>
        </div>
      </div>

      <div class="podcast-content">
        <div class="podcast-tabs">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            :class="['tab-btn', { active: activeTab === tab.id }]"
            @click="switchTab(tab.id)"
          >
            {{ tab.name }}
          </button>
        </div>

        <transition name="fade" mode="out-in">
          <div class="tab-content">
            <!-- Episodes List -->
            <div v-if="activeTab === 'audio'" class="episodes-list">
              <div 
                v-for="episode in audioEpisodes" 
                :key="episode._id"
                class="episode-card"
                :class="{ 'playing': currentEpisode?.id === episode._id }"
                @click="selectEpisode(episode)"
              >
                <div class="episode-thumbnail">
                  <img :src="episode.thumbnail" :alt="episode.title">
                  <button class="mini-play-btn">
                    <font-awesome-icon :icon="currentEpisode?.id === episode._id ? 'pause' : 'play'" />
                  </button>
                </div>
                <div class="episode-details">
                  <h4>{{ episode.title }}</h4>
                  <p>{{ episode.description }}</p>
                  <div class="episode-tags">
                    <span v-for="tag in episode.tags" :key="tag" class="tag">
                      #{{ tag }}
                    </span>
                  </div>
                  <div class="episode-stats">
                    <span class="stat"><font-awesome-icon icon="eye" /> {{ episode.views }}</span>
                    <span class="stat"><font-awesome-icon icon="thumbs-up" /> {{ episode.likes }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Platforms List -->
            <div v-if="activeTab === 'platforms'" class="platforms-grid">
              <a 
                v-for="platform in platforms" 
                :key="platform.name"
                :href="platform.link"
                class="platform-card"
                target="_blank"
                @mouseenter="handlePlatformHover(platform)"
              >
                <img :src="platform.icon" :alt="platform.name">
                <span>{{ platform.name }}</span>
              </a>
            </div>
          </div>
        </transition>
      </div>

      <div class="podcast-stats">
        <div class="stat-item animate-count">
          <span class="stat-number">{{ stats.episodes }}+</span>
          <span class="stat-label">Episodes</span>
        </div>
        <div class="stat-item animate-count">
          <span class="stat-number">{{ stats.listeners }}k</span>
          <span class="stat-label">Monthly Listeners</span>
        </div>
        <div class="stat-item animate-count">
          <span class="stat-number">{{ stats.countries }}+</span>
          <span class="stat-label">Countries</span>
        </div>
      </div>

      <div class="social-connect">
        <h3>Join the Conversation</h3>
        <div class="social-icons">
          <a v-for="social in socials" 
             :key="social.platform" 
             :href="social.link" 
             :class="['social-icon', social.platform]"
             target="_blank"
             @mouseenter="handleSocialHover(social)"
          >
            <font-awesome-icon :icon="['fab', social.icon]" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import { YouTubeVideo } from '@/services/youtube'
import { PropType } from 'vue'


interface Platform {
  name: string;
  icon: string;
  link: string;
}

interface SocialLink {
  platform: string;
  icon: string;
  link: string;
}


export default defineComponent({
  name: 'PodcastSection',
  props: {
    episodes: {
      type: Array as PropType<YouTubeVideo[]>,
      required: true
    }
  },
  setup(props) {
    const videoSrc = ref<string>('');
    const activeTab = ref('audio');
    const currentlyPlaying = ref<string | null>(null);
    const thumbnailUrl = ref('path/to/default-thumbnail.jpg');
    const isLoading = ref(true);
    const isPlaying = ref(false);
    const currentEpisode = ref<YouTubeVideo | null>(null);

    const tabs = [
      { id: 'audio', name: 'Episodes' },
      { id: 'platforms', name: 'Platforms' }
    ];

    const platforms = [
      { name: 'YouTube', icon: '/icons/youtube.svg', link: 'https://youtube.com/@Politico_Intent' },
      { name: 'Spotify', icon: '/icons/spotify.svg', link: 'https://open.spotify.com/show/your-show-id' },
      { name: 'Apple Podcasts', icon: '/icons/apple-podcasts.svg', link: 'https://podcasts.apple.com/your-show-id' },
      { name: 'Google Podcasts', icon: '/icons/google-podcasts.svg', link: 'https://podcasts.google.com/your-show-id' }
    ];

    const socials = [
      { platform: 'youtube', icon: 'youtube', link: 'https://youtube.com/@Politico_Intent' },
      { platform: 'twitter', icon: 'twitter', link: 'https://twitter.com/your-handle' },
      { platform: 'linkedin', icon: 'linkedin', link: 'https://linkedin.com/in/your-profile' },
      { platform: 'instagram', icon: 'instagram', link: 'https://instagram.com/your-handle' }
    ];

    const stats = {
      episodes: props.episodes.length,
      listeners: 10,
      countries: 5
    };

    const audioEpisodes = computed(() => {
      return props.episodes.map(episode => ({
        _id: episode.id,
        title: episode.title,
        description: episode.description,
        thumbnail: episode.thumbnailUrl,
        duration: episode.duration,
        date: episode.publishedAt,
        tags: episode.tags,
        views: episode.viewCount,
        likes: episode.likeCount,
        series: episode.series
      }));
    });

    const playVideo = () => {
      if (currentEpisode.value) {
        videoSrc.value = `https://www.youtube.com/embed/${currentEpisode.value.id}`;
        isPlaying.value = true;
      }
    };

    const selectEpisode = (episode: any) => {
      currentEpisode.value = props.episodes.find(e => e.id === episode._id) || null;
      if (currentEpisode.value) {
        thumbnailUrl.value = currentEpisode.value.thumbnailUrl;
        playVideo();
      }
    };

    const switchTab = (tabId: string) => {
      activeTab.value = tabId;
    };

    const formatDate = (date: string) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const trackEngagement = (type: string) => {
      // Implement analytics tracking
      console.log(`Engagement tracked: ${type}`);
    };

    const handleTimeUpdate = (event: Event) => {
      const video = event.target as HTMLVideoElement;
      if (video.currentTime > 0) {
        trackEngagement('video_progress');
      }
    };

    const handleVideoEnd = () => {
      trackEngagement('video_complete');
      isPlaying.value = false;
    };

    const handlePlatformHover = (platform: Platform) => {
      trackEngagement(`platform_hover_${platform.name.toLowerCase()}`);
    };

    const handleSocialHover = (social: SocialLink) => {
      trackEngagement(`social_hover_${social.platform}`);
    };

    onMounted(() => {
      if (props.episodes.length > 0) {
        currentEpisode.value = props.episodes[0];
        thumbnailUrl.value = currentEpisode.value.thumbnailUrl;
      }
      isLoading.value = false;
    });

    return {
      videoSrc,
      activeTab,
      currentlyPlaying,
      thumbnailUrl,
      isLoading,
      isPlaying,
      currentEpisode,
      tabs,
      platforms,
      socials,
      stats,
      audioEpisodes,
      playVideo,
      selectEpisode,
      switchTab,
      formatDate,
      trackEngagement,
      handleTimeUpdate,
      handleVideoEnd,
      handlePlatformHover,
      handleSocialHover
    };
  }
});
</script>

<style scoped>
.podcast-section {
  padding: 4rem 0;
  background: var(--bg-secondary);
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.highlight {
  color: var(--primary);
}

.section-subtitle {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 3rem;
}

.podcast-grid {
  display: grid;
  gap: 2rem;
  margin-bottom: 3rem;
}

.podcast-block {
  background: var(--bg-primary);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.episode-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  z-index: 1;
}

.video-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  background: #000;
}

.podcast-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.video-overlay:hover {
  background: rgba(0, 0, 0, 0.7);
}

.thumbnail-preview {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-btn {
  background: var(--primary);
  color: white;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  z-index: 1;
}

.play-btn:hover {
  transform: scale(1.1);
}

.episode-info {
  padding: 1.5rem;
}

.episode-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.episode-description {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.episode-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.episode-stats {
  display: flex;
  gap: 1rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.podcast-content {
  margin-top: 3rem;
}

.podcast-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 1rem;
}

.tab-btn {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.tab-btn.active {
  color: var(--primary);
  border-bottom: 2px solid var(--primary);
}

.episodes-list {
  display: grid;
  gap: 1.5rem;
}

.episode-card {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 1.5rem;
  background: var(--bg-primary);
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.episode-card:hover {
  transform: translateY(-2px);
}

.episode-card.playing {
  border: 2px solid var(--primary);
}

.episode-thumbnail {
  position: relative;
  width: 200px;
  height: 112.5px;
}

.episode-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mini-play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--primary);
  color: white;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.episode-card:hover .mini-play-btn {
  opacity: 1;
}

.episode-details {
  padding: 1rem;
}

.episode-details h4 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.episode-details p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.episode-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background: var(--bg-secondary);
  color: var(--text-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
}

.platforms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.platform-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-primary);
  border-radius: 0.5rem;
  text-decoration: none;
  color: var(--text-primary);
  transition: transform 0.3s ease;
}

.platform-card:hover {
  transform: translateY(-2px);
}

.platform-card img {
  width: 3rem;
  height: 3rem;
}

.podcast-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--primary);
  display: block;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--text-secondary);
}

.social-connect {
  text-align: center;
  margin-top: 3rem;
}

.social-connect h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.social-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: var(--bg-primary);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
}

/* Animations */
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 0.5s ease-out 0.2s both;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out;
}

.animate-count {
  animation: countUp 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Loading State */
.loading {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skeleton-loader {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--bg-secondary) 25%,
    var(--bg-primary) 50%,
    var(--bg-secondary) 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .episode-card {
    grid-template-columns: 1fr;
  }

  .episode-thumbnail {
    width: 100%;
    height: 200px;
  }

  .podcast-stats {
    grid-template-columns: 1fr;
  }

  .social-icons {
    flex-wrap: wrap;
  }
}
</style>
