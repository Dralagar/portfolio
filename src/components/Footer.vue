<template>
  <footer class="footer">
    <!-- Animated wave decoration -->
      <div class="footer-wave"></div>
    
    <div class="footer-container">
      <!-- Main footer content sections -->
      <div class="footer-grid">
        <!-- About Section -->
        <section class="footer-section" data-aos="fade-up">
          <h3 class="section-title">About Me</h3>
          <p class="section-description">
            Crafting digital experiences that bridge innovation and purpose. Full-stack developer passionate about creating impactful solutions.
          </p>
          <div class="tech-stack">
            <span 
              v-for="tech in techStack" 
                  :key="tech.name" 
                  class="tech-badge"
              :style="{ backgroundColor: tech.color }"
            >
              <font-awesome-icon :icon="tech.icon" class="tech-icon" />
              {{ tech.name }}
            </span>
          </div>
        </section>

        <!-- Quick Links -->
        <section class="footer-section" data-aos="fade-up" data-aos-delay="100">
          <h3 class="section-title">Quick Links</h3>
          <nav>
            <ul class="link-list">
              <li 
                v-for="link in quickLinks" 
                :key="link.path"
                class="link-item"
                :class="{ 'active': $route.path === link.path }"
              >
                <router-link :to="link.path" class="nav-link">
                <font-awesome-icon :icon="link.icon" class="link-icon" />
                {{ link.name }}
              </router-link>
            </li>
          </ul>
          </nav>
        </section>

        <!-- Contact Information -->
        <section class="footer-section" data-aos="fade-up" data-aos-delay="200">
          <h3 class="section-title">Contact</h3>
          <address class="contact-info">
            <div 
              v-for="contact in contactInfo" 
                 :key="contact.type" 
                 class="contact-item"
              @click="handleContact(contact)"
            >
              <font-awesome-icon :icon="contact.icon" class="contact-icon" />
              <a 
                v-if="contact.type === 'email'" 
                :href="`mailto:${contact.value}`"
                class="contact-link"
              >
                {{ contact.value }}
              </a>
              <span v-else>{{ contact.value }}</span>
            </div>
          </address>
        </section>

        <!-- Newsletter Subscription -->
        <section class="footer-section" data-aos="fade-up" data-aos-delay="300">
          <h3 class="section-title">Newsletter</h3>
          <form @submit.prevent="handleSubscribe" class="newsletter-form">
            <div class="input-group">
              <input
                v-model="email"
                type="email"
                placeholder="Your email address"
                required
                class="newsletter-input"
                :class="{ 'error': emailError }"
                @input="validateEmail"
              >
              <button 
                type="submit" 
                class="submit-button"
                :disabled="!isValidEmail"
              >
                <font-awesome-icon icon="paper-plane" />
              </button>
            </div>
            <p v-if="emailError" class="error-message">{{ emailError }}</p>
            <p v-if="subscriptionSuccess" class="success-message">
              Thank you for subscribing!
            </p>
          </form>
        </section>
      </div>

      <!-- Social Media Links -->
      <div class="social-links" data-aos="fade-up" data-aos-delay="400">
        <a
          v-for="social in socialLinks"
           :key="social.platform"
           :href="social.url"
          :aria-label="social.name"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
           :class="social.platform"
        >
          <font-awesome-icon :icon="['fab', social.icon]" />
        </a>
      </div>

      <!-- Copyright and Back-to-top -->
      <div class="footer-bottom">
        <p class="copyright">
          &copy; {{ currentYear }} George Dralagar. All rights reserved.
        </p>
        <button
          @click="scrollToTop"
                class="back-to-top" 
          :class="{ 'visible': showBackToTop }"
          aria-label="Scroll to top"
        >
          <font-awesome-icon icon="chevron-up" />
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faCode, faBlog, faEnvelope, faMapMarkerAlt, 
  faPaperPlane, faChevronUp 
} from '@fortawesome/free-solid-svg-icons'
import { 
  faVuejs, faReact, faNodeJs,
  faGithub, faLinkedin, faTwitter, faInstagram 
} from '@fortawesome/free-brands-svg-icons'

// Register Font Awesome icons
library.add(
  faCode, faBlog, faEnvelope, faMapMarkerAlt,
  faPaperPlane, faChevronUp, faVuejs, faReact,
  faNodeJs, faGithub, faLinkedin, faTwitter, faInstagram
)

const route = useRoute()
const currentYear = new Date().getFullYear()
const email = ref('')
const emailError = ref('')
const subscriptionSuccess = ref(false)
const showBackToTop = ref(false)

