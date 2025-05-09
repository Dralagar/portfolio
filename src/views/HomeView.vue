<template>
  <div class="home">
    <HeroSection />
    <AboutSection id="about" />
    <ProjectsSection id="projects" />
    <BlogSection id="blog" />
    <PodcastSection id="podcast" :episodes="[]" />
    <ContactSection id="contact" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import HeroSection from '@/components/HeroSection.vue';
import AboutSection from '@/components/AboutSection.vue';
import ProjectsSection from '@/components/ProjectsSection.vue';
import BlogSection from '@/components/BlogSection.vue';
import PodcastSection from '@/components/PodcastSection.vue';
import ContactSection from '@/components/ContactSection.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    HeroSection,
    AboutSection,
    ProjectsSection,
    BlogSection,
    PodcastSection,
    ContactSection
  },
  setup() {
    onMounted(() => {
      // Handle hash navigation on mount
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
});
</script>

<style scoped>
.home {
  min-height: 100vh;
  scroll-behavior: smooth;
}

section {
  scroll-margin-top: 80px; /* Adjust based on your header height */
  min-height: 100vh; /* Ensure each section takes full viewport height */
  position: relative; /* Add position relative for proper stacking */
  z-index: 1; /* Ensure proper stacking order */
}

/* Add spacing between sections */
section:not(:first-child) {
  margin-top: 2rem;
}
</style>
