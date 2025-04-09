<template>
  <section class="blog-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">
          <span class="highlight">Latest</span> Blog Posts
        </h2>
        <p class="section-subtitle">Insights, Tutorials & Tech Trends</p>
        <div class="user-tokens">
          <font-awesome-icon icon="coins" />
          <span>{{ userTokens }} Tokens</span>
        </div>
      </div>

      <div class="blog-filters">
        <button 
          v-for="category in categories" 
          :key="category.id"
          :class="['filter-btn', { active: activeCategory === category.id }]"
          @click="activeCategory = category.id"
        >
          <font-awesome-icon :icon="category.icon" class="filter-icon" />
          {{ category.name }}
        </button>
      </div>

      <div class="blog-grid">
        <div 
          v-for="post in filteredPosts" 
          :key="post.id" 
          class="blog-card"
          :class="{ 'featured': post.featured, 'premium': post.isPremium }"
        >
          <div class="blog-image" :style="{ backgroundImage: `url(${post.image})` }">
            <div class="blog-category">
              <font-awesome-icon :icon="post.category.icon" />
              {{ post.category.name }}
            </div>
            <div class="blog-date">
              <font-awesome-icon icon="calendar" />
              {{ formatDate(post.date) }}
            </div>
            <div v-if="post.isPremium" class="premium-badge">
              <font-awesome-icon icon="crown" />
              Premium Content
            </div>
          </div>
          <div class="blog-content">
            <div class="blog-header">
              <div class="author-info">
                <img :src="post.author.avatar" :alt="post.author.name" class="author-avatar">
                <span>{{ post.author.name }}</span>
              </div>
              <div class="engagement-stats">
                <span class="views">
                  <font-awesome-icon icon="eye" />
                  {{ post.engagement.views }}
                </span>
                <span class="completion-rate">
                  <font-awesome-icon icon="chart-line" />
                  {{ Math.round(post.engagement.completionRate * 100) }}%
                </span>
              </div>
            </div>

            <h3 class="blog-title">{{ post.title }}</h3>
            <p class="blog-excerpt">{{ post.excerpt }}</p>
            
            <div class="blog-meta">
              <span class="read-time">
                <font-awesome-icon icon="clock" />
                {{ post.readTime }} min read
              </span>
              <span class="upvotes" @click="upvotePost(post.id)">
                <font-awesome-icon icon="arrow-up" />
                {{ post.upvotes }}
              </span>
              <span class="quality-rating">
                <font-awesome-icon 
                  v-for="star in 5" 
                  :key="star"
                  :icon="star <= getStarRating(post) ? 'star' : 'star'"
                  :class="{ 'active': star <= getStarRating(post) }"
                />
              </span>
            </div>

            <div class="blog-tags">
              <span v-for="tag in post.tags" :key="tag" class="tag">
                #{{ tag }}
              </span>
            </div>

            <div class="blog-actions">
              <button 
                v-if="post.isPremium"
                @click="purchasePremiumContent(post)"
                class="premium-button"
              >
                <font-awesome-icon icon="lock" />
                Unlock for {{ post.price }} Tokens
              </button>
              <button 
                v-else
                @click="viewPost(post.id)" 
                class="read-more-button"
              >
                <span>Read More</span>
                <font-awesome-icon icon="arrow-right" />
              </button>
            </div>

            <div class="comments-section">
              <h4>Comments ({{ post.comments.length }})</h4>
              <div class="comments-list">
                <div 
                  v-for="comment in post.comments" 
                  :key="comment.id"
                  class="comment"
                  :class="comment.sentiment"
                >
                  <div class="comment-header">
                    <div class="author-info">
                      <img :src="comment.author.avatar" :alt="comment.author.name" class="comment-avatar">
                      <div class="author-details">
                        <span class="comment-author">{{ comment.author.name }}</span>
                        <span class="author-role">{{ comment.author.role }}</span>
                        <span class="author-reputation">
                          <font-awesome-icon icon="star" />
                          {{ comment.author.reputation }}
                        </span>
                      </div>
                    </div>
                    <div class="comment-meta">
                      <span class="comment-date">{{ formatDate(comment.date) }}</span>
                      <span v-if="comment.isVerified" class="verified-badge">
                        <font-awesome-icon icon="check-circle" />
                      </span>
                    </div>
                  </div>

                  <div class="comment-content">
                    <p>{{ comment.content }}</p>
                    <div v-if="comment.images && comment.images.length" class="comment-images">
                      <img 
                        v-for="(image, index) in comment.images" 
                        :key="index"
                        :src="image"
                        :alt="'Comment image ' + (index + 1)"
                        @click="openImageModal(image)"
                      >
                    </div>
                  </div>

                  <div class="comment-actions">
                    <div class="vote-buttons">
                      <button 
                        class="vote-button upvote" 
                        @click="upvoteComment(post.id, comment.id)"
                        :class="{ active: comment.isHelpful }"
                      >
                        <font-awesome-icon icon="arrow-up" />
                        {{ comment.upvotes }}
                      </button>
                      <button 
                        class="vote-button downvote" 
                        @click="downvoteComment(post.id, comment.id)"
                      >
                        <font-awesome-icon icon="arrow-down" />
                        {{ comment.downvotes }}
                      </button>
                    </div>
                    <button 
                      class="helpful-button"
                      @click="markHelpful(post.id, comment.id)"
                      :class="{ active: comment.isHelpful }"
                    >
                      <font-awesome-icon icon="thumbs-up" />
                      Helpful ({{ comment.helpful }})
                    </button>
                    <button 
                      class="report-button"
                      @click="reportComment(post.id, comment.id)"
                    >
                      <font-awesome-icon icon="flag" />
                      Report
                    </button>
                  </div>

                  <div class="comment-tags" v-if="comment.tags && comment.tags.length">
                    <span 
                      v-for="tag in comment.tags" 
                      :key="tag"
                      class="tag"
                    >
                      #{{ tag }}
                    </span>
                  </div>

                  <div class="replies-section" v-if="comment.replies && comment.replies.length">
                    <div 
                      v-for="reply in comment.replies" 
                      :key="reply.id"
                      class="reply"
                    >
                      <div class="reply-header">
                        <div class="author-info">
                          <img :src="reply.author.avatar" :alt="reply.author.name" class="reply-avatar">
                          <div class="author-details">
                            <span class="reply-author">{{ reply.author.name }}</span>
                          </div>
                        </div>
                        <span class="reply-date">{{ formatDate(reply.date) }}</span>
                      </div>
                      <p class="reply-content">{{ reply.content }}</p>
                      <div v-if="reply.images && reply.images.length" class="reply-images">
                        <img 
                          v-for="(image, index) in reply.images" 
                          :key="index"
                          :src="image"
                          :alt="'Reply image ' + (index + 1)"
                          @click="openImageModal(image)"
                        >
                      </div>
                    </div>
                  </div>

                  <div class="add-reply">
                    <textarea 
                      v-model="newReply"
                      placeholder="Write a reply..."
                      rows="2"
                    ></textarea>
                    <button @click="addReply(post.id, comment.id, newReply)" class="submit-reply">
                      <font-awesome-icon icon="reply" />
                    </button>
                  </div>
                </div>
              </div>

              <div class="add-comment">
                <div class="comment-input-wrapper">
                  <textarea 
                    v-model="newComment"
                    placeholder="Add a comment..."
                    rows="3"
                  ></textarea>
                  <div class="comment-actions-bar">
                    <div class="image-upload">
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        @change="handleImageUpload"
                        id="comment-images"
                        class="hidden"
                      >
                      <label for="comment-images" class="upload-button">
                        <font-awesome-icon icon="image" />
                        Add Images
                      </label>
                    </div>
                    <button @click="addComment(post.id, newComment, uploadedImages.map(image => image.name))" class="submit-comment">
                      <font-awesome-icon icon="paper-plane" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="load-more">
        <button 
          @click="loadMorePosts" 
          class="load-more-button"
          :disabled="isLoading"
        >
          <span v-if="!isLoading">Load More Posts</span>
          <span v-else class="loading-spinner">
            <font-awesome-icon icon="spinner" spin />
            Loading...
          </span>
        </button>
      </div>
    </div>

    <!-- Image Modal -->
    <div v-if="showImageModal" class="image-modal" @click="closeImageModal">
      <div class="modal-content">
        <img :src="selectedImage" alt="Enlarged image">
        <button class="close-modal" @click="closeImageModal">
          <font-awesome-icon icon="times" />
        </button>
      </div>
    </div>

    <!-- Rating Modal -->
    <div v-if="showRatingModal" class="rating-modal">
      <div class="modal-content">
        <h3>Rate this content</h3>
        <div class="star-rating">
          <button 
            v-for="star in 5" 
            :key="star"
            @click="() => ratePost(star)"
            :class="{ active: star <= selectedRating }"
            >
            <font-awesome-icon icon="star" />
          </button>
        </div>
        <textarea 
          v-model="ratingComment"
          placeholder="Add a comment about your rating (optional)"
          rows="3"
        ></textarea>
        <div class="modal-actions">
          <button @click="closeRatingModal" class="cancel-button">Cancel</button>
          <button @click="submitRating" class="submit-button">Submit Rating</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faCode, 
  faPalette, 
  faServer, 
  faMobileAlt,
  faDatabase,
  faCloud,
  faCalendar,
  faClock,
  faEye,
  faArrowRight,
  faSpinner,
  faCrown,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faCode,
  faPalette,
  faServer,
  faMobileAlt,
  faDatabase,
  faCloud,
  faCalendar,
  faClock,
  faEye,
  faArrowRight,
  faSpinner,
  faCrown,
  faCheckCircle
);

