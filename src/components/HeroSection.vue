<template>
  <section class="hero-section">
    <div class="hero-content">
      <div class="text-content">
        <h1 class="hero-title">
          Hello! 
          <img src="@/assets/images/hello.jpg" alt="Hello Icon" class="hello-icon" />
          <br />
          I'm Dralagar George.
        </h1>
        <h2 class="hero-subtitle">Web Developer & Digital Services Consultant</h2>
        <p class="hero-description">
          Explore my projects and skills, and let’s create something amazing together.
        </p>
        <button @click="scrollToProjects" class="hero-cta-button" aria-label="View Projects">
          View Projects
        </button>
      </div>
      <div class="visual-content">
        <img src="@/assets/images/Geo.png" alt="Dralagar George, Web Developer" class="hero-image" />
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
    },
  },
});
</script>

<style scoped>
.hero-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 1.5rem;
  background-color: #3C5B6F; /* Primary background color */
  color: #DFD0B8; /* Text color */
  min-height: calc(100vh - 80px);
  text-align: center;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.text-content {
  flex: 1;
}

.hero-title {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #f5efe7;
}

.hello-icon {
  width: 50px;
  vertical-align: middle;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.hero-description {
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-cta-button {
  background-color: #213555;
  color: #f5efe7;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.hero-cta-button:hover {
  background-color: #d8c4b6;
  color: #213555;
  transform: scale(1.05);
}

.visual-content img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

@media (min-width: 768px) {
  .hero-content {
    flex-direction: row;
    text-align: left;
  }

  .text-content {
    flex: 1;
  }

  .visual-content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hero-title {
    font-size: 3rem;
  }

  .hero-subtitle {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 1.25rem;
  }
}
</style>
