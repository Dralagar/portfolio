<template>
  <section class="hero-section">
    <div class="hero-content">
      <div class="text-content">
        <h1 class="hero-title">Hello, I'm Dralagar George!</h1>
        <h2 class="hero-subtitle">Web Developer & Digital Services Consultant</h2>
        <p class="hero-description">Explore my projects and skills, and let’s create something amazing together.</p>
        <button @click="scrollToProjects" class="hero-cta-button" aria-label="View Projects">
          View Projects
        </button>
      </div>
      <div class="visual-content">
        <img src="@/assets/images/geo.jpg" alt="Dralagar George, Web Developer" class="hero-image" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeroSection",
  methods: {
    scrollToProjects() {
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" });
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
  padding: 2rem 1rem;
  background-color: #3C5B6F;
  color: #DFD0B8;
  height: 100vh;
  text-align: center;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  max-width: 90%;
  margin: 0 auto;
}

.text-content {
  max-width: 600px;
}

.hero-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #DFD0B8;
  text-shadow: 0 0 10px #153448;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #DFD0B8;
}

.hero-description {
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.hero-cta-button {
  background-color: #213555;
  color: #F5EFE7;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.hero-cta-button:hover {
  background-color: #D8C4B6;
  transform: scale(1.05);
}

.visual-content {
  display: flex;
  justify-content: center;
  width: 100%;
}

.hero-image {
  max-width: 80%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

@media (min-width: 768px) {
  .hero-content {
    flex-direction: row;
    justify-content: space-between;
    gap: 3rem;
  }

  .text-content {
    max-width: 50%;
    text-align: left;
  }

  .visual-content {
    max-width: 50%;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.5rem;
  }

  .hero-description {
    font-size: 1rem;
  }
}

@media (min-width: 1200px) {
  .hero-title {
    font-size: 3rem;
  }

  .hero-subtitle {
    font-size: 1.75rem;
  }

  .hero-description {
    font-size: 1.1rem;
  }

  .hero-cta-button {
    padding: 0.75rem 2rem;
  }
}
</style>
