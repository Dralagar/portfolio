<template>
  <div class="home">
    <HeroSection />
    <AboutSection id="about" />
    <ProjectsSection id="projects" />
    <BlogSection id="blog" />
    <PodcastSection id="podcast" />
    <ContactSection id="contact" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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
  }
});
</script>

<style scoped>
.home {
  min-height: 100vh;
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
