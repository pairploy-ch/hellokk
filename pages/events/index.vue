<template>
  <div class="news-list-page">
    <Header />

    <!-- Page Header -->
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">กิจกรรมทั้งหมด</h1>
        <p class="page-subtitle">ติดตามข่าวสารและกิจกรรมล่าสุดของเรา</p>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="filter-bar">
      <div class="container">
        <div class="filter-controls">
          <div class="filter-group">
            <label class="filter-label">เรียงตาม:</label>
            <select v-model="sortBy" @change="sortNews" class="filter-select">
              <option value="newest">ใหม่ล่าสุด</option>
              <option value="oldest">เก่าสุด</option>
              <option value="popular">ยอดนิยม</option>
            </select>
          </div>
          <div class="filter-group search-group">
            <input
              v-model="searchQuery"
              @input="searchNews"
              type="text"
              placeholder="ค้นหากิจกรรม..."
              class="search-input"
            />
            <SearchIcon class="search-icon" />
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>กำลังโหลดข่าว...</p>
      </div>
    </div>

    <!-- News Grid -->
    <div v-else class="news-content">
      <div class="container">
        <!-- Results Info -->
        <div class="results-info" v-if="!loading">
          <p>พบ {{ filteredNews.length }} กิจกรรม</p>
        </div>

        <!-- No Results -->
        <div v-if="filteredNews.length === 0 && !loading" class="no-results">
          <div class="no-results-content">
            <FileTextIcon class="no-results-icon" />
            <h3>ไม่พบข่าวที่ต้องการ</h3>
            <p>ลองเปลี่ยนคำค้นหาหรือหมวดหมู่ใหม่</p>
          </div>
        </div>

        <!-- News Cards Grid -->
        <div v-else class="news-grid">
          <article
            v-for="article in paginatedNews"
            :key="article.id"
            class="news-card"
            @click="navigateToArticle(article.id)"
          >
            <!-- Card Image -->
            <div class="card-image">
              <img
                :src="article.cover || '/images/default-news.jpg'"
                :alt="article.title"
                loading="lazy"
              />
              <div class="card-overlay">
              
                <div class="highlight-badge" v-if="article.is_highlight">
                  <StarIcon class="star-icon" />
                </div>
              </div>
            </div>

            <!-- Card Content -->
            <div class="card-content">
              <h3 class="card-title">{{ article.title }}</h3>

              <div class="card-excerpt" v-if="article.content">
                {{ getExcerpt(article.content) }}
              </div>

              <div class="card-meta">
                <div class="meta-item">
                  <CalendarIcon class="meta-icon" />
                  <span>{{ formatDate(article.created_at) }}</span>
                </div>
                <div class="meta-item" v-if="article.views">
                  <EyeIcon class="meta-icon" />
                  <span>{{ formatViews(article.views) }}</span>
                </div>
              </div>

              <!-- Read More Button -->
              <div class="card-action">
                <button class="read-more-btn">
                  อ่านต่อ
                  <ChevronRightIcon class="btn-icon" />
                </button>
              </div>
            </div>
          </article>
        </div>

        <!-- Pagination -->
        <div class="pagination" v-if="totalPages > 1">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="pagination-btn"
          >
            <ChevronLeftIcon class="btn-icon" />
            ก่อนหน้า
          </button>

          <div class="pagination-numbers">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="changePage(page)"
              :class="['pagination-number', { active: page === currentPage }]"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="pagination-btn"
          >
            ถัดไป
            <ChevronRightIcon class="btn-icon" />
          </button>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  SearchIcon,
  CalendarIcon,
  EyeIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  StarIcon,
  FileTextIcon,
} from "lucide-vue-next";

const { $supabase } = useNuxtApp();
const route = useRoute();
const router = useRouter();

// Reactive data
const news = ref([]);
const loading = ref(true);
const selectedCategory = ref("");
const sortBy = ref("newest");
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 12;

// Fetch all news data from Supabase
const fetchNews = async () => {
  try {
    loading.value = true;
    const { data, error } = await $supabase
      .from("event")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching news:", error);
      news.value = [];
    } else {
      news.value = data || [];
      console.log("Fetched news:", data);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    news.value = [];
  } finally {
    loading.value = false;
  }
};

// Computed properties
const filteredNews = computed(() => {
  let filtered = [...news.value];

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(
      (item) => item.category === selectedCategory.value
    );
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        (item.content && item.content.toLowerCase().includes(query))
    );
  }

  // Sort
  switch (sortBy.value) {
    case "oldest":
      filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      break;
    case "popular":
      filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
      break;
    case "newest":
    default:
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      break;
  }

  return filtered;
});

