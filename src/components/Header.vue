<template>
  <header class="header" :class="{ 'scrolled': isScrolled, 'dark': darkMode }">
    <div class="container">
      <!-- Logo with improved hover effects -->
      <div class="logo" @mouseenter="logoHover = true" @mouseleave="logoHover = false">
        <router-link to="/" class="logo-link">
          <div class="logo-container">
            <img 
              src="@/assets/images/ReactNowDevLogo.png" 
              alt="ReactNowDev Logo" 
              class="logo-image"
              :class="{ 'hover': logoHover }"
            />
            <transition name="fade">
              <span class="logo-text" v-if="logoHover || isMenuOpen">ReactNowDev</span>
            </transition>
          </div>
        </router-link>
      </div>
      
      <!-- Navigation with refined dark mode toggle -->
      <nav class="navigation">
        <ul :class="['nav-links', { 'open': isMenuOpen }]">
          <li v-for="(link, index) in navLinks" :key="link.path" :style="linkStyle(index)">
            <router-link 
              :to="link.path" 
              class="nav-link"
              @click="navigateAndClose"
              active-class="active"
            >
              <span class="link-text">{{ link.text }}</span>
              <span class="link-underline"></span>
            </router-link>
          </li>
          <li class="theme-toggle-container">
            <button 
              class="theme-toggle" 
              @click="toggleTheme" 
              aria-label="Toggle dark mode"
              :title="darkMode ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <div class="theme-toggle-inner">
                <transition name="rotate-icon" mode="out-in">
                  <MoonIcon v-if="darkMode" key="moon" class="theme-icon" />
                  <SunIcon v-else key="sun" class="theme-icon" />
                </transition>
              </div>
            </button>
          </li>
        </ul>

        <!-- Enhanced hamburger menu -->
        <button
          @click="toggleMenu"
          class="hamburger-menu"
          :aria-expanded="isMenuOpen"
          aria-label="Toggle navigation menu"
        >
          <span class="hamburger-box">
            <span :class="['hamburger-line', { 'active': isMenuOpen }]" />
            <span :class="['hamburger-line', { 'active': isMenuOpen }]" />
            <span :class="['hamburger-line', { 'active': isMenuOpen }]" />
          </span>
        </button>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import { MoonIcon, SunIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "HeaderSection",
  components: { MoonIcon, SunIcon },
  setup() {
    const isMenuOpen = ref(false);
    const isScrolled = ref(false);
    const logoHover = ref(false);
    const darkMode = ref(false);
    
    const navLinks = [
      { text: "About", path: "/#about" },
      { text: "Projects", path: "/#projects" },
      { text: "Podcasts", path: "/podcast" },
      { text: "Blog", path: "/blog" },
      { text: "Contact", path: "/#contact" }
    ];

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 20;
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      // Check for saved theme preference
      darkMode.value = localStorage.getItem('theme') === 'dark' || 
                       (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      applyTheme();
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
      document.body.style.overflow = isMenuOpen.value ? 'hidden' : '';
    };

    const navigateAndClose = () => {
      isMenuOpen.value = false;
      document.body.style.overflow = '';
    };

    const toggleTheme = () => {
      darkMode.value = !darkMode.value;
      localStorage.setItem('theme', darkMode.value ? 'dark' : 'light');
      applyTheme();
    };

    const applyTheme = () => {
      if (darkMode.value) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    const linkStyle = (index: number) => {
      return {
        '--delay': `${index * 0.07}s`,
        '--order': index
      };
    };

    return { 
      isMenuOpen, 
      isScrolled, 
      logoHover, 
      darkMode,
      navLinks,
      toggleMenu, 
      navigateAndClose,
      toggleTheme,
      linkStyle
    };
  },
});
</script>

<style scoped>
/* Base variables with refined color palette */
:root {
  --header-height: 80px;
  --header-height-scrolled: 70px;
  --transition-duration: 0.4s;
  --easing: cubic-bezier(0.16, 1, 0.3, 1);
  --primary-color: #4361ee;
  --primary-hover: #3a56d4;
  --text-color: #1a1a1a;
  --text-light: #f8f9fa;
  --bg-color: rgba(255, 255, 255, 0.98);
  --bg-scrolled: rgba(255, 255, 255, 0.96);
  --nav-bg-mobile: rgba(255, 255, 255, 0.98);
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  --shadow-scrolled: 0 2px 15px rgba(0, 0, 0, 0.1);
  --logo-hover-scale: 1.08;
}

.dark {
  --primary-color: #4895ef;
  --primary-hover: #3a7bc8;
  --text-color: #f8f9fa;
  --text-light: #e9ecef;
  --bg-color: rgba(17, 24, 39, 0.98);
  --bg-scrolled: rgba(17, 24, 39, 0.96);
  --nav-bg-mobile: rgba(17, 24, 39, 0.98);
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  --shadow-scrolled: 0 2px 15px rgba(0, 0, 0, 0.25);
}

