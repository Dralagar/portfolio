<template>
  <section id="contact" class="contact-section">
    <div class="overlay">
      <div class="container">
        <h3 class="section-title">Contact Me</h3>
        <p class="section-description">Feel free to reach out for collaborations or just a friendly chat.</p>
        <form @submit.prevent="sendEmail" class="contact-form">
          <input v-model="form.name" type="text" placeholder="Your Name" class="form-input" required />
          <input v-model="form.email" type="email" placeholder="Your Email" class="form-input" required />
          <textarea v-model="form.message" placeholder="Your Message" class="form-textarea" required></textarea>
          <button type="submit" class="submit-button">Send Message</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import emailjs from 'emailjs-com';

export default defineComponent({
  name: 'ContactSection',
  setup() {
    const form = reactive({
      name: '',
      email: '',
      message: ''
    });

    const sendEmail = () => {
      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form, 'YOUR_USER_ID')
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          alert('Message sent successfully!');
        }, (error) => {
          console.log('FAILED...', error);
          alert('Failed to send message. Please try again later.');
        });
    };

    return { form, sendEmail };
  }
});
</script>

<style scoped>
.contact-section {
  position: relative;
  padding: 4rem 2rem;
  background: url('@/assets/images/contact-bg.jpg') no-repeat center center/cover;
  color: #edf2f7;
  text-align: center;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 2rem;
  border-radius: 0.5rem;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.section-description {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.contact-form {
  display: grid;
  gap: 1rem;
}

.form-input, .form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #edf2f7;
  color: #2d3748;
  font-size: 1rem;
}

.form-textarea {
  height: 150px;
  resize: none;
}

.submit-button {
  background-color: #63b3ed;
  color: #1a202c;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #4299e1;
}
</style>
