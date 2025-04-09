<template>
  <div :class="['app-container', { 'dark-mode': isDarkMode }]">
    <Header @toggleDarkMode="toggleDarkMode" />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Footer
  },
  setup() {
    const isDarkMode = ref(false);

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value;
    };

    return { isDarkMode, toggleDarkMode };
  }
});
</script>

<style>
:root {
  --primary-color: #213555;
  --secondary-color: #3E5879;
  --accent-color: #D8C4B6;
  --background-color: #f5f5f5;
  --text-color: #333;
  --header-height: 80px;
  --footer-height: 60px;
  --gradient-bg: linear-gradient(135deg, #213555, #3E5879);
}

.dark-mode {
  --primary-color: #f5f5f5;
  --secondary-color: #D8C4B6;
  --accent-color: #3E5879;
  --background-color: #333;
  --text-color: #f5f5f5;
}

body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding-top: var(--header-height);
  padding-bottom: var(--footer-height);
  overflow-y: auto;
  background: var(--gradient-bg);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

a {
  color: var(--accent-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: var(--primary-color);
}

button {
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
}

h1, h2, h3, h4, h5, h6 {
  color: var(--primary-color);
  margin-top: 0;
}

p {
  margin-bottom: 1rem;
}

img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  transition: transform 0.3s ease;
}

img:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .main-content {
    padding-top: calc(var(--header-height) + 10px);
    padding-bottom: calc(var(--footer-height) + 10px);
  }
}
</style>
