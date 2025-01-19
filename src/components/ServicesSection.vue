<template>
  <section class="services-section">
    <div class="container">
      <h2 class="section-title">Our Services</h2>
      <p class="section-description">
        We offer a wide range of digital services to help you build and grow your online presence.
      </p>
      <div class="services-list">
        <div class="service-card" v-for="service in services" :key="service.title">
          <img :src="service.icon" :alt="service.title" class="service-icon" />
          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-description">{{ service.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

// Import service icons
import webDevIcon from '@/assets/icons/web-development.png';
import frontEndIcon from '@/assets/icons/front-end.png';
import backEndIcon from '@/assets/icons/back-end.png';
import socialMediaIcon from '@/assets/icons/social-media.png';
import brandingIcon from '@/assets/icons/branding.png';

export default defineComponent({
  name: 'ServicesSection',
  setup() {
    const services = ref([
      {
        title: 'Web Development',
        icon: webDevIcon,
        description: 'Building responsive and high-performance websites tailored to your needs.',
      },
      {
        title: 'Front End Development',
        icon: frontEndIcon,
        description: 'Creating visually appealing and user-friendly interfaces.',
      },
      {
        title: 'Back End Development',
        icon: backEndIcon,
        description: 'Developing robust server-side applications and APIs.',
      },
      {
        title: 'Social Media Management',
        icon: socialMediaIcon,
        description: 'Enhancing your brand presence across social media platforms.',
      },
      {
        title: 'Branding & Identity',
        icon: brandingIcon,
        description: 'Crafting unique brand identities that resonate with your audience.',
      },
    ]);

    return { services };
  }
});
</script>

<style scoped>
.services-section {
  padding: 4rem 2rem;
  background-color: #f0f4f8;
  color: #213555;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #3E5879;
}

.section-description {
  font-size: 1.25rem;
  margin-bottom: 3rem;
  color: #5A6B7D;
}

.services-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

.service-card {
  background-color: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 250px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.service-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 1rem;
}

.service-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #3E5879;
}

.service-description {
  font-size: 1rem;
  color: #5A6B7D;
}
</style>
