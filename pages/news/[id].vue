<template>
  <NuxtRouteAnnouncer />
  <Header />
  <div v-if="isLoading" class="loading-container">
    <div class="loading-spinner">
      <div class="spinner"></div>
      <p>กำลังโหลดข่าว...</p>
    </div>
  </div>

  <div v-else-if="article" class="news-article-page">
    <!-- Main Content -->
    <div class="main-content">
      <article class="article">
        <!-- Article Header -->
        <header class="article-header">
          <h1 class="article-title">{{ article.title }}</h1>

          <div class="article-meta">
            <div class="meta-item">
              <CalendarIcon class="meta-icon" />
              <span>{{
                formatDate(article.created_at || article.published_at)
              }}</span>
            </div>
            <div class="meta-item" v-if="article.author">
              <UserIcon class="meta-icon" />
              <span>{{ article.author }}</span>
            </div>
            <div class="meta-item">
              <EyeIcon class="meta-icon" />
              <span>{{ (article.views || 0).toLocaleString() }} ครั้ง</span>
            </div>
          </div>
        </header>

        <!-- Featured Image -->
        <div class="featured-image" v-if="article.cover">
          <img :src="article.cover" :alt="article.title" />
        </div>

        <!-- Article Content -->
        <div class="article-content">
          <div class="content-text" v-html="article.content"></div>

          <!-- Tags -->
          <div class="article-tags" v-if="article.tags && article.tags.length">
            <span class="tag-label">แท็ก:</span>
            <span
              v-for="tag in typeof article.tags === 'string'
                ? JSON.parse(article.tags)
                : article.tags"
              :key="tag"
              class="tag"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Social Share -->
          <div class="social-share">
            <span class="share-label">แชร์:</span>
            <div class="share-buttons">
              <button class="share-btn facebook" @click="shareToFacebook">
                <span>Facebook</span>
              </button>
              <button class="share-btn twitter" @click="shareToTwitter">
                <span>Twitter</span>
              </button>
              <button class="share-btn line" @click="shareToLine">
                <span>Line</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-content">
        <!-- Related News Section -->
        <div class="related-news" v-if="relatedNews && relatedNews.length">
          <h3 class="sidebar-title">ข่าวที่เกี่ยวข้อง</h3>

          <div class="related-articles">
            <article
              v-for="relatedArticle in relatedNews.slice(0, 3)"
              :key="relatedArticle.id"
              class="related-article"
              @click="navigateToArticle(relatedArticle.id)"
            >
              <div class="related-image" v-if="relatedArticle.cover">
                <img
                  :src="relatedArticle.cover"
                  :alt="relatedArticle.title"
                />
              </div>
              <div class="related-content">
                <h4 class="related-title">{{ relatedArticle.title }}</h4>
                <div class="related-meta">
                  <span class="related-date">{{
                    formatDate(relatedArticle.created_at)
                  }}</span>
                  <span class="related-views"
                    >{{
                      (relatedArticle.views || 0).toLocaleString()
                    }}
                    ครั้ง</span
                  >
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Popular News Section -->
        <div class="popular-news" v-if="popularNews && popularNews.length">
          <h3 class="sidebar-title">ข่าวยอดนิยม</h3>

          <div class="popular-articles">
            <article
              v-for="(popularArticle, index) in popularNews"
              :key="popularArticle.id"
              class="popular-article"
              @click="navigateToArticle(popularArticle.id)"
            >
              <div class="popular-rank">{{ index + 1 }}</div>
              <div class="popular-content">
                <h4 class="popular-title">{{ popularArticle.title }}</h4>
                <div class="popular-meta">
                  <span class="popular-views"
                    >{{
                      (popularArticle.views || 0).toLocaleString()
                    }}
                    ครั้ง</span
                  >
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Advertisement Banner -->
        <div class="ad-banner">
          <div class="ad-placeholder">
            <span>โฆษณา</span>
          </div>
        </div>

        <!-- Latest News Section (เพิ่มเติม) -->
        <div class="latest-news" v-if="latestNews && latestNews.length">
          <h3 class="sidebar-title font-kanit">ข่าวล่าสุด</h3>
          
          <div class="latest-articles font-kanit">
            <article
              v-for="latestArticle in latestNews.slice(0, 3)"
              :key="latestArticle.id"
              class="latest-article"
              @click="navigateToArticle(latestArticle.id)"
            >
              <h4 class="latest-title">{{ latestArticle.title }}</h4>
              <div class="latest-meta">
                <span class="latest-date">{{
                  formatDate(latestArticle.created_at)
                }}</span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </aside>
  </div>

  <div v-else class="error-container">
    <div class="error-message">
      <h2>ไม่พบข่าวที่ต้องการ</h2>
      <p>ข่าวที่คุณต้องการดูอาจถูกลบหรือย้ายไปแล้ว</p>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  ChevronRightIcon,
  CalendarIcon,
  UserIcon,
  EyeIcon,
} from "lucide-vue-next";