const totalPages = computed(() =>
  Math.ceil(filteredNews.value.length / itemsPerPage)
);

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredNews.value.slice(start, end);
});

const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(total);
    } else if (current >= total - 3) {
      pages.push(1);
      pages.push("...");
      for (let i = total - 4; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(total);
    }
  }

  return pages;
});

// Methods
const navigateToArticle = (id) => {
  router.push(`/events/${id}`);
};

const filterNews = () => {
  currentPage.value = 1;
};

const sortNews = () => {
  currentPage.value = 1;
};

const searchNews = () => {
  currentPage.value = 1;
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

const formatViews = (views) => {
  if (!views) return "0 ครั้ง";
  return views.toLocaleString() + " ครั้ง";
};

const getCategoryName = (category) => {
  const categories = {
    NEWS: "ข่าวสาร",
    ANNOUNCEMENT: "ประกาศ",
    EVENT: "กิจกรรม",
    PROMOTION: "โปรโมชั่น",
  };
  return categories[category] || category;
};

const getExcerpt = (content) => {
  if (!content) return "";
  const text = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
  return text.length > 150 ? text.substring(0, 150) + "..." : text;
};

// Watch for route changes to reset filters
watch(
  () => route.query,
  (newQuery) => {
    if (newQuery.category) {
      selectedCategory.value = newQuery.category;
    }
    if (newQuery.search) {
      searchQuery.value = newQuery.search;
    }
  },
  { immediate: true }
);

// Lifecycle
onMounted(() => {
  fetchNews();
});
</script>

<style scoped>
.news-list-page {
  min-height: 100vh;
  background: #f8fafc;
  font-family: "Kanit", "Sarabun", "Noto Sans Thai", sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Page Header */
.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  /* margin-top: 60px; */
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
}

.page-subtitle {
  font-size: 1.1rem;
  text-align: center;
  opacity: 0.9;
}

/* Filter Bar */
.filter-bar {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1.5rem 0;
  position: sticky;
  top: 0px;
  z-index: 40;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filter-controls {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-label {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
}

.filter-select {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  background: white;
  min-width: 120px;
  cursor: pointer;
}

.filter-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-group {
  position: relative;
  margin-left: auto;
}

.search-input {
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  min-width: 250px;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #9ca3af;
}

/* Loading */
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
  border-top: 4px solid #667eea;
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

/* Content */
.news-content {
  padding: 2rem 0;
}

.results-info {
  margin-bottom: 1.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.no-results {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.no-results-content {
  text-align: center;
  color: #6b7280;
}

.no-results-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 1rem;
  opacity: 0.5;
}

.no-results-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
}

/* News Grid */
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.news-card {
  background: white;
  /* border-radius: 12px; */
  overflow: hidden;
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); */
  transition: all 0.3s ease;
  cursor: pointer;
}

.news-card:hover {
  transform: translateY(-4px);
  /* box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15); */
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.news-card:hover .card-image img {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  top: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.category-badge {
  background: rgba(102, 126, 234, 0.9);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
}

.highlight-badge {
  background: rgba(251, 191, 36, 0.9);
  color: white;
  padding: 0.5rem;
  border-radius: 50%;
  backdrop-filter: blur(10px);
}

.star-icon {
  width: 16px;
  height: 16px;
}

.card-content {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 0.75rem;
  color: #1f2937;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-excerpt {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #9ca3af;
  font-size: 0.75rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.meta-icon {
  width: 14px;
  height: 14px;
}

.card-action {
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
}

.read-more-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #000;
  font-weight: 600;
  font-size: 0.875rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.read-more-btn:hover {
  color: #000;
}

.btn-icon {
  width: 14px;
  height: 14px;
  transition: transform 0.2s ease;
}

.read-more-btn:hover .btn-icon {
  transform: translateX(2px);
}

/* Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 8px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #667eea;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-numbers {
  display: flex;
  gap: 0.25rem;
}

.pagination-number {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 8px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-number:hover {
  background: #f9fafb;
  border-color: #667eea;
}

.pagination-number.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

/* Responsive */
@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .filter-controls {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .search-group {
    margin-left: 0;
  }

  .search-input {
    min-width: auto;
    width: 100%;
  }

  .page-title {
    font-size: 2rem;
  }

  .pagination {
    flex-wrap: wrap;
  }
}
</style>