/* Header styles */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: var(--header-height);
  width: 100%;
  background-color: var(--bg-color);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: var(--shadow);
  transition: all var(--transition-duration) var(--easing);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.header.scrolled {
  height: var(--header-height-scrolled);
  background-color: var(--bg-scrolled);
  box-shadow: var(--shadow-scrolled);
}

.header.dark {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2.5rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Enhanced Logo styles */
.logo {
  position: relative;
  z-index: 25;
  height: 100%;
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 100%;
}

.logo-container {
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
}

.logo-image {
  height: 36px;
  width: auto;
  transition: all 0.3s var(--easing);
  transform-origin: left center;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.dark .logo-image {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.logo-image.hover {
  transform: scale(var(--logo-hover-scale)) rotate(5deg);
}

.logo-text {
  margin-left: 14px;
  font-weight: 600;
  font-size: 1.25rem;
  color: var(--primary-color);
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.3s var(--easing);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo:hover .logo-text,
.nav-links.open .logo-text {
  opacity: 1;
  transform: translateX(0);
}

/* Navigation container */
.navigation {
  display: flex;
  align-items: center;
  height: 100%;
}

/* Nav links styles */
.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: none;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--nav-bg-mobile);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  z-index: 20;
  overflow-y: auto;
  transform: translateY(-100%);
  opacity: 0;
  transition: transform 0.5s var(--easing), opacity 0.4s ease;
  padding-top: 2rem;
}

.nav-links.open {
  display: flex;
  transform: translateY(0);
  opacity: 1;
}

.nav-links li {
  width: 100%;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s var(--easing);
  transition-delay: var(--delay);
  order: var(--order);
  margin: 0.5rem 0;
}

.nav-links.open li {
  opacity: 1;
  transform: translateY(0);
}

.nav-link {
  position: relative;
  padding: 1rem 2rem;
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.5rem;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  transition: color 0.3s ease;
}

.link-text {
  position: relative;
  z-index: 1;
  transition: transform 0.3s var(--easing);
}

.nav-link:hover .link-text,
.nav-link.active .link-text {
  transform: translateX(5px);
}

.link-underline {
  position: absolute;
  bottom: 12px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: width 0.4s var(--easing), background-color 0.3s ease;
  border-radius: 2px;
}

.nav-link:hover .link-underline,
.nav-link.active .link-underline {
  width: 100%;
}

.nav-link:hover,
.nav-link.active {
  color: var(--primary-color);
}

/* Professional theme toggle */
.theme-toggle-container {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  position: relative;
}

.theme-toggle-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 25%;
  right: 25%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
}

.dark .theme-toggle-container::before {
  background-color: rgba(255, 255, 255, 0.1);
}

.theme-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.75rem;
  color: var(--text-color);
  transition: all 0.3s var(--easing);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  position: relative;
  overflow: hidden;
}

.theme-toggle-inner {
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-icon {
  width: 22px;
  height: 22px;
  position: absolute;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  color: var(--primary-color);
  background: rgba(67, 97, 238, 0.1);
  transform: scale(1.1);
}

.theme-toggle::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: var(--primary-color);
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.4s var(--easing);
}

.theme-toggle:hover::after {
  opacity: 0.1;
  transform: scale(1);
}

/* Enhanced hamburger menu */
.hamburger-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 25;
  padding: 0;
  position: relative;
  margin-left: auto;
}

.hamburger-box {
  width: 28px;
  height: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

.hamburger-line {
  width: 100%;
  height: 2px;
  background-color: var(--text-color);
  border-radius: 1px;
  transition: all 0.4s var(--easing);
  transform-origin: center;
  position: relative;
}

.hamburger-line:nth-child(1) {
  transform: translateY(0) rotate(0deg);
}

.hamburger-line:nth-child(2) {
  opacity: 1;
  transform: scaleX(1);
}

.hamburger-line:nth-child(3) {
  transform: translateY(0) rotate(0deg);
}

.hamburger-line.active:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger-line.active:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger-line.active:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Desktop styles */
@media (min-width: 992px) {
  .hamburger-menu {
    display: none;
  }

  .nav-links {
    position: static;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: transparent;
    backdrop-filter: none;
    transform: none;
    opacity: 1;
    overflow-y: visible;
    padding-top: 0;
    gap: 0.75rem;
  }

  .nav-links li {
    width: auto;
    opacity: 1;
    transform: none;
    margin: 0;
  }

  .nav-link {
    padding: 0.75rem 1.25rem;
    font-size: 1.05rem;
  }

  .link-underline {
    bottom: 6px;
  }

  .theme-toggle-container {
    margin-top: 0;
    padding-top: 0;
    margin-left: 1rem;
  }

  .theme-toggle-container::before {
    display: none;
  }

  .theme-toggle {
    width: 40px;
    height: 40px;
  }
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.rotate-icon-enter-active,
.rotate-icon-leave-active {
  transition: all 0.4s var(--easing);
}

.rotate-icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg);
}

.rotate-icon-leave-to {
  opacity: 0;
  transform: rotate(90deg);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding: 0 1.5rem;
  }
  
  .logo-image {
    height: 32px;
  }
  
  .logo-text {
    font-size: 1.1rem;
    margin-left: 10px;
  }
}
</style>