interface Post {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: number;
  views: number;
  upvotes: number;
  downvotes: number;
  comments: Comment[];
  tags: string[];
  category: {
    id: string;
    name: string;
    icon: string;
  };
  featured: boolean;
  isPremium: boolean;
  price: number;
  author: {
    name: string;
    avatar: string;
    tokens: number;
  };
  engagement: {
    views: number;
    uniqueVisitors: number;
    averageTimeSpent: number;
    completionRate: number;
  };
  metrics: ContentMetrics;
}

interface Comment {
  [x: string]: any;
  id: number;
  author: {
    reputation: any;
    name: string;
    avatar: string;
    role: string;
  };
    reputation: number;
  content: string;
  date: string;
  upvotes: number;
  downvotes: number;
  isVerified: boolean;
  images?: string[];
  replies: Comment[];
  rating?: number;
  helpful: number;
  isHelpful?: boolean;
  isReported?: boolean;
  sentiment?: 'positive' | 'negative' | 'neutral';
  tags?: string[];
}


interface ContentMetrics {
  averageRating: number;
  totalRatings: number;
  helpfulCount: number;
  engagementScore: number;
  sentimentAnalysis: {
    positive: number;
    negative: number;
    neutral: number;
  };
  qualityScore: number;
}

interface TokenReward {
  views: number;
  tokens: number;
  multiplier: number;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

export default defineComponent({
  name: 'BlogSection',
  setup() {
    const posts = ref<Post[]>([
      {
        id: 1,
        title: 'The Future of Web Development: Trends to Watch in 2024',
        excerpt: 'Explore the latest trends shaping the future of web development, from AI integration to advanced frameworks.',
        image: 'https://source.unsplash.com/random/800x600?web-development',
        date: '2024-03-15',
        readTime: 5,
        views: 1234,
        upvotes: 89,
        downvotes: 5,
        comments: [
          {
            id: 1,
            author: {
              name: 'John Doe',
              avatar: 'https://source.unsplash.com/random/100x100?portrait',
              role: 'Senior Developer',
              reputation: 1250
            },
            content: 'Great insights! The AI integration part was particularly interesting.',
            date: '2024-03-16',
            upvotes: 12,
            downvotes: 0,
            isVerified: true,
            images: ['https://source.unsplash.com/random/400x300?coding'],
            replies: [],
            helpful: 15,
            isHelpful: true,
            sentiment: 'positive',
            tags: ['AI', 'Future Tech'],
            reputation: 1250
          }
        ],
        tags: ['web-dev', 'trends', 'future'],
        category: {
          id: 'development',
          name: 'Development',
          icon: 'code'
        },
        featured: true,
        isPremium: true,
        price: 4.99,
        author: {
          name: 'George Dralagar',
          avatar: 'https://source.unsplash.com/random/100x100?portrait',
          tokens: 1500
        },
        engagement: {
          views: 1234,
          uniqueVisitors: 890,
          averageTimeSpent: 4.5,
          completionRate: 0.75
        },
        metrics: {
          averageRating: 4.8,
          totalRatings: 156,
          helpfulCount: 89,
          engagementScore: 92,
          sentimentAnalysis: {
            positive: 85,
            negative: 5,
            neutral: 10
          },
          qualityScore: 4.9
        }
      },
      {
        id: 2,
        title: 'Building Responsive UIs with Modern CSS',
        excerpt: 'Learn how to create beautiful, responsive user interfaces using modern CSS techniques and best practices.',
        image: 'https://source.unsplash.com/random/800x600?css',
        date: '2024-03-10',
        readTime: 4,
        views: 856,
        upvotes: 56,
        downvotes: 0,
        comments: [],
        tags: ['css', 'ui', 'design'],
        category: {
          id: 'design',
          name: 'Design',
          icon: 'palette'
        },
        featured: false,
        isPremium: false,
        price: 0,
        author: {
          name: 'Jane Smith',
          avatar: 'https://source.unsplash.com/random/100x100?portrait',
          tokens: 1000
        },
        engagement: {
          views: 856,
          uniqueVisitors: 560,
          averageTimeSpent: 3.5,
          completionRate: 0.65
        },
        metrics: {
          averageRating: 4.5,
          totalRatings: 100,
          helpfulCount: 50,
          engagementScore: 80,
          sentimentAnalysis: {
            positive: 70,
            negative: 10,
            neutral: 20
          },
          qualityScore: 4.7
        }
      },
      // Add more posts as needed
    ]);

    const categories = ref<Category[]>([
      { id: 'all', name: 'All Posts', icon: 'code' },
      { id: 'development', name: 'Development', icon: 'code' },
      { id: 'design', name: 'Design', icon: 'palette' },
      { id: 'mobile', name: 'Mobile', icon: 'mobile-alt' },
      { id: 'cloud', name: 'Cloud', icon: 'cloud' }
    ]);

    const activeCategory = ref<string>('all');
    const isLoading = ref<boolean>(false);

    const filteredPosts = computed<Post[]>(() => {
      if (activeCategory.value === 'all') return posts.value;
      return posts.value.filter(post => post.category.id === activeCategory.value);
    });

    const formatDate = (date: string): string => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const viewPost = (id: number): void => {
      console.log(`Viewing post with ID: ${id}`);
      // Add navigation logic here
    };

    const loadMorePosts = async (): Promise<void> => {
      isLoading.value = true;
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Add more posts logic here
      isLoading.value = false;
    };

    const tokenRewards = ref<TokenReward[]>([
      { views: 100, tokens: 10, multiplier: 1 },
      { views: 500, tokens: 50, multiplier: 1.2 },
      { views: 1000, tokens: 100, multiplier: 1.5 },
      { views: 5000, tokens: 500, multiplier: 2 }
    ]);

    const userTokens = ref<number>(100);
    const showPremiumModal = ref<boolean>(false);
    const selectedPost = ref<Post | null>(null);
    const newComment = ref<string>('');
    const newReply = ref<string>('');
    const uploadedImages = ref<File[]>([]);
    const showImageModal = ref<boolean>(false);
    const selectedImage = ref<string>('');
    const showRatingModal = ref<boolean>(false);
    const selectedRating = ref<number>(0);
    const ratingComment = ref<string>('');

    const calculateTokens = (views: number): number => {
      const reward = tokenRewards.value.find(r => views >= r.views);
      if (!reward) return 0;
      return Math.floor(views * reward.tokens * reward.multiplier / reward.views);
    };

    const upvotePost = (postId: number): void => {
      const post = posts.value.find(p => p.id === postId);
      if (post) {
        post.upvotes++;
        // Award tokens for upvoting
        userTokens.value += 5;
      }
    };

    const upvoteComment = (postId: number, commentId: number): void => {
      const post = posts.value.find(p => p.id === postId);
      if (post) {
        const comment = post.comments.find(c => c.id === commentId);
        if (comment) {
          comment.upvotes++;
          // Award tokens for upvoting comments
          userTokens.value += 2;
        }
      }
    };

    const downvoteComment = (postId: number, commentId: number): void => {
      const post = posts.value.find(p => p.id === postId);
      if (post) {
        const comment = post.comments.find(c => c.id === commentId);
        if (comment) {
          comment.downvotes++;
          // Deduct tokens for downvoting comments
          userTokens.value -= 2;
        }
      }
    };

    const markHelpful = (postId: number, commentId: number): void => {
      const post = posts.value.find(p => p.id === postId);
      if (post) {
        const comment = post.comments.find(c => c.id === commentId);
        if (comment && !comment.isHelpful) {
          comment.helpful++;
          comment.isHelpful = true;
          // Award tokens for marking helpful
          userTokens.value += 1;
        }
      }
    };

    const reportComment = (postId: number, commentId: number): void => {
      const post = posts.value.find(p => p.id === postId);
      if (post) {
        const comment = post.comments.find(c => c.id === commentId);
        if (comment && !comment.isReported) {
          comment.isReported = true;
          // Implement reporting logic here
          console.log(`Comment ${commentId} reported for review`);
        }
      }
    };

    const purchasePremiumContent = (post: Post): void => {
      if (userTokens.value >= post.price) {
        userTokens.value -= post.price;
        post.isPremium = false;
        // Award tokens to the author
        post.author.tokens += post.price;
      }
    };

    const trackEngagement = (postId: number): void => {
      const post = posts.value.find(p => p.id === postId);
      if (post) {
        post.engagement.views++;
        // Award tokens based on engagement
        const tokens = calculateTokens(post.engagement.views);
        post.author.tokens += tokens;
      }
    };

    const addComment = async (postId: number, content: string, images: string[] = []): Promise<void> => {
      if (!content.trim()) return;
      
      const post = posts.value.find(p => p.id === postId);
      if (post) {
        // Simulate API call for sentiment analysis
        const sentiment = await analyzeSentiment();
        
        const newComment: Comment = {
          id: Date.now(),
          author: {
            name: 'Current User',
            avatar: 'https://source.unsplash.com/random/100x100?portrait',
            role: 'Community Member',
            reputation: 100
          },
          content,
          date: new Date().toISOString(),
          upvotes: 0,
          downvotes: 0,
          isVerified: false,
          images,
          replies: [],
          helpful: 0,
          sentiment,
          tags: extractTags(content),
          reputation: 100
        };

        post.comments.push(newComment);
        // Award tokens for commenting
        userTokens.value += 2;
        newComment.value = ''; // Clear the input
      }
    };

    const analyzeSentiment = async (): Promise<'positive' | 'negative' | 'neutral'> => {
      // Simulate sentiment analysis API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const sentiments = ['positive', 'negative', 'neutral'];
      return sentiments[Math.floor(Math.random() * sentiments.length)] as 'positive' | 'negative' | 'neutral';
    };

    const extractTags = (content: string): string[] => {
      const hashtagRegex = /#[\w-]+/g;
      return content.match(hashtagRegex)?.map(tag => tag.slice(1)) || [];
    };

    const rateContent = (postId: number, rating: number): void => {
      const post = posts.value.find(p => p.id === postId);
      if (post) {

        // Update post metrics
        post.metrics.totalRatings++;
        post.metrics.averageRating = 
          (post.metrics.averageRating * (post.metrics.totalRatings - 1) + rating) / post.metrics.totalRatings;
        
        // Award tokens for rating
        userTokens.value += 1;
      }
    };

    const openImageModal = (image: string): void => {
      selectedImage.value = image;
      showImageModal.value = true;
    };

    const closeImageModal = (): void => {
      showImageModal.value = false;
    };

    const handleImageUpload = (event: Event): void => {
      const target = event.target as HTMLInputElement;
      if (target && target.files) {
        uploadedImages.value = Array.from(target.files);
      }
    };

    const addReply = (postId: number, commentId: number, content: string): void => {
      const post = posts.value.find(p => p.id === postId);
      if (post) {
        const comment = post.comments.find(c => c.id === commentId);
        if (comment) {
          const newReply: Comment = {
            id: Date.now(),
            author: {
              name: 'Current User',
              avatar: 'https://source.unsplash.com/random/100x100?portrait',
              role: 'Community Member',
              reputation: 100
            },
            content,
            date: new Date().toISOString(),
            upvotes: 0,
            downvotes: 0,
            isVerified: false,
            images: [],
            replies: [],
            helpful: 0,
            sentiment: 'neutral',
            tags: [],
            reputation: 100
          };

          comment.replies.push(newReply);
          // Award tokens for replying
          userTokens.value += 1;
          newReply.value = ''; // Clear the input
        }
      }
    };

    const ratePost = (rating: number): void => {
      selectedRating.value = rating;
    };

    const submitRating = (): void => {
      const post = posts.value.find(p => p.id === selectedPost.value?.id);
      if (post) {
        rateContent(post.id, selectedRating.value);
        showRatingModal.value = false;
      }
    };

    const closeRatingModal = (): void => {
      showRatingModal.value = false;
    };

    const calculateContentQuality = (post: Post): number => {
      // Weight different factors
      const weights = {
        engagement: 0.3,
        sentiment: 0.2,
        helpfulness: 0.2,
        completion: 0.15,
        views: 0.15
      };

      // Calculate engagement score (0-1)
      const engagementScore = Math.min(post.engagement.uniqueVisitors / 1000, 1);

      // Calculate sentiment score (0-1)
      const sentimentScore = post.metrics.sentimentAnalysis.positive / 
        (post.metrics.sentimentAnalysis.positive + post.metrics.sentimentAnalysis.negative + post.metrics.sentimentAnalysis.neutral);

      // Calculate helpfulness score (0-1)
      const helpfulnessScore = Math.min(post.metrics.helpfulCount / 100, 1);

      // Calculate completion rate score (0-1)
      const completionScore = post.engagement.completionRate;

      // Calculate views score (0-1)
      const viewsScore = Math.min(post.engagement.views / 5000, 1);

      // Calculate weighted average
      const qualityScore = (
        engagementScore * weights.engagement +
        sentimentScore * weights.sentiment +
        helpfulnessScore * weights.helpfulness +
        completionScore * weights.completion +
        viewsScore * weights.views
      );

      // Convert to 1-5 star rating
      return Math.round(qualityScore * 4) + 1;
    };

    const getStarRating = (post: Post): number => {
      return calculateContentQuality(post);
    };

    return {
      posts,
      categories,
      activeCategory,
      isLoading,
      filteredPosts,
      formatDate,
      viewPost,
      loadMorePosts,
      userTokens,
      showPremiumModal,
      selectedPost,
      upvotePost,
      upvoteComment,
      downvoteComment,
      markHelpful,
      reportComment,
      purchasePremiumContent,
      trackEngagement,
      newComment,
      newReply,
      uploadedImages,
      showImageModal,
      selectedImage,
      showRatingModal,
      selectedRating,
      ratingComment,
      calculateTokens,
      addComment,
      extractTags,
      analyzeSentiment,
      openImageModal,
      closeImageModal,
      handleImageUpload,
      addReply,
      submitRating,
      closeRatingModal,
      ratePost,
      calculateContentQuality,
      getStarRating
    };
  }
});
</script>

<style scoped>
.blog-section {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  flex: 1;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #00f7ff, #3E5879);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #a0aec0;
}

.blog-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.filter-btn.active {
  background: #00f7ff;
  color: #16213e;
}

.filter-icon {
  font-size: 1rem;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.blog-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 247, 255, 0.1);
}

