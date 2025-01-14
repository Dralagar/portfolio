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
import axios from 'axios';

export default defineComponent({
  name: 'BlogSection',
  setup() {
    const posts = ref([]);

    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://your-backend-api.com/api/posts');
        posts.value = response.data;
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    const viewPost = (id: number) => {
      // Implement navigation to the full blog post
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

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.blog-card {
  background-color: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.blog-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #D8C4B6;
}

.blog-excerpt {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #4a5568;
}

.read-more-button {
  background-color: #D8C4B6;
  color: #213555;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.read-more-button:hover {
  background-color: #3E5879;
  color: #F5EFE7;
}
</style>
