<template>
  <section id="projects" class="projects-section">
    <div class="container">
      <h3 class="section-title">Projects</h3>
      <div class="projects-grid">
        <div v-for="project in projects" :key="project.id" class="project-card">
          <img 
            :src="getImagePath(project.image)" 
            :alt="project.title" 
            class="project-image" 
          />
          <div class="project-content">
            <h4 class="project-title">{{ project.title }}</h4>
            <p class="project-description">{{ project.description }}</p>
            <button @click="viewProject(project.id)" class="view-button">View Details</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ProjectsSection',
  setup() {
    const projects = ref([
      { id: 1, title: 'Mellaundry', description: 'A brief description of the project.', image: 'lm.jpg' },
      { id: 2, title: 'Pamoja Twaweza', description: 'A brief description of the project.', image: 'pamojaTwaweza.png' },
      { id: 3, title: 'Refugee Brotherhood', description: 'A brief description of the project.', image: 'project3.jpg' },
      { id: 4, title: 'Revuze', description: 'A brief description of the project.', image: 'revuze.png' },
      { id: 5, title: 'NFT Store', description: 'A brief description of the project.', image: 'nft.jpg' },
      { id: 6, title: 'Project 6', description: 'A brief description of the project.', image: 'project6.jpg' },
      // Add more projects as needed
    ]);

    const images = import.meta.glob('/src/assets/images/*.{jpg,png}', { eager: true, as: 'url' });

    const getImagePath = (imageName: string) => {
      return images[`/src/assets/images/${imageName}`] || '';  
    };

    const viewProject = (id: number) => {
      console.log(`Viewing project with ID: ${id}`);
      // Implement project detail view logic here
    };

    return { projects, getImagePath, viewProject };
  }
});
</script>

<style scoped>
.projects-section {
  padding: 4rem 2rem;
  background-color: #F5EFE7;
  color: #2d3748;
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
  color: #213555;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background-color: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: fadeInUp 0.5s ease forwards;
  opacity: 0;
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.project-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.project-content {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #3E5879;
}

.project-description {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #4a5568;
}

.view-button {
  background-color: #D8C4B6;
  color: #213555;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.view-button:hover {
  background-color: #3E5879;
  color: #F5EFE7;
  transform: translateY(-2px);
}

@keyframes fadeInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>