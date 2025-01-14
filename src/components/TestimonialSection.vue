<template>
  <section class="testimonial-section">
    <div class="container">
      <h2 class="section-title">Client Testimonials</h2>
      <div class="testimonial-row">
        <div class="testimonial-card" v-for="testimonial in testimonials" :key="testimonial.id">
          <div class="testimonial-header">
            <img :src="testimonial.photo" :alt="testimonial.name" class="client-photo" />
            <div class="client-info">
              <span class="client-name">{{ testimonial.name }}</span>
              <div class="star-rating">
                <i v-for="star in 5" :key="star" class="fas fa-star" :class="{ 'filled': star <= testimonial.rating }"></i>
              </div>
            </div>
          </div>
          <p class="client-feedback">"{{ testimonial.feedback }}"</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TestimonialSection',
  setup() {
    const testimonials = ref([
      {
        id: 1,
        name: 'John Doe',
        photo: '@/assets/images/john-doe.jpg',
        feedback: 'This service was exceptional and exceeded my expectations!',
        rating: 5
      },
      {
        id: 2,
        name: 'Jane Smith',
        photo: '@/assets/images/jane-smith.jpg',
        feedback: 'Highly professional and reliable. I would recommend them to anyone.',
        rating: 4
      },
      {
        id: 3,
        name: 'Emily Johnson',
        photo: '@/assets/images/emily-johnson.jpg',
        feedback: 'A wonderful experience from start to finish. Truly outstanding!',
        rating: 5
      }
      // Add more testimonials as needed
    ]);

    return { testimonials };
  }
});
</script>

<style scoped>
.testimonial-section {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #213555, #3E5879);
  color: #F5EFE7;
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #D8C4B6;
}

.testimonial-row {
  display: flex;
  overflow-x: auto;
  gap: 2rem;
  padding: 1rem 0;
  scroll-snap-type: x mandatory;
}

.testimonial-card {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  width: 300px;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(10px);
  scroll-snap-align: start;
  flex: 0 0 auto;
}

.testimonial-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
}

.testimonial-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.client-photo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 1rem;
  border: 2px solid #D8C4B6;
}

.client-info {
  display: flex;
  flex-direction: column;
}

.client-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #F5EFE7;
}

.star-rating {
  display: flex;
}

.star-rating .fa-star {
  color: #D8C4B6;
  margin-right: 0.2rem;
}

.star-rating .fa-star.filled {
  color: #FFD700; /* Gold color for filled stars */
}

.client-feedback {
  font-size: 1rem;
  font-style: italic;
  color: #F5EFE7;
}
</style>
