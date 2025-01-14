<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- About Section -->
        <div class="footer-section about">
          <h4 class="footer-title">About Me</h4>
          <p class="footer-description">
            I am a passionate developer dedicated to building innovative, dynamic, and responsive web solutions that drive engagement and deliver value.
          </p>
        </div>

        <!-- Contact Section -->
        <div class="footer-section contact">
          <h4 class="footer-title">Get in Touch</h4>
          <ul class="contact-list">
            <li>Email: <a href="mailto:your.email@example.com" class="contact-link">your.email@example.com</a></li>
            <li>Phone: <a href="tel:+1234567890" class="contact-link">+123 456 7890</a></li>
            <li>Location: Nairobi, Kenya</li>
          </ul>
        </div>

        <!-- Social Media Section -->
        <div class="footer-section social">
          <h4 class="footer-title">Follow Me</h4>
          <ul class="social-list">
            <li><a href="#" class="social-link"><i class="fab fa-twitte"></i> Twitter</a></li>
            <li><a href="#" class="social-link"><i class="fab fa-linkedin"></i> LinkedIn</a></li>
            <li><a href="#" class="social-link"><i class="fab fa-github"></i> GitHub</a></li>
            <li><a href="#" class="social-link"><i class="fab fa-instagram"></i> Instagram</a></li>
          </ul>
        </div>

        <!-- Newsletter Section -->
        <div class="footer-section newsletter">
          <h4 class="footer-title">Stay Updated</h4>
          <form class="newsletter-form" @submit.prevent="subscribeNewsletter">
            <input
              type="email"
              placeholder="Enter your email"
              class="newsletter-input"
              required
            />
            <button type="submit" class="newsletter-button">Subscribe</button>
          </form>
        </div>
      </div>

      <!-- Footer Bottom -->  
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} George Dralagar @React Now Dev. All rights reserved.</p>
        <button @click="scrollToTop" class="back-to-top">Back to Top</button>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Footer',
  setup() {
    const currentYear = ref(new Date().getFullYear());

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const subscribeNewsletter = () => {
      alert('Thank you for subscribing!');
    };

    return { currentYear, scrollToTop, subscribeNewsletter };
  },
});
</script>

<style scoped>
.footer {
  background-color: #213555;
  color: #F5EFE7;
  padding: 3rem 1rem;
  text-align: center;
  position: relative;
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section {
  text-align: left;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #D8C4B6;
}

.footer-description {
  font-size: 1rem;
  line-height: 1.5;
}

.contact-list {
  list-style: none;
  padding: 0;
}

.contact-link {
  color: #F5EFE7;
  text-decoration: none;
}

.contact-link:hover {
  text-decoration: underline;
}

.social-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.social-link {
  color: #F5EFE7;
  text-decoration: none;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.social-link:hover {
  color: #D8C4B6;
}

.newsletter-form {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.newsletter-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #3E5879;
  border-radius: 0.5rem;
  outline: none;
}

.newsletter-button {
  background-color: #D8C4B6;
  color: #213555;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.newsletter-button:hover {
  background-color: #3E5879;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.back-to-top {
  background-color: #D8C4B6;
  color: #213555;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-to-top:hover {
  background-color: #3E5879;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}

.futuristic-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #0a0a0a;
  color: #fff;
  text-align: center;
  gap: 2rem;
}

.futuristic-container h2 {
  font-size: 2rem;
  color: #00e6e6;
  text-shadow: 0 0 10px #00e6e6, 0 0 20px #00e6e6, 0 0 30px #00e6e6;
  margin-bottom: 1rem;
}

.futuristic-container p, .futuristic-container ul {
  font-size: 1.2rem;
  line-height: 1.5;
  max-width: 600px;
  margin: 0 auto;
}

.futuristic-container ul {
  list-style: none;
  padding: 0;
}

.futuristic-container li {
  margin: 0.5rem 0;
}

.futuristic-container a {
  color: #00e6e6;
  text-decoration: none;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

.futuristic-container a:hover {
  color: #fff;
  text-shadow: 0 0 5px #00e6e6, 0 0 10px #00e6e6, 0 0 15px #00e6e6;
}

.social-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: 2px solid #00e6e6;
  border-radius: 0.5rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.social-link:hover {
  background-color: #00e6e6;
  color: #0a0a0a;
  transform: scale(1.1);
}
</style>