// Get route parameters
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const { $supabase } = useNuxtApp();

// ดึงข้อมูลข่าวหลักจาก Supabase
const {
  data: article,
  pending: articlePending,
  error: articleError,
} = await useAsyncData(`news-${id}`, async () => {
  const { data, error } = await $supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
});

// ดึงข่าวที่เกี่ยวข้อง - ปรับปรุงให้ดีขึ้น
const {
  data: relatedNews,
  pending: relatedPending,
  error: relatedError,
} = await useAsyncData(`related-news-${id}`, async () => {
  if (!article.value) return [];

  // ถ้ามี category ให้ดึงข่าวในหมวดเดียวกัน ถ้าไม่มีให้ดึงข่าวล่าสุด
  let query = $supabase
    .from("news")
    .select("id, title, cover, created_at, views, category")
    .neq("id", id);

  // ถ้ามี category
  if (article.value.category) {
    query = query.eq("category", article.value.category);
  }

  const { data, error } = await query
    .order("created_at", { ascending: false })
    .limit(6); // ดึงมา 6 ข่าว แล้วแสดงแค่ 3

  if (error) {
    console.error("Error fetching related news:", error);
    return [];
  }

  return data || [];
});

// ดึงข่าวยอดนิยม
const {
  data: popularNews,
  pending: popularPending,
  error: popularError,
} = await useAsyncData("popular-news", async () => {
  const { data, error } = await $supabase
    .from("news")
    .select("id, title, views")
    .neq("id", id)
    .order("views", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Error fetching popular news:", error);
    return [];
  }
  return data || [];
});

// ดึงข่าวล่าสุด (เพิ่มเติม)
const {
  data: latestNews,
  pending: latestPending,
  error: latestError,
} = await useAsyncData("latest-news", async () => {
  const { data, error } = await $supabase
    .from("news")
    .select("id, title, created_at")
    .neq("id", id)
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Error fetching latest news:", error);
    return [];
  }
  return data || [];
});

// อัปเดตจำนวนการดู
onMounted(async () => {
  if (article.value && article.value.id) {
    try {
      await $supabase
        .from("news")
        .update({ views: (article.value.views || 0) + 1 })
        .eq("id", article.value.id);
    } catch (error) {
      console.error("Error updating view count:", error);
    }
  }
});

// Navigation function
const navigateToArticle = (articleId) => {
  router.push(`/news/${articleId}`);
};

// Social share functions
const shareToFacebook = () => {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(article.value.title);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`, '_blank');
};

const shareToTwitter = () => {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(article.value.title);
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
};

const shareToLine = () => {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(article.value.title);
  window.open(`https://social-plugins.line.me/lineit/share?url=${url}&text=${title}`, '_blank');
};

// Format date function
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

// Loading state
const isLoading = computed(() => {
  return articlePending.value || relatedPending.value || popularPending.value || latestPending.value;
});

// Handle errors
if (articleError.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "ไม่พบข่าวที่ต้องการ",
  });
}

// Debug log (สามารถลบได้หลังจาก test แล้ว)
console.log("Related news count:", relatedNews.value?.length || 0);
console.log("Related news data:", relatedNews.value);
</script>

