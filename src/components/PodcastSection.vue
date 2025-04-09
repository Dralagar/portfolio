<template>
  <section class="podcast-section" id="podcast">
    <div class="container">
      <h2 class="section-title">
        <span class="highlight">Digital</span> Conversations
      </h2>
      <p class="section-subtitle">Exploring Technology, Innovation & Social Impact</p>
      
      <div class="podcast-grid">
        <div class="podcast-block featured-episode">
          <div class="episode-badge">Latest Episode</div>
          <div class="video-container">
            <video 
              controls 
              class="podcast-video"
              :poster="thumbnailUrl"
              @play="trackEngagement('video')"
            >
              <source :src="videoSrc" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div class="video-overlay">
              <button class="play-btn" @click="playVideo">
                <font-awesome-icon icon="play" />
              </button>
            </div>
          </div>
          <div class="episode-info">
            <h3 class="episode-title">{{ currentEpisode.title }}</h3>
            <p class="episode-description">{{ currentEpisode.description }}</p>
            <div class="episode-meta">
              <span><font-awesome-icon icon="clock" /> {{ currentEpisode.duration }}</span>
              <span><font-awesome-icon icon="calendar" /> {{ currentEpisode.date }}</span>
            </div>
          </div>
        </div>

        <div class="podcast-content">
          <div class="podcast-tabs">
            <button 
              v-for="tab in tabs" 
              :key="tab.id"
              :class="['tab-btn', { active: activeTab === tab.id }]"
              @click="activeTab = tab.id"
            >
              {{ tab.name }}
            </button>
          </div>

          <div class="tab-content">
            <!-- Audio Episodes List -->
            <div v-if="activeTab === 'audio'" class="episodes-list">
              <div 
                v-for="episode in audioEpisodes" 
                :key="episode.id"
                class="episode-card"
                :class="{ 'playing': currentlyPlaying === episode.id }"
              >
                <div class="episode-thumbnail">
                  <img :src="episode.thumbnail" :alt="episode.title">
                  <button class="mini-play-btn" @click="playAudio(episode)">
                    <font-awesome-icon :icon="currentlyPlaying === episode.id ? 'pause' : 'play'" />
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
              >
                <img :src="platform.icon" :alt="platform.name">
                <span>{{ platform.name }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="podcast-stats">
        <div class="stat-item">
          <span class="stat-number">{{ stats.episodes }}+</span>
          <span class="stat-label">Episodes</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ stats.listeners }}k</span>
          <span class="stat-label">Monthly Listeners</span>
        </div>
        <div class="stat-item">
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
          >
            <font-awesome-icon :icon="['fab', social.icon]" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PodcastSection',
  setup() {
    const videoSrc = ref<string>('');
    const activeTab = ref('audio');
    const currentlyPlaying = ref<number | null>(null);
    const thumbnailUrl = ref('path/to/default-thumbnail.jpg');

    const currentEpisode = ref({
      title: 'The Future of Web Development',
      description: 'Exploring emerging trends and technologies shaping the web development landscape',
      duration: '45:00',
      date: 'Mar 15, 2024'
    });

    const tabs = [
      { id: 'audio', name: 'Episodes' },
      { id: 'platforms', name: 'Listen On' }
    ];

    const audioEpisodes = ref([
      {
        id: 1,
        title: 'Innovation in Tech',
        description: 'Discussing breakthrough technologies and their impact',
        thumbnail: 'path/to/thumbnail1.jpg',
        tags: ['tech', 'innovation', 'future']
      },
      // Add more episodes
    ]);

    const platforms = ref([
      { name: 'Spotify', icon: 'spotify-icon.png', link: '#' },
      { name: 'Apple Podcasts', icon: 'apple-podcasts-icon.png', link: '#' },
      // Add more platforms
    ]);

    const stats = ref({
      episodes: 50,
      listeners: 10,
      countries: 25
    });

    const socials = [
      { platform: 'twitter', icon: 'twitter', link: '#' },
      { platform: 'linkedin', icon: 'linkedin', link: '#' },
      { platform: 'youtube', icon: 'youtube', link: '#' },
      { platform: 'instagram', icon: 'instagram', link: '#' }
    ];

    const playVideo = () => {
      const video = document.querySelector('.podcast-video') as HTMLVideoElement;
      if (video) {
        video.play();
      }
    };

    const playAudio = (episode: any) => {
      currentlyPlaying.value = currentlyPlaying.value === episode.id ? null : episode.id;
    };

    const trackEngagement = (type: string) => {
      // Add analytics tracking here
      console.log(`Tracking ${type} engagement`);
    };

    return {
      videoSrc,
      activeTab,
      currentlyPlaying,
      thumbnailUrl,
      currentEpisode,
      tabs,
      audioEpisodes,
      platforms,
      stats,
      socials,
      playVideo,
      playAudio,
      trackEngagement
    };
  }
});
</script>

<style scoped>
.podcast-section {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  color: #213555;
  width: 100%;
}

.section-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #213555, #3E5879);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 3rem;
  text-align: center;
}

.highlight {
  color: #3E5879;
}

.podcast-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.featured-episode {
  position: relative;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.episode-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #3E5879;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  z-index: 2;
}

.video-container {
  position: relative;
  padding-top: 56.25%;
}

.podcast-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.video-container:hover .video-overlay {
  opacity: 1;
}

.play-btn {
  background: white;
  border: none;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s ease;
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
}

.episode-meta {
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.9rem;
}

.podcast-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  color: #666;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.tab-btn.active {
  color: #3E5879;
  border-bottom-color: #3E5879;
}

.episodes-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.episode-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.episode-card:hover {
  transform: translateX(10px);
}

.episode-thumbnail {
  position: relative;
  width: 100px;
  height: 100px;
}

.episode-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.mini-play-btn {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  background: #3E5879;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
}

.episode-tags {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tag {
  font-size: 0.8rem;
  color: #3E5879;
  background: #f1f5f9;
  padding: 0.25rem 0.5rem;
  border-radius: 15px;
}

.podcast-stats {
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin: 4rem 0;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #3E5879;
  display: block;
}

.social-connect {
  text-align: center;
  margin-top: 4rem;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
}

.social-icon {
  font-size: 1.5rem;
  color: #213555;
  transition: transform 0.3s ease, color 0.3s ease;
}

.social-icon:hover {
  transform: translateY(-5px);
  color: #3E5879;
}

@media (max-width: 1024px) {
  .podcast-grid {
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .podcast-section {
    padding: 4rem 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  .podcast-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .podcast-stats {
    flex-direction: column;
    gap: 2rem;
  }

  .social-icons {
    flex-wrap: wrap;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .podcast-section {
    padding: 3rem 0.5rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .episode-info {
    padding: 1rem;
  }

  .episode-title {
    font-size: 1.2rem;
  }

  .episode-meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
