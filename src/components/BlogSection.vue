<template>
  <section class="blog-section">
    <div class="container">
      <h2 class="section-title">Latest Blog Posts</h2>
      <div class="blog-grid">
        <div v-for="post in posts" :key="post.id" class="blog-card">
          <h3 class="blog-title">{{ post.title }}</h3>
          <p class="blog-excerpt">{{ post.excerpt }}</p>
          <button @click="viewPost(post.id)" class="read-more-button">Read More</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'your-project-id',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-10-01'
});

export default defineComponent({
  name: 'BlogSection',
  setup() {
    const posts = ref([]);

    const fetchPosts = async () => {
      try {
        const sanityPosts = await client.fetch('*[_type == "post"]');
        posts.value = sanityPosts;
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    const viewPost = (id) => {
      console.log(`Viewing post with ID: ${id}`);
    };

    onMounted(() => {
      fetchPosts();
    });

    return { posts, viewPost };
  }
});
</script>

<style scoped>
.blog-section {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #948979, #DFD0B8);
  color: #153448;
  text-align: center;
  overflow: hidden;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #3C5B6F;
  text-shadow: 0 0 10px #DFD0B8;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.blog-card {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.75rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.blog-card:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.blog-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #153448;
  text-shadow: 0 0 5px #DFD0B8;
}

.blog-excerpt {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #4a5568;
}

.read-more-button {
  background-color: #3C5B6F;
  color: #DFD0B8;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.read-more-button:hover {
  background-color: #153448;
  color: #DFD0B8;
  transform: scale(1.1);
}

@media (min-width: 768px) {
  .blog-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
