<template>
  <header class="header">
    <div class="container">
      <a href="/" class="logo">
        <img src="@/assets/images/ReactNowDevLogo.png" alt="My Portfolio Logo" class="logo-image" />
      </a>
      <nav class="navbar">
        <div class="hamburger" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul :class="{ 'nav-list': true, 'active': isMenuActive }">
          <li><a href="#about" class="nav-link">About</a></li>
          <li><a href="#projects" class="nav-link">Projects</a></li>
          <li><a href="#contact" class="nav-link">Contact</a></li>
          <li><a href="#blog" class="nav-link">Blog</a></li>
          <li><a href="#testimonial" class="nav-link">Testimonial</a></li>  
          <li><a href="#podcast" class="nav-link">Podcast</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Header',
  setup() {
    const isMenuActive = ref(false);

    const toggleMenu = () => {
      isMenuActive.value = !isMenuActive.value;
    };

    return { isMenuActive, toggleMenu };
  }
});
</script>

<style scoped>
/* Header Styles */
.header {
  background-color: #153448;
  color: #DFD0B8;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  margin-bottom: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
}

.logo-image {
  height: 70px;
  width: auto;
  transition: transform 0.3s ease;
}

.logo-image:hover {
  transform: scale(1.1);
}

/* Contact Button */
.contact-button {
  display: none;
  background-color: #3C5B6F;
  color: #F5EFE7;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.contact-button:hover {
  background-color: #DFD0B8;
  transform: scale(1.05);
}

/* Hamburger Menu */
.hamburger {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  gap: 0.3rem;
  background: none;
  border: none;
}

.hamburger span {
  width: 25px;
  height: 3px;
  background-color: #DFD0B8;
  transition: all 0.3s ease;
}

.nav-menu {
  display: none;
  position: absolute;
  top: 60px;
  right: 0;
  background-color: #3E5879;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.nav-menu.active {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-list {
  display: none;
  list-style: none;
  background-color: #3E5879;
  padding: 1rem;
  border-radius: 0.5rem;
  position: absolute;
  top: 3rem;
  right: 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: right;
}

.nav-list.active {
  display: block;
}

.nav-link {
  color: #DFD0B8;
  text-decoration: none;
  display: block;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
  font-weight: 500;
}

.nav-link:hover {
  color: #F5EFE7;
}

/* Larger Screens */
@media (min-width: 768px) {
  .nav-list {
    display: flex;
    position: static;
    background-color: transparent;
    flex-direction: row;
    gap: 1.5rem;
    justify-content: flex-end;
  }

  .hamburger {
    display: none;
  }
}
</style>
