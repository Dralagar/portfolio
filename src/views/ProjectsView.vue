<template>
  <div class="projects-page">
    <ProjectsSection />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProjectsSection from '@/components/ProjectsSection.vue';

export default defineComponent({
  name: 'ProjectsView',
  components: {
    ProjectsSection
  }
});
</script>

<style scoped>
.projects-page {
  min-height: 100vh;
  padding-top: 80px; /* Account for fixed header */
}
</style> 