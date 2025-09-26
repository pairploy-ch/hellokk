<template>
  <section class="py-16 max-w-7xl mx-auto px-6">
    <!-- Section Header -->
    <div class="flex items-center gap-3 mb-12">
      <h2 class="text-4xl font-medium text-black" style="font-weight: 600">
        What's New
      </h2>
      <div class="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div class="h-[448px] bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
      <div class="space-y-8">
        <div v-for="i in 3" :key="i" class="flex gap-4">
          <div class="w-32 h-32 bg-gray-200 animate-pulse rounded-lg"></div>
          <div class="flex-1 space-y-3">
            <div class="h-4 bg-gray-200 animate-pulse rounded w-20"></div>
            <div class="h-4 bg-gray-200 animate-pulse rounded"></div>
            <div class="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Grid Layout -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Featured Article (Left) -->
      <div class="lg:col-span-2" v-if="mainArticle">
        <article class="group cursor-pointer h-full"  >
          <div class="relative h-[448px] overflow-hidden bg-gray-100" @click="navigateToArticle(mainArticle.id)">
           
            <img
              :src="mainArticle.cover"
              :alt="mainArticle.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <!-- Overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
            ></div>

            <!-- Category Badge -->
            <span
              class="absolute top-6 left-6 bg-blue-500 text-white px-3 py-1.5 text-sm font-medium tracking-wide"
            >
              {{ mainArticle.category }}
            </span>

            <!-- Content -->
            <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3
                class="text-3xl mb-4 leading-tight font-kanit"
                style="font-weight: 600"
              >
                {{ mainArticle.title }}
              </h3>
              <div class="flex items-center gap-6 text-sm opacity-90">
                <span>BY <strong>ADMIN</strong></span>
                <span>{{ formatDate(mainArticle.created_at) }}</span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- Sidebar Articles (Right) -->
      <div class="space-y-8">
        <article
          v-for="article in sidebarArticles"
          :key="article.id"
          class="group cursor-pointer flex gap-4"
          @click="navigateToArticle(article.id)"
        >
          <!-- Image -->
          <div
            class="relative w-32 h-32 flex-shrink-0 overflow-hidden bg-gray-100"
          >
            <img
              :src="article.cover"
              :alt="article.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <!-- Content -->
          <div class="flex-1 flex flex-col">
            <!-- Category Badge -->
            <div class="mb-3">
              <span
                class="px-3 py-1 text-xs font-medium text-white tracking-wide"
                :class="getCategoryColor(article.category)"
              >
                {{ article.category }}
              </span>
            </div>

            <!-- Title -->
            <h4
              style="font-weight: 600"
              class="text-md font-bold text-black mb-4 leading-tight group-hover:text-gray-700 transition-colors flex-1"
            >
              {{ article.title }}
            </h4>

            <!-- Meta -->
            <div class="flex items-center gap-4 text-sm text-gray-500 mt-auto">
              <span>BY <strong class="text-black">ADMIN</strong></span>
              <span>{{ formatDate(article.created_at) }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- No Data State -->
    <div v-if="!loading && news.length === 0" class="text-center py-16">
      <p class="text-gray-500 text-lg">No news articles found.</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
const { $supabase } = useNuxtApp();

// Reactive data
const news = ref([]);
const loading = ref(true);
const route = useRoute();
const router = useRouter();
// Fetch news data from Supabase
const fetchnews = async () => {
  try {
    loading.value = true;
    const { data, error } = await $supabase
      .from("news")
      .select("*")
      .eq("is_highlight", true)
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

// Computed properties for main and sidebar articles
const mainArticle = computed(() => {
  // Get the first highlighted article, or the first article if none highlighted
  const highlightedArticle = news.value.find((article) => article.is_highlight);
  return highlightedArticle || news.value[0] || null;
});

const sidebarArticles = computed(() => {
  // Get articles that are not the main article, limit to 3
  const mainId = mainArticle.value?.id;
  return news.value.filter((article) => article.id !== mainId).slice(0, 3);
});

// Date formatting function
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options).toUpperCase();
};

// Get category badge color
const getCategoryColor = (category) => {
  const colors = {
    NEWS: "bg-blue-500",
    EVENT: "bg-orange-500",
    POLITICS: "bg-red-500",
    SPORTS: "bg-green-500",
  };
  return colors[category] || "bg-gray-500";
};

// Navigation function
const navigateToArticle = (articleId) => {
  router.push(`/news/${articleId}`);
};

onMounted(async () => {
  // Fetch data from Supabase
  await fetchnews();
});
</script>

<style scoped>
/* Custom styles for smooth animations */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Ensure consistent image aspect ratios */
img {
  object-position: center;
}

/* Typography improvements */
h2,
h3,
h4 {
  font-weight: 700;
  letter-spacing: -0.025em;
}

/* Hover state improvements */
.group:hover img {
  transform: scale(1.05);
}

.group:hover h4 {
  color: #374151;
}
</style>