// Data
    const techStack = [
      { name: 'Vue', icon: 'vuejs', color: '#42b883' },
      { name: 'React', icon: 'react', color: '#61dafb' },
      { name: 'Node.js', icon: 'node-js', color: '#339933' }
]

    const quickLinks = [
      { name: 'Projects', path: '/projects', icon: 'code' },
      { name: 'Blog', path: '/blog', icon: 'blog' },
      { name: 'Contact', path: '/contact', icon: 'envelope' }
]

    const contactInfo = [
      { type: 'email', value: 'gdralagar@gmail.com', icon: 'envelope' },
      { type: 'location', value: 'Nairobi, Kenya', icon: 'map-marker-alt' }
]

    const socialLinks = [
      { platform: 'github', name: 'GitHub', icon: 'github', url: 'https://github.com/Dralagar' },
      { platform: 'linkedin', name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/in/george-dralagar' },
      { platform: 'twitter', name: 'Twitter', icon: 'twitter', url: 'https://twitter.com/your-handle' },
      { platform: 'instagram', name: 'Instagram', icon: 'instagram', url: 'https://instagram.com/your-handle' }
]

// Computed
    const isValidEmail = computed(() => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email.value)
})

// Methods
    const validateEmail = () => {
  if (!email.value) {
    emailError.value = ''
    return
  }
  emailError.value = isValidEmail.value ? '' : 'Please enter a valid email'
}

const handleSubscribe = () => {
  if (!isValidEmail.value) {
    emailError.value = 'Please enter a valid email'
    return
  }
  
  // Here you would typically call an API
  console.log('Subscribing:', email.value)
  subscriptionSuccess.value = true
  email.value = ''
  
  // Reset success message after 3 seconds
  setTimeout(() => {
    subscriptionSuccess.value = false
  }, 3000)
}

const handleContact = (contact) => {
  if (contact.type === 'email') {
    window.location.href = `mailto:${contact.value}`
  }
}

    const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

// Lifecycle hooks
    onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

    onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Base Styles */
.footer {
  position: relative;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #ffffff;
  padding: 4rem 0 2rem;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.footer-wave {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='0.1' d='M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'%3E%3C/path%3E%3C/svg%3E") repeat-x;
  background-size: 1440px 60px;
  animation: wave 20s linear infinite;
  z-index: 1;
}

@keyframes wave {
  0% { background-position: 0 0; }
  100% { background-position: 1440px 0; }
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

/* Grid Layout */
.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;
  margin-bottom: 3rem;
}

.footer-section {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.footer-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* Typography */
.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #00f7ff;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 2px;
  background: #00f7ff;
  transition: width 0.3s ease;
}

.footer-section:hover .section-title::after {
  width: 70px;
}

.section-description {
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
}

/* Tech Stack */
.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tech-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  color: white;
  transition: transform 0.2s ease;
}

.tech-badge:hover {
  transform: translateY(-2px);
}

.tech-icon {
  font-size: 0.9rem;
}

/* Navigation Links */
.link-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.link-item {
  margin-bottom: 0.75rem;
  transition: transform 0.3s ease;
}

.link-item:hover {
  transform: translateX(5px);
}

.link-item.active .nav-link {
  color: #00f7ff;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #00f7ff;
}

.link-icon {
  width: 1rem;
  color: #00f7ff;
}

/* Contact Info */
.contact-info {
  font-style: normal;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.contact-item:hover {
  transform: translateX(5px);
}

.contact-icon {
  color: #00f7ff;
  font-size: 1.1rem;
  min-width: 1.1rem;
}

.contact-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: #00f7ff;
}

/* Newsletter Form */
.newsletter-form {
  margin-top: 1rem;
}

.input-group {
  position: relative;
  display: flex;
  margin-bottom: 0.5rem;
}

.newsletter-input {
  width: 100%;
  padding: 0.85rem 1.25rem;
  border: none;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.newsletter-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 2px rgba(0, 247, 255, 0.3);
}

.newsletter-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.newsletter-input.error {
  box-shadow: 0 0 0 2px rgba(255, 68, 68, 0.3);
}

.submit-button {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #00f7ff;
  color: #16213e;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit-button:hover:not(:disabled) {
  background: white;
  transform: translateY(-50%) scale(1.05);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-message {
  color: #ff6b6b;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.success-message {
  color: #51cf66;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

/* Social Links */
.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin: 2.5rem 0;
}

.social-link {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.social-link:hover {
  transform: translateY(-3px) scale(1.1);
}

.social-link.github:hover {
  background: #333;
}

.social-link.linkedin:hover {
  background: #0077b5;
}

.social-link.twitter:hover {
  background: #1da1f2;
}

.social-link.instagram:hover {
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
}

/* Footer Bottom */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.copyright {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #00f7ff;
  color: #16213e;
  border: none;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 247, 255, 0.3);
  z-index: 100;
}

.back-to-top.visible {
  opacity: 1;
  visibility: visible;
}

.back-to-top:hover {
  background: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 247, 255, 0.4);
}

/* Responsive Design */
@media (max-width: 992px) {
  .footer-grid {
    gap: 2rem;
  }
  
  .footer-section {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 3rem 0 1.5rem;
  }
  
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  
  .social-links {
    margin: 2rem 0;
  }
}

@media (max-width: 576px) {
  .footer-container {
    padding: 0 1.5rem;
  }
  
  .footer-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-section {
    padding: 1.25rem;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .back-to-top {
    position: static;
    margin-top: 1rem;
    opacity: 1;
    visibility: visible;
    width: 45px;
    height: 45px;
  }
}

/* Accessibility Improvements */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

:focus-visible {
  outline: 2px solid #00f7ff;
  outline-offset: 2px;
}
</style>