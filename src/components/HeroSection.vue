<template>
  <section class="hero-section">
    <div class="hero-content">
      <div class="text-content">
        <div class="typing-container">
          <h1 class="hero-title">
            <span class="greeting">Hello!</span>
            <img src="@/assets/images/hello.jpg" alt="Hello Icon" class="hello-icon" />
            <br />
            <span class="name">I'm Dralagar George</span>
          </h1>
          <div class="typing-text">
            <vue-typed-js :strings="['Web Developer', 'Digital Services Consultant', 'Tech Innovator']">
              <h2 class="hero-subtitle"></h2>
            </vue-typed-js>
          </div>
        </div>
        <p class="hero-description">
          Crafting digital experiences that bridge innovation and purpose. Let's create something amazing together.
        </p>
        <div class="cta-buttons">
          <button @click="scrollToProjects" class="hero-cta-button primary" aria-label="View Projects">
            <span class="button-content">
              <font-awesome-icon icon="code" class="button-icon" />
              View Projects
            </span>
          </button>
          <button @click="scrollToContact" class="hero-cta-button secondary" aria-label="Get in Touch">
            <span class="button-content">
              <font-awesome-icon icon="envelope" class="button-icon" />
              Get in Touch
            </span>
          </button>
        </div>
      </div>
      <div class="visual-content">
        <div class="image-container">
          <img src="@/assets/images/Geo.png" alt="Dralagar George, Web Developer" class="hero-image" />
          <div class="floating-elements">
            <div class="floating-element tech-icon vue"></div>
            <div class="floating-element tech-icon react"></div>
            <div class="floating-element tech-icon node"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VueTypedJs from 'vue-typed-js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCode, faEnvelope } from '@fortawesome/free-solid-svg-icons';

library.add(faCode, faEnvelope);

export default defineComponent({
  components: {
    VueTypedJs
  },
    methods: {
      scrollToProjects() {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    },
    scrollToContact() {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
});
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: "Lucida Sans", Geneva, Verdana, sans-serif;
  font-weight: 300;
  color: #333;
  background-color: #f5f5f5;
  overflow-y: auto;
}

h1, h2, h3, h4, h5, h6 {
  font-family: Georgia, "Times New Roman", Times, serif;
  font-weight: 300;
  margin: 0;
}

h1 {
  font-size: 2.5rem;
  color: #047;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.5rem;
  font-style: italic;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.25rem;
  font-style: italic;
  margin: 0 0 0 10px;
}

h4, h5 {
  font-size: 1rem;
  margin: 0 0 0 10px;
}

.paper-background {
  background-color: #fff;
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

#info, main {
  max-width: 1000px;
  padding: 0 20px;
}

#info {
  margin: 30px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

#info .left, #info .right {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#info h1, #info h2 {
  margin: 0;
}

main {
  margin: 0 auto;
}

section {
  margin-bottom: 20px;
}

section h3 {
  font-weight: bold;
  margin-bottom: 10px;
}

section .right {
  margin: 20px;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
}

.navbar {
  background-color: #3474e6;
  color: white;
  margin-bottom: 20px;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
  font-weight: bold;
  margin-left: 20px;
}

.navbar a:hover {
  color: #ffcc00;
}

.contact-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.form-label {
  font-weight: bold;
}

button[type="submit"] {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #256ac4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #ffcc00;
  color: #256ac4;
}

@media screen and (max-width: 799px) {
  #info {
    grid-template-columns: 1fr;
    text-align: center;
  }
  section {
    grid-template-columns: 1fr;
  }
}

.hero-section {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
  padding: 2rem 1.5rem;
  position: relative;
  overflow: hidden;
  width: 100%;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
  opacity: 0.1;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  padding: 0 1rem;
}

.text-content {
  flex: 1;
  text-align: center;
}

.typing-container {
  margin-bottom: 2rem;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #fff;
}

.greeting {
  display: inline-block;
  animation: fadeInUp 0.8s ease;
}

.name {
  display: inline-block;
  background: linear-gradient(45deg, #00f7ff, #3E5879);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fadeInUp 0.8s ease 0.2s backwards;
}

.hello-icon {
  width: 50px;
  vertical-align: middle;
  animation: bounce 2s infinite;
}

.typing-text {
  min-height: 3rem;
}

.hero-subtitle {
  font-size: 1.8rem;
  color: #00f7ff;
  margin: 1rem 0;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #a0aec0;
  max-width: 600px;
  margin: 0 auto 2rem;
  animation: fadeInUp 0.8s ease 0.4s backwards;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  animation: fadeInUp 0.8s ease 0.6s backwards;
}

.hero-cta-button {
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.button-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.button-icon {
  font-size: 1.2rem;
}

.primary {
  background: #00f7ff;
  color: #16213e;
}

.secondary {
  background: transparent;
  border: 2px solid #00f7ff;
  color: #00f7ff;
}

.hero-cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 247, 255, 0.2);
}

.visual-content {
  flex: 1;
  position: relative;
  width: 100%;
  max-width: 500px;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.hero-image {
  width: 100%;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  animation: float 6s ease-in-out infinite;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.floating-element {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  animation: float 4s ease-in-out infinite;
}

.tech-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.tech-icon.vue {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.tech-icon.react {
  top: 40%;
  right: 10%;
  animation-delay: 1s;
}

.tech-icon.node {
  bottom: 20%;
  left: 50%;
  animation-delay: 2s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (min-width: 768px) {
  .hero-content {
    flex-direction: row;
    text-align: left;
    align-items: center;
  }

  .text-content {
    text-align: left;
  }

  .hero-title {
    font-size: 3.5rem;
  }

  .hero-subtitle {
    font-size: 2rem;
  }

  .cta-buttons {
    justify-content: flex-start;
  }
}

@media (max-width: 1024px) {
  .hero-content {
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 1rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.5rem;
  }

  .hero-description {
    font-size: 1rem;
    max-width: 100%;
  }

  .cta-buttons {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }

  .hero-cta-button {
    width: 100%;
    justify-content: center;
  }

  .visual-content {
    max-width: 100%;
  }

  .hero-image {
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 1rem 0.5rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-description {
    font-size: 0.9rem;
  }

  .hero-cta-button {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }

  .button-icon {
    font-size: 1rem;
  }

  .hero-image {
    max-width: 250px;
  }

  .floating-element {
    width: 30px;
    height: 30px;
    font-size: 1.2rem;
  }
}
</style>
