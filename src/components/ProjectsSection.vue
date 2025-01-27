<template>
  <div class="projects-section">
    <h2>Projects</h2>
    <div class="project-list">
      <div
        v-for="project in projects"
        :key="project.id"
        class="project-card"
        @click="() => viewProject(project.id)"
      >
        <img :src="getImagePath(project.image)" alt="Project image" />
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  name: 'ProjectsSection',
  setup() {
    // Define the list of projects
    const projects = ref([
      { id: 1, title: 'Mellaundry', description: 'A brief description of the project.', image: 'lm.jpg' },
      { id: 2, title: 'Pamoja Twaweza', description: 'A brief description of the project.', image: 'pamojaTwaweza.png' },
      { id: 3, title: 'Refugee Brotherhood', description: 'A brief description of the project.', image: 'project3.jpg' },
      { id: 4, title: 'Revuze', description: 'A brief description of the project.', image: 'revuze.png' },
      { id: 5, title: 'NFT Store', description: 'A brief description of the project.', image: 'nft.jpg' },
      { id: 6, title: 'Project 6', description: 'A brief description of the project.', image: 'project6.jpg' },
    ]);

    // Define 'images' as a reactive object to store dynamically imported images
    const images = reactive<Record<string, string>>({});

    // Function to dynamically import images from the assets folder
    const importImages = async () => {
      const imageContext = (require as any).context('../assets/images', false, /\.(jpg|png)$/);
      imageContext.keys().forEach((key: string) => {
        const name = key.split('/').pop() || '';
        if (name) {
          images[name] = imageContext(key).default;
        }
      });
    };
    // Call importImages to load images when the component is set up
    importImages();

    // Function to get the image path from the 'images' object
    const getImagePath = (imageName: string): string => {
      return images[imageName] || ''; // Return the image path or an empty string if not found
    };

    // Function to handle viewing a project
    const viewProject = (id: number): void => {
      console.log(`Viewing project with ID: ${id}`);
    };

    // Return the properties to be used in the template
    return { projects, getImagePath, viewProject };
  },
});
</script>

<style scoped>
.projects-section {
  padding: 20px;
}

.project-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.project-card {
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: scale(1.05);
}

.project-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.project-card h3 {
  margin: 10px 0;
  font-size: 1.2rem;
  text-align: center;
}

.project-card p {
  padding: 0 10px;
  font-size: 0.9rem;
  text-align: center;
}
</style>
