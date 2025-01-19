<template>
  <header class="header">
    <div class="container flex justify-between items-center py-4 px-4 lg:px-8">
      <!-- Logo -->
      <div class="logo flex-shrink-0">
        <a href="">
          <img src="@/assets/images/ReactNowDevLogo.png" alt="Logo" class="h-12 md:h-16">
        </a>
      </div>
      <!-- Navigation -->
      <nav class="flex items-center">
        <!-- Hamburger menu -->
        <button
          @click="toggleMenu"
          class="hamburger-menu focus:outline-none md:hidden"
          aria-label="Toggle Navigation"
        >
          <span :class="['hamburger-line', { 'active': isMenuOpen }]" />
          <span :class="['hamburger-line', { 'active': isMenuOpen }]" />
          <span :class="['hamburger-line', { 'active': isMenuOpen }]" />
        </button>
        <!-- Navigation Links -->
        <ul :class="['nav-links', { 'open': isMenuOpen }]">
          <li><a href="#about" class="nav-link">About</a></li>
          <li><a href="#projects" class="nav-link">Projects</a></li>
          <li><a href="#podcasts" class="nav-link">Podcasts</a></li>
          <li><a href="#blog" class="nav-link">Blog</a></li>
          <li><a href="#contact" class="nav-link">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "HeaderSection",
  setup() {
    const isMenuOpen = ref(false);

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    return { isMenuOpen, toggleMenu };
  },
});
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease-in-out;
  width: 100%;
  margin-bottom: 0;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  margin-bottom: 0;
}

.logo img {
  height: 70px;
  max-height: 100%;
}

.hamburger-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 20;
}

.hamburger-line {
  width: 100%;
  height: 3px;
  background-color: #333;
  border-radius: 2px;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.hamburger-line.active:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger-line.active:nth-child(2) {
  opacity: 0;
}

.hamburger-line.active:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: none;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  transition: max-height 0.3s ease-in-out;
  overflow: hidden;
  max-height: 0;
}

.nav-links.open {
  display: flex;
  max-height: 500px;
}

.nav-link {
  padding: 0.75rem 1rem;
  text-transform: capitalize;
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #007bff;
}

@media (min-width: 768px) {
  .hamburger-menu {
    display: none;
  }

  .nav-links {
    display: flex;
    flex-direction: row;
    position: static;
    box-shadow: none;
    max-height: none;
  }

  .nav-link {
    padding: 0;
    margin: 0 1rem;
  }
}
</style>