.blog-card.featured {
  grid-column: span 2;
}

.blog-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.blog-category {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0, 247, 255, 0.9);
  color: #16213e;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.blog-date {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.blog-content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.blog-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
  line-height: 1.4;
}

.blog-excerpt {
  color: #a0aec0;
  margin-bottom: 1rem;
  line-height: 1.6;
  flex: 1;
}

.blog-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #a0aec0;
  font-size: 0.9rem;
}

.blog-meta span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.blog-tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.tag {
  background: rgba(0, 247, 255, 0.1);
  color: #00f7ff;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
}

.read-more-button {
  width: 100%;
  padding: 0.75rem;
  background: transparent;
  border: 2px solid #00f7ff;
  color: #00f7ff;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: auto;
}

.read-more-button:hover {
  background: #00f7ff;
  color: #16213e;
}

.load-more {
  text-align: center;
}

.load-more-button {
  padding: 1rem 2rem;
  background: transparent;
  border: 2px solid #00f7ff;
  color: #00f7ff;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
}

.load-more-button:hover:not(:disabled) {
  background: #00f7ff;
  color: #16213e;
}

.load-more-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading-spinner {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-tokens {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 247, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  margin-top: 1rem;
  color: #00f7ff;
}

.premium-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(45deg, #ffd700, #ffa500);
  color: #16213e;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.engagement-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #a0aec0;
}

.premium-button {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(45deg, #ffd700, #ffa500);
  border: none;
  color: #16213e;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 600;
}

.premium-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
}

.comments-section {
  margin-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1.5rem;
}

.comments-list {
  margin: 1rem 0;
}

.comment {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 15px;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.comment:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 247, 255, 0.1);
}

