<template>
  <section class="projects-section">
    <div class="container">
      <h2 class="section-title">Featured Projects</h2>
      <div class="project-grid">
        <div
          v-for="project in projects"
          :key="project.id"
          class="project-card"
          @click="() => viewProject(project.id)"
        >
          <div class="project-image">
            <img :src="getImagePath(project.image)" :alt="project.title" />
            <div class="project-overlay">
              <div class="project-links">
                <a :href="project.liveLink" target="_blank" class="project-link">Live Demo</a>
                <a :href="project.githubLink" target="_blank" class="project-link">GitHub</a>
              </div>
            </div>
          </div>
          <div class="project-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-tech">
              <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveLink: string;
  githubLink: string;
}

export default defineComponent({
  name: 'ProjectsSection',
  setup() {
    const projects = ref<Project[]>([
      {
        id: 1,
        title: 'Mellaundry',
        description: 'A modern laundry management system with real-time tracking and automated scheduling.',
        image: 'lm.jpg',
        technologies: ['Vue.js', 'Node.js', 'MongoDB'],
        liveLink: 'https://mellaundry.com',
        githubLink: 'https://github.com/yourusername/mellaundry'
      },
      {
        id: 2,
        title: 'Pamoja Twaweza',
        description: 'Community-driven platform fostering collaboration and resource sharing among NGOs.',
        image: 'pamojaTwaweza.png',
        technologies: ['React', 'Firebase', 'Material-UI'],
        liveLink: 'https://pamojatwaweza.org',
        githubLink: 'https://github.com/yourusername/pamoja-twaweza'
      },
      {
        id: 3,
        title: 'Refugee Brotherhood',
        description: 'Digital platform connecting and supporting refugee communities worldwide.',
        image: 'project3.jpg',
        technologies: ['Next.js', 'GraphQL', 'PostgreSQL'],
        liveLink: 'https://refugee-brotherhood.org',
        githubLink: 'https://github.com/yourusername/refugee-brotherhood'
      },
      {
        id: 4,
        title: 'Revuze',
        description: 'AI-powered review analysis and sentiment tracking platform.',
        image: 'revuze.png',
        technologies: ['Python', 'TensorFlow', 'React'],
        liveLink: 'https://revuze.ai',
        githubLink: 'https://github.com/yourusername/revuze'
      },
      {
        id: 5,
        title: 'NFT Marketplace',
        description: 'Decentralized marketplace for trading digital art and collectibles.',
        image: 'nft.jpg',
        technologies: ['Solidity', 'Web3.js', 'React'],
        liveLink: 'https://nft-marketplace.com',
        githubLink: 'https://github.com/yourusername/nft-marketplace'
      }
    ]);

    const images = reactive<Record<string, string>>({});

    const importImages = async () => {
      const imageContext = (require as any).context('../assets/images', false, /\.(jpg|png)$/);
      imageContext.keys().forEach((key: string) => {
        const name = key.split('/').pop() || '';
        if (name) {
          images[name] = imageContext(key).default;
        }
      });
    };

    importImages();

    const getImagePath = (imageName: string): string => {
      return images[imageName] || '';
    };

    const viewProject = (id: number): void => {
      console.log(`Viewing project with ID: ${id}`);
    };

    return { projects, getImagePath, viewProject };
  },
});
</script>

<style scoped>
.projects-section {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3rem;
  color: #213555;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #3E5879;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.project-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(33, 53, 85, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  padding: 0.5rem 1rem;
  background: white;
  color: #213555;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.project-link:hover {
  background: #3E5879;
  color: white;
}

.project-content {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.25rem;
  color: #213555;
  margin-bottom: 0.5rem;
}

.project-description {
  color: #4a5568;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  padding: 0.25rem 0.75rem;
  background: #f1f5f9;
  color: #3E5879;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .projects-section {
    padding: 4rem 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .project-grid {
    grid-template-columns: 1fr;
  }
}
</style>
