<template>
  <section class="hero-section">
    <div class="hero-content">
      <div class="text-content">
        <h2 class="title">Welcome to My Portfolio</h2>
        <p class="description">Discover my projects and skills.</p>
        <button @click="scrollToProjects" class="cta-button">
          View Projects
        </button>
      </div>
      <div class="visual-content">
        <img src="@/assets/images/geo.jpg" alt="Hero Visual" class="hero-image" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeroSection',
  methods: {
    scrollToProjects() {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
});
</script>

<style scoped>
.hero-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 2rem;
  background-color: #1a202c;
  color: #edf2f7;
  text-align: center;
  margin-top: 0;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 2rem;
}

.text-content {
  max-width: 600px;
  margin: 0 auto;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.cta-button {
  background-color: #213555;
  color: #F5EFE7;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #D8C4B6;
}

.visual-content {
  display: flex;
  justify-content: center;
}

.hero-image {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
}

@media (min-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr 1fr;
    text-align: left;
  }
}
</style>