.comment.positive {
  border-left: 4px solid #00ff9d;
}

.comment.negative {
  border-left: 4px solid #ff4d4d;
}

.comment.neutral {
  border-left: 4px solid #ffd700;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-details {
  display: flex;
  flex-direction: column;
}

.author-role {
  font-size: 0.8rem;
  color: #00f7ff;
}

.author-reputation {
  font-size: 0.8rem;
  color: #ffd700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.comment-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.comment-content {
  margin-bottom: 1rem;
}

.comment-images {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.comment-images img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.comment-images img:hover {
  transform: scale(1.05);
}

.comment-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.vote-buttons {
  display: flex;
  gap: 0.5rem;
}

.vote-button {
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.vote-button.upvote.active {
  color: #00ff9d;
}

.vote-button.downvote.active {
  color: #ff4d4d;
}

.helpful-button {
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.helpful-button.active {
  color: #00f7ff;
  background: rgba(0, 247, 255, 0.1);
}

.report-button {
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.report-button:hover {
  color: #ff4d4d;
}

.comment-tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.replies-section {
  margin-left: 2rem;
  margin-top: 1rem;
  padding-left: 1rem;
  border-left: 2px solid rgba(255, 255, 255, 0.1);
}

.reply {
  background: rgba(255, 255, 255, 0.03);
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.reply-images {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.reply-images img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
}

.add-reply {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90vh;
}

.modal-content img {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
}

.close-modal {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

.rating-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.star-rating {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
}

.star-rating button {
  background: none;
  border: none;
  color: #a0aec0;
  font-size: 2rem;
  cursor: pointer;
  transition: color 0.3s ease;
}

.star-rating button.active {
  color: #ffd700;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.cancel-button,
.submit-button {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-button {
  background: none;
  border: 1px solid #a0aec0;
  color: #a0aec0;
}

.submit-button {
  background: #00f7ff;
  border: none;
  color: #16213e;
}

.hidden {
  display: none;
}

.upload-button {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.upload-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.comment-input-wrapper {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1rem;
}

.comment-actions-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.quality-rating {
  display: flex;
  gap: 0.25rem;
  color: #a0aec0;
}

.quality-rating .fa-star {
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.quality-rating .fa-star.active {
  color: #ffd700;
}

@media (max-width: 768px) {
  .blog-section {
    padding: 4rem 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .blog-grid {
    grid-template-columns: 1fr;
  }

  .blog-card.featured {
    grid-column: span 1;
  }

  .blog-filters {
    gap: 0.5rem;
  }

  .filter-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }

  .comment-header {
    flex-direction: column;
    gap: 1rem;
  }

  .comment-meta {
    width: 100%;
    justify-content: space-between;
  }

  .comment-actions {
    flex-wrap: wrap;
  }

  .replies-section {
    margin-left: 1rem;
  }
}
</style>
