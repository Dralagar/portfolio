<template>
  <div id="app">
    <Header />
    <HeroSection />
    <AboutSection />
    <TechStackSection />
    <ProjectsSection />
    <BlogSection />
    <ContactSection />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import HeroSection from './components/HeroSection.vue';
import AboutSection from './components/AboutSection.vue';
import TechStackSection from './components/TechStackSection.vue';
import ProjectsSection from './components/ProjectsSection.vue';
import BlogSection from './components/BlogSection.vue';
import ContactSection from './components/ContactSection.vue';
import Footer from './components/Footer.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    HeroSection,
    AboutSection,
    TechStackSection,
    ProjectsSection,
    BlogSection,
    ContactSection,
    Footer
  }
});
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}
</style>
