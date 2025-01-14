<template>
  <section class="podcast-section">
    <div class="container">
      <h2 class="section-title">Podcasting</h2>
      <div class="podcast-grid">
        <div class="podcast-block video-block">
          <h3 class="block-title">Video Podcast</h3>
          <video controls class="podcast-video">
            <source :src="videoSrc || placeholderVideo" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div class="podcast-block audio-block">
          <h3 class="block-title">Audio Podcast</h3>
          <audio controls class="podcast-audio">
            <source :src="audioSrc || placeholderAudio" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'PodcastSection',
  setup() {
    const videoSrc = ref<string | null>(null);
    const audioSrc = ref<string | null>(null);
    const placeholderVideo = 'path/to/placeholder-video.mp4'; // Replace with actual placeholder path
    const placeholderAudio = 'path/to/placeholder-audio.mp3'; // Replace with actual placeholder path

    const fetchMedia = async () => {
      try {
        const response = await axios.get('https://listen-api.listennotes.com/api/v2/episodes', {
          headers: {
            'X-ListenAPI-Key': 'YOUR_API_KEY'
          }
        });
        const data = response.data;
        // Assuming the API returns video and audio URLs
        videoSrc.value = data.videoUrl; // Update with actual data path
        audioSrc.value = data.audioUrl; // Update with actual data path
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };

    onMounted(() => {
      fetchMedia();
    });

    return { videoSrc, audioSrc, placeholderVideo, placeholderAudio };
  }
});
</script>

<style scoped>
.podcast-section {
  padding: 4rem 2rem;
  background-color: #F5EFE7; /* Light background for contrast */
  color: #213555; /* Darker text color */
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #3E5879; /* Use the third color for titles */
}

.podcast-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.podcast-block {
  background-color: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.podcast-block:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.block-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #D8C4B6; /* Use the third color for block titles */
}

.podcast-video,
.podcast-audio {
  width: 100%;
  border-radius: 0.5rem;
  border: 2px solid #D8C4B6; /* Use the third color for borders */
}

@media (min-width: 768px) {
  .podcast-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
