<template>
  <section class="contact-section" ref="contactSection" id="contact">
    <div class="contact-container">
      <div class="contact-content">
        <div class="contact-header">
          <h3 class="section-title">
            <span class="title-text">Get In Touch</span>
            <span class="title-underline"></span>
          </h3>
          <p class="section-description">
            Let's collaborate on your next project or just say hello. I'll get back to you within 24 hours.
          </p>
        </div>

        <div class="contact-body">
          <form @submit.prevent="sendEmail" class="contact-form">
            <div class="form-group floating">
              <input 
                v-model="form.name" 
                type="text" 
                id="name" 
                class="form-input" 
                required 
                placeholder=" "
              />
              <label for="name">Your Name</label>
              <div class="input-highlight"></div>
            </div>

            <div class="form-group floating">
              <input 
                v-model="form.email" 
                type="email" 
                id="email" 
                class="form-input" 
                required 
                placeholder=" "
              />
              <label for="email">Your Email</label>
              <div class="input-highlight"></div>
            </div>

            <div class="form-group floating">
              <textarea 
                v-model="form.message" 
                id="message" 
                class="form-textarea" 
                required 
                placeholder=" "
              ></textarea>
              <label for="message">Your Message</label>
              <div class="input-highlight"></div>
            </div>

            <button type="submit" class="submit-button" :disabled="isSubmitting">
              <span class="button-text">{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
              <span class="button-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </button>
          </form>

          <div class="contact-decoration">
            <div class="decoration-circle"></div>
            <div class="decoration-dots"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import emailjs from 'emailjs-com';

export default defineComponent({
  name: 'ContactSection',
  setup() {
    const form = reactive({
      name: '',
      email: '',
      message: ''
    });

    const isSubmitting = ref(false);
    const contactSection = ref<HTMLElement | null>(null);

    const sendEmail = () => {
      isSubmitting.value = true;
      
      emailjs.send(
        'YOUR_SERVICE_ID', 
        'YOUR_TEMPLATE_ID', 
        form, 
        'YOUR_USER_ID'
      )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        showSuccessNotification();
        resetForm();
      })
      .catch((error) => {
        console.log('FAILED...', error);
        showErrorNotification();
      })
      .finally(() => {
        isSubmitting.value = false;
      });
    };

    const showSuccessNotification = () => {
      // You can replace this with a proper notification component
      alert('Message sent successfully! I\'ll get back to you soon.');
    };

    const showErrorNotification = () => {
      alert('Oops! Something went wrong. Please try again or email me directly.');
    };

    const resetForm = () => {
      form.name = '';
      form.email = '';
      form.message = '';
    };

    return { 
      form, 
      sendEmail, 
      contactSection,
      isSubmitting
    };
  }
});
</script>

<style scoped>
/* Base variables */
:root {
  --primary-color: #4361ee;
  --primary-hover: #3a56d4;
  --text-color: #2b2d42;
  --text-light: #f8f9fa;
  --bg-color: #ffffff;
  --input-bg: #f8f9fa;
  --input-border: #e9ecef;
  --success-color: #4bb543;
  --error-color: #ff3333;
  --transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.dark {
  --text-color: #f8f9fa;
  --bg-color: #121212;
  --input-bg: #1e1e1e;
  --input-border: #333;
}

/* Base styles */
.contact-section {
  position: relative;
  width: 100%;
  padding: 6rem 1.5rem;
  background-color: var(--bg-color);
  color: var(--text-color);
  overflow: hidden;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
}

.contact-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
}

/* Header styles */
.contact-header {
  text-align: center;
  margin-bottom: 3rem;
  max-width: 700px;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}

.title-text {
  position: relative;
  z-index: 2;
}

.title-underline {
  position: absolute;
  bottom: 8px;
  left: 0;
  width: 100%;
  height: 12px;
  background-color: rgba(67, 97, 238, 0.3);
  z-index: 1;
  transform-origin: left;
  transition: var(--transition);
}

.section-title:hover .title-underline {
  transform: scaleX(1.1);
  background-color: rgba(67, 97, 238, 0.5);
}

.section-description {
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.6;
  color: inherit;
  opacity: 0.9;
}

/* Form styles */
.contact-body {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

.contact-form {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: grid;
  gap: 1.5rem;
}

.form-group {
  position: relative;
}

.form-input, .form-textarea {
  width: 100%;
  padding: 1.5rem 1rem 0.5rem;
  border: 1px solid var(--input-border);
  border-radius: 8px;
  background-color: var(--input-bg);
  color: var(--text-color);
  font-size: 1rem;
  transition: var(--transition);
}

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
}

.form-textarea {
  min-height: 150px;
  resize: vertical;
}

/* Floating label effect */
.floating label {
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: var(--text-color);
  opacity: 0.7;
  font-size: 1rem;
  pointer-events: none;
  transform-origin: left;
  transition: var(--transition);
}

.floating .form-input:focus ~ label,
.floating .form-input:not(:placeholder-shown) ~ label,
.floating .form-textarea:focus ~ label,
.floating .form-textarea:not(:placeholder-shown) ~ label {
  transform: translateY(-0.5rem) scale(0.85);
  opacity: 1;
  color: var(--primary-color);
}

.input-highlight {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: var(--transition);
}

.form-input:focus ~ .input-highlight,
.form-textarea:focus ~ .input-highlight {
  width: 100%;
}

/* Submit button */
.submit-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
}

.submit-button:hover {
  background-color: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
}

.submit-button:active {
  transform: translateY(0);
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-icon svg {
  transition: var(--transition);
}

.submit-button:hover .button-icon svg {
  transform: translateX(4px);
}

/* Decorative elements */
.contact-decoration {
  display: none;
}

.decoration-circle {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(67, 97, 238, 0.1) 0%, rgba(67, 97, 238, 0) 70%);
  z-index: -1;
}

.decoration-dots {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(var(--primary-color) 1px, transparent 1px);
  background-size: 15px 15px;
  opacity: 0.1;
  z-index: -1;
}

/* Responsive layout */
@media (min-width: 768px) {
  .contact-section {
    padding: 8rem 2rem;
  }
  
  .contact-body {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
  
  .contact-decoration {
    display: block;
    position: relative;
    height: 100%;
  }
  
  .decoration-circle {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .decoration-dots {
    top: 0;
    left: 0;
  }
}

@media (min-width: 1024px) {
  .contact-section {
    padding: 10rem 2rem;
  }
  
  .contact-form {
    gap: 2rem;
  }
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.contact-content {
  animation: fadeIn 0.8s ease-out forwards;
}

/* Remove vertical scrollbar */
html {
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

html::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}
</style>