<style scoped>
/* Loading Styles */
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.loading-spinner {
  text-align: center;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #2563eb;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-spinner p {
  color: #666;
  font-size: 1rem;
}

/* Error Styles */
.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.error-message {
  text-align: center;
  color: #666;
}

.error-message h2 {
  color: #dc2626;
  margin-bottom: 0.5rem;
}

.news-article-page {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  padding-top: 40px;
  font-family: "Sarabun", "Noto Sans Thai", sans-serif;
}

/* Main Content Styles */
.main-content {
  font-family: 'kanit';
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.article {
  padding: 2rem;
  padding-left: 0;
}

.article-header {
  margin-bottom: 2rem;
}

.article-title {
  font-size: 2rem;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.3;
  margin-bottom: 1rem;
}

.article-meta {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  color: #666;
  font-size: 0.875rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-icon {
  width: 16px;
  height: 16px;
}

.featured-image {
  margin-bottom: 2rem;
}

.featured-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.article-content {
  line-height: 1.8;
}

.content-text {
  margin-bottom: 2rem;
  font-size: 1.1rem;
  color: #333;
  font-weight: 400;
}

.content-text p {
  margin-bottom: 1.5rem;
}

.article-tags {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.tag-label {
  font-weight: 600;
  color: #374151;
}

.tag {
  background: #eff6ff;
  color: #2563eb;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.social-share {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.share-label {
  font-weight: 600;
  color: #374151;
}

.share-buttons {
  display: flex;
  gap: 0.5rem;
}

.share-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.share-btn.facebook {
  background: #1877f2;
  color: white;
}

.share-btn.twitter {
  background: #1da1f2;
  color: white;
}

.share-btn.line {
  background: #00c300;
  color: white;
}

.share-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Sidebar Styles */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sidebar-content > div {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.sidebar-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 3px solid #2563eb;
  
}

/* Related News Styles */
.related-articles {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.related-article {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  transition: all 0.2s;
}

.related-article:hover {
  background: #f9fafb;
  border-radius: 8px;
  padding: 0.75rem;
  margin: 0 -0.75rem;
}

.related-article:last-child {
  border-bottom: none;
}

.related-image {
  flex-shrink: 0;
}

.related-image img {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
}

.related-content {
  flex: 1;
  min-width: 0;
}

.related-title {
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.4;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #666;
}

/* Popular News Styles */
.popular-articles {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.popular-article {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  transition: all 0.2s;
}

.popular-article:hover {
  background: #f9fafb;
  border-radius: 8px;
  padding: 0.75rem;
  margin: 0 -0.75rem;
}

.popular-article:last-child {
  border-bottom: none;
}

.popular-rank {
  background: #2563eb;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

.popular-content {
  flex: 1;
  min-width: 0;
}

.popular-title {
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.4;
  color: #1a1a1a;
  margin-bottom: 0.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.popular-meta {
  font-size: 0.75rem;
  color: #666;
}

/* Latest News Styles */
.latest-articles {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.latest-article {
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  transition: all 0.2s;
}

.latest-article:hover {
  background: #f9fafb;
  border-radius: 8px;
  padding: 0.75rem;
  margin: 0 -0.75rem;
}

.latest-article:last-child {
  border-bottom: none;
}

.latest-title {
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.4;
  color: #1a1a1a;
  margin-bottom: 0.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.latest-meta {
  font-size: 0.75rem;
  color: #666;
}

/* Advertisement Banner */
.ad-banner {
  background: #f3f4f6;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
}

.ad-placeholder {
  color: #9ca3af;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .news-article-page {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .sidebar {
    order: -1;
  }
}

@media (max-width: 768px) {
  .news-article-page {
    padding: 0.5rem;
  }

  .article {
    padding: 1.5rem;
  }

  .article-title {
    font-size: 1.7rem;
    font-weight: 400;
  }

  .article-meta {
    gap: 1rem;
  }

  .featured-image img {
    height: 250px;
  }

  .related-image img {
    width: 60px;
    height: 45px;
  }

  .related-title,
  .popular-title,
  .latest-title {
    font-size: 0.8rem;
  }
}
</style>