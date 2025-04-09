<template>
  <div class="blog-page">
    <BlogSection />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faCode, 
  faBlog, 
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
} from '@fortawesome/free-solid-svg-icons';
import BlogSection from '@/components/BlogSection.vue';

library.add(
  faCode,
  faBlog,
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
);

export default defineComponent({
  name: 'BlogView',
  components: {
    BlogSection
  }
});
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  padding-top: 80px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  color: #fff;
}

.blog-page :deep(section) {
  scroll-margin-top: 80px;
  min-height: 100vh;
  width: 100%;
  position: relative;
  z-index: 1;
}

.blog-page :deep(.blog-card) {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.blog-page :deep(.container) {
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 1;
}

@media (max-width: 768px) {
  .blog-page {
    padding-top: 60px;
  }
  
  .blog-page :deep(section) {
    scroll-margin-top: 60px;
  }
}
</style> 