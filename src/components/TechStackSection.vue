<template>
  <section class="tech-stack-section">
    <div class="container">
      <h2 class="section-title">Tech Stack</h2>
      <div class="tech-stack">
        <div class="tech-card" v-for="tech in techStack" :key="tech.name">
          <img :src="tech.image" :alt="tech.name" class="tech-image" />
          <span class="tech-name">{{ tech.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TechStackSection',
  setup() {
    const techStack = ref([
      { name: 'JavaScript', image: '/path/to/javascript-icon.png' },
      { name: 'TypeScript', image: '/path/to/typescript-icon.png' },
      { name: 'Vue.js', image: '/path/to/vue-icon.png' },
      { name: 'React', image: '/path/to/react-icon.png' },
      { name: 'Node.js', image: '/path/to/nodejs-icon.png' },
      { name: 'Express', image: '/path/to/express-icon.png' },
      { name: 'MongoDB', image: '/path/to/mongoDB.png' },
      { name: 'GraphQL', image: '/path/to/graphql-icon.png' },
      { name: 'HTML5', image: '/path/to/html5-icon.png' },  
      { name: 'CSS3', image: '/path/to/css3-icon.png' },
      { name: 'Sass', image: '/path/to/sass-icon.png' },
      { name: 'Tailwind CSS', image: '/path/to/tailwind-icon.png' },
      { name: 'Docker', image: '/path/to/docker-icon.png' },
      { name: 'Git', image: '/path/to/git-icon.png' },
      { name: 'GitHub', image: '/path/to/github-icon.png' },
      { name: 'AWS', image: '/path/to/aws-icon.png' },
      { name: 'Firebase', image: '/path/to/firebase-icon.png' },
      { name: 'Jest', image: '/path/to/jest-icon.png' },
      { name: 'Cypress', image: '/path/to/cypress-icon.png' },
      { name: 'Webpack', image: '/path/to/webpack-icon.png' },
      { name: 'Babel', image: '/path/to/babel-icon.png' }
    ]);

    return { techStack };
  }
});
</script>

<style scoped>
.tech-stack-section {
  padding: 4rem 2rem;
  background-color: #F5EFE7;
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
  margin-bottom: 3rem;
  color: #3E5879;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}

.tech-card {
  background-color: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 150px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tech-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.tech-image {
  width: 50px;
  height: 50px;
  margin-bottom: 0.5rem;
}

.tech-name {
  font-size: 1rem;
  font-weight: 500;
  color: #3E5879;
}
</style>
