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
          <li><a href="#blog" class="nav-link">Blog</a></li>
          <li><a href="#contact" class="nav-link">Contact</a></li>
          <li class="social-icons">
            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
            <a href="#" class="social-link"><i class="fab fa-github"></i></a>
          </li>
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
.header {
  background-color: #1a202c;
  color: #edf2f7;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 100%;
  z-index: 1000;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-image {
  height: 50px;
  width: auto;
  transition: transform 0.3s ease;
}

.logo-image:hover {
  transform: scale(1.1);
}

.navbar {
  position: relative;
}

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
  background-color: #edf2f7;
  transition: all 0.3s ease;
}

.nav-list {
  display: none;
  list-style: none;
  background-color: #2d3748;
  padding: 1rem;
  border-radius: 0.5rem;
  position: absolute;
  top: 3rem;
  right: 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.nav-list.active {
  display: block;
}

.nav-link {
  color: #edf2f7;
  text-decoration: none;
  display: block;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
  font-weight: 500;
}

.nav-link:hover {
  color: #63b3ed;
}

.social-icons {
  display: flex;
  gap: 0.5rem;
}

.social-link {
  color: #edf2f7;
  font-size: 1.25rem;
  transition: color 0.3s ease;
}

.social-link:hover {
  color: #63b3ed;
}

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
