<template>
  <div class="contact-page">
    <ContactSection />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ContactSection from '@/components/ContactSection.vue';

export default defineComponent({
  name: 'ContactView',
  components: {
    ContactSection
  }
});
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  padding-top: 80px; /* Account for fixed header */
}
</style> 